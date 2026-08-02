import { useMemo, useState } from "react";
import { Wrench } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useJobs } from "@/hooks/use-jobs";
import type { JobQueryParams, JobStatus } from "@/types/job";
import { JobRow } from "@/components/domain/job-row";

export function JobsPage() {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<JobStatus | "">("");
    const [activeOnly, setActiveOnly] = useState(false);

    const params = useMemo<JobQueryParams>(
        () => ({
            page,
            page_size: 10,
            status: status || undefined,
            active_only: activeOnly || undefined,
            sort: "updated_at",
            order: "desc",
        }),
        [page, status, activeOnly],
    );

    const { data, isLoading, isError, refetch } = useJobs(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Jobs"
                description="Track active and completed repair workflows across your repositories."
            />

            <Card>
                <CardHeader
                    title="Filters"
                    description="Narrow job results by status or only show active workflows."
                />
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-[220px_auto] md:items-center">
                        <select
                            value={status}
                            onChange={(event) => {
                                setPage(1);
                                setStatus(event.target.value as JobStatus | "");
                            }}
                            className="h-11 rounded-lg border border-border bg-surface-2 px-4 text-sm text-text outline-none focus:border-accent/40"
                        >
                            <option value="">All statuses</option>
                            <option value="received">Received</option>
                            <option value="reproducing">Reproducing</option>
                            <option value="localizing">Localizing</option>
                            <option value="fixing">Fixing</option>
                            <option value="pr_opened">PR Opened</option>
                            <option value="failed">Failed</option>
                            <option value="closed">Closed</option>
                        </select>

                        <label className="inline-flex items-center gap-3 text-sm text-text-muted">
                            <input
                                type="checkbox"
                                checked={activeOnly}
                                onChange={(event) => {
                                    setPage(1);
                                    setActiveOnly(event.target.checked);
                                }}
                                className="h-4 w-4 rounded border-border bg-surface-2 text-accent focus:ring-0"
                            />
                            Show only active jobs
                        </label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    title="Repair jobs"
                    description="Each job tracks a single issue repair attempt lifecycle."
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
                                icon={<Wrench className="h-5 w-5" />}
                                title="No jobs found"
                                description="There are no repair jobs matching your current filters."
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
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Verification
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Attempts
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            PR
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Updated
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {data.items.map((job) => (
                                        <JobRow key={job.id} job={job} />
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