import type { BasePaginationParams, SortOrder } from "@/types/api";

export type RepositoryVisibility = "public" | "private";

export interface RepositoryListItem {
    id: string;
    github_repo_id: number;
    installation_id: number;
    full_name: string;
    owner: string;
    name: string;
    visibility: RepositoryVisibility;
    html_url: string;
    active_issue_count: number;
    active_job_count: number;
    open_pr_count: number;
    last_activity_at: string | null;
    installed_at: string;
}

export interface RepositoryPreviewItem {
    id: string;
    full_name: string;
    active_job_count: number;
    open_pr_count: number;
    last_activity_at: string | null;
}

export interface RepositoryQueryParams extends BasePaginationParams {
    search?: string;
    visibility?: RepositoryVisibility;
    sort?: "installed_at" | "last_activity_at" | "full_name";
    order?: SortOrder;
}