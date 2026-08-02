import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { cn } from "@/lib/cn";

interface AppShellProps {
    children: ReactNode;
    className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!mobileSidebarOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMobileSidebarOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [mobileSidebarOpen]);

    return (
        <div className="min-h-screen bg-bg text-text">
            <Sidebar
                mobileOpen={mobileSidebarOpen}
                onClose={() => setMobileSidebarOpen(false)}
            />

            <div className="lg:pl-72">
                <Topbar onOpenSidebar={() => setMobileSidebarOpen(true)} />

                <main
                    className={cn(
                        "px-4 py-6 md:px-6 md:py-8",
                        className,
                    )}
                >
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}