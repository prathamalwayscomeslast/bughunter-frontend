import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

import { JobStatusBadge } from "@/components/domain/job-status-badge";
import { VerificationBadge } from "@/components/domain/verification-badge";
import type { JobListItem } from "@/types/job";

interface JobRowProps {
    job: JobListItem;
}

function formatDate(date: string) {
    return new Date(date).toLocaleString();
}

export function JobRow({ job }: JobRowProps) {
    return (
        <tr className="border-b border-border last:border-0">
            <td className="px-4 py-4 align-top">
                <div className="space-y-1">
                    <Link
                        to={`/jobs/${job.id}`}
                        className="font-mono text-sm font-semibold text-text hover:text-accent"
                    >
                        #{job.issue_number} — {job.issue_title}
                    </Link>
                    <p className="text-xs text-text-muted">{job.repo_full_name}</p>
                </div>
            </td>

            <td className="px-4 py-4 align-top">
                <JobStatusBadge status={job.status} />
            </td>

            <td className="px-4 py-4 align-top">
                <VerificationBadge status={job.verification_status} />
            </td>

            <td className="px-4 py-4 align-top">
                <div className="font-mono text-sm text-text">
                    {job.attempt_count}/{job.max_attempts}
                </div>
            </td>

            <td className="px-4 py-4 align-top">
                {job.pr_url ? (
                    <a
                        href={job.pr_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover"
                    >
                        PR #{job.pr_number}
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                ) : (
                    <span className="text-sm text-text-faint">—</span>
                )}
            </td>

            <td className="px-4 py-4 align-top">
                <span className="text-sm text-text-muted">{formatDate(job.updated_at)}</span>
            </td>
        </tr>
    );
}