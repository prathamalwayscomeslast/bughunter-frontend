import { QueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/types/api";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Data is considered fresh for 30 seconds.
            // Within this window, navigating back to a page
            // won't fire a new network request.
            staleTime: 30_000,

            // Keep data in cache for 5 minutes after
            // the last component using it unmounts.
            gcTime: 5 * 60 * 1_000,

            // Only retry on genuine server errors (5xx).
            // Never retry on 4xx — a 404 or 403 won't
            // fix itself on retry, so don't hammer the server.
            retry: (failureCount, error) => {
                const apiError = error as unknown as ApiError;
                if (apiError.status >= 400 && apiError.status < 500) {
                    return false;
                }
                return failureCount < 2;
            },

            // Don't refetch just because the user switched browser tabs.
            // The dashboard data doesn't change that fast.
            refetchOnWindowFocus: false,

            // Do refetch when the network comes back online
            // (handles laptop lid close/open scenarios).
            refetchOnReconnect: true,
        },
        mutations: {
            retry: false,
        },
    },
});