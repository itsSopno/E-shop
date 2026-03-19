import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", fontFamily: "sans-serif" }}>
      {session?.user ? (
        <>
          <h1>Welcome, {session.user.name}</h1>
          <p>{session.user.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/auth/signin" });
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </>
      ) : (
        <>
          <h1>You are not signed in</h1>
          <a href="/auth/signin">Sign In</a>
        </>
      )}
    </main>
  );
}
