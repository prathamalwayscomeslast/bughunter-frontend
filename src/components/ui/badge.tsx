import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeVariant =
    | "neutral"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
    neutral:
        "border border-border bg-surface-2 text-text-muted",
    success:
        "border border-accent/20 bg-accent-faint text-accent",
    info:
        "border border-sky-500/20 bg-sky-950/40 text-sky-400",
    warning:
        "border border-amber-500/20 bg-warning-dim text-warning",
    danger:
        "border border-red-500/20 bg-error-dim text-error",
    outline:
        "border border-border bg-transparent text-text-muted",
};

export function Badge({
                          children,
                          className,
                          variant = "neutral",
                          ...props
                      }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
                "font-mono uppercase tracking-wide",
                variantClasses[variant],
                className,
            )}
            {...props}
        >
      {children}
    </span>
    );
}