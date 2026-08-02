import { useState } from "react";
import { Bug, Gift, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export function LoginPage() {
    const { signInWithGitHub } = useAuth();
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGitHubSignIn = async () => {
        setError(null);
        setIsSigningIn(true);

        try {
            await signInWithGitHub();
        } catch (err) {
            console.error(err);
            setError("GitHub sign-in failed. Please try again.");
        } finally {
            setIsSigningIn(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-4 py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.10),transparent_35%)]" />

            <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-lg">
                <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent-faint text-accent">
                        <Bug className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-mono text-lg font-semibold tracking-tight text-text">
                            BugHunter
                        </p>
                        <p className="text-sm text-text-muted">
                            Autonomous bug repair for GitHub repositories
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-faint">
                        Developer Console
                    </p>
                    <h1 className="font-mono text-2xl font-semibold tracking-tight text-text">
                        Sign in to your workspace
                    </h1>
                    <p className="text-sm leading-6 text-text-muted">
                        Connect your GitHub identity through Firebase Authentication to access repositories,
                        jobs, issues, and pull request workflows.
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full justify-center"
                        onClick={() => void handleGitHubSignIn()}
                        isLoading={isSigningIn}
                    >
                        {!isSigningIn ? (
                            <>
                                <Gift className="h-4 w-4" />
                                Continue with GitHub
                                <ArrowRight className="h-4 w-4" />
                            </>
                        ) : null}
                    </Button>

                    {error ? (
                        <div className="rounded-lg border border-red-500/20 bg-error-dim/40 px-4 py-3 text-sm text-error">
                            {error}
                        </div>
                    ) : null}
                </div>

                <div className="mt-8 border-t border-border pt-6">
                    <p className="text-xs leading-6 text-text-faint">
                        By continuing, you authenticate with GitHub and authorize BugHunter to access the
                        repositories connected to your installation.
                    </p>
                </div>
            </div>
        </div>
    );
}