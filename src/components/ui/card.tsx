import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title?: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border border-border bg-surface shadow-sm",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({
                               title,
                               description,
                               action,
                               className,
                               children,
                               ...props
                           }: CardHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-start justify-between gap-4 border-b border-border px-5 py-4",
                className,
            )}
            {...props}
        >
            <div className="min-w-0">
                {title ? (
                    <h3 className="font-mono text-sm font-semibold tracking-tight text-text">
                        {title}
                    </h3>
                ) : null}
                {description ? (
                    <p className="mt-1 text-sm text-text-muted">{description}</p>
                ) : null}
                {children}
            </div>

            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
}

export function CardContent({
                                children,
                                className,
                                ...props
                            }: CardContentProps) {
    return (
        <div className={cn("px-5 py-4", className)} {...props}>
            {children}
        </div>
    );
}