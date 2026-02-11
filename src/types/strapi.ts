/**
 * TypeScript interfaces for Strapi CMS data models
 */

export interface MediaFile {
  id: number;
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: string;
  url: string;
}

export interface HomepageContent {
  id: number;
  tagline: string;
  vision: string;
  mission: string;
  boldValues: {
    believe: string;
    overcome: string;
    lead: string;
    deliver: string;
  };
  heroImage?: MediaFile;
  statistics: {
    studentsTrained: number;
    foundingYear: number;
    partnersCount: number;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image?: MediaFile;
  category: 'founding-core' | 'sub-team' | 'other';
  order: number;
  socialLinks?: {
    linkedin?: string;
    email?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // Changed to any to support Strapi Blocks
  featuredImage?: MediaFile;
  author?: TeamMember;
  categories?: Category[];
  tags?: string[];
  publishedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: any; // Changed to any to support Strapi Blocks
  type: 'event' | 'publication' | 'achievement' | 'announcement';
  eventDate?: string;
  registrationLink?: string;
  featuredImage?: MediaFile;
  publishedAt: string;
  isUpcoming: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  icon: string;
  features: string[];
  contactInfo?: {
    email: string;
    phone: string;
  };
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: any;
}

// Additional interfaces for API responses
export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscription {
  id: number;
  email: string;
  type: 'blog' | 'news';
  subscribedAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API configuration interface
export interface StrapiConfig {
  baseURL: string;
  token?: string;
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

// Search and filter interfaces
export interface BlogSearchParams {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
  sortBy?: 'publishedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface NewsFilterParams {
  type?: 'event' | 'publication' | 'achievement' | 'announcement';
  isUpcoming?: boolean;
  page?: number;
  limit?: number;
}

// Enhanced service interface with validation
export interface ServiceContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
}

// API response wrappers for better error handling
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status: number;
    details?: any;
  };
}

// Health check response
export interface HealthCheckResponse {
  status: 'ok' | 'error';
  message: string;
  timestamp?: string;
  version?: string;
}
