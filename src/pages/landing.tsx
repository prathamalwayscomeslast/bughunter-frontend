import { Link } from "react-router-dom";
import {
    ArrowRight,
    Bug,
    CheckCircle2,
    GitPullRequest,
    ShieldCheck,
    TerminalSquare,
    Wrench,
    Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function FeatureCard({
                         icon,
                         title,
                         description,
                     }: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Card className="h-full border-border bg-surface">
            <CardContent className="h-full space-y-4 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent-faint text-accent">
                    {icon}
                </div>

                <div>
                    <h3 className="font-mono text-base font-semibold tracking-tight text-text">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function StepCard({
                      step,
                      title,
                      description,
                  }: {
    step: string;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-surface px-5 py-5">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                {step}
            </p>
            <h3 className="mt-3 font-mono text-lg font-semibold tracking-tight text-text">
                {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
        </div>
    );
}

export function LandingPage() {
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

                    <nav className="hidden items-center gap-6 md:flex">
                        <Link
                            to="/about"
                            className="text-sm text-text-muted transition-colors hover:text-text"
                        >
                            About
                        </Link>
                        <Link
                            to="/login"
                            className="text-sm text-text-muted transition-colors hover:text-text"
                        >
                            Console
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="secondary" size="sm">
                                Open Console
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section className="border-b border-border">
                    <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
                        <div className="max-w-3xl">
                            <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent">
                                Developer toolchain for automated repair
                            </p>

                            <h1 className="mt-5 font-mono text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
                                Turn GitHub bug reports into reviewed pull requests.
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-text-muted">
                                BugHunter ingests repository issues, reproduces failures, localizes probable root
                                causes, and opens repair pull requests through a controlled workflow built for
                                engineering teams.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link to="/login">
                                    <Button size="lg">
                                        Open Developer Console
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>

                                <a
                                    href="https://github.com/prathamalwayscomeslast/bughunter"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="secondary" size="lg">
                                        <Gift className="h-4 w-4" />
                                        View Repository
                                    </Button>
                                </a>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-xl border border-border bg-surface px-4 py-4">
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                                        Input
                                    </p>
                                    <p className="mt-2 text-sm text-text-muted">
                                        GitHub issues and repository context
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-surface px-4 py-4">
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                                        Process
                                    </p>
                                    <p className="mt-2 text-sm text-text-muted">
                                        Reproduce, analyze, repair, verify
                                    </p>
                                </div>

                                <div className="rounded-xl border border-border bg-surface px-4 py-4">
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-faint">
                                        Output
                                    </p>
                                    <p className="mt-2 text-sm text-text-muted">
                                        A traceable pull request ready for review
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_45%)]" />
                            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
                                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                                    <p className="ml-2 font-mono text-xs text-text-faint">bughunter.session</p>
                                </div>

                                <div className="space-y-4 p-5 font-mono text-sm leading-7 text-text-muted">
                                    <p>
                                        <span className="text-accent">$</span> ingest issue #214 from owner/repo
                                    </p>
                                    <p>
                                        <span className="text-accent">$</span> reproduce failure in isolated worker
                                    </p>
                                    <p>
                                        <span className="text-accent">$</span> localize faulting path
                                    </p>
                                    <p>
                                        <span className="text-accent">$</span> synthesize patch candidate
                                    </p>
                                    <p>
                                        <span className="text-accent">$</span> verify repair outcome
                                    </p>
                                    <p className="text-text">
                                        <span className="text-accent">$</span> open pull request
                                        <span className="ml-2 text-accent">done</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-border">
                    <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
                        <div className="max-w-2xl">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                                Workflow
                            </p>
                            <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text">
                                A bounded repair loop, not a blind autopilot.
                            </h2>
                            <p className="mt-4 text-sm leading-7 text-text-muted">
                                BugHunter is designed around traceable execution. Each job advances through
                                explicit states so engineers can understand what happened, what failed, and what
                                was ultimately proposed.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 lg:grid-cols-3">
                            <StepCard
                                step="01"
                                title="Capture and reproduce"
                                description="Import repository issue context, associate it with the correct installation, and start a controlled reproduction flow in isolated execution."
                            />
                            <StepCard
                                step="02"
                                title="Diagnose and repair"
                                description="Analyze failing paths, build a diagnosis, iterate within bounded repair attempts, and preserve job-level status transitions for visibility."
                            />
                            <StepCard
                                step="03"
                                title="Verify and propose"
                                description="Record verification status, open a pull request when the workflow succeeds, and expose the resulting job detail for human review."
                            />
                        </div>
                    </div>
                </section>

                <section className="border-b border-border">
                    <div className="mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                            <div className="max-w-xl">
                                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                                    Why teams use it
                                </p>
                                <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text">
                                    Built for engineering visibility, not demo-day theatrics.
                                </h2>
                                <p className="mt-4 text-sm leading-7 text-text-muted">
                                    BugHunter is opinionated about observability, bounded execution, and structured
                                    workflow data. The goal is not to make debugging magical. The goal is to make it
                                    inspectable, reviewable, and operationally sane.
                                </p>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <FeatureCard
                                    icon={<TerminalSquare className="h-5 w-5" />}
                                    title="Traceable job state"
                                    description="Every repair run exposes status, attempts, verification state, timestamps, and PR output so the frontend can show a real operational timeline."
                                />
                                <FeatureCard
                                    icon={<GitPullRequest className="h-5 w-5" />}
                                    title="PR-oriented output"
                                    description="The system is designed to end in an auditable pull request instead of an opaque black-box change pushed directly to a branch."
                                />
                                <FeatureCard
                                    icon={<ShieldCheck className="h-5 w-5" />}
                                    title="Access-aware data model"
                                    description="Repositories, jobs, issues, and pull requests are served through authenticated, access-scoped APIs aligned with user repository permissions."
                                />
                                <FeatureCard
                                    icon={<Wrench className="h-5 w-5" />}
                                    title="Frontend-ready API surface"
                                    description="Paginated endpoints, dashboard summary views, detail routes, and consistent schemas make the product straightforward to operate from the web console."
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-b border-border">
                    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-20 md:px-6 lg:grid-cols-3">
                        <div className="rounded-2xl border border-border bg-surface p-6">
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                            <h3 className="mt-4 font-mono text-lg font-semibold text-text">
                                Reviewable by default
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-text-muted">
                                Repair attempts culminate in artifacts engineers already trust: issue context,
                                diagnosis, verification state, and pull requests.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-surface p-6">
                            <TerminalSquare className="h-5 w-5 text-accent" />
                            <h3 className="mt-4 font-mono text-lg font-semibold text-text">
                                Console-first operations
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-text-muted">
                                The dashboard is organized around repositories, jobs, issues, and PRs so the
                                operational model stays legible for maintainers.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-border bg-surface p-6">
                            <ShieldCheck className="h-5 w-5 text-accent" />
                            <h3 className="mt-4 font-mono text-lg font-semibold text-text">
                                Controlled execution
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-text-muted">
                                The repair loop is bounded by status transitions, attempt counts, and verification
                                outcomes rather than unlimited autonomous behavior.
                            </p>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mx-auto w-full max-w-5xl px-4 py-20 text-center md:px-6">
                        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                            Start with the console
                        </p>
                        <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                            Inspect the workflow. Review the output. Keep humans in the loop.
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-muted">
                            BugHunter is not trying to replace engineering judgment. It is trying to compress the
                            path from bug report to credible repair proposal.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link to="/login">
                                <Button size="lg">
                                    Open Console
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>

                            <Link to="/about">
                                <Button variant="secondary" size="lg">
                                    Read About BugHunter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}