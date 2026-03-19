"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./TechShowcase.module.scss";

gsap.registerPlugin(ScrollTrigger);

const TechShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const part3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
          pin: true,
        }
      });

      // Assembly animation
      tl.from(part1Ref.current, { y: -200, opacity: 0, scale: 0.8 })
        .from(part2Ref.current, { x: 200, opacity: 0 }, "-=0.2")
        .from(part3Ref.current, { x: -200, opacity: 0 }, "-=0.2")
        .to(keyboardRef.current, { rotationY: 15, duration: 1 })
        .to(sectionRef.current, { backgroundColor: "#1A1A1A", duration: 1 }, "-=1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.textSide}>
          <h2 className="font-bebas">Engineered for <span>Elite</span></h2>
          <p>Every layer designed for zero latency and maximum tactile response.</p>
          <div className={styles.features}>
            <div className={styles.feat}>
              <h4>Gasket Mount</h4>
              <p>Superior sound and feel.</p>
            </div>
            <div className={styles.feat}>
              <h4>Hot Swappable</h4>
              <p>Customize your experience.</p>
            </div>
          </div>
        </div>

        <div className={styles.visualSide}>
          <div ref={keyboardRef} className={styles.keyboardBody}>
            <div ref={part1Ref} className={styles.part1}>PCB</div>
            <div ref={part2Ref} className={styles.part2}>Switches</div>
            <div ref={part3Ref} className={styles.part3}>Plate</div>
            <div className={styles.base}>Case</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
