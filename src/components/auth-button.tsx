import { auth, signIn, signOut } from "../../auth";
import { availableAuthProviders } from "../../auth.providers";

export default async function AuthButton() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground/70">
          Signed in as{" "}
          <strong>{session.user.email || session.user.name}</strong>
        </span>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  if (availableAuthProviders.length === 0) {
    return (
      <p className="text-sm text-foreground/60">
        Authentication is not configured for this deployment.
      </p>
    );
  }

  return (
    <div className="flex gap-4">
      {availableAuthProviders.map((provider, index) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id);
          }}
        >
          <button
            type="submit"
            className={
              index === 0
                ? "px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                : "px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
            }
          >
            Sign in with {provider.name}
          </button>
        </form>
      ))}
    </div>
  );
}
