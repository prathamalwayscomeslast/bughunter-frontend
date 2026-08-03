import { Badge } from "@/components/ui/badge";
import type { VerificationStatus } from "@/types/job";

interface VerificationBadgeProps {
    status: VerificationStatus;
}

const statusConfig: Record<
    VerificationStatus,
    { label: string; variant: "neutral" | "info" | "warning" | "success" | "danger" }
> = {
    skipped: {
        label: "Skipped",
        variant: "neutral",
    },
    pending: {
        label: "Pending",
        variant: "info",
    },
    passed: {
        label: "Passed",
        variant: "success",
    },
    failed: {
        label: "Failed",
        variant: "danger",
    },
    not_attempted: {
        label: "Not Attempted",
        variant: "neutral",
    },
};

export function VerificationBadge({ status }: VerificationBadgeProps) {
    const config = statusConfig[status];

    return <Badge variant={config.variant}>{config.label}</Badge>;
}