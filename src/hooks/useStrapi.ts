/**
 * React Query hooks for Strapi API integration
 * Provides caching, loading states, error handling, and automatic refetching
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { strapiService, StrapiAPIError } from '@/lib/strapi';
import { handleStrapiError, createAPIResponse } from '@/lib/api-utils';
import {
  HomepageContent,
  TeamMember,
  BlogPost,
  NewsItem,
  Service,
  Category,
  StrapiResponse,
  BlogSearchParams,
  NewsFilterParams,
} from '@/types/strapi';

// Query keys for consistent caching
export const QUERY_KEYS = {
  homepage: ['homepage'] as const,
  teamMembers: ['team-members'] as const,
  teamMembersByCategory: (category: string) =>
    ['team-members', 'category', category] as const,
  blogPosts: (params?: BlogSearchParams) => ['blog-posts', params] as const,
  blogPost: (slug: string) => ['blog-post', slug] as const,
  blogCategories: ['blog-categories'] as const,
  newsUpdates: (params?: NewsFilterParams) => ['news-updates', params] as const,
  newsItem: (slug: string) => ['news-item', slug] as const,
  newsByType: (type: string) => ['news', 'type', type] as const,
  upcomingEvents: ['upcoming-events'] as const,
  services: ['services'] as const,
  service: (id: number) => ['service', id] as const,
} as const;

// Homepage hooks
export function useHomepageData() {
  return useQuery({
    queryKey: QUERY_KEYS.homepage,
    queryFn: () => strapiService.getHomepageData(),
    staleTime: 10 * 60 * 1000, // 10 minutes - homepage data doesn't change often
    retry: (failureCount, error) => {
      // Don't retry on 4xx errors
      if (
        error instanceof StrapiAPIError &&
        error.status >= 400 &&
        error.status < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
    meta: {
      errorMessage: 'Failed to load homepage content',
    },
  });
}

// Team member hooks
export function useTeamMembers() {
  return useQuery({
    queryKey: QUERY_KEYS.teamMembers,
    queryFn: () => strapiService.getTeamMembers(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    meta: {
      errorMessage: 'Failed to load team members',
    },
  });
}

export function useTeamMembersByCategory(
  category: 'founding-core' | 'sub-team' | 'other'
) {
  return useQuery({
    queryKey: QUERY_KEYS.teamMembersByCategory(category),
    queryFn: () => strapiService.getTeamMembersByCategory(category),
    staleTime: 15 * 60 * 1000,
    meta: {
      errorMessage: `Failed to load ${category} team members`,
    },
  });
}

// Blog hooks
export function useBlogPosts(params?: BlogSearchParams) {
  return useQuery({
    queryKey: QUERY_KEYS.blogPosts(params),
    queryFn: () => strapiService.getBlogPosts(params?.page, params?.limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: previousData => previousData, // Keep previous data while loading new page
    meta: {
      errorMessage: 'Failed to load blog posts',
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.blogPost(slug),
    queryFn: () => strapiService.getBlogPost(slug),
    enabled: !!slug, // Only run query if slug is provided
    staleTime: 10 * 60 * 1000,
    meta: {
      errorMessage: 'Failed to load blog post',
    },
  });
}

export function useBlogPostsByCategory(
  categorySlug: string,
  page = 1,
  limit = 10
) {
  return useQuery({
    queryKey: QUERY_KEYS.blogPosts({ category: categorySlug, page, limit }),
    queryFn: () =>
      strapiService.getBlogPostsByCategory(categorySlug, page, limit),
    enabled: !!categorySlug,
    staleTime: 5 * 60 * 1000,
    placeholderData: previousData => previousData,
    meta: {
      errorMessage: 'Failed to load blog posts for category',
    },
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.blogCategories,
    queryFn: () => strapiService.getBlogCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
    meta: {
      errorMessage: 'Failed to load blog categories',
    },
  });
}

export function useSearchBlogPosts(query: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: QUERY_KEYS.blogPosts({ query, page, limit }),
    queryFn: () => strapiService.searchBlogPosts(query, page, limit),
    enabled: !!query && query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    placeholderData: previousData => previousData,
    meta: {
      errorMessage: 'Failed to search blog posts',
    },
  });
}

// News hooks
export function useNewsUpdates(limit?: number) {
  return useQuery({
    queryKey: QUERY_KEYS.newsUpdates({ limit }),
    queryFn: () => strapiService.getNewsUpdates(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    meta: {
      errorMessage: 'Failed to load news updates',
    },
  });
}

export function useNewsItem(slug: string) {
  return useQuery({
    queryKey: QUERY_KEYS.newsItem(slug),
    queryFn: () => strapiService.getNewsItem(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
    meta: {
      errorMessage: 'Failed to load news item',
    },
  });
}

export function useNewsByType(
  type: 'event' | 'publication' | 'achievement' | 'announcement'
) {
  return useQuery({
    queryKey: QUERY_KEYS.newsByType(type),
    queryFn: () => strapiService.getNewsByType(type),
    staleTime: 5 * 60 * 1000,
    meta: {
      errorMessage: `Failed to load ${type} news`,
    },
  });
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: QUERY_KEYS.upcomingEvents,
    queryFn: () => strapiService.getUpcomingEvents(),
    staleTime: 2 * 60 * 1000, // 2 minutes - events are time-sensitive
    refetchInterval: 5 * 60 * 1000, // Auto-refetch every 5 minutes
    meta: {
      errorMessage: 'Failed to load upcoming events',
    },
  });
}

// Services hooks
export function useServices() {
  return useQuery({
    queryKey: QUERY_KEYS.services,
    queryFn: () => strapiService.getServices(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    meta: {
      errorMessage: 'Failed to load services',
    },
  });
}

export function useService(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.service(id),
    queryFn: () => strapiService.getService(id),
    enabled: !!id && id > 0,
    staleTime: 15 * 60 * 1000,
    meta: {
      errorMessage: 'Failed to load service details',
    },
  });
}

// Mutation hooks for form submissions
export function useContactFormSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => strapiService.submitContactForm(data),
    onSuccess: () => {
      // Optionally invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] });
    },
    onError: error => {
      console.error('Contact form submission failed:', error);
    },
  });
}

export function useNewsletterSubscription() {
  return useMutation({
    mutationFn: (data: { email: string; type?: 'blog' | 'news' }) =>
      strapiService.subscribeToNewsletter(data.email, data.type),
    onError: error => {
      console.error('Newsletter subscription failed:', error);
    },
  });
}

// Utility hooks for common patterns
export function usePrefetchBlogPost(slug: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.blogPost(slug),
      queryFn: () => strapiService.getBlogPost(slug),
      staleTime: 10 * 60 * 1000,
    });
  };
}

export function usePrefetchNewsItem(slug: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.newsItem(slug),
      queryFn: () => strapiService.getNewsItem(slug),
      staleTime: 10 * 60 * 1000,
    });
  };
}

// Background refetch hook for keeping data fresh
export function useBackgroundRefetch() {
  const queryClient = useQueryClient();

  const refetchCriticalData = () => {
    // Refetch homepage and news data in the background
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.homepage });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.newsUpdates() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.upcomingEvents });
  };

  return { refetchCriticalData };
}

// Error boundary hook for handling API errors
export function useAPIErrorHandler() {
  return (error: unknown) => {
    const handledError = handleStrapiError(error);

    // You can add additional error handling logic here
    // such as showing toast notifications, logging to external services, etc.

    return handledError;
  };
}
