"use client";

import Sidebar from "@/components/Dashboard/Sidebar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white selection:bg-[#D9FF00] selection:text-black">
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[108] md:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-500 ${isCollapsed ? 'md:pl-0' : 'md:pl-[300px]'}`}>
        {/* Dashboard Top Header */}
        <header className="h-20 bg-black/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[105]">
          <div className="flex items-center gap-4">
            {/* Logo Toggle Button */}
            <button
              className="group flex items-center gap-3 p-1 rounded-xl transition-all duration-500"
              onClick={() => {
                const isMobile = window.innerWidth < 768;
                if (isMobile) {
                  setIsMobileOpen(true);
                } else {
                  setIsCollapsed(false);
                }
              }}
            >
              <div className="w-10 h-10 bg-[#D9FF00] rounded-lg flex items-center justify-center rotate-45 flex-shrink-0 shadow-[0_0_20px_rgba(217,255,0,0.2)] group-hover:shadow-[0_0_25px_rgba(217,255,0,0.4)] group-hover:scale-110 transition-all duration-500">
                <div className="-rotate-45 font-bebas text-black text-2xl font-bold">S</div>
              </div>
              <h2 className="font-bebas text-2xl tracking-[2px] text-white/90 group-hover:text-[#D9FF00] transition-colors hidden sm:block mt-1">
                SYSTEM_CORE
              </h2>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-white/40 hover:text-[#D9FF00] transition-all bg-white/5 rounded-xl border border-white/5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D9FF00] rounded-full border-2 border-black animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="font-bebas text-sm font-bold tracking-wider group-hover:text-[#D9FF00] transition-colors">Sinners Admin</p>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">Verified Access</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#D9FF00] flex items-center justify-center text-black font-bebas text-xl font-bold shadow-[0_0_15px_rgba(217,255,0,0.2)]">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 bg-[#050505] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
