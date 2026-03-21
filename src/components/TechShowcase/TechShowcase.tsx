"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // Longer scroll for the assembly
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // The "Explosion" to "Assembly" sequence
      tl.from(".layer-1", { y: -400, opacity: 0, rotateX: 45, scale: 1.5 })
        .from(".layer-2", { y: -200, opacity: 0, rotateX: 45, scale: 1.2 }, "-=0.5")
        .from(".layer-3", { y: 200, opacity: 0, rotateX: -45, scale: 0.8 }, "-=0.5")
        .to(".text-content", { y: -50, opacity: 1, duration: 0.5 }, "-=1")
        // Final "Snap" into place
        .to(".layer", { y: 0, rotateX: 0, scale: 1, stagger: 0.05, ease: "back.out(1.7)" })
        .to(sectionRef.current, { backgroundColor: "#0A0A0A", duration: 0.5 }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#FDFDFD] overflow-hidden transition-colors duration-700">
      <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12 gap-16">

        {/* ── LEFT: SPECS ── */}
        <div className="text-content opacity-0 w-full lg:w-[40%] z-20 pointer-events-none">
          <h2 className="font-bebas text-[clamp(4rem,8vw,7rem)] leading-none text-black mix-blend-difference mb-6">
            ENGINEERED <br /> <span className="text-[#CCFF00]">ELITE</span>
          </h2>

          <div className="space-y-8 border-l-2 border-[#CCFF00] pl-6">
            <div className="group">
              <h4 className="font-bebas text-2xl text-gray-400 group-hover:text-black transition-colors">Gasket Mount</h4>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Poron dampening for marble sound</p>
            </div>
            <div className="group">
              <h4 className="font-bebas text-2xl text-gray-400 group-hover:text-black transition-colors">Artisan Housing</h4>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Hand-polished resin exterior</p>
            </div>
            <div className="group">
              <h4 className="font-bebas text-2xl text-gray-400 group-hover:text-black transition-colors">Zero Latency</h4>
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">8000Hz Polling rate PCB</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: EXPLODED 3D LAYERS ── */}
        <div className="relative w-full lg:w-[60%] h-[500px] lg:h-[700px] perspective-1000 flex items-center justify-center">
          <div ref={layersRef} className="relative w-full max-w-[500px] aspect-square transform-style-3d">

            {/* LAYER 1: The Artisan Keycaps (Top) */}
            <div className="layer layer-1 absolute inset-0 z-30 drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white">
                    <Image src="https://i.pinimg.com/1200x/ad/f8/2d/adf82db538dda3b52c788333f043fe54.jpg" alt="Keycap 1" fill className="object-cover" />
                  </div>
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white translate-y-8">
                    <Image src="https://i.pinimg.com/1200x/23/b1/2d/23b12da7f92b8d7cab9514e485b700be.jpg" alt="Keycap 2" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* LAYER 2: The PCB (Middle) */}
            <div className="layer layer-2 absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-[90%] h-[60%] bg-zinc-900 rounded-lg border border-zinc-700 shadow-xl flex flex-col p-6 overflow-hidden">
                <div className="flex justify-between items-center opacity-20 mb-4">
                  <div className="h-2 w-2 rounded-full bg-[#CCFF00]" />
                  <div className="h-[1px] flex-1 mx-4 bg-zinc-700" />
                  <div className="h-2 w-2 rounded-full bg-[#CCFF00]" />
                </div>
                <div className="grid grid-cols-10 gap-2 opacity-10">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-white rounded-sm" />
                  ))}
                </div>
                <p className="absolute bottom-4 right-6 font-bebas text-zinc-500 text-sm tracking-widest">SINNERS_PCB_V2</p>
              </div>
            </div>

            {/* LAYER 3: The Case (Base) */}
            <div className="layer layer-3 absolute inset-0 z-10 flex items-center justify-center">
              <div className="w-full h-[70%] bg-zinc-200 rounded-[2rem] shadow-2xl border-b-[12px] border-zinc-400 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 { perspective: 1500px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
};

export default TechShowcase;