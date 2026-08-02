import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorState({
                               title = "Something went wrong",
                               description = "We couldn’t load this data right now. Please try again.",
                               onRetry,
                               className,
                           }: ErrorStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-xl border border-red-500/20 bg-error-dim/40 px-6 py-14 text-center",
                className,
            )}
            role="alert"
        >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-black/20 text-error">
                <AlertTriangle className="h-5 w-5" />
            </div>

            <h3 className="font-mono text-base font-semibold tracking-tight text-text">
                {title}
            </h3>

            <p className="mt-2 max-w-md text-sm text-text-muted">{description}</p>

            {onRetry ? (
                <div className="mt-6">
                    <Button variant="secondary" onClick={onRetry}>
                        Retry
                    </Button>
                </div>
            ) : null}
        </div>
    );
}