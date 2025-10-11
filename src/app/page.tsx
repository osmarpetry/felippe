import Comments from "@/components/comments";
import AuthButton from "@/components/auth-button";

export default function Home() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">Content Playlist</h1>
            <p className="text-lg text-foreground/70">
              A modern content playlist application with SSO authentication and
              social interactions
            </p>
          </div>
          <AuthButton />
        </div>
      </header>

      <main className="mb-12">
        <section className="w-full" style={{ minHeight: "324px" }}>
          <h2 className="text-2xl font-semibold mb-4">Comments & Discussion</h2>
          <div className="w-full h-full">
            <Comments appId={process.env.NEXT_PUBLIC_CUSDIS_APP_ID || ""} />
          </div>
        </section>
      </main>

      <footer className="text-center text-sm text-foreground/50 border-t border-foreground/10 pt-8">
        <p>Built with Next.js 15, React 19, and modern web standards</p>
      </footer>
    </div>
  );
}
