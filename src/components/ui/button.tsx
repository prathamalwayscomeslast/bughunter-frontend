import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        "bg-accent text-black hover:bg-accent-hover disabled:bg-accent-dim disabled:text-black/70",
    secondary:
        "border border-border bg-surface-2 text-text hover:bg-surface-3 disabled:text-text-faint",
    ghost:
        "bg-transparent text-text-muted hover:bg-surface-2 hover:text-text disabled:text-text-faint",
    danger:
        "bg-error text-white hover:opacity-90 disabled:bg-error/60 disabled:text-white/70",
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
};

export function Button({
                           children,
                           className,
                           variant = "primary",
                           size = "md",
                           isLoading = false,
                           disabled,
                           type = "button",
                           ...props
                       }: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150",
                "focus-visible:outline-none",
                "disabled:cursor-not-allowed",
                "font-mono tracking-tight",
                variantClasses[variant],
                sizeClasses[size],
                className,
            )}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}