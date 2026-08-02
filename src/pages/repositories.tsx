import { useMemo, useState } from "react";
import { ExternalLink, FolderGit2, Search } from "lucide-react";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useRepositories } from "@/hooks/use-repositories";
import type { RepositoryQueryParams } from "@/types/repository";

export function RepositoriesPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [visibility, setVisibility] = useState<"public" | "private" | "">("");

    const params = useMemo<RepositoryQueryParams>(
        () => ({
            page,
            page_size: 10,
            search: search || undefined,
            visibility: visibility || undefined,
            sort: "last_activity_at",
            order: "desc",
        }),
        [page, search, visibility],
    );

    const { data, isLoading, isError, refetch } = useRepositories(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Repositories"
                description="Browse repositories connected to your BugHunter installation."
            />

            <Card>
                <CardHeader
                    title="Filters"
                    description="Search repositories and narrow results by visibility."
                />
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                        <label className="relative block">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-faint" />
                            <input
                                value={search}
                                onChange={(event) => {
                                    setPage(1);
                                    setSearch(event.target.value);
                                }}
                                placeholder="Search by repository name..."
                                className="h-11 w-full rounded-lg border border-border bg-surface-2 pl-10 pr-4 text-sm text-text outline-none placeholder:text-text-faint focus:border-accent/40"
                            />
                        </label>

                        <select
                            value={visibility}
                            onChange={(event) => {
                                setPage(1);
                                setVisibility(event.target.value as "public" | "private" | "");
                            }}
                            className="h-11 rounded-lg border border-border bg-surface-2 px-4 text-sm text-text outline-none focus:border-accent/40"
                        >
                            <option value="">All visibility</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader
                    title="Connected repositories"
                    description="Repositories available to the current authenticated user."
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
                                icon={<FolderGit2 className="h-5 w-5" />}
                                title="No repositories found"
                                description="Try adjusting your filters or connect a repository to begin."
                            />
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="border-b border-border bg-surface-2/80">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Repository
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Visibility
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Active jobs
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Open PRs
                                        </th>
                                        <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-faint">
                                            Last activity
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {data.items.map((repository) => (
                                        <tr key={repository.id} className="border-b border-border last:border-0">
                                            <td className="px-4 py-4 align-top">
                                                <div className="space-y-1">
                                                    <a
                                                        href={repository.html_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-text hover:text-accent"
                                                    >
                                                        {repository.full_name}
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                    </a>
                                                    <p className="text-xs text-text-muted">
                                                        Installed {new Date(repository.installed_at).toLocaleString()}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-text-muted">
                                                {repository.visibility}
                                            </td>

                                            <td className="px-4 py-4 font-mono text-sm text-text">
                                                {repository.active_job_count}
                                            </td>

                                            <td className="px-4 py-4 font-mono text-sm text-text">
                                                {repository.open_pr_count}
                                            </td>

                                            <td className="px-4 py-4 text-sm text-text-muted">
                                                {repository.last_activity_at
                                                    ? new Date(repository.last_activity_at).toLocaleString()
                                                    : "No activity"}
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