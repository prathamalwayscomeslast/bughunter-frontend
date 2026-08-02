import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({
                               title,
                               description,
                               actions,
                               className,
                           }: PageHeaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between",
                className,
            )}
        >
            <div className="min-w-0">
                <h1 className="font-mono text-2xl font-semibold tracking-tight text-text">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-2 max-w-2xl text-sm text-text-muted">
                        {description}
                    </p>
                ) : null}
            </div>

            {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
    );
}