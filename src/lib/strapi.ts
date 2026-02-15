/**
 * Strapi API service for B.Khrease Academic website
 * Handles all API calls to the Strapi CMS backend with error handling and retry logic
 */

import {
  StrapiResponse,
  StrapiError,
  HomepageContent,
  TeamMember,
  BlogPost,
  NewsItem,
  Service,
  Category,
  StrapiConfig,
  BlogSearchParams,
  NewsFilterParams,
} from '@/types/strapi';
import { formatAPILog } from './api-utils';

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// Configuration constants
const DEFAULT_RETRY_ATTEMPTS = 3;
const DEFAULT_RETRY_DELAY = 1000; // 1 second
const REQUEST_TIMEOUT = 10000; // 10 seconds

export class StrapiAPIError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = 'StrapiAPIError';
    this.status = status;
    this.details = details;
  }
}

// Helper to normalize media
const normalizeMedia = (media: any): any => {
  if (!media?.data) return undefined;
  const { id, attributes } = media.data;
  return { id, ...attributes };
};

export class StrapiService {
  private baseURL: string;
  private token?: string;
  private retryAttempts: number;
  private retryDelay: number;

  constructor(config?: Partial<StrapiConfig>) {
    this.baseURL = config?.baseURL || STRAPI_URL;
    this.token = config?.token || STRAPI_TOKEN;
    this.retryAttempts = config?.retryAttempts || DEFAULT_RETRY_ATTEMPTS;
    this.retryDelay = config?.retryDelay || DEFAULT_RETRY_DELAY;
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Enhanced fetch with timeout, retry logic, and comprehensive error handling
   */
  private async fetchAPI<T>(
    endpoint: string,
    options: RequestInit = {},
    attempt = 1
  ): Promise<T> {
    const startTime = Date.now();
    const url = `${this.baseURL}/api${endpoint}`;
    console.log(`[StrapiService] Fetching: ${url}`); // Debug Log
    const method = options.method || 'GET';

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      if (!response.ok) {
        let errorDetails;
        try {
          errorDetails = await response.json();
        } catch {
          errorDetails = { message: response.statusText };
        }

        const error = new StrapiAPIError(
          errorDetails.error?.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorDetails
        );

        // Log the error
        console.error(
          formatAPILog(method, endpoint, response.status, duration, error)
        );

        // Don't retry on client errors (4xx), only on server errors (5xx) and network issues
        if (response.status >= 400 && response.status < 500) {
          throw error;
        }

        // Retry on server errors
        if (attempt < this.retryAttempts) {
          console.warn(
            `Strapi API request failed (attempt ${attempt}/${this.retryAttempts}):`,
            error.message
          );
          await this.sleep(this.retryDelay * attempt); // Exponential backoff
          return this.fetchAPI<T>(endpoint, options, attempt + 1);
        }

        throw error;
      }

      // Log successful request
      if (process.env.NODE_ENV === 'development') {
        console.log(formatAPILog(method, endpoint, response.status, duration));
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;

      // Handle network errors and timeouts
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          const timeoutError = new StrapiAPIError('Request timeout', 408, {
            timeout: REQUEST_TIMEOUT,
          });

          console.error(
            formatAPILog(method, endpoint, 408, duration, timeoutError)
          );

          if (attempt < this.retryAttempts) {
            console.warn(
              `Strapi API timeout (attempt ${attempt}/${this.retryAttempts})`
            );
            await this.sleep(this.retryDelay * attempt);
            return this.fetchAPI<T>(endpoint, options, attempt + 1);
          }

          throw timeoutError;
        }

        // Network errors
        if (error.message.includes('fetch')) {
          const networkError = new StrapiAPIError(
            'Network error - please check your connection',
            0,
            { originalError: error.message }
          );

          console.error(
            formatAPILog(method, endpoint, 0, duration, networkError)
          );

          if (attempt < this.retryAttempts) {
            console.warn(
              `Network error (attempt ${attempt}/${this.retryAttempts}):`,
              error.message
            );
            await this.sleep(this.retryDelay * attempt);
            return this.fetchAPI<T>(endpoint, options, attempt + 1);
          }

          throw networkError;
        }
      }

      // Re-throw StrapiAPIError instances
      if (error instanceof StrapiAPIError) {
        throw error;
      }

      // Wrap unknown errors
      const unknownError = new StrapiAPIError('Unknown error occurred', 500, {
        originalError: error,
      });

      console.error(
        formatAPILog(method, endpoint, 500, duration, unknownError)
      );
      throw unknownError;
    }
  }

  /**
   * Validate required environment variables
   */
  public validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.baseURL || this.baseURL === 'http://localhost:1337') {
      errors.push(
        'NEXT_PUBLIC_STRAPI_URL environment variable is not set or using default localhost'
      );
    }

    if (!this.token) {
      errors.push('STRAPI_API_TOKEN environment variable is not set');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Health check endpoint
   */
  public async healthCheck(): Promise<{
    status: 'ok' | 'error';
    message: string;
  }> {
    try {
      await this.fetchAPI('/health-check');
      return { status: 'ok', message: 'Strapi API is accessible' };
    } catch (error) {
      const message =
        error instanceof StrapiAPIError
          ? error.message
          : 'Unknown error during health check';
      return { status: 'error', message };
    }
  }

  // Homepage data methods
  async getHomepageData(): Promise<StrapiResponse<HomepageContent>> {
    try {
      return await this.fetchAPI<StrapiResponse<HomepageContent>>(
        '/homepage?populate=*'
      );
    } catch (error) {
      console.error('Failed to fetch homepage data:', error);
      throw error;
    }
  }

  // Team members methods
  async getTeamMembers(): Promise<StrapiResponse<TeamMember[]>> {
    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        '/team-members?populate=*&sort=order:asc'
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.Name, // Map Name -> name
        role: item.attributes.role,
        bio: item.attributes.Bio, // Map Bio -> bio
        category: item.attributes.category,
        order: item.attributes.order,
        image: normalizeMedia(item.attributes.image),
        socialLinks: item.attributes.SocialLinks
          ? {
              linkedin: item.attributes.SocialLinks.linkedin,
              email: item.attributes.SocialLinks.email,
              twitter: item.attributes.SocialLinks.twitter,
            }
          : undefined,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt,
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Failed to fetch team members:', error);
      throw error;
    }
  }

  async getTeamMembersByCategory(
    category: 'founding-core' | 'sub-team' | 'other'
  ): Promise<StrapiResponse<TeamMember[]>> {
    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/team-members?populate=*&filters[category][$eq]=${category}&sort=order:asc`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        name: item.attributes.Name,
        role: item.attributes.role,
        bio: item.attributes.Bio,
        category: item.attributes.category,
        order: item.attributes.order,
        image: normalizeMedia(item.attributes.image),
        socialLinks: item.attributes.SocialLinks
          ? {
              linkedin: item.attributes.SocialLinks.linkedin,
              email: item.attributes.SocialLinks.email,
              twitter: item.attributes.SocialLinks.twitter,
            }
          : undefined,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt,
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(
        `Failed to fetch team members for category ${category}:`,
        error
      );
      throw error;
    }
  }

  // Blog posts methods
  async getBlogPosts(
    page = 1,
    limit = 10
  ): Promise<StrapiResponse<BlogPost[]>> {
    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:desc`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
        author: item.attributes.author?.data
          ? {
              id: item.attributes.author.data.id,
              ...item.attributes.author.data.attributes,
              image: normalizeMedia(
                item.attributes.author.data.attributes.image
              ),
            }
          : undefined,
        categories: item.attributes.categories?.data?.map((cat: any) => ({
          id: cat.id,
          ...cat.attributes,
        })),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      throw error;
    }
  }

  async getBlogPost(slug: string): Promise<StrapiResponse<BlogPost[]>> {
    if (!slug) {
      throw new StrapiAPIError('Blog post slug is required', 400);
    }

    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
        author: item.attributes.author?.data
          ? {
              id: item.attributes.author.data.id,
              ...item.attributes.author.data.attributes,
              image: normalizeMedia(
                item.attributes.author.data.attributes.image
              ),
            }
          : undefined,
        categories: item.attributes.categories?.data?.map((cat: any) => ({
          id: cat.id,
          ...cat.attributes,
        })),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Failed to fetch blog post with slug ${slug}:`, error);
      throw error;
    }
  }

  async getBlogPostsByCategory(
    categorySlug: string,
    page = 1,
    limit = 10
  ): Promise<StrapiResponse<BlogPost[]>> {
    if (!categorySlug) {
      throw new StrapiAPIError('Category slug is required', 400);
    }

    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/blog-posts?populate=*&filters[categories][slug][$eq]=${encodeURIComponent(categorySlug)}&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:desc`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
        author: item.attributes.author?.data
          ? {
              id: item.attributes.author.data.id,
              ...item.attributes.author.data.attributes,
              image: normalizeMedia(
                item.attributes.author.data.attributes.image
              ),
            }
          : undefined,
        categories: item.attributes.categories?.data?.map((cat: any) => ({
          id: cat.id,
          ...cat.attributes,
        })),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(
        `Failed to fetch blog posts for category ${categorySlug}:`,
        error
      );
      throw error;
    }
  }

  async getBlogCategories(): Promise<StrapiResponse<Category[]>> {
    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        '/categories?sort=name:asc'
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Failed to fetch blog categories:', error);
      throw error;
    }
  }

  async searchBlogPosts(
    query: string,
    page = 1,
    limit = 10
  ): Promise<StrapiResponse<BlogPost[]>> {
    if (!query || query.trim().length === 0) {
      throw new StrapiAPIError('Search query is required', 400);
    }

    try {
      const encodedQuery = encodeURIComponent(query.trim());
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/blog-posts?populate=*&filters[$or][0][title][$containsi]=${encodedQuery}&filters[$or][1][excerpt][$containsi]=${encodedQuery}&filters[$or][2][content][$containsi]=${encodedQuery}&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:desc`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
        author: item.attributes.author?.data
          ? {
              id: item.attributes.author.data.id,
              ...item.attributes.author.data.attributes,
              image: normalizeMedia(
                item.attributes.author.data.attributes.image
              ),
            }
          : undefined,
        categories: item.attributes.categories?.data?.map((cat: any) => ({
          id: cat.id,
          ...cat.attributes,
        })),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(
        `Failed to search blog posts with query "${query}":`,
        error
      );
      throw error;
    }
  }

  // News items methods
  async getNewsUpdates(limit?: number): Promise<StrapiResponse<NewsItem[]>> {
    try {
      const limitParam = limit ? `&pagination[pageSize]=${limit}` : '';
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/news-items?populate=*&sort=publishedAt:desc${limitParam}`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Failed to fetch news updates:', error);
      throw error;
    }
  }

  async getNewsItem(slug: string): Promise<StrapiResponse<NewsItem[]>> {
    if (!slug) {
      throw new StrapiAPIError('News item slug is required', 400);
    }

    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/news-items?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Failed to fetch news item with slug ${slug}:`, error);
      throw error;
    }
  }

  async getNewsByType(
    type: 'event' | 'publication' | 'achievement' | 'announcement'
  ): Promise<StrapiResponse<NewsItem[]>> {
    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/news-items?populate=*&filters[type][$eq]=${type}&sort=publishedAt:desc`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Failed to fetch news items of type ${type}:`, error);
      throw error;
    }
  }

  async getUpcomingEvents(): Promise<StrapiResponse<NewsItem[]>> {
    try {
      const today = new Date().toISOString();
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/news-items?populate=*&filters[type][$eq]=event&filters[eventDate][$gte]=${today}&sort=eventDate:asc`
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        featuredImage: normalizeMedia(item.attributes.featuredImage),
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Failed to fetch upcoming events:', error);
      throw error;
    }
  }

  // Services methods
  async getServices(): Promise<StrapiResponse<Service[]>> {
    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        '/services?populate=*&sort=order:asc'
      );

      const normalizedData = response.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw error;
    }
  }

  async getService(id: number): Promise<StrapiResponse<Service>> {
    if (!id || id <= 0) {
      throw new StrapiAPIError('Valid service ID is required', 400);
    }

    try {
      const response = await this.fetchAPI<StrapiResponse<any>>(
        `/services/${id}?populate=*`
      );

      const normalizedData = {
        id: response.data.id,
        ...response.data.attributes,
      };

      return { ...response, data: normalizedData };
    } catch (error) {
      console.error(`Failed to fetch service with ID ${id}:`, error);
      throw error;
    }
  }

  // Contact form submission
  async submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> {
    if (!data.name || !data.email || !data.message) {
      throw new StrapiAPIError('Name, email, and message are required', 400);
    }

    try {
      await this.fetchAPI('/contact-submissions', {
        method: 'POST',
        body: JSON.stringify({ data }),
      });

      return {
        success: true,
        message:
          'Your message has been sent successfully. We will get back to you soon!',
      };
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  }

  // Newsletter subscription
  async subscribeToNewsletter(
    email: string,
    type: 'blog' | 'news' = 'blog'
  ): Promise<{ success: boolean; message: string }> {
    if (!email || !email.includes('@')) {
      throw new StrapiAPIError('Valid email address is required', 400);
    }

    try {
      await this.fetchAPI('/newsletter-subscriptions', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            email: email.toLowerCase().trim(),
            type,
            subscribedAt: new Date().toISOString(),
          },
        }),
      });

      return {
        success: true,
        message: 'Successfully subscribed to our newsletter!',
      };
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);

      // Handle duplicate subscription gracefully
      if (error instanceof StrapiAPIError && error.status === 400) {
        return {
          success: false,
          message: 'This email is already subscribed to our newsletter.',
        };
      }

      throw error;
    }
  }
}

export const strapiService = new StrapiService();
export default StrapiService;
