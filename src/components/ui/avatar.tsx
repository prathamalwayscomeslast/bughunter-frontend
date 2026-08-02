import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    name?: string | null;
    className?: string;
    size?: AvatarSize;
}

const sizeClasses: Record<AvatarSize, string> = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
};

function getInitials(name?: string | null) {
    if (!name) return "BH";

    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "BH";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function Avatar({
                           src,
                           alt,
                           name,
                           className,
                           size = "md",
                       }: AvatarProps) {
    const [hasImageError, setHasImageError] = useState(false);

    const initials = useMemo(() => getInitials(name), [name]);
    const shouldShowImage = !!src && !hasImageError;

    return (
        <div
            className={cn(
                "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2 text-text-muted",
                "font-mono font-medium",
                sizeClasses[size],
                className,
            )}
            aria-label={alt ?? name ?? "User avatar"}
        >
            {shouldShowImage ? (
                <img
                    src={src}
                    alt={alt ?? name ?? "User avatar"}
                    className="h-full w-full object-cover"
                    onError={() => setHasImageError(true)}
                />
            ) : (
                <span aria-hidden="true">{initials}</span>
            )}
        </div>
    );
}