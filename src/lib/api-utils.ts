/**
 * API utility functions for error handling and response transformation
 */

import { StrapiAPIError } from './strapi';
import { APIResponse } from '@/types/strapi';

/**
 * Transform API responses into a consistent format
 */
export function createAPIResponse<T>(
  data?: T,
  error?: { message: string; status: number; details?: any }
): APIResponse<T> {
  if (error) {
    return {
      success: false,
      error,
    };
  }

  return {
    success: true,
    data,
  };
}

/**
 * Handle and transform Strapi API errors into user-friendly messages
 */
export function handleStrapiError(error: unknown): {
  message: string;
  status: number;
  details?: any;
} {
  if (error instanceof StrapiAPIError) {
    return {
      message: getUserFriendlyErrorMessage(error),
      status: error.status,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      message: 'An unexpected error occurred. Please try again.',
      status: 500,
      details: { originalMessage: error.message },
    };
  }

  return {
    message: 'An unknown error occurred. Please try again.',
    status: 500,
    details: { error },
  };
}

/**
 * Convert technical error messages to user-friendly ones
 */
function getUserFriendlyErrorMessage(error: StrapiAPIError): string {
  switch (error.status) {
    case 400:
      return 'Invalid request. Please check your input and try again.';
    case 401:
      return 'Authentication failed. Please check your credentials.';
    case 403:
      return 'Access denied. You do not have permission to perform this action.';
    case 404:
      return 'The requested content was not found.';
    case 408:
      return 'Request timeout. Please check your internet connection and try again.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Server error. Please try again later.';
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again later.';
    default:
      if (error.status >= 500) {
        return 'Server error. Please try again later.';
      }
      return error.message || 'An error occurred. Please try again.';
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim();
}

/**
 * Validate required fields in form data
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(
    field =>
      !data[field] ||
      (typeof data[field] === 'string' && data[field].trim() === '')
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Create a debounced function for API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');

      if (attempt === maxAttempts) {
        throw lastError;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

/**
 * Format API response for logging
 */
export function formatAPILog(
  method: string,
  endpoint: string,
  status: number,
  duration: number,
  error?: any
): string {
  const timestamp = new Date().toISOString();
  const statusEmoji = status >= 200 && status < 300 ? '✅' : '❌';

  let logMessage = `${statusEmoji} [${timestamp}] ${method} ${endpoint} - ${status} (${duration}ms)`;

  if (error) {
    logMessage += ` - Error: ${error.message || error}`;
  }

  return logMessage;
}
