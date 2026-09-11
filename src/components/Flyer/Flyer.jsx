"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./Flyer.module.css";

export default function Flyer() {
  const { flyer: flyers } = useSiteData(); // Now it's an array
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(flyers) || flyers.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % flyers.length;
        if (scrollRef.current) {
          const width = scrollRef.current.clientWidth;
          scrollRef.current.scrollTo({ left: width * nextIndex, behavior: "smooth" });
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [flyers]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.flyerSection}>
      <div className={styles.container}>
        <div
          className={styles.carouselContainer}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {Array.isArray(flyers) && flyers.map((f, i) => (
            <Link key={f.id || i} href={f.linkUrl} className={styles.flyerLink}>
              <div className={styles.flyerWrapper}>
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className={styles.flyerImage}
                />
                <div className={styles.flyerOverlay}>
                  <div className={styles.flyerContent}>
                    <span className={styles.earlyBirdBadge}>{f.badge}</span>
                    <h2 className={styles.flyerTitle}>{f.title}</h2>
                    <h3 className={styles.flyerSubtitle}>{f.subtitle}</h3>
                    <div className={styles.discountBadge}>
                      <span className={styles.discountText}>{f.discountLabel}</span>
                      <span className={styles.discountAmount}>{f.discountAmount}</span>
                    </div>
                  </div>
                  <button className={styles.viewTripsBtn}>VIEW ALL TRIPS</button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className={styles.pagination}>
          {Array.isArray(flyers) && flyers.map((_, idx) => (
            <span
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`${styles.dot} ${activeIndex === idx ? styles.activeDot : ''}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
