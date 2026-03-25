import type { Metadata } from "next";
import { Inter, Bebas_Neue, Playfair_Display } from "next/font/google";
import "../styles/tailwind.css";
import "../styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import LoadingWrapper from "@/components/LoadingWrapper/LoadingWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
      <body className={`${inter.variable} ${bebasNeue.variable} ${playfair.variable} antialiased bg-[#FDFDFD] text-[#1A1A1A]`}>
        <SessionProvider>
          <LoadingWrapper>
            <SmoothScroll>
              <div className="app-wrapper">
                <Navbar />
                <main className="main-content">{children}</main>
                <Footer />
              </div>
            </SmoothScroll>
          </LoadingWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}