import Link from "next/link";
import AuthButton from "@/components/auth-button";
import Comments from "@/components/comments";
import { auth } from "../../../auth";

export default async function Dashboard() {
  const session = await auth();
  const commentsAppId = process.env.NEXT_PUBLIC_CUSDIS_APP_ID || "";

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="text-foreground/70 hover:text-foreground mb-4 inline-block"
            >
              ← Back to home
            </Link>
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg text-foreground/70">
              This is the authenticated area of the app. Right now it is mainly
              an Auth.js integration demo rather than a finished playlist
              product.
            </p>
          </div>

          <AuthButton />
        </div>
      </header>

      <main>
        <div className="bg-foreground/5 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Current Session</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {session?.user?.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {session?.user?.email || "N/A"}
            </p>
            <p>
              <strong>ID:</strong> {session?.user?.id || "N/A"}
            </p>
          </div>
        </div>

        <div className="bg-foreground/5 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">
            What This App Does Today
          </h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>Protects this page with Auth.js middleware</li>
            <li>
              Redirects unauthenticated users to the dedicated sign-in page
            </li>
            <li>Stores session data with JWT-based Auth.js sessions</li>
            <li>Shows the authenticated user data returned by the provider</li>
          </ul>
        </div>

        <div className="bg-foreground/5 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-3">Comments</h2>
          <p className="mb-4 text-foreground/70">
            This discussion area is only reachable after authentication because
            it lives inside the protected dashboard.
          </p>
          <Comments
            appId={commentsAppId}
            pageId="/dashboard"
            pageTitle="Dashboard Discussion"
          />
        </div>
      </main>
    </div>
  );
}
