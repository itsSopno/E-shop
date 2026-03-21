import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display } from "next/font/google";
import "../styles/tailwind.css";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Sinners| Official Store",
  description: "Official Tech merchandise and tech peripherals.",
};

import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${bebasNeue.variable} ${playfair.variable} antialiased bg-[#FDFDFD] text-[#1A1A1A]`}>
        <SessionProvider>
          <SmoothScroll>
            <div className="app-wrapper">
              <Navbar />
              <main className="main-content">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </SessionProvider>
      </body>
    </html>
  );
}