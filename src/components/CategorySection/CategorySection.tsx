// "use client";
// import React, { useEffect, useRef } from "react";
// import Link from "next/link";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import styles from "./CategorySection.module.scss";

// gsap.registerPlugin(ScrollTrigger);

// const categories = [
//   {
//     id: 1,
//     title: "Keyboards",
//     description: "Custom built mechanical masterpieces.",
//     image: "https://i.pinimg.com/736x/16/c2/e8/16c2e88dac825e3d1c74bd05c8ace463.jpg",
//     color: "#050505"
//   },
//   {
//     id: 2,
//     title: "Controller",
//     description: "Controller for elite gaming.",
//     image: "https://i.pinimg.com/1200x/f9/15/4c/f9154c3575600da57660c9b719a9d6bc.jpg",
//     color: "#050505"
//   },
//   {
//     id: 3,
//     title: "Mouse",
//     description: "Ultra-lightweight speed and accuracy.",
//     image: "https://i.pinimg.com/1200x/fc/51/78/fc5178b63e4d793742daeda6685661c9.jpg",
//     color: "#050505"
//   }
// ];

// const CategorySection = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       itemsRef.current.forEach((item, index) => {
//         if (!item) return;

//         gsap.from(item, {
//           x: index % 2 === 0 ? -100 : 100,
//           opacity: 0,
//           duration: 1.2,
//           ease: "power4.out",
//           scrollTrigger: {
//             trigger: item,
//             start: "top 80%",
//             toggleActions: "play none none reverse"
//           }
//         });

//         // Parallax Effect on scroll
//         gsap.to(item.querySelector(`.${styles.image}`), {
//           y: -50,
//           scrollTrigger: {
//             trigger: item,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: true
//           }
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={containerRef} className={styles.section}>
//       <div className={styles.grid}>
//         {categories.map((cat, index) => (
//           <div
//             key={cat.id}
//             ref={(el) => { itemsRef.current[index] = el; }}
//             className={`${styles.item} ${index === 1 ? styles.light : styles.dark}`}
//           >
//             <div className={styles.content}>
//               <span className={styles.index}>0{index + 1}</span>
//               <h2 className="font-bebas">{cat.title}</h2>
//               <p>{cat.description}</p>
//               <Link href="/Store" className={styles.exploreBtn}>Explore Category</Link>
//             </div>
//             <div className={styles.imageWrapper}>
//               <div
//                 className={styles.image}
//                 style={{ backgroundImage: `url(${cat.image})` }}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategorySection;
"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronRight, ChevronLeft, Target } from "lucide-react";

const productImages = [
  "https://i.pinimg.com/736x/21/b8/22/21b8220ca64700b56731091f5dfa9fa4.jpg", // Angle 1
  "https://i.pinimg.com/736x/3c/fb/92/3cfb92634fce7b5e71507bc8aedfbdaf.jpg", // Angle 2 (Macro)
  "https://i.pinimg.com/1200x/38/eb/05/38eb051b2fd2ba0ea591c8da7c5e5c2f.jpg", // Angle 3 (Side)
];

const UpcomingShowcase = () => {
  const [activeImg, setActiveImg] = useState(0);
  const mainImgRef = useRef(null);

  // Smooth transition when image changes
  useEffect(() => {
    gsap.fromTo(mainImgRef.current,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, [activeImg]);

  return (
    <section className="bg-[#050505] py-24 px-6 md:px-12 min-h-screen flex items-center">
      <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* LEFT: TEXT CONTENT (UI MATCHED) */}
        <div className="lg:col-span-5 space-y-10 z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Target className="text-indigo-500 w-5 h-5" />
              <span className="text-indigo-500 font-space uppercase tracking-[0.4em] text-xs font-bold">
                Upcoming Prototype
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-space font-black uppercase italic text-white leading-[0.85] tracking-tighter">
              SINNER <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">ONE_X</span>
            </h2>
          </div>

          <p className="text-gray-500 text-lg max-w-md font-light leading-relaxed uppercase tracking-wide">
            The ultimate gasket-mount evolution. Featuring industrial grade aluminum and cinematic sound dampening.
          </p>

          {/* Indigo 500/20 Shadow Button */}
          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button className="bg-indigo-600 text-white px-10 py-4 font-space font-bold uppercase tracking-widest text-xs transition-all hover:bg-indigo-500 shadow-[0_10px_30px_rgba(99,102,241,0.2)] hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)]">
              Join Waitlist
            </button>
            <div className="flex items-center gap-4 text-white/40 font-bebas text-xl tracking-widest italic">
              <span>Limit: 01/50</span>
            </div>
          </div>
        </div>

        {/* RIGHT: MULTIPLE IMAGE SHOWCASE */}
        <div className="lg:col-span-7 relative group">

          {/* Main Large Image Container */}
          <div className="relative h-[400px] md:h-[650px] w-full overflow-hidden rounded-sm border border-white/5 bg-white/[0.02]">
            <div ref={mainImgRef} className="relative w-full h-full">
              <Image
                src={productImages[activeImg]}
                alt="Keyboard Showcase"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 w-full flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={() => setActiveImg((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                className="p-3 bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10 pointer-events-auto hover:bg-indigo-600 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setActiveImg((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))}
                className="p-3 bg-black/60 backdrop-blur-md text-white rounded-full border border-white/10 pointer-events-auto hover:bg-indigo-600 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Thumbnails (Angle Selection) */}
          <div className="absolute -bottom-10 right-0 flex gap-4 p-2 bg-[#050505] border-t border-l border-white/5">
            {productImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`relative w-20 h-20 md:w-28 md:h-28 cursor-pointer overflow-hidden border-2 transition-all duration-300 ${activeImg === idx ? "border-indigo-500 scale-105" : "border-white/5 opacity-40 hover:opacity-100"
                  }`}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          {/* Decorative Technical Lines */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-indigo-500/30 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-white/10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
};

export default UpcomingShowcase;