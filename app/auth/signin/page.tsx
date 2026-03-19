"use client";

import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleCredentialsSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", fontFamily: "sans-serif" }}>
      <h1>Sign In</h1>

      {/* Google */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        style={btnStyle("#4285F4")}
      >
        Sign in with Google
      </button>

      <hr style={{ margin: "24px 0" }} />

      {/* Email + Password */}
      <form onSubmit={handleCredentialsSignIn}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={btnStyle("#333")}>
          Sign in with Email
        </button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  padding: "8px",
  marginTop: 4,
  boxSizing: "border-box",
};

const btnStyle = (bg: string): React.CSSProperties => ({
  width: "100%",
  padding: "10px",
  background: bg,
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 15,
  marginBottom: 8,
});
