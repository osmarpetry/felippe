import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Access Page",
  description:
    "Public entry page for the Felippe Content Playlist demo deployment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessPage() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <section className="rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 md:p-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-foreground/60">
            Felippe Labs
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Public access page
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70">
            This is a public route for the current deployment. The app itself is
            a private Auth.js demo focused on route protection and session
            handling.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5"
            >
              Open app
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
