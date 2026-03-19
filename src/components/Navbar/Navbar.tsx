// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "About", path: "/about" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-16 py-6 flex items-center justify-between pointer-events-none pl-[50px] pr-[50px]">
//       <div className="flex items-center pointer-events-auto">
//         <Link href="/" className="flex flex-col select-none group pointer-events-auto">
//           <span className="font-playfair text-3xl md:text-[32px] leading-[0.6] text-[#1A1A1A] font-black uppercase tracking-tighter">
//             Lando
//           </span>
//           <span className="font-bebas text-4xl md:text-[44px] leading-[0.8] text-[#1A1A1A] uppercase tracking-tighter">
//             Norris
//           </span>
//         </Link>
//       </div>

//       <div className="flex items-center gap-6 pointer-events-auto">
//         {/* Navigation links removed for minimalist design matching the image */}

//         <Link href="/cart" className="bg-[#DFFF00] text-[#1A1A1A] px-6 py-2.5 rounded-xl font-bebas tracking-[0.02em] text-xl font-bold uppercase flex items-center gap-2 hover:bg-[#1A1A1A] hover:text-[#DFFF00] transition-all duration-300 transform active:scale-95 shadow-sm">
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M6 2L3 6V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
//             <path d="M3 6h18" />
//             <path d="M16 10a4 4 0 0 1-8 0" />
//           </svg>
//           <span className="mt-0.5">Store</span>
//         </Link>

//         <button
//           className="group flex flex-col gap-1.5 p-3.5 border border-[#1A1A1A]/40 rounded-xl hover:bg-[#1A1A1A] transition-all duration-300"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <div className="w-8 h-[2px] bg-[#1A1A1A] group-hover:bg-white transition-all rounded-full"></div>
//           <div className="w-5 h-[2px] bg-[#1A1A1A] group-hover:bg-white transition-all rounded-full"></div>
//         </button>
//       </div>

//       {/* Mobile Menu Backdrop */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 bg-[#FDFDFD] z-[200] flex flex-col items-center justify-center pointer-events-auto">
//           <button
//             className="absolute top-10 right-10 text-4xl font-bebas"
//             onClick={() => setIsMobileMenuOpen(false)}
//           >
//             CLOSE
//           </button>
//           <div className="flex flex-col items-center gap-10">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className="font-bebas text-6xl uppercase hover:text-[#CCFF00] transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <Link
//               href="/cart"
//               className="bg-[#CCFF00] text-[#1A1A1A] px-12 py-6 rounded-sm font-bebas text-3xl uppercase italic shadow-2xl"
//               onClick={() => setIsMobileMenuOpen(false)}
//             >
//               SHOP NOW
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-8 md:px-[60px] py-8 flex items-center justify-between pointer-events-none">

      {/* Left Side: Brand Logo */}
      <div className="flex items-center pointer-events-auto">
        <Link href="/" className="flex flex-col select-none group">
          <span className="font-bebas text-[32px] md:text-[38px] leading-[0.7] text-[#1A1A1A] font-black uppercase tracking-[-0.02em]">
            Lando
          </span>
          <span className="font-bebas text-[42px] md:text-[48px] leading-[0.8] text-[#1A1A1A] font-black uppercase tracking-[-0.02em]">
            Norris
          </span>
        </Link>
      </div>

      {/* Right Side: Store & Menu Toggle */}
      <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">

        {/* Store Button - Exact Design Match */}
        <Link
          href="/cart"
          className="bg-[#D9FF00] text-[#1A1A1A] h-[54px] md:h-[62px] px-6 md:px-8 rounded-[12px] flex items-center gap-2 hover:bg-black hover:text-[#D9FF00] transition-all duration-300 shadow-sm active:scale-95"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-0.5"
          >
            <path d="M6 2L3 6V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="font-bebas text-xl md:text-2xl font-bold uppercase tracking-wider mt-1">
            Store
          </span>
        </Link>

        {/* Menu Toggle Button - Exact Design Match */}
        <button
          className="group h-[54px] w-[54px] md:h-[62px] md:w-[62px] flex flex-col items-center justify-center gap-[6px] border-[1.5px] border-[#1A1A1A] rounded-[12px] hover:bg-black transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-7 h-[2.5px] bg-[#1A1A1A] group-hover:bg-white transition-all rounded-full"></div>
          <div className="w-5 h-[2.5px] bg-[#1A1A1A] group-hover:bg-white transition-all self-start ml-[13px] rounded-full"></div>
        </button>
      </div>

      {/* Fullscreen Menu Overlay (Matches New Reference Image) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#131411] z-[200] overflow-y-auto overflow-x-hidden flex flex-col pointer-events-auto animate-in fade-in duration-500">
          
          {/* Top Bar inside Menu - Matches Image */}
          <div className="flex items-center justify-between px-8 md:px-[60px] py-8 w-full border-b border-white/5 relative z-[210]">
            <Link href="/" className="flex flex-col select-none group" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="font-bebas text-[32px] md:text-[38px] leading-[0.7] text-white font-black uppercase tracking-[-0.02em]">
                Lando
              </span>
              <span className="font-bebas text-[42px] md:text-[48px] leading-[0.8] text-white font-black uppercase tracking-[-0.02em]">
                Norris
              </span>
            </Link>

            <div className="flex items-center gap-4">
               <Link
                href="/cart"
                className="bg-[#D9FF00] text-[#1A1A1A] h-[54px] md:h-[62px] px-6 md:px-8 rounded-[12px] flex items-center gap-2 hover:bg-white transition-all duration-300 shadow-sm active:scale-95"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="font-bebas text-xl md:text-2xl font-bold uppercase tracking-wider mt-1">Store</span>
              </Link>

              <button
                className="h-[54px] w-[54px] md:h-[62px] md:w-[62px] flex items-center justify-center bg-white rounded-[12px] hover:bg-[#D9FF00] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Menu Content - Split Layout */}
          <div className="flex-1 grid lg:grid-cols-2 w-full max-w-[1440px] mx-auto px-8 md:px-[60px]">
            
            {/* Left Side: Image Grid (Desktop Only) */}
            <div className="hidden lg:grid grid-cols-2 gap-6 h-full py-16 pr-16 border-r border-white/5">
              <div className="relative aspect-square overflow-hidden rounded-sm grayscale-[0.8] hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <Image src="https://i.pinimg.com/736x/b8/70/55/b870553a9cfde3ad5aa6600f236b5c8a.jpg" alt="Lando" fill className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm grayscale-[0.8] hover:grayscale-0 transition-all duration-700 shadow-2xl mt-16">
                <Image src="https://i.pinimg.com/1200x/c5/4e/0e/c54e0e95578da2fc7884b70ddbcb921d.jpg" alt="Helmet" fill className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm grayscale-[0.8] hover:grayscale-0 transition-all duration-700 shadow-2xl">
                <Image src="https://i.pinimg.com/736x/29/5a/8e/295a8eb95f74ac12010e83fc399e1557.jpg" alt="Merch" fill className="object-cover" />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm grayscale-[0.8] hover:grayscale-0 transition-all duration-700 shadow-2xl mt-16">
                <Image src="https://i.pinimg.com/1200x/23/b1/2d/23b12da7f92b8d7cab9514e485b700be.jpg" alt="Track" fill className="object-cover" />
              </div>
            </div>

            {/* Right Side: Links & Footer */}
            <div className="flex flex-col justify-between py-12 lg:py-20 lg:pl-20 h-full">
              
              {/* Massive Links */}
              <div className="flex flex-col items-start lg:items-start gap-1 md:gap-2 mt-4 lg:mt-8">
                {['HOME', 'ON TRACK', 'OFF TRACK', 'CALENDAR'].map((item, idx) => (
                  <div key={item} className="relative group">
                    <Link
                      href="/"
                      className={`font-bebas text-[54px] md:text-[80px] lg:text-[105px] leading-[0.82] uppercase transition-all duration-300 hover:tracking-wide inline-block ${idx === 0 ? 'text-white' : 'text-stone-400/30 hover:text-white'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                    {/* Wavy active indicator for first item */}
                    {idx === 0 && (
                      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-12 pointer-events-none opacity-90 z-10 scale-x-110">
                        <svg viewBox="0 0 400 50" className="w-full h-full">
                          <path d="M0,25 Q100,5 200,25 T400,25" stroke="#D9FF00" strokeWidth="4" fill="none" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Menu Footer Detail */}
              <div className="mt-20 flex flex-col items-end space-y-10">
                {/* Brand Logo & Since Detail */}
                <div className="flex flex-col items-end">
                   <div className="w-24 h-24 mb-2 opacity-60">
                     <svg viewBox="0 0 100 100" className="fill-stone-400">
                       <path d="M50 0 L100 100 L50 80 L0 100 Z" /> {/* Placeholder McLaren-ish shape */}
                     </svg>
                   </div>
                   <span className="font-bebas text-xs tracking-[0.4em] text-stone-500">MCLAREN F1 SINCE 2019</span>
                </div>

                {/* Contact & Socials */}
                <div className="flex flex-col items-end space-y-4 w-full">
                  <span className="font-bebas text-lg text-stone-300 tracking-widest uppercase mb-2">Business Enquiries</span>
                  <div className="flex flex-wrap justify-end gap-x-8 gap-y-2">
                    {['TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'TWITCH'].map(social => (
                      <Link key={social} href="#" className="font-bebas text-lg text-stone-500 hover:text-[#D9FF00] transition-colors tracking-widest">{social}</Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;