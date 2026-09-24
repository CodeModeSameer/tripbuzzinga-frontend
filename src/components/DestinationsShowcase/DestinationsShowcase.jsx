"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./DestinationsShowcase.module.css";

export default function DestinationsShowcase() {
  const { exploreInternational: INTERNATIONAL, exploreDomestic: DOMESTIC } = useSiteData();
  const [activeTab, setActiveTab] = useState("international");
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  const destinations = activeTab === "international" ? INTERNATIONAL : DOMESTIC;

  // Header entrance animation
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
            { autoAlpha: 0, y: 40 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
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

  // Animate items in when tab changes
  const animateItemsIn = useCallback(async () => {
    const { gsap } = await import("gsap");

    // Reset refs for new items
    const validItems = itemRefs.current.filter(Boolean);
    const validImages = imageRefs.current.filter(Boolean);
    const validTexts = textRefs.current.filter(Boolean);

    if (validItems.length === 0) return;

    // Stagger items in with alternating slide directions
    validItems.forEach((item, i) => {
      const isReversed = i % 2 !== 0;
      const imageEl = validImages[i];
      const textEl = validTexts[i];

      if (imageEl) {
        gsap.fromTo(
          imageEl,
          { autoAlpha: 0, x: isReversed ? 40 : -40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: i * 0.05,
          }
        );
      }

      if (textEl) {
        gsap.fromTo(
          textEl,
          { autoAlpha: 0, x: isReversed ? -40 : 40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: i * 0.05 + 0.05,
          }
        );
      }
    });
  }, []);

  // Handle tab switch with exit → enter animation
  const handleTabSwitch = useCallback(
    async (newTab) => {
      if (newTab === activeTab || isAnimating) return;
      setIsAnimating(true);

      const { gsap } = await import("gsap");

      // Animate OUT current items
      const currentItems = itemRefs.current.filter(Boolean);
      if (currentItems.length > 0) {
        await gsap.to(currentItems, {
          autoAlpha: 0,
          y: 15,
          duration: 0.2,
          stagger: 0.03,
          ease: "power2.inOut",
        });
      }

      // Switch tab (triggers re-render)
      setActiveTab(newTab);
    },
    [activeTab, isAnimating]
  );

  // After tab change causes re-render, animate new items in
  useEffect(() => {
    if (!isAnimating) return;

    // Small delay to allow React to render new items
    const timer = setTimeout(async () => {
      await animateItemsIn();
      setIsAnimating(false);
    }, 10);

    return () => clearTimeout(timer);
  }, [activeTab, isAnimating, animateItemsIn]);

  // Initial entrance animation on scroll
  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      let mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        mm.add("(min-width: 768px)", () => {
        const validItems = itemRefs.current.filter(Boolean);
        validItems.forEach((item, i) => {
          const isReversed = i % 2 !== 0;
          const imageEl = imageRefs.current[i];
          const textEl = textRefs.current[i];

          if (imageEl) {
            gsap.fromTo(
              imageEl,
              { autoAlpha: 0, x: isReversed ? 80 : -80 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: item, start: "top 80%" },
              }
            );
          }

          if (textEl) {
            gsap.fromTo(
              textEl,
              { autoAlpha: 0, x: isReversed ? -80 : 80 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.15,
                scrollTrigger: { trigger: item, start: "top 80%" },
              }
            );
          }
        });
        });
      }, sectionRef);
    };
    initGSAP();
    return () => ctx?.revert();
    // Only run on first mount

  }, []);

  return (
    <section className={styles.section} ref={sectionRef} id="explore">
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.title}>Explore Destinations</h2>
          <p className={styles.subtitle}>
            Handpicked locations to inspire your next adventure
          </p>

          {/* Creative Toggle */}
          <div className={styles.toggleWrap}>
            <div className={styles.toggle}>
              {/* Sliding pill indicator */}
              <div
                className={`${styles.togglePill} ${
                  activeTab === "domestic"
                    ? styles.togglePillRight
                    : ""
                }`}
              />

              <button
                className={`${styles.toggleBtn} ${
                  activeTab === "international" ? styles.toggleBtnActive : ""
                }`}
                onClick={() => handleTabSwitch("international")}
                disabled={isAnimating}
              >
                <Globe size={16} />
                <span>International</span>
              </button>

              <button
                className={`${styles.toggleBtn} ${
                  activeTab === "domestic" ? styles.toggleBtnActive : ""
                }`}
                onClick={() => handleTabSwitch("domestic")}
                disabled={isAnimating}
              >
                <MapPin size={16} />
                <span>Domestic</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.items} ref={itemsContainerRef}>
          {destinations.slice(0, 4).map((dest, i) => (
            <div
              className={`${styles.item} ${i % 2 !== 0 ? styles.itemReversed : ""}`}
              key={dest.id}
              ref={(el) => (itemRefs.current[i] = el)}
            >
              {/* Image */}
              <div
                className={styles.imageWrap}
                ref={(el) => (imageRefs.current[i] = el)}
              >
                <div className={styles.imageContainer}>
                  
                  <Swiper
                    modules={[Autoplay, EffectFade, Pagination]}
                    effect="fade"
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    loop={(dest.images || [dest.image]).filter(Boolean).length > 1}
                    className="destinationSwiper"
                    style={{ width: "100%", height: "100%" }}
                  >
                    {(dest.images || [dest.image]).filter(Boolean).map((imgUrl, idx) => (
                      <SwiperSlide key={idx} style={{ width: "100%", height: "100%", position: "relative" }}>
                        <Image 
                          src={imgUrl}
                          alt={dest.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                </div>
              </div>

              {/* Text */}
              <div
                className={styles.textContent}
                ref={(el) => (textRefs.current[i] = el)}
              >
                <h3 className={styles.destName}>{dest.name}</h3>
                <div 
                  className={styles.destDesc} 
                  dangerouslySetInnerHTML={{ __html: (dest.desc || '').replace(/&nbsp;/g, ' ') }} 
                />
                <Link href={`/destinations/${dest.name.toLowerCase()}`} className={styles.exploreLink}>
                  Explore {dest.name}
                  <ArrowRight size={16} className={styles.exploreLinkArrow} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        {destinations.length > 4 && (
          <div className={styles.viewMoreContainer}>
            <Link 
              href="/destinations"
              className={styles.viewMoreBtn}
            >
              View more
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
