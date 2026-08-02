import { FolderGit2, GitPullRequest, CircleDot } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { RepositoryPreviewItem } from "@/types/repository";

interface RepoCardProps {
    repository: RepositoryPreviewItem;
}

function formatRelativeDate(date: string | null) {
    if (!date) return "No recent activity";

    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Updated just now";
    if (minutes < 60) return `Updated ${minutes}m ago`;
    if (hours < 24) return `Updated ${hours}h ago`;
    return `Updated ${days}d ago`;
}

export function RepoCard({ repository }: RepoCardProps) {
    return (
        <Card className="hover:border-accent/20 transition-colors">
            <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-text-muted">
                        <FolderGit2 className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-mono text-sm font-semibold text-text">
                            {repository.full_name}
                        </p>
                        <p className="mt-1 text-xs text-text-muted">
                            {formatRelativeDate(repository.last_activity_at)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                        <div className="flex items-center gap-2 text-text-muted">
                            <CircleDot className="h-3.5 w-3.5" />
                            <span className="text-xs uppercase tracking-wide">Jobs</span>
                        </div>
                        <p className="mt-1 font-mono text-lg font-semibold text-text">
                            {repository.active_job_count}
                        </p>
                    </div>

                    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                        <div className="flex items-center gap-2 text-text-muted">
                            <GitPullRequest className="h-3.5 w-3.5" />
                            <span className="text-xs uppercase tracking-wide">Open PRs</span>
                        </div>
                        <p className="mt-1 font-mono text-lg font-semibold text-text">
                            {repository.open_pr_count}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}