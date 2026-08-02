import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import type {
    DashboardResponse,
    DashboardSummaryResponse,
} from "@/types/dashboard";

export function useDashboard(enabled = true) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["dashboard"],
        queryFn: () => api.get<DashboardResponse>("/dashboard"),
        enabled: enabled && isAuthResolved && isAuthenticated,
    });
}

export function useDashboardSummary(enabled = true) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["dashboard", "summary"],
        queryFn: () => api.get<DashboardSummaryResponse>("/dashboard/summary"),
        enabled: enabled && isAuthResolved && isAuthenticated,
    });
}