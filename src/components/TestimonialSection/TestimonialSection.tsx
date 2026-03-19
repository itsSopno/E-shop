"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./TestimonialSection.module.scss";

const testimonials = [
  { id: 1, user: "Alex R.", text: "The latency is non-existent. Best keyboard I've ever used.", rating: 5 },
  { id: 2, user: "Sarah K.", text: "Stunning design and the switches feel incredible.", rating: 5 },
  { id: 3, user: "Mike T.", text: "Finally a brand that understands what gamers actually need.", rating: 5 },
  { id: 4, user: "Jordan P.", text: "The build quality is next level. Worth every penny.", rating: 5 },
  { id: 5, user: "Elena V.", text: "Love the customizability. Truly elite gear.", rating: 5 },
];

const TestimonialSection = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth;
    
    // Duplicate content for infinite loop
    marquee.innerHTML += marquee.innerHTML;

    gsap.to(marquee, {
      x: `-${scrollWidth}px`,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className="font-bebas">Trusted by <span>The Best</span></h2>
      </div>
      <div className={styles.marqueeWrapper}>
        <div ref={marqueeRef} className={styles.marquee}>
          {testimonials.map((t) => (
            <div key={t.id} className={styles.card}>
              <div className={styles.stars}>{"★".repeat(t.rating)}</div>
              <p>{"\""}{t.text}{"\""}</p>
              <span className={styles.user}>— {t.user}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
