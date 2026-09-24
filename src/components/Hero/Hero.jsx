"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, Users, Map, Briefcase, Star } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./Hero.module.css";

export default function Hero() {
  const { hero } = useSiteData();
  const DESTINATIONS = hero?.destinations || ["Bali", "Kashmir", "Vietnam", "Japan"];
  const REVIEWS = hero?.reviews || [];
  const [destIndex, setDestIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDestIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [DESTINATIONS.length]);

  return (
    <section className={styles.hero} id="home">
      {/* Background Image with Overlay */}
      <div className={styles.heroBg}>
        <Image
          src={hero.backgroundImage}
          alt="Mountains Background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Main Content Area */}
      <div className={styles.heroContent}>
        {/* Left Column: Text & Search */}
        <div className={styles.leftCol}>
          <h1 className={styles.headline}>
            Book Your{" "}
            <span className={styles.inlineImageWrapper}>
              <Image
                src={hero.backgroundImage}
                alt="Travel"
                fill
                className={styles.inlineImage}
              />
            </span>
            <br />
            Trip to{" "}
            <span className={styles.animatedDestContainer}>
              {DESTINATIONS.map((dest, i) => (
                <span
                  key={`${dest}-${i}`}
                  className={`${styles.animatedDest} ${i === destIndex ? styles.activeDest : ""}`}
                >
                  {dest}
                </span>
              ))}
            </span>
          </h1>

          <div className={styles.subtextContainer}>
            <p className={styles.greenSubtext}>
              <span className={styles.whiteWord}>Buzzingers</span> | Explore | Experience | Repeat
            </p>
            <p className={styles.whiteSubtext}>
              Travel Together, Create Memories Forever<br />
              #buzzingers
            </p>
          </div>

          <div className={styles.searchWrapper}>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Type Location... (mi"
                className={styles.searchInput}
              />
              <button className={styles.searchBtn}>Search</button>
            </div>
            {/* Hand drawn arrow pointing to search */}
            <svg
              className={styles.drawnArrow}
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M70 15 C85 20, 95 40, 80 60 C65 80, 20 85, 10 90 M10 90 L15 75 M10 90 L25 95" stroke="#93C116" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Right Column: Reviews */}
        <div className={styles.rightCol}>
          <div className={styles.reviewsContainer}>
            <div className={styles.reviewsScroll}>
              {/* Duplicate array for seamless looping */}
              {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                <div key={idx} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewName}>{review.name}</div>
                    <div className={styles.stars}>
                      <Star fill="#f59e0b" color="#f59e0b" size={14} />
                      <Star fill="#f59e0b" color="#f59e0b" size={14} />
                      <Star fill="#f59e0b" color="#f59e0b" size={14} />
                      <Star fill="#f59e0b" color="#f59e0b" size={14} />
                      <Star fill="#f59e0b" color="#f59e0b" size={14} />
                    </div>
                  </div>
                  <div className={styles.reviewText} dangerouslySetInnerHTML={{ __html: (review.text || '').replace(/&nbsp;/g, ' ') }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Section */}
      <div className={styles.statsSection}>
        {(hero?.stats || []).map((stat, idx) => {
          const icons = [MessageSquare, Users, Map, Briefcase];
          const Icon = icons[idx] || Briefcase;
          return (
            <div key={idx} style={{ display: 'contents' }}>
              {idx > 0 && <div className={styles.statDivider}></div>}
              <div className={styles.statBlock}>
                <Icon className={styles.statIcon} size={32} />
                <div className={styles.statText}>
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
