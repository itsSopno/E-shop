"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import TechPartners from "@/components/Pertner/Partner";
import TopProducts from "@/components/TopProduct/product";
// sections to be stacked in the loader
const loaderSections = [
    { id: 1, component: <Footer /> },
    { id: 2, component: <TechPartners /> },
    { id: 3, component: <TopProducts /> },
    { id: 4, component: <Hero /> },
];

const OchiComponentLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [percent, setPercent] = useState(0);
    const loaderRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Percentage counter animation
        tl.to({}, {
            duration: 4,
            ease: "power2.inOut",
            onUpdate: function () {
                setPercent(Math.floor(this.progress() * 100));
            },
        });

        // 2. Card stacking animation
        tl.fromTo(".loader-card",
            { y: "100vh", rotationX: 10 },
            {
                y: (index) => `${index * 15}px`, // slight vertical gap between cards
                rotationX: 0,
                duration: 1.5,
                stagger: 0.5,
                ease: "expo.inOut"
            },
            0
        );

        // 3. Final exit animation
        tl.to(loaderRef.current, {
            yPercent: -100,
            duration: 1.5,
            ease: "expo.inOut",
            delay: 0.5,
            onComplete: onComplete,
        });
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-[#000] overflow-hidden perspective-1000">
            {/* Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-10">
                {loaderSections.map((section, index) => (
                    <div
                        key={section.id}
                        className="loader-card absolute w-[95%] h-[85%] md:w-[85%] md:h-[90%] overflow-hidden rounded-t-[30px]"
                        style={{ zIndex: index + 1 }}
                    >
                        {section.component}

                        {/* অপশনাল: শেষ কার্ডে পারসেন্টেজ (আপনার ইমেজের মতো) */}
                        {index === loaderSections.length - 1 && (
                            <div className="absolute bottom-10 right-10 flex items-end gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                                <div className="font-bebas text-7xl md:text-[10vw] leading-none text-black tracking-tighter">
                                    {percent}%
                                </div>
                            </div>
                        )}
                    </div>
                ))}

            </div>

            <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
        </div>
    );
};

export default OchiComponentLoader;