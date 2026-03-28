import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display, Space_Grotesk } from "next/font/google";
import "../styles/tailwind.css";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import AIChat from "@/components/AIChat/AIChat";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Sinners| Official Store",
  description: "Official Tech merchandise and tech peripherals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} ${playfair.variable} ${spaceGrotesk.variable} antialiased bg-[#131313] text-[#c6c6c6]`}>
        <SessionProvider>
          <LoadingWrapper>
            <SmoothScroll>
              <div className="app-wrapper">
                <Navbar />
                <main className="main-content">{children}</main>
                <AIChat />
              </div>
            </SmoothScroll>
          </LoadingWrapper>
          {/* <AIChat /> */}
        </SessionProvider>
      </body>
    </html>
  );
}