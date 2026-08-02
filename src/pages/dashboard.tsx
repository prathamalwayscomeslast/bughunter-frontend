import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
    FolderGit2,
    Wrench,
    CircleDot,
    GitPullRequest,
    ArrowRight,
} from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { RepoCard } from "@/components/domain/repo-card";
import { JobStatusBadge } from "@/components/domain/job-status-badge";
import { useDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";

function KpiCard({
                     label,
                     value,
                     icon,
                 }: {
    label: string;
    value: number;
    icon: ReactNode;
}) {
    return (
        <Card>
            <CardContent className="flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-text-faint">
                        {label}
                    </p>
                    <p className="mt-2 font-mono text-3xl font-semibold text-text">
                        {value}
                    </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-muted">
                    {icon}
                </div>
            </CardContent>
        </Card>
    );
}

export function DashboardPage() {
    const { data, isLoading, isError, refetch } = useDashboard();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Dashboard"
                    description="Monitor active repair workflows, repositories, issues, and pull requests."
                />

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-32 w-full rounded-xl" />
                    ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <Skeleton className="h-80 w-full rounded-xl" />
                    <Skeleton className="h-80 w-full rounded-xl" />
                    <Skeleton className="h-80 w-full rounded-xl" />
                    <Skeleton className="h-80 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="space-y-6">
                <PageHeader
                    title="Dashboard"
                    description="Monitor active repair workflows, repositories, issues, and pull requests."
                />
                <ErrorState onRetry={() => void refetch()} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Monitor active repair workflows, repositories, issues, and pull requests."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <KpiCard
                    label="Repositories"
                    value={data.summary.total_repositories}
                    icon={<FolderGit2 className="h-4 w-4" />}
                />
                <KpiCard
                    label="Active Jobs"
                    value={data.summary.active_jobs}
                    icon={<Wrench className="h-4 w-4" />}
                />
                <KpiCard
                    label="Open Issues"
                    value={data.summary.open_issues}
                    icon={<CircleDot className="h-4 w-4" />}
                />
                <KpiCard
                    label="Open PRs"
                    value={data.summary.open_pull_requests}
                    icon={<GitPullRequest className="h-4 w-4" />}
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader
                        title="Recent repositories"
                        description="Installed repositories with recent activity."
                        action={
                            <Link to="/repositories">
                                <Button variant="ghost" size="sm">
                                    View all
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        }
                    />
                    <CardContent>
                        {data.recent_repositories.length === 0 ? (
                            <EmptyState
                                icon={<FolderGit2 className="h-5 w-5" />}
                                title="No repositories yet"
                                description="Once repositories are connected, they will appear here."
                            />
                        ) : (
                            <div className="grid gap-4">
                                {data.recent_repositories.map((repository) => (
                                    <RepoCard key={repository.id} repository={repository} />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title="Recent jobs"
                        description="Latest repair attempts across your repositories."
                        action={
                            <Link to="/jobs">
                                <Button variant="ghost" size="sm">
                                    View all
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        }
                    />
                    <CardContent>
                        {data.recent_jobs.length === 0 ? (
                            <EmptyState
                                icon={<Wrench className="h-5 w-5" />}
                                title="No jobs yet"
                                description="New repair jobs will appear here as issues are processed."
                            />
                        ) : (
                            <div className="space-y-3">
                                {data.recent_jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="rounded-lg border border-border bg-surface-2 px-4 py-3"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <Link
                                                    to={`/jobs/${job.id}`}
                                                    className="font-mono text-sm font-semibold text-text hover:text-accent"
                                                >
                                                    {job.issue_title}
                                                </Link>
                                                <p className="mt-1 text-xs text-text-muted">
                                                    {job.repo_full_name}
                                                </p>
                                            </div>
                                            <JobStatusBadge status={job.status} />
                                        </div>
                                        <p className="mt-3 text-xs text-text-faint">
                                            Attempts: {job.attempt_count} • Updated{" "}
                                            {new Date(job.updated_at).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title="Recent issues"
                        description="Incoming repository issues tracked by BugHunter."
                        action={
                            <Link to="/issues">
                                <Button variant="ghost" size="sm">
                                    View all
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        }
                    />
                    <CardContent>
                        {data.recent_issues.length === 0 ? (
                            <EmptyState
                                icon={<CircleDot className="h-5 w-5" />}
                                title="No issues yet"
                                description="Tracked issues will appear here once repositories start reporting them."
                            />
                        ) : (
                            <div className="space-y-3">
                                {data.recent_issues.map((issue) => (
                                    <div
                                        key={issue.id}
                                        className="rounded-lg border border-border bg-surface-2 px-4 py-3"
                                    >
                                        <p className="font-mono text-sm font-semibold text-text">
                                            #{issue.issue_number} — {issue.title}
                                        </p>
                                        <p className="mt-1 text-xs text-text-muted">
                                            {issue.repo_full_name}
                                        </p>
                                        <p className="mt-3 text-xs text-text-faint">
                                            Job status: {issue.bughunter_job_status ?? "Not started"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title="Recent pull requests"
                        description="Repair pull requests opened by BugHunter."
                        action={
                            <Link to="/pull-requests">
                                <Button variant="ghost" size="sm">
                                    View all
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        }
                    />
                    <CardContent>
                        {data.recent_pull_requests.length === 0 ? (
                            <EmptyState
                                icon={<GitPullRequest className="h-5 w-5" />}
                                title="No pull requests yet"
                                description="BugHunter-created pull requests will appear here."
                            />
                        ) : (
                            <div className="space-y-3">
                                {data.recent_pull_requests.map((pr) => (
                                    <a
                                        key={pr.id}
                                        href={`https://github.com/${pr.repo_full_name}/pull/${pr.pr_number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-lg border border-border bg-surface-2 px-4 py-3 transition-colors hover:border-accent/20"
                                    >
                                        <p className="font-mono text-sm font-semibold text-text">
                                            PR #{pr.pr_number} — {pr.title}
                                        </p>
                                        <p className="mt-1 text-xs text-text-muted">
                                            {pr.repo_full_name}
                                        </p>
                                        <p className="mt-3 text-xs text-text-faint">
                                            Status: {pr.status} • Opened{" "}
                                            {new Date(pr.opened_at).toLocaleString()}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}