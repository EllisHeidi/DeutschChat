export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2">
        <p className="text-primary text-sm font-medium tracking-wide uppercase">
          DeutschChat
        </p>
        <h1 className="text-3xl font-semibold text-balance">
          Learn German by really using it.
        </h1>
        <p className="text-muted-foreground">
          Phase 1 foundation is running. The marketing site, authentication and
          the learner dashboard land in the next steps.
        </p>
      </div>

      <div className="border-border bg-surface rounded-lg border p-4 text-sm">
        <p className="font-medium">A1 is free. Always. Premium starts at A2.</p>
      </div>
    </main>
  );
}
