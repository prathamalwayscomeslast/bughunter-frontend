import type { RepositoryPreviewItem } from "@/types/repository";
import type { JobPreviewItem } from "@/types/job";
import type { IssuePreviewItem } from "@/types/issue";
import type { PullRequestPreviewItem } from "@/types/pull-request";

export interface DashboardSummaryResponse {
    total_repositories: number;
    active_jobs: number;
    open_pull_requests: number;
    open_issues: number;
}

export interface DashboardResponse {
    summary: DashboardSummaryResponse;
    recent_repositories: RepositoryPreviewItem[];
    recent_jobs: JobPreviewItem[];
    recent_issues: IssuePreviewItem[];
    recent_pull_requests: PullRequestPreviewItem[];
}