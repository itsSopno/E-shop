import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "My App",
  description: "Next.js with Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
