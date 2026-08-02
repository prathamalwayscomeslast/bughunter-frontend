import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";

import { useAuth } from "@/context/auth-context";
import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";

// Public pages
import { LandingPage } from "@/pages/landing";
import { AboutPage } from "@/pages/about";
import { LoginPage } from "@/pages/login";

// Protected app pages
import { DashboardPage } from "@/pages/dashboard";
import { RepositoriesPage } from "@/pages/repositories";
import { JobsPage } from "@/pages/jobs";
import { JobDetailPage } from "@/pages/job-detail";
import { IssuesPage } from "@/pages/issues";
import { PullRequestsPage } from "@/pages/pull-requests";

function FullScreenBootLoader() {
  return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-4">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-2 text-center">
            <p className="font-mono text-sm uppercase tracking-[0.25em] text-text-faint">
              BugHunter
            </p>
            <h1 className="font-mono text-xl font-semibold text-text">
              Initializing console
            </h1>
            <p className="text-sm text-text-muted">
              Restoring authentication session and loading your workspace.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <div className="space-y-3">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </div>
  );
}

function AuthBootstrapGuard() {
  const { isAuthResolved, user, isProfileLoading, profile, refreshProfile } =
      useAuth();

  if (!isAuthResolved) {
    return <FullScreenBootLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isProfileLoading) {
    return <FullScreenBootLoader />;
  }

  if (!profile) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-bg px-4">
          <div className="w-full max-w-xl">
            <ErrorState
                title="Unable to load your workspace"
                description="Your authentication session is valid, but we could not load your BugHunter profile from the backend."
                onRetry={() => void refreshProfile()}
            />
          </div>
        </div>
    );
  }

  return <Outlet />;
}

function AppLayout() {
  return (
      <AppShell>
        <Outlet />
      </AppShell>
  );
}

function PublicOnlyRoute() {
  const { isAuthResolved, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthResolved) {
    return <FullScreenBootLoader />;
  }

  if (isAuthenticated) {
    const redirectTo =
        location.pathname === "/login" ? "/dashboard" : "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

export default function App() {
  return (
      <Routes>
        {/* Public marketing routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Public-only auth route */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected app routes */}
        <Route element={<AuthBootstrapGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/repositories" element={<RepositoriesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:jobId" element={<JobDetailPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="/pull-requests" element={<PullRequestsPage />} />
          </Route>
        </Route>

        {/* Fallbacks */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}