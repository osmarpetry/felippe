import { signIn } from "../../../../auth";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sign In</h1>
          <p className="text-foreground/70">
            Choose a provider to sign in to your account
          </p>
        </div>

        <div className="space-y-4">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
            className="w-full"
          >
            <button
              type="submit"
              className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
            >
              Sign in with GitHub
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
            className="w-full"
          >
            <button
              type="submit"
              className="w-full px-6 py-3 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors font-medium"
            >
              Sign in with Google
            </button>
          </form>
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
