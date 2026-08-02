import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { useAuth } from "@/context/auth-context";
import type { MeResponse } from "@/types/me";

export function useMe(enabled = true) {
    const { isAuthenticated, isAuthResolved } = useAuth();

    return useQuery({
        queryKey: ["me"],
        queryFn: () => api.get<MeResponse>("/me"),
        enabled: enabled && isAuthResolved && isAuthenticated,
    });
}