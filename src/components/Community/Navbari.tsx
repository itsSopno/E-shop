"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Package, Users, Home, Bell, MessageSquare, PlusSquare, Search } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbari() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    const userImage = session?.user?.image;

    const mainNav = [
        { name: "Feed", href: "/Community", icon: <Home size={20} />, id: "home" },
        { name: "Discover", href: "/Community/discover", icon: <Search size={20} />, id: "search" },
        { name: "Squads", href: "/Community/squads", icon: <Users size={20} />, badge: "3", id: "squads" },
        { name: "Market", href: "/Store", icon: <Package size={20} />, id: "market" },
        { name: "Profile", href: "/Community/Cprofile", icon: <Users size={20} />, id: "profile" },
    ];

    if (!mounted) return null;

    return (
        <>
            {/* --- DESKTOP FLOATING NAVBAR --- */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ left: "50%", x: "-50%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="hidden md:flex items-center justify-between fixed top-6 w-[95%] max-w-7xl h-20 bg-[#050505]/70 backdrop-blur-3xl border border-white/[0.05] rounded-[24px] z-[120] px-8 shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
                {/* Left: Logo */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bebas text-2xl tracking-[3px] text-white group flex items-center gap-2">
                        SINNERS<span className="text-[#D9FF00] group-hover:scale-110 transition-transform">_</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-white/10 hidden lg:block" />
                    <p className="font-jetbrains-mono text-[9px] text-white/30 uppercase tracking-widest hidden lg:block">
                        SINNERS Topluluk
                    </p>
                </div>

                {/* Center: Navigation Links */}
                <div className="flex items-center gap-1">
                    {mainNav.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/Community');
                        return (
                            <Link key={item.id} href={item.href} className="relative group px-1">
                                <div className={`relative z-10 flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${isActive ? 'text-[#D9FF00]' : 'text-white/40 hover:text-white hover:bg-white/[0.02]'}`}>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                        {item.icon}
                                    </motion.div>
                                    <span className="font-jetbrains-mono text-[11px] uppercase tracking-[1px]">
                                        {item.name}
                                    </span>
                                    {item.badge && (
                                        <span className="bg-[#D9FF00]/10 text-[#D9FF00] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-[#D9FF00]/20">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active-bg"
                                        className="absolute inset-0 bg-[#D9FF00]/[0.03] border border-[#D9FF00]/20 rounded-xl z-0"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Right: Actions & Profile */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                        <button className="p-2 text-white/30 hover:text-[#D9FF00] transition-colors"><MessageSquare size={18} /></button>
                        <button className="p-2 text-white/30 hover:text-[#D9FF00] transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D9FF00] rounded-full border-2 border-[#050505]" />
                        </button>
                    </div>

                    <Link href="/Community/Cprofile" className="flex items-center gap-3 pl-2 group">
                        <div className="text-right hidden xl:block">
                            <p className="text-[10px] font-bebas tracking-widest text-white leading-none group-hover:text-[#D9FF00] transition-colors">
                                {session?.user?.name || "GHOST_USER"}
                            </p>
                            <p className="text-[8px] font-jetbrains-mono text-white/30 uppercase leading-none mt-1">@uplink_active</p>
                        </div>
                        <div className="relative w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0 group-hover:border-[#D9FF00]/40 transition-all p-[2px]">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src={userImage || "https://ui-avatars.com/api/?name=User&background=D9FF00&color=050505"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#D9FF00] rounded-full border-[2px] border-[#050505]" />
                        </div>
                    </Link>
                </div>
            </motion.nav>

            {/* --- MOBILE FLOATING DOCK --- */}
            <motion.div
                initial={{ y: 100, opacity: 0, x: "-50%" }}
                animate={{ y: 0, opacity: 1, x: "-50%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-[400px]"
            >
                <div className="flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.1] rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative">

                    {/* Create Button (Center floating) */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 bg-[#D9FF00] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(217,255,0,0.3)] border-[4px] border-[#050505]"
                        >
                            <PlusSquare size={24} fill="currentColor" className="text-black" />
                        </motion.button>
                    </div>

                    {/* Left Dock Items */}
                    <div className="flex items-center gap-6">
                        <DockItem href="/Community" active={pathname === '/Community'}>
                            <Home size={22} />
                        </DockItem>
                        <DockItem href="/Community/discover" active={pathname === '/Community/discover'}>
                            <Search size={22} />
                        </DockItem>
                        <button 
                            onClick={() => {
                                // We'll trigger a global state or search for the ChatSidebar
                                if (typeof window !== 'undefined') {
                                    const event = new CustomEvent('toggle-mobile-chat');
                                    window.dispatchEvent(event);
                                }
                            }}
                            className="relative p-2 flex items-center justify-center text-white/40 hover:text-[#D9FF00]"
                        >
                            <MessageSquare size={22} />
                        </button>
                    </div>

                    <div className="w-14" /> {/* Spacer for center button */}

                    {/* Right Dock Items */}
                    <div className="flex items-center gap-6">
                        <DockItem href="/Community/squads" active={pathname === '/Community/squads'}>
                            <Bell size={22} />
                        </DockItem>
                        <DockItem href="/Community/Cprofile" active={pathname === '/Community/Cprofile'}>
                            <div className="w-6 h-6 rounded-full border border-white/20 overflow-hidden pointer-events-none">
                                <img
                                    src={userImage || "https://ui-avatars.com/api/?name=User"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </DockItem>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

// --- DOCK ITEM HELPER ---
function DockItem({ children, href, active }: { children: React.ReactNode, href: string, active: boolean }) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className={`relative p-2 flex items-center justify-center transition-colors ${active ? 'text-[#D9FF00]' : 'text-white/40 hover:text-white'}`}
            >
                {children}
                {active && (
                    <motion.div
                        layoutId="mobile-dock-dot"
                        className="absolute -bottom-1 w-1 h-1 bg-[#D9FF00] rounded-full shadow-[0_0_10px_rgba(217,255,0,0.8)]"
                    />
                )}
            </motion.div>
        </Link>
    );
}