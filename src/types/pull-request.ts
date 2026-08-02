import type { BasePaginationParams, SortOrder } from "@/types/api";

export type PullRequestStatus = "open" | "merged" | "closed";

export interface PullRequestListItem {
    id: string;
    github_pr_id: number;
    pr_number: number;
    title: string;
    repo_id: string;
    repo_full_name: string;
    html_url: string;
    status: PullRequestStatus;
    source_issue_number: number | null;
    source_job_id: string | null;
    opened_at: string;
    updated_at: string;
}

export interface PullRequestPreviewItem {
    id: string;
    pr_number: number;
    title: string;
    repo_full_name: string;
    status: PullRequestStatus;
    opened_at: string;
}

export interface PullRequestQueryParams extends BasePaginationParams {
    repo_id?: string;
    status?: PullRequestStatus;
    sort?: "opened_at" | "updated_at";
    order?: SortOrder;
}