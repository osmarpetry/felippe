import { auth } from "../../../auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <Link
          href="/"
          className="text-foreground/70 hover:text-foreground mb-4 inline-block"
        >
          ← Back to home
        </Link>
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-foreground/70">
          This is a protected page - only authenticated users can see this
        </p>
      </header>

      <main>
        <div className="bg-foreground/5 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">User Information</h2>
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
          <h2 className="text-xl font-semibold mb-3">Protected Features</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground/80">
            <li>This page is protected by Auth.js middleware</li>
            <li>Unauthenticated users are redirected to the sign-in page</li>
            <li>Session data is securely managed with JWT</li>
            <li>Multiple OAuth providers supported (GitHub, Google)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
