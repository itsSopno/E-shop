"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// আপনার স্ক্রিনশটগুলোর পাথ এখানে দিন
const sectionImages = [
    "https://i.postimg.cc/d0zNLgzP/Sinners-Official-Store-Mozilla-Firefox-3-25-2026-7-01-20-PM.png",
    "https://i.postimg.cc/g22T5VvR/Sinners-Official-Store-Mozilla-Firefox-3-25-2026-7-01-09-PM.png",
    "https://i.postimg.cc/brf5F4TD/Sinners-Official-Store-Mozilla-Firefox-3-25-2026-7-00-07-PM.png",
    "https://i.postimg.cc/VkfxwQcG/Sinners-Official-Store-Mozilla-Firefox-3-25-2026-6-59-53-PM.png",
];

const OchiImageStackLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [percent, setPercent] = useState(0);
    const loaderRef = useRef(null);
    const cardContainerRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // ১. কাউন্টার এনিমেশন (০ থেকে ১০০)
        tl.to({}, {
            duration: 4, // ইমেজ লোড হতে একটু সময় বেশি লাগতে পারে
            ease: "none",
            onUpdate: function () {
                setPercent(Math.floor(this.progress() * 100));
            },
        });

        // ২. কার্ড স্ট্যাকিং এনিমেশন (একটার পর একটা ইমেজ স্লাইড হয়ে আসবে)
        tl.fromTo(".loader-card",
            { y: "100vh", rotationX: 15 }, // একটু থ্রিডি ইফেক্ট
            { y: 0, rotationX: 0, duration: 1.2, stagger: 0.5, ease: "expo.inOut" },
            0.2
        );

        // ৩. ফাইনাল এক্সিট (পুরো স্ট্যাক উপরে উঠে যাবে)
        tl.to(loaderRef.current, {
            y: "-100%",
            duration: 1.5,
            ease: "expo.inOut",
            delay: 0.8,
            onComplete: onComplete,
        });
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-[#000] overflow-hidden perspective-1000">

            {/* Cards Stack Container */}
            <div ref={cardContainerRef} className="relative w-full h-full flex items-center justify-center p-4 md:p-10">

                {sectionImages.map((imgSrc, index) => (
                    <div
                        key={index}
                        className="loader-card absolute w-[90%] h-[80%] md:w-[80%] md:h-[85%] bg-white rounded-[25px] md:rounded-[40px] shadow-2xl overflow-hidden border border-black/5"
                        style={{
                            zIndex: index + 1,
                            // কার্ডগুলোর মধ্যে একটু গ্যাপ (Offset) তৈরির জন্য
                            top: `${(index + 1) * 20}px`,
                            transformOrigin: "bottom center"
                        }}
                    >
                        {/* স্ক্রিনশট ইমেজ */}
                        <img
                            src={imgSrc}
                            alt={`Section ${index + 1}`}
                            className="w-full h-full object-cover object-top"
                        />

                        {/* অপশনাল: উপরের কার্ডে পারসেন্টেজ দেখানো (আপনার ইমেজের মতো) */}
                        {index === sectionImages.length - 1 && (
                            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg flex items-end gap-2">
                                <div className="flex flex-col items-end">
                                    <span className="text-black/40 font-mono text-[10px] uppercase tracking-widest">Loading</span>
                                    <div className="w-20 h-[1px] bg-black/10 relative">
                                        <div className="absolute h-full bg-black transition-all duration-300" style={{ width: `${percent}%` }} />
                                    </div>
                                </div>
                                <div className="text-5xl md:text-8xl font-bebas font-black leading-none text-[#212121] tracking-tighter">
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

export default OchiImageStackLoader;