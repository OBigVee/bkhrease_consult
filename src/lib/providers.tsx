'use client';

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { initOptimizations } from './optimization';
import { initPerformanceMonitoring } from './performance';
import { StrapiAPIError } from './strapi';
import { handleStrapiError } from './api-utils';

// Create a client with enhanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (
          error instanceof StrapiAPIError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false, // Disable refetch on window focus for better UX
      refetchOnReconnect: true, // Refetch when connection is restored
    },
    mutations: {
      retry: (failureCount, error) => {
        // Don't retry mutations on client errors
        if (
          error instanceof StrapiAPIError &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        // Retry once for server errors
        return failureCount < 1;
      },
    },
  },
});

// Global retry handler for queries
queryClient.setQueryDefaults(['*'], {
  retry: (failureCount, error) => {
    // Don't retry on client errors (4xx)
    if (
      error instanceof StrapiAPIError &&
      error.status >= 400 &&
      error.status < 500
    ) {
      return false;
    }

    // Retry up to 3 times for other errors
    return failureCount < 3;
  },
});

// Global retry handler for mutations
queryClient.setMutationDefaults(['*'], {
  retry: (failureCount, error) => {
    // Don't retry mutations on client errors (4xx)
    if (
      error instanceof StrapiAPIError &&
      error.status >= 400 &&
      error.status < 500
    ) {
      return false;
    }

    // Retry up to 2 times for other errors
    return failureCount < 2;
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Initialize performance monitoring and optimizations
    initPerformanceMonitoring();
    initOptimizations();

    // Set up global error handling for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof StrapiAPIError) {
        const handledError = handleStrapiError(event.reason);
        console.error('Unhandled Strapi API error:', handledError);

        // Prevent the default browser error handling
        event.preventDefault();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        'unhandledrejection',
        handleUnhandledRejection
      );
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Show React Query DevTools in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

// Export the query client for use in other parts of the app
export { queryClient };
