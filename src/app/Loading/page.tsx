
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import Image from "next/image";
// import img1 from './hero.png'
// import img2 from './2nd.png'
// import img3 from './3rd.png'
// import img4 from './4th.png'
// import img5 from './brand.png'
// const loaderImages = [
//     { id: 1, src: img4, alt: "Archive 01" },
//     { id: 2, src: img3, alt: "Archive 02" },
//     { id: 3, src: img2, alt: "Archive 03" },
//     { id: 4, src: img1, alt: "Studio Sinners" },
//     { id: 5, src: img5, alt: "store" }
// ];

// const OchiComponentLoader = ({ onComplete }: { onComplete: () => void }) => {
//     const [percent, setPercent] = useState(0);
//     const loaderRef = useRef(null);

//     useEffect(() => {
//         const tl = gsap.timeline();

//         // ১. পার্সেন্টেজ কাউন্টার এনিমেশন
//         tl.to({}, {
//             duration: 3.5,
//             ease: "power2.inOut",
//             onUpdate: function () {
//                 setPercent(Math.floor(this.progress() * 100));
//             },
//         });

//         // ২. কার্ড স্ট্যাকিং এনিমেশন (Responsive Y Offset)
//         tl.fromTo(".loader-card",
//             { y: "110vh", rotationX: 15 },
//             {
//                 y: (index) => `${index * -10}px`, // নেগেটিভ ভ্যালু দিলে কার্ডগুলো একে অপরের উপরে সুন্দর দেখাবে
//                 rotationX: 0,
//                 duration: 1.5,
//                 stagger: 0.4,
//                 ease: "expo.inOut"
//             },
//             0
//         );

//         // ৩. এক্সিট এনিমেশন (লাস্ট কার্ড বাদে বাকিগুলো নিচে চলে যাবে)
//         tl.to(".loader-card:not(:last-child)", {
//             y: "110vh",
//             opacity: 0,
//             duration: 1,
//             stagger: 0.1,
//             ease: "expo.inOut"
//         }, "+=0.3");

//         // ৪. লাস্ট কার্ড ফুল স্ক্রিন হওয়া
//         tl.to(".loader-card:last-child", {
//             width: "100vw",
//             height: "100vh",
//             borderRadius: "0px",
//             duration: 1.2,
//             ease: "expo.inOut"
//         }, "-=0.7");

//         tl.to(loaderRef.current, {
//             opacity: 0,
//             duration: 0.5,
//             onComplete: onComplete,
//         }, "+=0.2");

//     }, [onComplete]);

//     return (
//         <div ref={loaderRef} className="fixed inset-0 z-[99999] bg-[#050505] overflow-hidden perspective-2000">
//             <div className="relative w-full h-full flex items-center justify-center">
//                 {loaderImages.map((image, index) => (
//                     <div
//                         key={image.id}
//                         className="loader-card absolute w-[85%] h-[50%] md:w-[60%] md:h-[75%] overflow-hidden rounded-[24px] md:rounded-[40px] backdrop-blur-md"
//                         style={{
//                             zIndex: index + 1,
//                             transformOrigin: "bottom center"
//                         }}
//                     >
//                         {/* Next.js Optimized Image */}
//                         <Image
//                             src={image.src}
//                             alt={image.alt}
//                             fill
//                             className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
//                             priority
//                         />

//                         {/* গ্রেডিয়েন্ট ওভারলে যাতে পার্সেন্টেজ বোঝা যায় */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//                         {/* পার্সেন্টেজ ডিসপ্লে (শুধুমাত্র লাস্ট কার্ডে) */}
//                         {index === loaderImages.length - 1 && (
//                             <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-[100]">
//                                 <div className="flex flex-col items-end">
//                                     <span className="text-[10px] md:text-xs font-mono tracking-[5px] text-[#D9FF00] uppercase mb-2">
//                                         Loading_System
//                                     </span>
//                                     <div className="font-bebas text-[20vw] md:text-[12vw] leading-[0.8] text-[#D9FF00] tracking-tighter shadow-sm">
//                                         {percent}%
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>

//             <style jsx global>{`
//                 .perspective-2000 { perspective: 2000px; }
//             `}</style>
//         </div>
//     );
// };

// 
"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import img1 from './hero.png'
import img2 from './2nd.png'
import img3 from './3rd.png'
import img4 from './4th.png'
import img5 from './brand.png'

const OchiComponentLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [percent, setPercent] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);

    // ১. মেমোরি বাঁচানোর জন্য ইমেজ অ্যারে মেমোরাইজ করা
    const loaderImages = useMemo(() => [
        { id: 1, src: img4, alt: "Archive 01" },
        { id: 2, src: img3, alt: "Archive 02" },
        { id: 3, src: img2, alt: "Archive 03" },
        { id: 4, src: img1, alt: "Studio Sinners" },
        { id: 5, src: img5, alt: "Store" }
    ], []);

    useEffect(() => {
        // ২. CSS স্তরে পারফরম্যান্স বুস্ট (GPU Acceleration)
        const style = document.createElement("style");
        style.textContent = `
            .perspective-2000 { perspective: 2000px; }
            .loader-card { 
                will-change: transform, opacity; 
                backface-visibility: hidden;
                transform: translateZ(0); 
            }
        `;
        document.head.appendChild(style);

        // ৩. GSAP Context ব্যবহার (React-এর জন্য বেস্ট প্র্যাকটিস)
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "expo.inOut", force3D: true }
            });

            // পার্সেন্টেজ আপডেট (অপ্টিমাইজড)
            tl.to({}, {
                duration: 3,
                onUpdate: function () {
                    const p = Math.round(this.progress() * 100);
                    // অপ্রয়োজনীয় স্টেট আপডেট কমাতে কন্ডিশন
                    setPercent((prev) => (prev !== p ? p : prev));
                },
            });

            // কার্ড এনিমেশন
            tl.fromTo(".loader-card",
                { y: "100vh", rotationX: 10, opacity: 0 },
                {
                    y: (i) => `${i * -5}px`, // পিক্সেল ভ্যালু কমানো হয়েছে
                    rotationX: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.25,
                },
                0
            );

            // এক্সিট সিকোয়েন্স
            tl.to(".loader-card:not(:last-child)", {
                y: "100vh",
                opacity: 0,
                duration: 0.8,
                stagger: 0.04,
            }, "+=0.2");

            tl.to(".loader-card:last-child", {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                duration: 1,
            }, "-=0.5");

            tl.to(loaderRef.current, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    // Ensure the overlay doesn't block any clicks after it fades out
                    if (loaderRef.current) {
                        loaderRef.current.style.pointerEvents = "none";
                        loaderRef.current.style.display = "none";
                    }
                    onComplete();
                },
            }, "+=0.1");

        }, loaderRef);

        return () => {
            ctx.revert(); // ক্লিনআপ
            style.remove();
        };
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-[99999] bg-black overflow-hidden perspective-2000 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
                {loaderImages.map((image, index) => (
                    <div
                        key={image.id}
                        className="loader-card absolute w-[80%] h-[50%] md:w-[60%] md:h-[70%] overflow-hidden rounded-[20px] md:rounded-[40px]"
                        style={{ zIndex: index + 1 }}
                    >
                        <div className="relative w-full h-full p-4 md:p-12">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 80vw, 60vw"
                                className="object-contain"
                                priority={index >= loaderImages.length - 2}
                                quality={60}
                            />
                        </div>

                        {index === loaderImages.length - 1 && (
                            <div className="absolute bottom-6 right-8 md:bottom-12 md:right-12 z-[100]">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-mono tracking-[4px] text-[#D9FF00] uppercase mb-1 opacity-50">
                                    </span>
                                    <div className="font-bebas text-[20vw] md:text-[10vw] leading-none text-[#D9FF00] tracking-tighter shadow-2xl">
                                        {percent}%
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OchiComponentLoader;