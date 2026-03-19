// "use client";
// import React, { useEffect, useRef } from "react";
// import Image from "next/image";
// import gsap from "gsap";

// const Hero = () => {
//   const containerRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Entrance staggered text animation
//       gsap.from(".hero-title-line", {
//         y: 100,
//         opacity: 0,
//         duration: 1.2,
//         stagger: 0.15,
//         ease: "power4.out",
//       });

//       // Floating parallax effect for product images
//       gsap.to(".floating-asset", {
//         y: -20,
//         duration: 3,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         stagger: 0.5
//       });

//       // Background line animation
//       gsap.from(".bg-ripple", {
//         strokeDasharray: 2000,
//         strokeDashoffset: 2000,
//         opacity: 0,
//         duration: 4,
//         ease: "power2.inOut",
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen bg-[#FDFDFD] flex items-center overflow-hidden px-6 md:px-16 pt-24"
//     >
//       {/* Background Decorative Ripples */}
//       <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
//         <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="XMidYMid slice">
//           <path className="bg-ripple" d="M-100 200C250 100 500 600 900 350S1200 600 1600 200" stroke="#1A1A1A" strokeWidth="0.5" />
//           <path className="bg-ripple" d="M-50 600C300 800 600 300 1000 650S1300 200 1700 550" stroke="#1A1A1A" strokeWidth="0.5" />
//           <path className="bg-ripple" d="M100 100C400 300 700 100 1100 400S1400 100 1800 300" stroke="#1A1A1A" strokeWidth="0.5" />
//         </svg>
//       </div>

//       <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

//         {/* Left Column: Branding & Content */}
//         <div className="lg:col-span-5 flex flex-col items-start space-y-8">
//           <div className="flex items-center gap-4 hero-title-line">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <span className="font-bebas text-sm tracking-[0.5em] uppercase text-gray-500">
//               Lando Store / Tech Peripherals
//             </span>
//           </div>

//           <h1 className="hero-title-line font-playfair text-7xl md:text-8xl lg:text-[110px] leading-[0.85] font-black uppercase text-[#1A1A1A]">
//             World <br />
//             Drivers&apos; <br />
//             <span className="italic block mt-2 text-transparent [-webkit-text-stroke:1px_#1A1A1A]">Champion</span>
//           </h1>

//           <p className="hero-title-line font-inter text-lg text-gray-600 max-w-md leading-relaxed">
//             Celebrate this incredible moment with a collection designed for the fans who never stopped believing. Wear it, frame it, treasure it forever.
//           </p>

//           <button className="hero-title-line group flex items-center gap-4 bg-[#CCFF00] text-[#1A1A1A] px-10 py-6 rounded-sm font-bebas text-xl tracking-widest uppercase italic transition-all duration-300 hover:bg-black hover:text-white shadow-2xl">
//             Visit the store
//             <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
//           </button>

//           {/* Bottom Left Floating Accessory (Black Hoodie/Tee) */}
//           <div className="floating-asset mt-20 w-48 h-64 relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden -rotate-6 hidden md:block">
//             <Image
//               src="https://i.pinimg.com/736x/29/5a/8e/295a8eb95f74ac12010e83fc399e1557.jpg"
//               alt="Norris Champion Tee"
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* Right Column: Hero Image & Floating Assets */}
//         <div className="lg:col-span-7 relative h-[600px] lg:h-[850px] w-full mt-12 lg:mt-0">

//           {/* Main Lando Image (Central focus) */}
//           <div className="relative w-full h-[90%] left-0 lg:left-[10%] rounded-sm overflow-hidden shadow-2xl">
//             <Image
//               src="https://i.pinimg.com/736x/b8/70/55/b870553a9cfde3ad5aa6600f236b5c8a.jpg"
//               alt="Lando Norris"
//               fill
//               className="object-cover brightness-95"
//               priority
//             />
//           </div>

//           {/* Floating Product Asset (Champion Card/Poster) */}
//           <div className="floating-asset absolute top-10 right-0 md:right-10 w-48 h-64 md:w-64 md:h-80 z-20 shadow-[-20px_40px_80px_-10px_rgba(0,0,0,0.4)] rounded-sm overflow-hidden  rotate-6 hidden md:block">
//             <Image
//               src="https://i.pinimg.com/1200x/c5/4e/0e/c54e0e95578da2fc7884b70ddbcb921d.jpg"
//               alt="Champion Collection Card"
//               fill
//               className="object-cover"
//             />
//           </div>

//           {/* Floating Product Asset (White Tee - Bottom Center) */}
//           <div className="floating-asset absolute -bottom-10 left-[20%] w-44 h-56 md:w-56 md:h-72 z-30 shadow-2xl rounded-sm overflow-hidden  -rotate-3">
//             <Image
//               src="https://i.pinimg.com/1200x/23/b1/2d/23b12da7f92b8d7cab9514e485b700be.jpg"
//               alt="White Champion Tee"
//               fill
//               className="object-cover"
//             />
//           </div>

//           {/* Decorative "LN1" Background Text */}
//           <div className="absolute -bottom-10 -right-10 opacity-10 font-bebas text-[15vw] italic text-[#1A1A1A] pointer-events-none select-none uppercase">
//             LN1
//           </div>
//         </div>
//       </div>



//     </section>
//   );
// };

// export default Hero;
"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // টেক্সট এনিমেশন (নিচ থেকে মাস্ক হয়ে আসবে)
      gsap.from(".hero-line span", {
        y: "110%",
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
      });

      // ছবির প্যারালাক্স ও ফ্লোটিং ইফেক্ট
      gsap.to(".floating-asset", {
        y: -30,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#FDFDFD] flex items-start lg:items-center overflow-hidden pt-40 md:pt-48 pb-12"
    >
      {/* Background Decorative Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none">
          <path d="M-100 300 C 200 250, 400 550, 800 400 S 1100 600, 1300 200" stroke="black" strokeWidth="0.5" />
          <path d="M-50 700 C 250 800, 550 500, 900 700 S 1100 400, 1200 600" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-[60px] flex flex-col lg:flex-row items-center relative z-10 gap-12 lg:gap-0">

        {/* Left Content Area */}
        <div className="w-full lg:w-[48%] flex flex-col items-start pt-12 lg:pt-10">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="h-[1px] w-8 md:w-12 bg-black opacity-30"></span>
            <span className="font-bebas text-[10px] md:text-[12px] tracking-[0.4em] md:tracking-[0.5em] uppercase text-gray-400">
              Lando Store / Tech Peripherals
            </span>
          </div>

          <h1 className="mt-8 md:mt-0 font-bebas text-[clamp(42px,12vw,115px)] leading-[0.82] font-black uppercase text-[#1A1A1A] tracking-[-0.03em]">
            <div className="hero-line overflow-hidden block"><span>Ultimate</span></div>
            <div className="hero-line overflow-hidden block">
              <span className="italic font-light opacity-100 [-webkit-text-stroke:1px_#1A1A1A] text-transparent">Custom&apos;</span>
            </div>
            <div className="hero-line overflow-hidden block"><span>Controls</span></div>
          </h1>

          <p className="mt-6 md:mt-8 text-[#555] max-w-[420px] text-[15px] md:text-[18px] font-medium leading-[1.3] uppercase tracking-[-0.01em]">
            Discover the ultimate collection of custom keyboards and peripherals. Designed for performance, built for you.
          </p>

          <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 w-full sm:w-auto">
            <button className="group bg-[#D9FF00] text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-bebas text-lg md:text-xl tracking-wider uppercase italic transition-all hover:bg-black hover:text-[#D9FF00] shadow-xl active:scale-95 w-full sm:w-auto">
              Visit the store <span className="inline-block group-hover:translate-x-2 transition-transform ml-2">→</span>
            </button>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 leading-tight">
              Limited Edition<br />Drop 2026
            </div>
          </div>

          {/* Bottom Left Small Image (Black Hoodie) */}
          <div className="floating-asset mt-20 w-[180px] aspect-[3/4] relative bg-white p-3 shadow-2xl rotate-[-6deg] hidden lg:block">
            <Image
              src="https://i.pinimg.com/736x/29/5a/8e/295a8eb95f74ac12010e83fc399e1557.jpg"
              alt="Asset 1"
              fill
              className="object-cover p-3"
            />
          </div>
        </div>

        {/* Right Composition Area (The Complex Overlap) */}
        <div className="w-full lg:w-[52%] relative h-[600px] lg:h-[800px] flex items-center justify-center">

          {/* Main Photo (Central) */}
          <div className="relative w-[85%] lg:w-[380px] h-[500px] z-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/b8/70/55/b870553a9cfde3ad5aa6600f236b5c8a.jpg"
              alt="Lando"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlapping Gold Image (Top Right) */}
          <div className="floating-asset absolute top-0 right-0 lg:right-[-20px] w-[220px] lg:w-[280px] aspect-square z-20 border-[12px] border-white shadow-2xl rotate-[5deg]">
            <Image
              src="https://i.pinimg.com/1200x/c5/4e/0e/c54e0e95578da2fc7884b70ddbcb921d.jpg"
              alt="Asset 2"
              fill
              className="object-cover"
            />
          </div>

          {/* Overlapping White Image (Bottom Left) */}
          <div className="floating-asset absolute bottom-0 left-0 lg:left-[40px] w-[200px] lg:w-[240px] aspect-square z-20 border-[10px] border-white shadow-2xl rotate-[-8deg]">
            <Image
              src="https://i.pinimg.com/1200x/23/b1/2d/23b12da7f92b8d7cab9514e485b700be.jpg"
              alt="Asset 3"
              fill
              className="object-cover"
            />
          </div>

          {/* Large Decorative Text (LN1) */}
          <div className="absolute -bottom-5 right-[-20px] text-[18vw] font-black text-transparent [-webkit-text-stroke:2px_#EAEAEA] italic opacity-40 pointer-events-none select-none z-0">
            LN1
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;