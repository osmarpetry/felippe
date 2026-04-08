import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export type AvailableAuthProvider = {
  id: "github" | "google";
  name: "GitHub" | "Google";
};

export const availableAuthProviders: AvailableAuthProvider[] = [
  process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
    ? { id: "github", name: "GitHub" }
    : null,
  process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? { id: "google", name: "Google" }
    : null,
].filter((provider): provider is AvailableAuthProvider => provider !== null);

export function createAuthProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push(
      GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      }),
    );
  }

  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push(
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
    );
  }

  return providers;
}
