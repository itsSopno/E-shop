"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutPanelLeft, Cuboid, ShoppingCart, BarChart3,
  Settings, PlusSquare, X, LogOut, Cpu
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    { name: "Overview", href: "/dashboard", icon: <LayoutPanelLeft size={22} /> },
    { name: "Products", href: "/dashboard/Store", icon: <Cuboid size={22} /> },
    { name: "Orders", href: "/dashboard/orders", icon: <ShoppingCart size={22} /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 size={22} /> },
    { name: "Divider", isDivider: true },
    { name: "Add Keycaps", href: "/dashboard/add-keycaps", icon: <PlusSquare size={22} /> },
    { name: "Add Keyboard", href: "/dashboard/add-keyboard", icon: <Cpu size={22} /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings size={22} /> },
  ];

  if (!mounted) return null;

  return (
    <>

      <motion.div
        animate={{ 
          width: (isMobileOpen || !isCollapsed) ? 300 : 0,
          x: (isMobileOpen || !isCollapsed) ? 0 : -300
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`fixed left-0 top-0 h-full bg-[#0A0A0A] text-white z-[110] border-r border-white/5 flex flex-col backdrop-blur-3xl shadow-[5px_0_30px_rgba(0,0,0,0.5)] md:translate-x-0 transition-transform duration-500`}
      >
        {/* Header / Logo */}
        <div className="h-24 flex items-center px-6 justify-between border-b border-white/5 relative bg-black/20 overflow-hidden">
          <Link href="/" className="flex items-center gap-3 group min-w-[150px]">
            <div className="w-10 h-10 bg-[#D9FF00] rounded-lg flex items-center justify-center rotate-45 flex-shrink-0 shadow-[0_0_20px_rgba(217,255,0,0.2)]">
              <div className="-rotate-45 font-bebas text-black text-2xl font-bold">S</div>
            </div>
            <motion.div
              animate={{ opacity: (isMobileOpen || !isCollapsed) ? 1 : 0 }}
              className="flex flex-col leading-none"
            >
              <span className="font-bebas text-2xl tracking-[3px] text-[#D9FF00]">SINNERS</span>
              <span className="text-[9px] font-mono text-white/30 tracking-[1px] mt-1 uppercase">DASHBOARD_v4.2</span>
            </motion.div>
          </Link>
          <button
            onClick={() => {
              setIsCollapsed(true);
              setIsMobileOpen(false);
            }}
            className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:bg-red-500 hover:text-white transition-all duration-500 border border-white/5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto no-scrollbar scroll-smooth">
          <AnimatePresence>
            {(isMobileOpen || !isCollapsed) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {menuItems.map((item, idx) => {
                  if (item.isDivider) {
                    return <div key={`div-${idx}`} className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-8 mx-4" />;
                  }

                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href || `item-${idx}`}
                      href={item.href || "#"}
                      onClick={() => {
                        if (typeof window !== 'undefined' && window.innerWidth < 768) {
                          setIsMobileOpen(false);
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`relative flex items-center gap-5 p-4 rounded-2xl cursor-pointer group transition-all duration-500 ${isActive ? "text-[#D9FF00]" : "text-white/30 hover:text-white"
                          }`}
                      >
                        {/* Active Indicator Backdrop */}
                        {isActive && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 bg-white/5 rounded-2xl border border-white/5"
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                          />
                        )}

                        <div className={`relative z-10 transition-all duration-500 ${isActive ? "text-[#D9FF00] drop-shadow-[0_0_10px_rgba(217,255,0,0.6)]" : "group-hover:text-white"}`}>
                          {item.icon}
                        </div>

                        <motion.span
                          initial={false}
                          animate={{ opacity: 1 }}
                          className="relative z-10 font-bebas text-lg tracking-[3px] uppercase transition-colors"
                        >
                          {item.name}
                        </motion.span>

                        {isActive && (
                          <motion.div
                            layoutId="active-dot"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto w-1.5 h-1.5 bg-[#D9FF00] rounded-full shadow-[0_0_10px_#D9FF00]"
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Footer / User Profile */}
        <AnimatePresence>
          {(isMobileOpen || !isCollapsed) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5"
            >
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 group hover:border-[#D9FF00]/30 transition-all duration-500">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D9FF00] to-yellow-200 p-[1px] group-hover:rotate-[360deg] transition-all duration-700">
                    <div className="w-full h-full bg-[#0A0A0A] rounded-xl flex items-center justify-center font-bebas text-[#D9FF00] text-lg">
                      NH
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1A1A1A] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-bebas text-sm tracking-widest uppercase truncate text-white/90">Nabil Hasan</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    <p className="text-[8px] font-mono text-white/40 truncate tracking-tighter">SUPER_ADMIN_CORE</p>
                  </div>
                </motion.div>

                <button className="p-2 text-white/10 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300">
                  <LogOut size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Sidebar;