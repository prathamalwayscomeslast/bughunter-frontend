import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosError,
} from "axios";
import { auth } from "@/lib/firebase";
import type { ApiError } from "@/types/api";

// ------------------------------------------------------------------
// Axios instance
// ------------------------------------------------------------------

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
    timeout: 30_000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ------------------------------------------------------------------
// Request interceptor — attach Firebase ID token
// ------------------------------------------------------------------

apiClient.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;

        if (user) {
            // forceRefresh=false: returns cached token unless it expires
            // within the next 5 minutes, in which case Firebase auto-refreshes
            const token = await user.getIdToken(false);
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

// ------------------------------------------------------------------
// Response interceptor — normalize errors
// ------------------------------------------------------------------

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;

        // Token expired mid-session (Firebase tokens last 1h).
        // Force a refresh and retry the original request exactly once.
        if (status === 401 && auth.currentUser) {
            try {
                const freshToken = await auth.currentUser.getIdToken(true);
                if (error.config) {
                    error.config.headers.Authorization = `Bearer ${freshToken}`;
                    return apiClient.request(error.config);
                }
            } catch {
                // If refresh fails, the user's session is truly invalid.
                // Let AuthContext handle the sign-out.
                await auth.signOut();
            }
        }

        // Normalize into ApiError shape
        const normalized: ApiError = {
            detail:
                (error.response?.data as { detail?: string })?.detail ??
                error.message ??
                "An unexpected error occurred.",
            status: status ?? 0,
        };

        return Promise.reject(normalized);
    },
);

// ------------------------------------------------------------------
// Typed helper methods
// ------------------------------------------------------------------

export const api = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.get<T>(url, config).then((res) => res.data),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.post<T>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.put<T>(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        apiClient.patch<T>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;