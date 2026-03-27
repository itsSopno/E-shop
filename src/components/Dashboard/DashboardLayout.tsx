"use client";

import Sidebar from "@/components/Dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F9F9F9]">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300">
        {/* Dashboard Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[105]">
          <div className="flex items-center gap-4">
            {/* Mobile Toggle Placeholder - Sidebar handles it but we might need a button here if sidebar is hidden */}
            <div className="md:hidden">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                 <line x1="3" y1="12" x2="21" y2="12" />
                 <line x1="3" y1="6" x2="21" y2="6" />
                 <line x1="3" y1="18" x2="21" y2="18" />
               </svg>
            </div>
            <h2 className="font-bebas text-2xl tracking-wide text-[#1A1A1A]">
              Dashboard
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-black transition-colors bg-gray-50 rounded-xl">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#D9FF00] rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                 <p className="font-bebas text-sm font-bold">Sinners Admin</p>
                 <p className="text-[10px] text-gray-400">Owner Access</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-[#D9FF00] font-bebas text-xl">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 p-8 bg-[#F9F9F9] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
