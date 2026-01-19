/**
 * Loading state components for different content types
 * Provides skeleton loading states while data is being fetched
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  className?: string;
}

// Generic skeleton component
export function Skeleton({ className }: LoadingStateProps) {
  return (
    <div className={cn('animate-pulse rounded-md bg-gray-200', className)} />
  );
}

// Blog post card loading state
export function BlogPostCardSkeleton({ className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'space-y-4 p-4 border border-gray-200 rounded-lg',
        className
      )}
    >
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

// News item card loading state
export function NewsCardSkeleton({ className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'space-y-3 p-4 border border-gray-200 rounded-lg',
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// Team member card loading state
export function TeamMemberCardSkeleton({ className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'space-y-4 p-4 border border-gray-200 rounded-lg text-center',
        className
      )}
    >
      <Skeleton className="h-32 w-32 rounded-full mx-auto" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3 mx-auto" />
      </div>
    </div>
  );
}

// Service card loading state
export function ServiceCardSkeleton({ className }: LoadingStateProps) {
  return (
    <div
      className={cn(
        'space-y-4 p-6 border border-gray-200 rounded-lg',
        className
      )}
    >
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

// Hero section loading state
export function HeroSkeleton({ className }: LoadingStateProps) {
  return (
    <div className={cn('space-y-6 py-12 text-center', className)}>
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <div className="space-y-3 max-w-2xl mx-auto">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </div>
      <div className="flex justify-center space-x-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

// Grid loading states
export function BlogPostGridSkeleton({
  count = 6,
  className,
}: LoadingStateProps & { count?: number }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <BlogPostCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function NewsGridSkeleton({
  count = 4,
  className,
}: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function TeamGridSkeleton({
  count = 6,
  className,
}: LoadingStateProps & { count?: number }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <TeamMemberCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ServicesGridSkeleton({
  count = 3,
  className,
}: LoadingStateProps & { count?: number }) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  );
}

// List loading states
export function ListSkeleton({
  count = 5,
  className,
}: LoadingStateProps & { count?: number }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 border border-gray-200 rounded"
        >
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

// Full page loading state
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header skeleton */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex space-x-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-16" />
              ))}
            </div>
            <Skeleton className="h-8 w-8 md:hidden" />
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSkeleton className="mb-12" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <BlogPostGridSkeleton count={4} />
          </div>
          <div className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <ListSkeleton count={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error state with retry
interface ErrorStateProps extends LoadingStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="text-red-400 mb-4">
        <svg
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Error Loading Content
      </h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Empty state
interface EmptyStateProps extends LoadingStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No content found',
  description = 'There is no content to display at the moment.',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="text-gray-400 mb-4">
        <svg
          className="h-12 w-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {action}
    </div>
  );
}
