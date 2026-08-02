import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { PullRequestListItem, PullRequestStatus } from "@/types/pull-request";

interface PrRowProps {
    pullRequest: PullRequestListItem;
}

function formatDate(date: string) {
    return new Date(date).toLocaleString();
}

function getPrStatusVariant(
    status: PullRequestStatus,
): "info" | "success" | "neutral" {
    switch (status) {
        case "open":
            return "info";
        case "merged":
            return "success";
        case "closed":
            return "neutral";
    }
}

export function PrRow({ pullRequest }: PrRowProps) {
    return (
        <tr className="border-b border-border last:border-0">
            <td className="px-4 py-4 align-top">
                <div className="space-y-1">
                    <a
                        href={pullRequest.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-text hover:text-accent"
                    >
                        PR #{pullRequest.pr_number} — {pullRequest.title}
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <p className="text-xs text-text-muted">{pullRequest.repo_full_name}</p>
                </div>
            </td>

            <td className="px-4 py-4 align-top">
                <Badge variant={getPrStatusVariant(pullRequest.status)}>
                    {pullRequest.status}
                </Badge>
            </td>

            <td className="px-4 py-4 align-top">
        <span className="text-sm text-text-muted">
          {pullRequest.source_issue_number
              ? `#${pullRequest.source_issue_number}`
              : "—"}
        </span>
            </td>

            <td className="px-4 py-4 align-top">
        <span className="text-sm text-text-muted">
          {pullRequest.source_job_id ?? "—"}
        </span>
            </td>

            <td className="px-4 py-4 align-top">
        <span className="text-sm text-text-muted">
          {formatDate(pullRequest.updated_at)}
        </span>
            </td>
        </tr>
    );
}