import { useMemo, useState } from "react";
import { GitPullRequest } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { usePullRequests } from "@/hooks/use-pull-requests";
import type { PullRequestQueryParams, PullRequestStatus } from "@/types/pull-request";
import { PrRow } from "@/components/domain/pr-row";

export function PullRequestsPage() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<PullRequestStatus | "">("");

    const params = useMemo<PullRequestQueryParams>(
        () => ({
            page,
            page_size: 10,
            status: status || undefined,
            sort: "updated_at",
            order: "desc",
        }),
        [page, status],
    );

    const { data, isLoading, isError, refetch } = usePullRequests(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Pull Requests"
                description="Review pull requests opened by BugHunter across connected repositories."
            />

            <Card>
                <CardHeader
                    title="Filters"
                    description="Narrow results by pull request state."
                />
                <CardContent>
                    <select
                        value={status}
                        onChange={(event) => {
                            setPage(1);
                            setStatus(event.target.value as PullRequestStatus | "");
                        }}
                        className="h-11 w-full max-w-xs rounded-lg border border-border bg-surface-2 px-4 text-sm text-text outline-none focus:border-accent/40"
                    >
                        <option value="">All statuses</option>
                        <option value="open">Open</option>
                        <option value="merged">Merged</option>
                        <option value="closed">Closed</option>
                    </select>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    title="Repair pull requests"
                    description="Pull requests created from completed repair workflows."
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
                                icon={<GitPullRequest className="h-5 w-5" />}
                                title="No pull requests found"
                                description="There are no pull requests matching your current filters."
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="border-b border-border bg-surface-2/80">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Pull request
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Source issue
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Source job
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Updated
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {data.items.map((pullRequest) => (
                                        <PrRow key={pullRequest.id} pullRequest={pullRequest} />
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