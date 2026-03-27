"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      name: "Products",
      href: "/dashboard/products",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      name: "Orders",
      href: "/dashboard/orders",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8V21H3V8" />
          <path d="M1 3H23V8H1V3Z" />
          <path d="M10 12H14" />
        </svg>
      ),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      ),
    },
    {
      name: "Divider",
      isDivider: true,
    },
    {
      name: "Add Keycaps",
      href: "/dashboard/add-keycaps",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      name: "Add Keyboard",
      href: "/dashboard/add-keyboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      name: "Add Product",
      href: "/dashboard/add-product",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-[109] md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <div className={`fixed left-0 top-0 h-full bg-[#1A1A1A] text-white transition-all duration-300 z-[110] border-r border-white/10 ${isCollapsed ? "-translate-x-full md:translate-x-0 md:w-20" : "translate-x-0 w-64"}`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="transform skew-x-[-15deg]">
                 <path d="M20 80 L45 20 L55 20 L30 80 Z" fill="#D9FF00" />
                 <path d="M50 80 L75 20 L85 20 L60 80 Z" fill="#D9FF00" />
              </svg>
              <span className="font-bebas text-2xl font-bold tracking-wider text-[#D9FF00]">SINNERS</span>
            </Link>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isCollapsed ? "rotate-180" : ""}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, idx) => {
            if ("isDivider" in item) {
              return <div key={`divider-${idx}`} className="h-[1px] bg-white/5 my-4 mx-2" />;
            }
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href!}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-[#D9FF00] text-[#1A1A1A]" 
                    : "hover:bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="font-bebas text-lg tracking-wide">{item.name}</span>
                )}
                {!isCollapsed && isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info / Logout */}
        <div className="p-4 border-t border-white/5">
          <div className={`bg-white/5 p-3 rounded-2xl flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 rounded-full bg-[#D9FF00]/20 flex items-center justify-center text-[#D9FF00] font-bebas text-xl">
              A
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-bebas text-sm truncate">Admin User</p>
                <p className="text-[10px] text-white/40 truncate">admin@sinners.tech</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
