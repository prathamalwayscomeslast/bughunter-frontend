import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import type { PaginatedResponse } from "@/types/api";
import type {
    JobDetailResponse,
    JobListItem,
    JobQueryParams,
} from "@/types/job";
import { isActiveJob } from "@/types/job";

export function useJobs(params: JobQueryParams, enabled = true) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["jobs", params],
        queryFn: () =>
            api.get<PaginatedResponse<JobListItem>>("/jobs", {
                params,
            }),
        enabled: enabled && isAuthResolved && isAuthenticated,
        placeholderData: (previousData) => previousData,
    });
}

export function useJob(jobId: string | undefined, enabled = true) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["jobs", jobId],
        queryFn: () => api.get<JobDetailResponse>(`/jobs/${jobId}`),
        enabled:
            enabled &&
            isAuthResolved &&
            isAuthenticated &&
            typeof jobId === "string" &&
            jobId.length > 0,
        refetchInterval: (query) => {
            const job = query.state.data;
            if (!job) return false;
            return isActiveJob(job.status) ? 5_000 : false;
        },
    });
}