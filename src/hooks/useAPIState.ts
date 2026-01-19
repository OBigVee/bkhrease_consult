/**
 * Utility hooks for common API state management patterns
 * Provides consistent loading, error, and success states across the application
 */

import { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { handleStrapiError } from '@/lib/api-utils';
import { StrapiAPIError } from '@/lib/strapi';

// Generic API state hook
export interface APIState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useAPIState<T = any>(
  initialData: T | null = null
): {
  state: APIState<T>;
  setLoading: (loading: boolean) => void;
  setData: (data: T) => void;
  setError: (error: string | Error | unknown) => void;
  setSuccess: (success: boolean) => void;
  reset: () => void;
} {
  const [state, setState] = useState<APIState<T>>({
    data: initialData,
    loading: false,
    error: null,
    success: false,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading, error: null }));
  }, []);

  const setData = useCallback((data: T) => {
    setState(prev => ({
      ...prev,
      data,
      loading: false,
      error: null,
      success: true,
    }));
  }, []);

  const setError = useCallback((error: string | Error | unknown) => {
    const errorMessage =
      typeof error === 'string' ? error : handleStrapiError(error).message;

    setState(prev => ({
      ...prev,
      error: errorMessage,
      loading: false,
      success: false,
    }));
  }, []);

  const setSuccess = useCallback((success: boolean) => {
    setState(prev => ({ ...prev, success }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      loading: false,
      error: null,
      success: false,
    });
  }, [initialData]);

  return {
    state,
    setLoading,
    setData,
    setError,
    setSuccess,
    reset,
  };
}

// Hook for handling form submissions with API calls
export function useFormSubmission<TData = any, TResponse = any>() {
  const { state, setLoading, setData, setError, setSuccess, reset } =
    useAPIState<TResponse>();

  const submit = useCallback(
    async (
      apiCall: (data: TData) => Promise<TResponse>,
      data: TData,
      options?: {
        onSuccess?: (response: TResponse) => void;
        onError?: (error: any) => void;
        resetOnSuccess?: boolean;
      }
    ) => {
      try {
        setLoading(true);
        const response = await apiCall(data);
        setData(response);

        if (options?.onSuccess) {
          options.onSuccess(response);
        }

        if (options?.resetOnSuccess) {
          setTimeout(reset, 2000); // Reset after 2 seconds
        }
      } catch (error) {
        setError(error);

        if (options?.onError) {
          options.onError(error);
        }
      }
    },
    [setLoading, setData, setError, reset]
  );

  return {
    ...state,
    submit,
    reset,
  };
}

// Hook for optimistic updates
export function useOptimisticUpdate() {
  const queryClient = useQueryClient();

  const updateOptimistically = useCallback(
    async <T>(
      queryKey: any[],
      updateFn: (oldData: T) => T,
      mutationFn: () => Promise<any>
    ) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<T>(queryKey);

      // Optimistically update to the new value
      if (previousData) {
        queryClient.setQueryData<T>(queryKey, updateFn(previousData));
      }

      try {
        // Perform the mutation
        await mutationFn();
      } catch (error) {
        // If the mutation fails, rollback to the previous value
        if (previousData) {
          queryClient.setQueryData<T>(queryKey, previousData);
        }
        throw error;
      }
    },
    [queryClient]
  );

  return { updateOptimistically };
}

// Hook for infinite scroll/pagination
export function useInfiniteScroll<T>(
  hasNextPage: boolean,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);

          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(node);

      return () => observer.disconnect();
    },
    [hasNextPage, fetchNextPage, isFetchingNextPage]
  );

  return { loadMoreRef, isIntersecting };
}

// Hook for debounced search
export function useDebouncedSearch(
  searchFn: (query: string) => void,
  delay: number = 300
) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      if (query.trim()) {
        searchFn(query.trim());
      }
    }, delay);

    return () => clearTimeout(timer);
  });

  return {
    query,
    debouncedQuery,
    setQuery,
  };
}

// Hook for handling cache invalidation
export function useCacheInvalidation() {
  const queryClient = useQueryClient();

  const invalidateQueries = useCallback(
    (queryKeys: any[][]) => {
      queryKeys.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    [queryClient]
  );

  const removeQueries = useCallback(
    (queryKeys: any[][]) => {
      queryKeys.forEach(queryKey => {
        queryClient.removeQueries({ queryKey });
      });
    },
    [queryClient]
  );

  const refetchQueries = useCallback(
    (queryKeys: any[][]) => {
      queryKeys.forEach(queryKey => {
        queryClient.refetchQueries({ queryKey });
      });
    },
    [queryClient]
  );

  return {
    invalidateQueries,
    removeQueries,
    refetchQueries,
  };
}

// Hook for handling offline/online state
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  return isOnline;
}

// Hook for retry logic
export function useRetry() {
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(
    (fn: () => void, maxRetries: number = 3) => {
      if (retryCount < maxRetries) {
        setRetryCount(prev => prev + 1);
        fn();
      }
    },
    [retryCount]
  );

  const resetRetry = useCallback(() => {
    setRetryCount(0);
  }, []);

  return {
    retryCount,
    retry,
    resetRetry,
    canRetry: retryCount < 3,
  };
}
