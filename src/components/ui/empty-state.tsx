import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
                               icon,
                               title,
                               description,
                               action,
                               className,
                           }: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center",
                className,
            )}
        >
            {icon ? (
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-muted">
                    {icon}
                </div>
            ) : null}

            <h3 className="font-mono text-base font-semibold tracking-tight text-text">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-sm text-text-muted">{description}</p>

            {action ? <div className="mt-6">{action}</div> : null}
        </div>
    );
}