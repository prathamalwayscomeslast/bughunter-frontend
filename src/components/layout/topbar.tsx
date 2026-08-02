import { Menu, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";

interface TopbarProps {
    onOpenSidebar: () => void;
}

function getPageLabel(pathname: string) {
    if (pathname.startsWith("/repositories")) return "Repositories";
    if (pathname.startsWith("/jobs")) return "Jobs";
    if (pathname.startsWith("/issues")) return "Issues";
    if (pathname.startsWith("/pull-requests")) return "Pull Requests";
    return "Dashboard";
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
    const location = useLocation();
    const { profile, signOut } = useAuth();

    const pageLabel = getPageLabel(location.pathname);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-bg/90 px-4 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onOpenSidebar}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:bg-surface-2 hover:text-text lg:hidden"
                    aria-label="Open navigation menu"
                >
                    <Menu className="h-4 w-4" />
                </button>

                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                        BugHunter Console
                    </p>
                    <p className="font-mono text-sm font-medium text-text">{pageLabel}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium text-text">
                        {profile?.display_name ?? "Developer"}
                    </p>
                    <p className="text-xs text-text-muted">
                        {profile?.email ?? "Signed in"}
                    </p>
                </div>

                <Avatar
                    src={profile?.photo_url}
                    name={profile?.display_name ?? profile?.email ?? "BugHunter User"}
                    alt={profile?.display_name ?? "User avatar"}
                    size="md"
                />

                <Button
                    variant="ghost"
                    size="sm"
                    className="hidden sm:inline-flex"
                    onClick={() => void signOut()}
                >
                    <LogOut className="h-4 w-4" />
                    Sign out
                </Button>
            </div>
        </header>
    );
}