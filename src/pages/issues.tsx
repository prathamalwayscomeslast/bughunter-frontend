import { useMemo, useState } from "react";
import { CircleDot, ExternalLink } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useIssues } from "@/hooks/use-issues";
import type { IssueQueryParams, IssueStatus } from "@/types/issue";

export function IssuesPage() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<IssueStatus | "">("");

    const params = useMemo<IssueQueryParams>(
        () => ({
            page,
            page_size: 10,
            status: status || undefined,
            sort: "updated_at",
            order: "desc",
        }),
        [page, status],
    );

    const { data, isLoading, isError, refetch } = useIssues(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Issues"
                description="Track repository issues and their corresponding BugHunter workflow state."
            />

            <Card>
                <CardHeader
                    title="Filters"
                    description="Narrow issue results by GitHub issue state."
                />
                <CardContent>
                    <select
                        value={status}
                        onChange={(event) => {
                            setPage(1);
                            setStatus(event.target.value as IssueStatus | "");
                        }}
                        className="h-11 w-full max-w-xs rounded-lg border border-border bg-surface-2 px-4 text-sm text-text outline-none focus:border-accent/40"
                    >
                        <option value="">All statuses</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    title="Tracked issues"
                    description="GitHub issues visible to the authenticated user."
                />
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="space-y-3 p-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-20 w-full rounded-lg" />
                            ))}
                        </div>
                    ) : isError || !data ? (
                        <div className="p-5">
                            <ErrorState onRetry={() => void refetch()} />
                        </div>
                    ) : data.items.length === 0 ? (
                        <div className="p-5">
                            <EmptyState
                                icon={<CircleDot className="h-5 w-5" />}
                                title="No issues found"
                                description="There are no issues matching your current filters."
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="border-b border-border bg-surface-2/80">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Issue
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Repository
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Job status
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Verification
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Updated
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {data.items.map((issue) => (
                                        <tr key={issue.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-4 align-top">
                                                <a
                                                    href={issue.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-text hover:text-accent"
                                                >
                                                    #{issue.issue_number} — {issue.title}
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                </a>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-text-muted">
                                                {issue.repo_full_name}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-text-muted">{issue.status}</td>

                                            <td className="px-4 py-4 text-sm text-text-muted">
                                                {issue.bughunter_job_status ?? "Not started"}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-text-muted">
                                                {issue.verification_status ?? "—"}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-text-muted">
                                                {new Date(issue.updated_at).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination meta={data.meta} onPageChange={setPage} />
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}