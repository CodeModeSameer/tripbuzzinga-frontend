"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Star, ArrowLeft, MapPin, Calendar, Car, Wallet, AlertCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";
import styles from "./SharedDestinationLayout.module.css";
import Navbar from "@/components/Navbar/Navbar";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";
import Footer from "@/components/Footer/Footer";

/* ── Tiny sub‑component for itinerary detail rows ── */
const DetailRow = ({ icon: Icon, label, value }) => (
  <div className={styles.itinDetailRow}>
    <span className={styles.itinLabel}>
      {Icon && <Icon size={14} />} {label}
    </span>
    <span className={styles.itinValue}>{value}</span>
  </div>
);

export default function SharedDestinationLayout({ destination, basePath }) {
  const bannerTitleRef = useRef(null);
  const bannerTaglineRef = useRef(null);
  const cardRefs = useRef([]);

  const bannerBg = useMemo(() => {
    const img = destination?.images?.[0] || destination?.image;
    if (img) return `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${img})`;
    return destination?.bannerGradient || "var(--gradient-hero)";
  }, [destination]);

  /* ── Desktop‑only GSAP entrance animations ── */
  useEffect(() => {
    if (!destination) return;
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        // Desktop animation
        mm.add("(min-width: 768px)", () => {
          if (bannerTitleRef.current) {
            gsap.fromTo(bannerTitleRef.current,
              { autoAlpha: 0, y: 60, scale: 0.9 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
            );
          }
          if (bannerTaglineRef.current) {
            gsap.fromTo(bannerTaglineRef.current,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.5 }
            );
          }
          cardRefs.current.filter(Boolean).forEach((card, i) => {
            gsap.fromTo(card,
              { autoAlpha: 0, x: i % 2 === 0 ? -80 : 80, y: 20 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 85%" } }
            );
          });
        });

        // Mobile animation
        mm.add("(max-width: 767px)", () => {
          if (bannerTitleRef.current) {
            gsap.fromTo(bannerTitleRef.current,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
            );
          }
          if (bannerTaglineRef.current) {
            gsap.fromTo(bannerTaglineRef.current,
              { autoAlpha: 0, y: 15 },
              { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.5 }
            );
          }
          // Note: Deliberately skipping cardRefs animation on mobile so they render immediately 
          // without ScrollTrigger hiding them (which can cause issues on some mobile browsers).
        });
      });
    };
    initGSAP();
    return () => ctx?.revert();
  }, [destination]);

  /* ── Not‑found state ── */
  if (!destination) {
    return (
      <>
        <Navbar />
        <div className={styles.page} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <AlertCircle size={48} color="#ef4444" style={{ marginBottom: "16px" }} />
          <h1 style={{ fontSize: "2rem", marginBottom: "16px" }}>Destination Not Found</h1>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>We couldn&apos;t find any travel packages for this destination.</p>
          <Link href="/" className={styles.backBtn} style={{ background: "#3b82f6", color: "white", padding: "12px 24px", borderRadius: "8px", textDecoration: "none" }}>
            <ArrowLeft size={20} style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
            <span>Back to Home</span>
          </Link>
        </div>
        <GlobalBottomSections />
        <Footer />
      </>
    );
  }

  const itineraries = destination.itineraries || [];

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        {/* Banner */}
        <section
          className={styles.banner}
          style={{ background: bannerBg, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className={styles.bannerOverlay} />
          <div className={styles.bannerContent}>
            <h1
              className={styles.bannerTitle}
              ref={bannerTitleRef}
            >
              {destination.name}
            </h1>
            <p
              className={styles.bannerTagline}
              ref={bannerTaglineRef}
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
        <section className={styles.itineraries}>
          <div className={styles.itinerariesContainer}>
            {itineraries.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", background: "#fff", borderRadius: "12px", border: "1px dashed #ccc" }}>
                <h3 style={{ color: "#666", marginBottom: "8px" }}>No itineraries found</h3>
                <p style={{ color: "#999", fontSize: "0.9rem" }}>If you just added an itinerary, please make sure to click "Publish to Live Site" in the admin dashboard and refresh this page.</p>
              </div>
            ) : (
              itineraries.map((itin, i) => {
                const isEven = i % 2 === 0;
                const images = (itin.images?.length > 0 ? itin.images : [itin.image]).filter(Boolean);

                return (
                <div
                  className={`${styles.itinRow} ${isEven ? "" : styles.itinRowReversed}`}
                  key={itin.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                >
                  {/* Info Card */}
                  <div className={styles.itinCard}>
                    <div className={styles.itinCardHeader}>
                      <h3 className={styles.itinTitle}>{itin.title}</h3>
                    </div>

                    <div className={styles.itinDetails}>
                      <DetailRow icon={Calendar} label="Days:" value={itin.days} />
                      <DetailRow icon={MapPin} label="Pick-up:" value={itin.pickup} />
                      <DetailRow icon={Car} label="Transfers:" value={itin.transfers} />
                      <DetailRow icon={Wallet} label="Budget:" value={itin.budget} />
                      <div className={styles.itinDetailRow}>
                        <span className={styles.itinLabel}>Rating:</span>
                        <span className={styles.itinStars}>
                          {Array.from({ length: itin.rating }).map((_, si) => (
                            <Star key={si} size={14} className={styles.starIcon} />
                          ))}
                        </span>
                      </div>
                    </div>

                    <Link href={`${basePath}/${destination.slug}/${itin.id}`} className={styles.bookBtn}>View More</Link>
                  </div>

                  {/* Image Carousel */}
                  <div className={styles.itinImageWrap}>
                    <Swiper
                      modules={[Autoplay, EffectFade, Pagination]}
                      effect="fade"
                      autoplay={{ delay: 2000, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                      loop={images.length > 1}
                      className="itinCardSwiper"
                      style={{ width: "100%", height: "100%" }}
                    >
                      {images.map((imgUrl, idx) => (
                        <SwiperSlide key={idx} style={{ width: "100%", height: "100%" }}>
                          <Image
                            src={imgUrl}
                            alt={itin.title || "Itinerary image"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className={styles.itinImage}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              );
            })
            )}
          </div>
        </section>
      </div>
      <GlobalBottomSections />
      <Footer />
    </>
  );
}
