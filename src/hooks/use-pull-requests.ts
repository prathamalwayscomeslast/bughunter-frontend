import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import type { PaginatedResponse } from "@/types/api";
import type {
    PullRequestListItem,
    PullRequestQueryParams,
} from "@/types/pull-request";

export function usePullRequests(
    params: PullRequestQueryParams,
    enabled = true,
) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["pull-requests", params],
        queryFn: () =>
            api.get<PaginatedResponse<PullRequestListItem>>("/pull-requests", {
                params,
            }),
        enabled: enabled && isAuthResolved && isAuthenticated,
        placeholderData: (previousData) => previousData,
    });
}