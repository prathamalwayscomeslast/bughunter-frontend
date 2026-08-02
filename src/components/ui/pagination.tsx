import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/cn";
import type { PaginationMeta } from "@/types/api";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    className?: string;
}

function buildVisiblePages(currentPage: number, totalPages: number): number[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);
    pages.add(currentPage);

    if (currentPage - 1 > 1) pages.add(currentPage - 1);
    if (currentPage + 1 < totalPages) pages.add(currentPage + 1);
    if (currentPage - 2 > 1) pages.add(currentPage - 2);
    if (currentPage + 2 < totalPages) pages.add(currentPage + 2);

    return Array.from(pages).sort((a, b) => a - b);
}

export function Pagination({
                               meta,
                               onPageChange,
                               className,
                           }: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(meta.total / meta.page_size));
    const currentPage = meta.page;
    const pages = buildVisiblePages(currentPage, totalPages);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Pagination"
            className={cn(
                "flex flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between",
                className,
            )}
        >
            <p className="text-sm text-text-muted">
                Page <span className="font-medium text-text">{currentPage}</span> of{" "}
                <span className="font-medium text-text">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    aria-label="Go to previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                </Button>

                <ol className="flex items-center gap-1" aria-label="Page numbers">
                    {pages.map((page, index) => {
                        const previous = pages[index - 1];
                        const showEllipsis = previous && page - previous > 1;

                        return (
                            <li key={page} className="flex items-center gap-1">
                                {showEllipsis ? (
                                    <span
                                        aria-hidden="true"
                                        className="px-1 text-sm text-text-faint"
                                    >
                    …
                  </span>
                                ) : null}

                                <button
                                    type="button"
                                    onClick={() => onPageChange(page)}
                                    aria-label={`Go to page ${page}`}
                                    aria-current={page === currentPage ? "page" : undefined}
                                    className={cn(
                                        "h-9 min-w-9 rounded-md border px-3 text-sm font-medium transition-colors",
                                        "font-mono",
                                        page === currentPage
                                            ? "border-accent bg-accent-faint text-accent"
                                            : "border-border bg-surface text-text-muted hover:bg-surface-2 hover:text-text",
                                    )}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                </ol>

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={!meta.has_next}
                    aria-label="Go to next page"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </nav>
    );
}