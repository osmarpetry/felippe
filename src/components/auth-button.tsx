import { auth, signIn, signOut } from "../../auth";

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

  return (
    <div className="flex gap-4">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          type="submit"
          className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
        >
          Sign in with GitHub
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          type="submit"
          className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
