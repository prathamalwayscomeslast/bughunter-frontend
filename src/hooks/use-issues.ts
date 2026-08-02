import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import type { PaginatedResponse } from "@/types/api";
import type { IssueListItem, IssueQueryParams } from "@/types/issue";

export function useIssues(params: IssueQueryParams, enabled = true) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["issues", params],
        queryFn: () =>
            api.get<PaginatedResponse<IssueListItem>>("/issues", {
                params,
            }),
        enabled: enabled && isAuthResolved && isAuthenticated,
        placeholderData: (previousData) => previousData,
    });
}