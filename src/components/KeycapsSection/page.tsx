"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./KeycapsSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

interface Keycap {
  _id: string; // Updated from id to _id based on common Mongo structure or Vercel API
  name: string;
  image: string;
  description: string;
  price: number;
  brand: string;
}

const KeycapsSection = () => {
  const [keycaps, setKeycaps] = useState<Keycap[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://t-mark-4.vercel.app/api/keycaps");
        const data = await response.json();
        // Adjust based on API structure (usually it's { success: true, keycaps: [...] })
        setKeycaps(data.keycaps || data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching keycaps:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && keycaps.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".card_anim", {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        });

        ScrollTrigger.refresh();
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, keycaps]);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p className="font-bebas text-white/50 tracking-widest">Loading Arsenal...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={styles.section} id="keycaps">
      <div className={styles.titleWrapper}>
        <span className={styles.subtitle}>Limited Edition</span>
        <h2 className="font-bebas">Artisan Keycaps</h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {keycaps.map((item) => (
          <div key={item._id} className={`${styles.card} card_anim`}>
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className={styles.content}>
              <span className={styles.brand}>{item.brand}</span>
              <h3 className="font-bebas">{item.name}</h3>
              <p className={styles.description}>{item.description}</p>

              <div className={styles.footer}>
                <span className={styles.price}>${item.price}</span>
                <Link href={`/keycaps/${item._id}`} className={styles.viewBtn}>
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeycapsSection;
