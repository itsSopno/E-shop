import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      // Register user in the external backend on every sign-in
      // The backend should handle "already exists" gracefully
      try {
        // For Google OAuth users, generate a deterministic password from their unique ID
        const oauthPassword = account?.providerAccountId
          ? `OAUTH_${account.providerAccountId}_${process.env.AUTH_SECRET?.slice(0, 8) ?? "sinners"}`
          : "oauth_user_default";

        await fetch("https://t-mark-3.vercel.app/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: oauthPassword,
          }),
        });
      } catch (err) {
        // Don't block sign-in if the API call fails
        console.error("Failed to register user in backend:", err);
      }
      return true; // Always allow sign-in
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
