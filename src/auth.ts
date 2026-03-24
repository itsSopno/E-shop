import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const res = await fetch("https://t-mark-4.vercel.app/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          
          if (!res.ok) {
            console.error("Local Login API failed with status:", res.status);
            return null;
          }
          
          const rawText = await res.text();
          let data;
          try {
            data = JSON.parse(rawText);
          } catch {
            console.error("Local Login invalid JSON response:", rawText);
            return null;
          }
          if (res.ok && data) {
            // Adjust based on strict backend returns
            const userObj = data.user || data.data || data;
            return {
               id: userObj._id || userObj.id || Date.now().toString(),
               name: userObj.name || userObj.firstName || "",
               email: userObj.email || credentials.email,
            };
          }
          return null;
        } catch (error) {
          console.error("Local Login Error:", error);
          return null;
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Use the new API URL for Google authentication/registration
          await fetch("https://t-mark-4.vercel.app/api/google/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              googleId: account.providerAccountId,
              name: user.name,
              email: user.email,
              image: user.image || "",
            }),
          });
        } catch (err) {
          console.error("Failed to register/login google user in backend:", err);
        }
      }
      return true;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      } else if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
