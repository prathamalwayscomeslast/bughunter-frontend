import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    FolderGit2,
    Wrench,
    CircleDot,
    GitPullRequest,
    X,
    LogOut,
} from "lucide-react";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const navigation = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Repositories",
        href: "/repositories",
        icon: FolderGit2,
    },
    {
        label: "Jobs",
        href: "/jobs",
        icon: Wrench,
    },
    {
        label: "Issues",
        href: "/issues",
        icon: CircleDot,
    },
    {
        label: "Pull Requests",
        href: "/pull-requests",
        icon: GitPullRequest,
    },
];

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { signOut } = useAuth();

    return (
        <>
            {mobileOpen ? (
                <button
                    type="button"
                    aria-label="Close navigation overlay"
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                    onClick={onClose}
                />
            ) : null}

            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-surface transition-transform duration-200 lg:translate-x-0",
                    mobileOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex h-16 items-center justify-between border-b border-border px-5">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3"
                        onClick={onClose}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent-faint text-accent">
                            <Wrench className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="font-mono text-sm font-semibold tracking-tight text-text">
                                BugHunter
                            </p>
                            <p className="text-xs text-text-muted">Autonomous bug repair</p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-2 text-text-muted hover:bg-surface-2 hover:text-text lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            location.pathname === item.href ||
                            location.pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                                    "font-mono",
                                    isActive
                                        ? "border border-accent/20 bg-accent-faint text-accent"
                                        : "text-text-muted hover:bg-surface-2 hover:text-text",
                                )}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border p-3">
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => void signOut()}
                    >
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </Button>
                </div>
            </aside>
        </>
    );
}