import type { BasePaginationParams, SortOrder } from "@/types/api";

export type JobStatus =
    | "received"
    | "reproducing"
    | "localizing"
    | "fixing"
    | "pr_opened"
    | "failed"
    | "closed";

export type VerificationStatus =
    | "skipped"
    | "pending"
    | "passed"
    | "failed"
    | "not_attempted";

export const ACTIVE_JOB_STATUSES: JobStatus[] = [
    "received",
    "reproducing",
    "localizing",
    "fixing",
];

export function isActiveJob(status: JobStatus): boolean {
    return ACTIVE_JOB_STATUSES.includes(status);
}

export interface JobListItem {
    id: string;
    repo_id: string;
    repo_full_name: string;
    installation_id: number;
    issue_number: number;
    issue_title: string;
    status: JobStatus;
    verification_status: VerificationStatus;
    attempt_count: number;
    max_attempts: number;
    pr_number: number | null;
    pr_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface JobDetailResponse extends JobListItem {
    issue_body: string;
    diagnosis: string | null;
}

export interface JobPreviewItem {
    id: string;
    issue_title: string;
    repo_full_name: string;
    status: JobStatus;
    attempt_count: number;
    updated_at: string;
}

export interface JobQueryParams extends BasePaginationParams {
    repo_id?: string;
    status?: JobStatus;
    active_only?: boolean;
    sort?: "created_at" | "updated_at";
    order?: SortOrder;
}