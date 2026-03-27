// import React from "react";
// import Image from "next/image";
// import styles from "../Aboutt/aboutt.module.scss"
// import TechPartners from "../Pertner/Partner";

// interface Stat {
//     label: string;
//     value: string;
// }

// const stats: Stat[] = [
//     { label: "Products Launched", value: "24+" },
//     { label: "Community Members", value: "10K" },
//     { label: "Global Partners", value: "08" },
// ];

// const AboutPage: React.FC = () => {
//     return (
//         <>
//             <main className={styles.aboutWrapper}>
//                 {/* Hero Section */}
//                 <section className={styles.hero}>
//                     <div className="container mx-auto px-6 md:px-16">
//                         <div className={styles.heroContent}>
//                             <span className={styles.subtitle}>Our Story</span>
//                             <h1 className={styles.title}>
//                                 Engineering <br />
//                                 <span className="text-black">Performance</span> <br />
//                                 Through <span className={styles.italic}>Design.</span>
//                             </h1>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Philosophy Section */}
//                 <section className={styles.philosophy}>
//                     <div className="container mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-20">
//                         <div className={styles.imageBox}>
//                             <Image
//                                 src="https://i.pinimg.com/1200x/0b/38/24/0b3824e02cd454af2df5f78c623585bc.jpg" // Use one of your high-res setup shots here
//                                 alt="Our Workshop"
//                                 fill
//                                 className={styles.mainImg}
//                             />
//                             <div className={styles.signatureOverlay}><span className="font-creme text-9xl">SINNERS</span></div>
//                         </div>

//                         <div className={styles.textContent}>
//                             <h2 className={styles.secTitle}>The Philosophy</h2>
//                             <p className={styles.lead}>
//                                 We don’t just build peripherals; we craft tools for those who refuse to settle for the ordinary.
//                                 Born from a passion for racing and precision engineering.
//                             </p>
//                             <p className={styles.body}>
//                                 Every keypress matters. Every millisecond counts. Our mission is to bridge the gap between
//                                 human intent and digital execution, using materials that feel as good as they perform.
//                             </p>

//                             <div className={styles.statsGrid}>
//                                 {stats.map((stat, i) => (
//                                     <div key={i} className={styles.statItem}>
//                                         <span className={styles.statValue}>{stat.value}</span>
//                                         <span className={styles.statLabel}>{stat.label}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
//             </main>
//             <TechPartners></TechPartners>
//         </>
//     );
// };

// export default AboutPage;
// app/story/page.tsx
// app/story/page.tsx
import React from "react";
import Image from "next/image";

interface StorySectionProps {
    id: string;
    tag: string;
    title: string;
    description: string;
    imageSrc: string;
    reversed?: boolean;
    bgColor: string;
}

const StorySection = ({ id, tag, title, description, imageSrc, reversed, bgColor }: StorySectionProps) => (
    <section className={`${bgColor} py-24 px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]`}>
        <div className={`lg:col-span-6 ${reversed ? "lg:order-2" : ""}`}>
            <span className="text-neon-lime font-mono text-[10px] tracking-panel uppercase mb-4 block">
                {id} // {tag}
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-aggressive uppercase leading-tight mb-8">
                {title}
            </h2>
            <p className="text-silver/70 text-lg leading-relaxed max-w-xl">
                {description}
            </p>
        </div>
        <div className="lg:col-span-6 aspect-video relative group overflow-hidden bg-obsidian-high">
            <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-50 group-hover:opacity-100"
            />
            <div className="absolute top-4 right-4 bg-neon-lime text-black px-3 py-1 font-mono text-[8px] font-bold">
                STATUS_ACTIVE
            </div>
        </div>
    </section>
);

export default function LongStoryPage() {
    return (
        <main className="bg-obsidian-lowest text-white font-body selection:bg-neon-lime selection:text-black">

            {/* 1. HERO IMAGE: THE GENESIS */}
            <section className="relative h-screen flex flex-col justify-center p-8 lg:p-20 overflow-hidden bg-obsidian-lowest">
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image src="https://i.pinimg.com/1200x/c7/16/d5/c716d5cd729c74bc63fc0d211fe32c2b.jpg" alt="Studio Sinners Genesis" fill className="object-cover" priority />
                </div>
                <div className="relative z-10">
                    <h1 className="font-display text-4xl md:text-9xl font-black tracking-aggressive leading-none italic uppercase font-crenzo">
                        SINNERS_<span className="text-neon-lime">TECH</span>
                    </h1>
                    <div className="mt-12 flex items-center gap-6">
                        <div className="w-20 h-[2px] bg-neon-lime" />
                        <p className="font-mono text-xs tracking-widest text-silver/50 uppercase">
                            Since  2025
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. TECH IMAGE: THE INFRASTRUCTURE */}
            <StorySection
                id="01"
                tag="INFRASTRUCTURE"
                title="BUILT ON OBSIDIAN"
                description="Studio Sinners started not as a shop, but as a software powerhouse. We engineer MERN stack ecosystems and high-performance frontend architectures that prioritize speed and lethal aesthetics over conventional comfort."
                imageSrc="https://i.pinimg.com/1200x/71/ee/19/71ee193d20637fb71566feff928c24cd.jpg"
                bgColor="bg-obsidian-base"
            />

            {/* 3. CRAFT IMAGE: THE RAW MATERIAL */}
            <StorySection
                id="02"
                tag="MATERIAL_SCIENCE"
                title="RESIN & RITUAL"
                description="Our transition into artisan keycaps was a quest for tactile perfection. Every sculpt begins with premium resins, hand-mixed to capture the chaotic beauty of the void. This isn't just plastic; it's a physical extension of your digital intent."
                imageSrc="https://i.pinimg.com/736x/54/78/b6/5478b6591eb66e36e0d1902ad4a5c341.jpg"
                bgColor="bg-obsidian-low"
                reversed
            />

            {/* 4. DETAIL IMAGE: THE PRECISION */}
            <StorySection
                id="03"
                tag="PRECISION_GRIDS"
                title="THE 0PX PHILOSOPHY"
                description="In our tech world and our keycaps, we reject rounded corners. We embrace the sharp, the precise, and the absolute. Every edge is checked against our 'Obsidian Edge' standard—lethal precision for elite setups."
                imageSrc="https://i.pinimg.com/736x/1a/09/66/1a0966d101c3682b18728c05e5241ea3.jpg"
                bgColor="bg-obsidian-base"
            />

            {/* 5. COMMUNITY IMAGE: THE SYNDICATE */}
            <StorySection
                id="04"
                tag="GLOBAL_UPLINK"
                title="BEYOND HARDWARE"
                description="Studio Sinners is a digital ecosystem. From our HR and asset management systems (AssetVerse) to our fashion platforms (NEZIN), we build tools that empower the modern digital nomad."
                imageSrc="https://i.pinimg.com/736x/ba/ba/af/babaaf16391fc7d5b8b1e652b9611178.jpg"
                bgColor="bg-obsidian-low"
                reversed
            />

            {/* 6. FINAL IMAGE: THE FUTURE */}
            {/* <section className="bg-obsidian-lowest py-32 px-8 text-center border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="w-16 h-16 border-2 border-neon-lime mx-auto mb-12 flex items-center justify-center">
                        <div className="w-2 h-2 bg-neon-lime animate-pulse" />
                    </div>
                    <h2 className="font-display text-6xl md:text-8xl font-black tracking-aggressive uppercase italic mb-12">
                        STAY_<span className="text-white/20">CONNECTED</span>
                    </h2>
                    <div className="relative aspect-[21/9] w-full mb-16 grayscale">
                        <Image src="/future-horizon.jpg" alt="The Future" fill className="object-cover" />
                    </div>
                    <button className="bg-neon-lime text-black px-16 py-8 font-display font-black tracking-[8px] text-2xl uppercase hover:shadow-[0_0_60px_rgba(195,244,0,0.5)] transition-all rounded-none">
                        INITIATE_SCAN
                    </button>
                </div>
            </section> */}

        </main>
    );
}