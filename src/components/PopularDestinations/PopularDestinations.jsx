"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plane } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./PopularDestinations.module.css";

export default function PopularDestinations() {
  const { popularDestinations: DESTINATIONS } = useSiteData();
  const [activeTab, setActiveTab] = useState("international");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  // GSAP scroll entrance animation for the header
  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      let mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        mm.add("(min-width: 768px)", () => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { autoAlpha: 0, y: 50 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
        });
      }, sectionRef);
    };
    initGSAP();
    return () => ctx?.revert();
  }, []);

  const carouselRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter destinations based on active tab
  const filteredDestinations = DESTINATIONS.filter((d) => d.type === activeTab);

  // Reset scroll position when tab changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [activeTab]);

  // JS-based continuous infinite scroll
  useEffect(() => {
    let animationFrameId;
    const scroll = () => {
      if (carouselRef.current && !isHovered) {
        carouselRef.current.scrollLeft += 1; // 1px per frame (approx 60px/s)
        
        // When we reach halfway (the end of the first original list), reset to 0
        // scrollWidth includes the duplicated list. So scrollWidth / 2 is the length of one list.
        if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth / 2) {
          carouselRef.current.scrollLeft -= carouselRef.current.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // We duplicate the list to create the infinite seamless loop
  const duplicatedDests = [...filteredDestinations, ...filteredDestinations];

  return (
    <section className={styles.section} ref={sectionRef} id="international">
      <div ref={headerRef} className={styles.header}>
        <h2 className={styles.title}>Popular Destinations</h2>
        <div className={styles.airplane}>
          <div className={styles.airplaneLine} />
          <Plane size={24} className={styles.airplaneIcon} />
          <div className={styles.airplaneLine} />
        </div>
      </div>

      {/* International / Domestic Toggle */}
      <div className={styles.toggleContainer}>
        <div className={styles.toggleTrack}>
          <button 
            className={`${styles.toggleButton} ${activeTab === 'international' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('international')}
          >
            International
          </button>
          <button 
            className={`${styles.toggleButton} ${activeTab === 'domestic' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('domestic')}
          >
            Domestic
          </button>
        </div>
      </div>

      {/* Infinite scroll carousel */}
      <div 
        className={styles.carousel} 
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className={styles.carouselTrack}>
          {duplicatedDests.map((dest, idx) => (
            <Link 
              href={dest.customRoute ? dest.customRoute : `/popular/${dest.slug}`}
              className={styles.card} 
              key={`${dest.id}-${idx}`}
              style={{ textDecoration: 'none' }}
            >
              {/* Full background image */}
              <div className={styles.cardImageBg}>
                <Image
                  src={dest.images?.[0] || dest.image}
                  alt={dest.city}
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  style={{ objectFit: "cover" }}
                />
                {/* Dark gradient overlay */}
                <div className={styles.cardOverlay} />
              </div>

              {/* Card content on top of image */}
              <div className={styles.cardContent}>
                {/* Top badges */}
                <div className={styles.cardBadges}>
                  <div className={styles.locationBadge}>
                    <span className={styles.flag}>{dest.flag}</span>
                    {dest.city}
                  </div>
                  <div className={styles.durationBadge}>{dest.duration}</div>
                </div>

                {/* Bottom content pushed down */}
                <div className={styles.cardBottom}>
                  {/* Title */}
                  <h3 className={styles.cardTitle}>{dest.title}</h3>

                  {/* Highlights */}
                  <div className={styles.cardHighlights}>
                    {dest.highlights.map((h, i) => (
                      <div className={styles.highlight} key={i}>
                        <span className={styles.highlightDot}>•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer: price + link */}
                  <div className={styles.cardFooter}>
                    <div className={styles.priceWrap}>
                      <span className={styles.price}>{dest.price}</span>
                      <span className={styles.priceSuffix}>
                        per person onwards
                      </span>
                    </div>
                    <span className={styles.viewLink}>
                      VIEW ITINERARY{" "}
                      <span className={styles.viewArrow}>→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
