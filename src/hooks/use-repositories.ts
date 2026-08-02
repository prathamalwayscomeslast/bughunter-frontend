import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import type { PaginatedResponse } from "@/types/api";
import type {
    RepositoryListItem,
    RepositoryQueryParams,
} from "@/types/repository";

export function useRepositories(
    params: RepositoryQueryParams,
    enabled = true,
) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["repositories", params],
        queryFn: () =>
            api.get<PaginatedResponse<RepositoryListItem>>("/repositories", {
                params,
            }),
        enabled: enabled && isAuthResolved && isAuthenticated,
        placeholderData: (previousData) => previousData,
    });
}