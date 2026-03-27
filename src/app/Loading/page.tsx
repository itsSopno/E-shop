"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";
import TopProducts from "@/components/TopProduct/product";
import AboutPage from "@/components/Aboutt/aboutt";
// sections to be stacked in the loader
const loaderSections = [
    { id: 1, component: <Footer /> },
    { id: 2, component: <AboutPage></AboutPage> },
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

        // 3. Final reveal exit animation
        tl.to(".loader-card:not(:last-child)", {
            y: "100vh",
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "expo.inOut"
        }, "+=0.5");

        tl.to(".loader-card:last-child", {
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            borderRadius: 0,
            duration: 1.2,
            ease: "expo.inOut"
        }, "-=0.8");

        tl.to(loaderRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: onComplete,
        }, "+=0.2");
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-[#000] overflow-hidden perspective-1000">
            {/* Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center p-0">
                {loaderSections.map((section, index) => (
                    <div
                        key={section.id}
                        className="loader-card absolute w-[95%] h-[85%] md:w-[85%] md:h-[90%] overflow-hidden rounded-[30px]"
                        style={{
                            zIndex: index + 1,
                            transformOrigin: "center center"
                        }}
                    >
                        {section.component}

                        {/* Percentage on the last card */}
                        {index === loaderSections.length - 1 && (
                            <div className="absolute bottom-10 right-10 flex items-end gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl z-[100]">
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