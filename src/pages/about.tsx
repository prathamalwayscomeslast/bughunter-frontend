import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Bug,
    Database,
    FolderGit2,
    GitPullRequest,
    Network,
    ShieldCheck,
    Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function PrincipleCard({
                           title,
                           description,
                       }: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-surface px-5 py-5">
            <h3 className="font-mono text-base font-semibold tracking-tight text-text">
                {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
        </div>
    );
}

export function AboutPage() {
    return (
        <div className="min-h-screen bg-bg text-text">
            <header className="border-b border-border">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-accent-faint text-accent">
                            <Bug className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-mono text-sm font-semibold tracking-tight text-text">
                                BugHunter
                            </p>
                            <p className="text-xs text-text-muted">Autonomous bug repair</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link to="/">
                            <Button variant="secondary" size="sm">
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button size="sm">Open Console</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="border-b border-border">
                    <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
                        <div className="max-w-2xl">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                                About the system
                            </p>
                            <h1 className="mt-4 font-mono text-4xl font-semibold tracking-tight text-text sm:text-5xl">
                                BugHunter is an operational interface for automated bug repair.
                            </h1>
                            <p className="mt-6 text-base leading-8 text-text-muted">
                                The product is built around a simple idea: bug repair workflows should be visible,
                                bounded, access-aware, and reviewable. Instead of hiding execution behind vague AI
                                abstractions, BugHunter models repositories, issues, repair jobs, verification
                                status, and pull requests as first-class product entities.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <Card>
                                <CardHeader
                                    title="Core entities"
                                    description="The frontend is structured around the same primitives as the backend API."
                                />
                                <CardContent className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-lg border border-border bg-surface-2 px-4 py-4">
                                        <FolderGit2 className="h-4 w-4 text-accent" />
                                        <p className="mt-3 font-mono text-sm font-semibold text-text">Repositories</p>
                                        <p className="mt-1 text-sm text-text-muted">
                                            Installation-scoped source repositories available to the user.
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-border bg-surface-2 px-4 py-4">
                                        <Wrench className="h-4 w-4 text-accent" />
                                        <p className="mt-3 font-mono text-sm font-semibold text-text">Jobs</p>
                                        <p className="mt-1 text-sm text-text-muted">
                                            Repair workflows with status, attempts, diagnosis, and PR output.
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-border bg-surface-2 px-4 py-4">
                                        <Database className="h-4 w-4 text-accent" />
                                        <p className="mt-3 font-mono text-sm font-semibold text-text">Issues</p>
                                        <p className="mt-1 text-sm text-text-muted">
                                            Repository issues correlated with BugHunter workflow state.
                                        </p>
                                    </div>

                                    <div className="rounded-lg border border-border bg-surface-2 px-4 py-4">
                                        <GitPullRequest className="h-4 w-4 text-accent" />
                                        <p className="mt-3 font-mono text-sm font-semibold text-text">
                                            Pull Requests
                                        </p>
                                        <p className="mt-1 text-sm text-text-muted">
                                            Review artifacts generated from successful repair attempts.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="border-b border-border">
                    <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
                        <div className="max-w-2xl">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                                Product principles
                            </p>
                            <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text">
                                Designed for maintainers, not spectators.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-text-muted">
                                The product is intentionally shaped around developer trust. That means operational
                                transparency matters more than flashy automation narratives.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 lg:grid-cols-3">
                            <PrincipleCard
                                title="Traceability over mystery"
                                description="The system records status progression, attempt counts, verification state, diagnosis, and pull request output so the operator can understand what happened."
                            />
                            <PrincipleCard
                                title="Bounded workflows"
                                description="Repair execution is not open-ended. Job lifecycles, attempt caps, and explicit status transitions keep the behavior operationally understandable."
                            />
                            <PrincipleCard
                                title="Human review stays central"
                                description="The end state is a repair proposal engineers can inspect, discuss, and merge through a normal pull request workflow."
                            />
                        </div>
                    </div>
                </section>

                <section className="border-b border-border">
                    <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="max-w-xl">
                                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                                    System shape
                                </p>
                                <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text">
                                    The interface mirrors the backend instead of hiding it.
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-text-muted">
                                    The frontend is intentionally aligned to the backend API surface. Dashboard
                                    summaries, paginated entities, detail endpoints, access-scoped repository data,
                                    and per-job repair state are represented directly in the console.
                                </p>
                            </div>

                            <div className="grid gap-4">
                                <div className="rounded-xl border border-border bg-surface px-5 py-5">
                                    <div className="flex items-center gap-3">
                                        <Network className="h-5 w-5 text-accent" />
                                        <h3 className="font-mono text-base font-semibold text-text">
                                            API-led frontend
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-text-muted">
                                        The web console is driven by authenticated endpoints for `/me`, `/dashboard`,
                                        `/repositories`, `/jobs`, `/issues`, and `/pull-requests`, plus a detail route
                                        for individual job inspection.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-surface px-5 py-5">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-5 w-5 text-accent" />
                                        <h3 className="font-mono text-base font-semibold text-text">
                                            Access-aware views
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-text-muted">
                                        The product assumes user-scoped repository access and renders only the entities
                                        the authenticated operator is allowed to inspect.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-surface px-5 py-5">
                                    <div className="flex items-center gap-3">
                                        <Wrench className="h-5 w-5 text-accent" />
                                        <h3 className="font-mono text-base font-semibold text-text">
                                            Operational drill-down
                                        </h3>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-text-muted">
                                        Summary views give fast situational awareness, while job detail pages expose the
                                        repair context required for real engineering review.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-6">
                        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                            Next step
                        </p>
                        <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                            Open the console and inspect the workflow end to end.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-muted">
                            Explore the dashboard, inspect job progression, and use the UI as the operational
                            layer on top of the BugHunter repair system.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link to="/login">
                                <Button size="lg">Open Developer Console</Button>
                            </Link>
                            <Link to="/">
                                <Button variant="secondary" size="lg">
                                    Return to Landing
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}