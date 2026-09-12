"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ImageIcon, Star, ArrowLeft, MapPin, Calendar, Car, Wallet, AlertCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import styles from "./DestinationPage.module.css";
import { useSiteData } from "@/context/SiteDataContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function DestinationPage({ slug }) {
  const { exploreInternational, exploreDomestic } = useSiteData();
  const allDestinations = [...exploreInternational, ...exploreDomestic];
  const destination = allDestinations.find(
    (d) => d.name.toLowerCase() === slug.toLowerCase()
  );

  const bannerRef = useRef(null);
  const bannerTitleRef = useRef(null);
  const bannerTaglineRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Banner title entrance
        if (bannerTitleRef.current) {
          gsap.fromTo(
            bannerTitleRef.current,
            { autoAlpha: 0, y: 60, scale: 0.9 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
          );
        }

        // Banner tagline
        if (bannerTaglineRef.current) {
          gsap.fromTo(
            bannerTaglineRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.5 }
          );
        }

        // Itinerary cards stagger in with alternating sides
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const isEven = i % 2 === 0;
          gsap.fromTo(
            card,
            { autoAlpha: 0, x: isEven ? -80 : 80, y: 20 },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      });
    };
    if (destination) {
      initGSAP();
    }
    return () => ctx?.revert();
  }, [destination]);

  if (!destination) {
    return (
      <>
        <Navbar />
        <div className={styles.page} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
          <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>Destination Not Found</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>We couldn't find any travel packages for "{slug}".</p>
          <Link href="/" className={styles.backBtn} style={{ background: '#3b82f6', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none' }}>
            <ArrowLeft size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
            <span>Back to Home</span>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className={styles.page}>
      {/* Banner */}
      <section
        className={styles.banner}
        ref={bannerRef}
        style={{
          background: (destination.images?.[0] || destination.image) 
            ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${(destination.images?.[0] || destination.image)})` 
            : destination.bannerGradient || "var(--gradient-hero)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <div className={styles.bannerIcon}>
            <ImageIcon size={28} />
          </div>
          <h1
            className={styles.bannerTitle}
            ref={bannerTitleRef}
            style={{ visibility: "hidden" }}
          >
            {destination.name}
          </h1>
          <p
            className={styles.bannerTagline}
            ref={bannerTaglineRef}
            style={{ visibility: "hidden" }}
          >
            {destination.tagline}
          </p>
        </div>

        {/* Decorative wave */}
        <div className={styles.bannerWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
              fill="var(--color-paper, #FAF8F5)"
            />
          </svg>
        </div>
      </section>

      {/* Itineraries */}
      <section className={styles.itineraries} ref={cardsContainerRef}>
        <div className={styles.itinerariesContainer}>
          {(destination.itineraries || []).map((itin, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                className={`${styles.itinRow} ${isEven ? "" : styles.itinRowReversed}`}
                key={itin.id}
                ref={(el) => (cardRefs.current[i] = el)}
                style={{ visibility: "hidden" }}
              >
                {/* Info Card */}
                <div className={styles.itinCard}>
                  <div className={styles.itinCardHeader}>
                    <h3 className={styles.itinTitle}>{itin.title}</h3>
                  </div>

                  <div className={styles.itinDetails}>
                    <div className={styles.itinDetailRow}>
                      <span className={styles.itinLabel}>
                        <Calendar size={14} /> Days:
                      </span>
                      <span className={styles.itinValue}>{itin.days}</span>
                    </div>
                    <div className={styles.itinDetailRow}>
                      <span className={styles.itinLabel}>
                        <MapPin size={14} /> Pick-up:
                      </span>
                      <span className={styles.itinValue}>{itin.pickup}</span>
                    </div>
                    <div className={styles.itinDetailRow}>
                      <span className={styles.itinLabel}>
                        <Car size={14} /> Transfers:
                      </span>
                      <span className={styles.itinValue}>{itin.transfers}</span>
                    </div>
                    <div className={styles.itinDetailRow}>
                      <span className={styles.itinLabel}>
                        <Wallet size={14} /> Budget:
                      </span>
                      <span className={styles.itinValue}>{itin.budget}</span>
                    </div>
                    <div className={styles.itinDetailRow}>
                      <span className={styles.itinLabel}>Rating:</span>
                      <span className={styles.itinStars}>
                        {Array.from({ length: itin.rating }).map((_, si) => (
                          <Star key={si} size={14} className={styles.starIcon} />
                        ))}
                      </span>
                    </div>
                  </div>

                  <Link href={`/destinations/${slug}/${itin.id}`} className={styles.bookBtn}>View More</Link>
                </div>

                {/* Image Placeholder */}
                <div className={styles.itinImageWrap}>
                  <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    loop={true}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {(itin.images && itin.images.length > 0 ? itin.images : [itin.image || `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600&random=${i}`]).filter(Boolean).map((imgUrl, idx) => (
                      <SwiperSlide key={idx} style={{ width: "100%", height: "100%" }}>
                        <img
                          src={imgUrl}
                          alt={itin.title}
                          className={styles.itinImage}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
