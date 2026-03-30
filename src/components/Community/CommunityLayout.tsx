"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import Navbari from "./Navbari";
import MagneticCard from "./MagneticCard";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useGlobalContext } from "@/context/globalContext";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const { activeChat, setActiveChat } = useGlobalContext();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toISOString().split('T')[1].split('.')[0] + "_UTC";
      setCurrentTime(timeStr);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans flex flex-col items-center">
      
      {/* --- 1. TOP: FLOATING NAVBAR --- */}
      <Navbari />

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="w-full flex-1 flex flex-col items-center pt-32 pb-24 md:pb-0 transition-all duration-500 ease-in-out">
        
        {/* --- 2. THREE-COLUMN CONTENT GRID (Centered) --- */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10 grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
          
          {/* CENTER CORE: Main Feed */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="xl:col-span-8 space-y-8"
          >
            {children}
          </motion.div>

          {/* RIGHT SIDE: Activity Panel (Desktop Only) */}
          <aside className="hidden xl:block xl:col-span-4 space-y-6">
            
            {/* System Status Tracker */}
            <MagneticCard delay={0.4}>
              <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9FF00]/5 blur-3xl pointer-events-none group-hover:bg-[#D9FF00]/10 transition-colors duration-500" />
                
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-[#D9FF00]" size={18} />
                  <h4 className="font-bebas tracking-[2px] text-white/50 text-sm uppercase">Active_Nodes</h4>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05] transition-all cursor-crosshair"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-sm ${i === 1 ? 'bg-[#D9FF00] animate-pulse shadow-[0_0_8px_rgba(217,255,0,0.6)]' : 'bg-white/20'}`} />
                        <span className="text-[11px] font-jetbrains-mono text-white/70 uppercase">Uplink_Relay_0{i}</span>
                      </div>
                      <span className="text-[10px] font-jetbrains-mono text-[#D9FF00]/60">{100 - i * 5}ms</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MagneticCard>

            {/* Time / System Status (Moved from old Header) */}
            <MagneticCard delay={0.5}>
              <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-3xl backdrop-blur-xl flex flex-col items-center justify-center text-center">
                 <span className="text-[9px] font-jetbrains-mono text-white/30 tracking-[4px] uppercase">
                  Telemetry_Log
                </span>
                <span className="font-bebas text-2xl text-[#D9FF00] tracking-[4px] mt-1">
                  {currentTime}
                </span>
              </div>
            </MagneticCard>

            {/* Direct Messaging / Recent Chats */}
            <ChatSidebar onSelectChat={(id: string) => setActiveChat(id)} />
          </aside>
        </main>
      </div>

      {/* --- 3. FLOATING CHAT TERMINAL --- */}
      <AnimatePresence>
        {activeChat && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[200] w-full max-w-[400px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-[40px]"
          >
            <ChatWindow 
              recipientId={activeChat} 
              onClose={() => setActiveChat(null)} 
            />
            
            {/* Close trigger for layout consistency */}
            <button 
              onClick={() => setActiveChat(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-[#D9FF00] text-black rounded-full flex items-center justify-center font-bold border-2 border-black hover:scale-110 transition-transform z-[210] shadow-xl"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}