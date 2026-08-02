import { useParams } from "react-router-dom";
import { ExternalLink, GitPullRequest, Wrench, Microscope } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { JobStatusBadge } from "@/components/domain/job-status-badge";
import { VerificationBadge } from "@/components/domain/verification-badge";
import { useJob } from "@/hooks/use-jobs";

function DetailItem({
                        label,
                        value,
                    }: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border border-border bg-surface-2 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">{label}</p>
            <div className="mt-2 text-sm text-text">{value}</div>
        </div>
    );
}

export function JobDetailPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const { data, isLoading, isError, refetch } = useJob(jobId);

    if (!jobId) {
        return (
            <div className="space-y-6">
                <PageHeader title="Job Detail" description="Inspect an individual repair workflow." />
                <EmptyState
                    icon={<Wrench className="h-5 w-5" />}
                    title="Missing job identifier"
                    description="No job id was provided in the route."
                />
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <PageHeader title="Job Detail" description="Inspect an individual repair workflow." />
                <Skeleton className="h-40 w-full rounded-xl" />
                <div className="grid gap-6 xl:grid-cols-2">
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="space-y-6">
                <PageHeader title="Job Detail" description="Inspect an individual repair workflow." />
                <ErrorState onRetry={() => void refetch()} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title={`Job #${data.issue_number}`}
                description={data.issue_title}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <DetailItem label="Status" value={<JobStatusBadge status={data.status} />} />
                <DetailItem
                    label="Verification"
                    value={<VerificationBadge status={data.verification_status} />}
                />
                <DetailItem
                    label="Attempts"
                    value={
                        <span className="font-mono">
              {data.attempt_count}/{data.max_attempts}
            </span>
                    }
                />
                <DetailItem
                    label="Repository"
                    value={<span className="font-mono">{data.repo_full_name}</span>}
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Card>
                    <CardHeader
                        title="Issue context"
                        description="Original issue content and associated metadata."
                    />
                    <CardContent className="space-y-4">
                        <DetailItem label="Issue number" value={`#${data.issue_number}`} />
                        <DetailItem
                            label="Created at"
                            value={new Date(data.created_at).toLocaleString()}
                        />
                        <DetailItem
                            label="Updated at"
                            value={new Date(data.updated_at).toLocaleString()}
                        />
                        <div className="rounded-lg border border-border bg-surface-2 px-4 py-3">
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                                Issue body
                            </p>
                            <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-text-muted">
                {data.issue_body || "No issue body provided."}
              </pre>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader
                        title="Repair analysis"
                        description="Diagnosis, verification result, and pull request output."
                    />
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border border-border bg-surface-2 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <Microscope className="h-4 w-4 text-text-muted" />
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                                    Diagnosis
                                </p>
                            </div>
                            <pre className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-text-muted">
                {data.diagnosis || "No diagnosis available yet."}
              </pre>
                        </div>

                        <div className="rounded-lg border border-border bg-surface-2 px-4 py-3">
                            <div className="flex items-center gap-2">
                                <GitPullRequest className="h-4 w-4 text-text-muted" />
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                                    Pull request
                                </p>
                            </div>

                            <div className="mt-3">
                                {data.pr_url ? (
                                    <a
                                        href={data.pr_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover"
                                    >
                                        {data.pr_number ? `Open PR #${data.pr_number}` : "Open pull request"}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                ) : (
                                    <p className="text-sm text-text-muted">
                                        No pull request has been opened for this job yet.
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}