import type { Metadata } from "next";
import { signIn } from "../../../../auth";
import { availableAuthProviders } from "../../../../auth.providers";

export const metadata: Metadata = {
  title: "Account Access",
  description:
    "Dedicated sign-in page for the Felippe Content Playlist dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

function getSafeRedirect(value?: string | string[]) {
  if (!value || Array.isArray(value)) {
    return "/dashboard";
  }

  if (!value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
  const { callbackUrl } = await searchParams;
  const redirectTo = getSafeRedirect(callbackUrl);
  const hasAvailableProviders = availableAuthProviders.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-8 shadow-sm">
        <div className="text-center mb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-foreground/50">
            Felippe Content Playlist
          </p>
          <h1 className="text-3xl font-bold mb-2">Account access</h1>
          <p className="text-foreground/70 leading-6">
            {hasAvailableProviders
              ? "Continue with one of the configured identity providers. You will be redirected to GitHub or Google to authorize access. This site does not collect provider passwords directly."
              : "Authentication is not configured on this deployment yet. Add at least one OAuth provider to enable account access."}
          </p>
        </div>

        {hasAvailableProviders ? (
          <div className="space-y-4">
            {availableAuthProviders.map((provider, index) => (
              <form
                key={provider.id}
                action={async () => {
                  "use server";
                  await signIn(provider.id, { redirectTo });
                }}
                className="w-full"
              >
                <button
                  type="submit"
                  className={
                    index === 0
                      ? "w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                      : "w-full px-6 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors font-medium"
                  }
                >
                  Continue with {provider.name}
                </button>
              </form>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-foreground/15 bg-background/70 p-5 text-sm leading-6 text-foreground/70">
            Configure `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`, or
            `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`, then redeploy.
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-foreground/10 bg-background/70 p-4 text-sm leading-6 text-foreground/70">
          Protected routes redirect here automatically. After authentication,
          you are sent back to the page you originally requested.
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-foreground/70 hover:text-foreground"
          >
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
}
