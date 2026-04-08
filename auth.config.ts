import type { NextAuthConfig } from "next-auth";
import { createAuthProviders } from "./auth.providers";

// Edge-compatible auth configuration
export default {
  providers: createAuthProviders(),
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth }) {
      // Authorization logic is handled in middleware.ts
      // This callback is required but we handle logic elsewhere
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
