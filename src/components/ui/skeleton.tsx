import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md bg-surface-3",
                className,
            )}
            {...props}
        />
    );
}