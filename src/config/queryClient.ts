/**
 * React Query client configuration.
 * Provides centralized query client with default options.
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Create and configure the QueryClient with sensible defaults.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data is considered fresh (won't refetch)
      staleTime: 5 * 60 * 1000, // 5 minutes
      // How long unused/inactive cache data remains in memory
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      // Retry failed queries
      retry: 1,
      // Don't refetch on window focus in development
      refetchOnWindowFocus: import.meta.env.PROD,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations
      retry: 0,
    },
  },
});

/**
 * Query keys factory for consistent cache key management.
 * Use these keys when querying and invalidating cache.
 */
export const queryKeys = {
  // Auth keys
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },

  // User keys
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (params?: unknown) =>
      [...queryKeys.users.lists(), params] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: (id: string) => [...queryKeys.users.all, 'profile', id] as const,
  },

  // Reports keys
  reports: {
    all: ['reports'] as const,
    lists: () => [...queryKeys.reports.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.reports.lists(), params] as const,
    details: () => [...queryKeys.reports.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.reports.details(), id] as const,
  },

  // Notifications keys
  notifications: {
    all: ['notifications'] as const,
    lists: () => [...queryKeys.notifications.all, 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      [...queryKeys.notifications.lists(), params] as const,
    unread: () => [...queryKeys.notifications.all, 'unread'] as const,
  },

  // Settings keys
  settings: {
    all: ['settings'] as const,
  },
} as const;
