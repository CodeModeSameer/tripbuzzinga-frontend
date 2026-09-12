"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import {
  ArrowLeft, ImageIcon, Star, Calendar, MapPin, Car,
  Wallet, CheckCircle2, XCircle, Building2, FileText,
  Clock, ChevronDown,
} from "lucide-react";
import styles from "./ItineraryDetailPage.module.css";

export default function ItineraryDetailPage({ itinerary, slug, itineraryId }) {
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const overviewRef = useRef(null);
  const dayRefs = useRef([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Banner entrance
        if (titleRef.current) {
          gsap.fromTo(titleRef.current,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
          );
        }
        if (overviewRef.current) {
          gsap.fromTo(overviewRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.4 }
          );
        }

        // Day cards stagger
        dayRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.fromTo(card,
            { autoAlpha: 0, x: i % 2 === 0 ? -40 : 40, y: 20 },
            {
              autoAlpha: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%" },
            }
          );
        });

        // Other sections fade in
        sectionRefs.current.forEach((sec) => {
          if (!sec) return;
          gsap.fromTo(sec,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out",
              scrollTrigger: { trigger: sec, start: "top 85%" },
            }
          );
        });
      });
    };
    initGSAP();
    return () => ctx?.revert();
  }, []);

  return (
    <div className={styles.page}>
      {/* Back Navigation */}
      <Link href={`/destinations/${slug}`} className={styles.backBtn}>
        <ArrowLeft size={18} />
        <span>Back to {itinerary.destinationName}</span>
      </Link>

      {/* ===== BANNER ===== */}
      <section
        className={styles.banner}
        ref={bannerRef}
      >
        <div className={styles.bannerSwiperContainer}>
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }}
          >
            {(itinerary.images && itinerary.images.length > 0 ? itinerary.images : [itinerary.image || "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1600"]).filter(Boolean).map((imgUrl, idx) => (
              <SwiperSlide key={idx} style={{ width: "100%", height: "100%" }}>
                <div style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%" }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={styles.bannerOverlay} style={{ zIndex: 1 }} />

        <div className={styles.bannerContent} ref={titleRef} style={{ visibility: "hidden" }}>
          <span className={styles.bannerDestLabel}>{itinerary.destinationName}</span>
          <h1 className={styles.bannerTitle}>{itinerary.title}</h1>
          <div className={styles.bannerMeta}>
            <span className={styles.bannerMetaItem}>
              <Calendar size={16} /> {itinerary.days}
            </span>
            <span className={styles.bannerMetaItem}>
              <Wallet size={16} /> {itinerary.budget}
            </span>
            <span className={styles.bannerMetaItem}>
              {Array.from({ length: itinerary.rating }).map((_, i) => (
                <Star key={i} size={14} className={styles.starFilled} />
              ))}
            </span>
          </div>
        </div>

        {/* Wave */}
        <div className={styles.bannerWave}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,100 L0,100 Z" fill="#FAF8F5" />
          </svg>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <div className={styles.content}>
        {/* Overview Card */}
        <div className={styles.overviewCard} ref={overviewRef} style={{ visibility: "hidden" }}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <h2 className={styles.sectionTitle}>Overview</h2>
              <p className={styles.overviewDesc}>{itinerary.overview}</p>
            </div>
            <div className={styles.overviewQuickInfo}>
              <div className={styles.quickInfoItem}>
                <Calendar size={18} className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Duration</span>
                  <span className={styles.quickInfoValue}>{itinerary.days}</span>
                </div>
              </div>
              <div className={styles.quickInfoItem}>
                <MapPin size={18} className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Pick-up</span>
                  <span className={styles.quickInfoValue}>{itinerary.pickup}</span>
                </div>
              </div>
              <div className={styles.quickInfoItem}>
                <Car size={18} className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Transfers</span>
                  <span className={styles.quickInfoValue}>{itinerary.transfers}</span>
                </div>
              </div>
              <div className={styles.quickInfoItem}>
                <Wallet size={18} className={styles.quickInfoIcon} />
                <div>
                  <span className={styles.quickInfoLabel}>Budget</span>
                  <span className={styles.quickInfoValue}>{itinerary.budget}</span>
                </div>
              </div>
            </div>
          </div>
          {itinerary.budgetNote && (
            <p className={styles.budgetNote}>*{itinerary.budgetNote}</p>
          )}
        </div>

        {/* ===== DAY-BY-DAY ITINERARY ===== */}
        <div className={styles.daySection}>
          <h2 className={styles.sectionTitle}>
            <Clock size={22} /> Day-by-Day Itinerary
          </h2>
          <div className={styles.timeline}>
            {itinerary.dayPlan.map((dp, i) => (
              <div
                key={i}
                className={styles.dayCard}
                ref={(el) => (dayRefs.current[i] = el)}
                style={{ visibility: "hidden" }}
              >
                <div className={styles.dayBadge}>Day {dp.day}</div>
                <div className={styles.dayContent}>
                  <h3 className={styles.dayTitle}>{dp.title}</h3>
                  <p className={styles.dayDesc}>{dp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== INCLUSIONS & EXCLUSIONS ===== */}
        <div
          className={styles.inclExclGrid}
          ref={(el) => (sectionRefs.current[0] = el)}
          style={{ visibility: "hidden" }}
        >
          <div className={styles.inclCard}>
            <h3 className={styles.inclTitle}>
              <CheckCircle2 size={20} className={styles.inclIcon} /> Inclusions
            </h3>
            <ul className={styles.inclList}>
              {itinerary.inclusions.map((item, i) => (
                <li key={i} className={styles.inclItem}>
                  <CheckCircle2 size={14} className={styles.inclCheckIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.exclCard}>
            <h3 className={styles.exclTitle}>
              <XCircle size={20} className={styles.exclIcon} /> Exclusions
            </h3>
            <ul className={styles.exclList}>
              {itinerary.exclusions.map((item, i) => (
                <li key={i} className={styles.exclItem}>
                  <XCircle size={14} className={styles.exclXIcon} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== HOTELS ===== */}
        <div
          className={styles.hotelsSection}
          ref={(el) => (sectionRefs.current[1] = el)}
          style={{ visibility: "hidden" }}
        >
          <h2 className={styles.sectionTitle}>
            <Building2 size={22} /> Hotel Details
          </h2>
          <div className={styles.hotelGrid}>
            {itinerary.hotels.map((hotel, i) => (
              <div key={i} className={styles.hotelCard}>
                <div className={styles.hotelImagePlaceholder}>
                  <ImageIcon size={24} className={styles.hotelPlaceholderIcon} />
                </div>
                <div className={styles.hotelInfo}>
                  <h4 className={styles.hotelName}>{hotel.name}</h4>
                  <span className={styles.hotelCategory}>{hotel.category}</span>
                  <div className={styles.hotelMeta}>
                    <span>🛏 {hotel.room}</span>
                    <span>📍 {hotel.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== TERMS & CONDITIONS ===== */}
        <div
          className={styles.termsSection}
          ref={(el) => (sectionRefs.current[2] = el)}
          style={{ visibility: "hidden" }}
        >
          <h2 className={styles.sectionTitle}>
            <FileText size={22} /> Terms & Conditions
          </h2>
          <ul className={styles.termsList}>
            {itinerary.terms.map((term, i) => (
              <li key={i} className={styles.termsItem}>{term}</li>
            ))}
          </ul>
        </div>

        {/* ===== BOOKING CTA ===== */}
        <div
          className={styles.ctaSection}
          ref={(el) => (sectionRefs.current[3] = el)}
          style={{ visibility: "hidden" }}
        >
          <div className={styles.ctaCard}>
            <div className={styles.ctaLeft}>
              <h3 className={styles.ctaTitle}>Ready to Book?</h3>
              <p className={styles.ctaSubtitle}>
                {itinerary.title} — {itinerary.days} starting from <strong>{itinerary.budget}</strong>
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <button className={styles.ctaBtnPrimary}>View More</button>
              <button className={styles.ctaBtnSecondary}>Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
