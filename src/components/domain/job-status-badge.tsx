import { Badge } from "@/components/ui/badge";
import type { JobStatus } from "@/types/job";

interface JobStatusBadgeProps {
    status: JobStatus;
}

const statusConfig: Record<
    JobStatus,
    { label: string; variant: "neutral" | "info" | "warning" | "success" | "danger" }
> = {
    received: {
        label: "Received",
        variant: "neutral",
    },
    reproducing: {
        label: "Reproducing",
        variant: "info",
    },
    localizing: {
        label: "Localizing",
        variant: "info",
    },
    fixing: {
        label: "Fixing",
        variant: "warning",
    },
    pr_opened: {
        label: "PR Opened",
        variant: "success",
    },
    failed: {
        label: "Failed",
        variant: "danger",
    },
    closed: {
        label: "Closed",
        variant: "outline",
    },
};

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
    const config = statusConfig[status];

    return <Badge variant={config.variant}>{config.label}</Badge>;
}