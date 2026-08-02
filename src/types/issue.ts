import type { BasePaginationParams, SortOrder } from "@/types/api";

export type IssueStatus = "open" | "closed";

export interface IssueListItem {
    id: string;
    github_issue_id: number;
    issue_number: number;
    title: string;
    repo_id: string;
    repo_full_name: string;
    html_url: string;
    status: IssueStatus;
    bughunter_job_status: string | null;
    verification_status: string | null;
    created_at: string;
    updated_at: string;
}

export interface IssuePreviewItem {
    id: string;
    issue_number: number;
    title: string;
    repo_full_name: string;
    bughunter_job_status: string | null;
    created_at: string;
}

export interface IssueQueryParams extends BasePaginationParams {
    repo_id?: string;
    status?: IssueStatus;
    bughunter_job_status?: string;
    sort?: "created_at" | "updated_at";
    order?: SortOrder;
}