import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <section className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 md:p-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
            Felippe Labs
          </p>
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_260px] md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
                Content Playlist
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70 md:text-lg">
                A private Auth.js demo deployed on Netlify. The current app is
                focused on provider sign-in, route protection, and session
                handling. Playlist management is not implemented yet.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Account access
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
                >
                  Open dashboard
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/50">
                Authentication
              </h2>
              <p className="mt-4 text-sm leading-6 text-foreground/70">
                This site never asks for GitHub or Google passwords directly.
                When you choose to continue, you are redirected to the provider
                to authorize access.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold">Dedicated sign-in route</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              OAuth provider buttons are isolated to the account access page
              instead of being rendered on the public homepage.
            </p>
          </article>
          <article className="rounded-2xl border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold">Private dashboard</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              Protected routes expose the authenticated session and verify that
              redirects and cookies are behaving correctly.
            </p>
          </article>
          <article className="rounded-2xl border border-foreground/10 p-6">
            <h2 className="text-lg font-semibold">Minimal public surface</h2>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              The landing page avoids third-party embeds and focuses on clearly
              describing what the app does and how sign-in works.
            </p>
          </article>
        </section>

        <footer className="border-t border-foreground/10 pt-6 text-sm text-foreground/50">
          <p>Built with Next.js 15, React 19, Auth.js, and Netlify.</p>
        </footer>
      </div>
    </main>
  );
}
