"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import {
  ArrowLeft, Star, Calendar, MapPin, Car,
  Wallet, CheckCircle2, XCircle, Building2, FileText,
  Clock, ImageIcon,
} from "lucide-react";
import Image from "next/image";
import styles from "./SharedItineraryLayout.module.css";
import Navbar from "@/components/Navbar/Navbar";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";
import Footer from "@/components/Footer/Footer";

/* ── Tiny helper: resolve banner images once ── */
const resolveImages = (itin) =>
  (itin?.images?.length > 0 ? itin.images : [itin?.image || "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1600"]).filter(Boolean);

/* ── Quick‑info row used in Overview card ── */
const QuickInfoItem = ({ icon: Icon, label, value }) => (
  <div className={styles.quickInfoItem}>
    <Icon size={18} className={styles.quickInfoIcon} />
    <div>
      <span className={styles.quickInfoLabel}>{label}</span>
      <span className={styles.quickInfoValue}>{value}</span>
    </div>
  </div>
);

export default function SharedItineraryLayout({ itinerary, basePath }) {
  const titleRef = useRef(null);
  const overviewRef = useRef(null);
  const dayRefs = useRef([]);
  const sectionRefs = useRef([]);

  const bannerImages = useMemo(() => resolveImages(itinerary), [itinerary]);

  /* ── Desktop‑only GSAP entrance animations ── */
  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        mm.add("(min-width: 768px)", () => {
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
          dayRefs.current.filter(Boolean).forEach((card, i) => {
            gsap.fromTo(card,
              { autoAlpha: 0, x: i % 2 === 0 ? -40 : 40, y: 20 },
              { autoAlpha: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out",
                scrollTrigger: { trigger: card, start: "top 88%" } }
            );
          });
          sectionRefs.current.filter(Boolean).forEach((sec) => {
            gsap.fromTo(sec,
              { autoAlpha: 0, y: 30 },
              { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out",
                scrollTrigger: { trigger: sec, start: "top 85%" } }
            );
          });
        });
      });
    };
    initGSAP();
    return () => ctx?.revert();
  }, []);

  /* ── Render ── */
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        {/* Back Navigation */}
        <Link href={basePath} className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to {itinerary.destinationName}</span>
        </Link>

        {/* ===== BANNER ===== */}
        <section className={styles.banner}>
          <div className={styles.bannerSwiperContainer}>
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={bannerImages.length > 1}
              className="bannerSwiper"
              style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }}
            >
              {bannerImages.map((imgUrl, idx) => (
                <SwiperSlide key={idx} style={{ width: "100%", height: "100%" }}>
                  <Image src={imgUrl} alt="Itinerary" fill className={styles.itinImage} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className={styles.bannerOverlay} style={{ zIndex: 1 }} />

          <div className={styles.bannerContent} ref={titleRef}>
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
          <div className={styles.overviewCard} ref={overviewRef}>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewText}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <div className={styles.overviewDesc} dangerouslySetInnerHTML={{ __html: (itinerary.overview || itinerary.description || '') }} />
              </div>
              <div className={styles.overviewQuickInfo}>
                <QuickInfoItem icon={Calendar} label="Duration" value={itinerary.days} />
                <QuickInfoItem icon={MapPin} label="Pick-up" value={itinerary.pickup} />
                <QuickInfoItem icon={Car} label="Transfers" value={itinerary.transfers} />
                <QuickInfoItem icon={Wallet} label="Budget" value={itinerary.budget} />
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
              {(itinerary.dayPlan || []).map((dp, i) => (
                <div
                  key={i}
                  className={styles.dayCard}
                  ref={(el) => (dayRefs.current[i] = el)}
                >
                  <div className={styles.dayBadge}>Day {dp.day}</div>
                  <div className={styles.dayContent}>
                    <h3 className={styles.dayTitle}>{dp.title}</h3>
                    <div className={styles.dayDesc} dangerouslySetInnerHTML={{ __html: (dp.desc || dp.description || '') }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== INCLUSIONS & EXCLUSIONS ===== */}
          <div
            className={styles.inclExclGrid}
            ref={(el) => (sectionRefs.current[0] = el)}
          >
            <div className={styles.inclCard}>
              <h3 className={styles.inclTitle}>
                <CheckCircle2 size={20} className={styles.inclIcon} /> Inclusions
              </h3>
              <ul className={styles.inclList}>
                {(itinerary.inclusions || []).map((item, i) => (
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
                {(itinerary.exclusions || []).map((item, i) => (
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
          >
            <h2 className={styles.sectionTitle}>
              <Building2 size={22} /> Hotel Details
            </h2>
            <div className={styles.hotelGrid}>
              {(itinerary.hotels || []).map((hotel, i) => (
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
          >
            <h2 className={styles.sectionTitle}>
              <FileText size={22} /> Terms &amp; Conditions
            </h2>
            <ul className={styles.termsList}>
              {(itinerary.terms || []).map((term, i) => (
                <li key={i} className={styles.termsItem}>{term}</li>
              ))}
            </ul>
          </div>

          {/* ===== BOOKING CTA ===== */}
          <div
            className={styles.ctaSection}
            ref={(el) => (sectionRefs.current[3] = el)}
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
        </div>{/* closes styles.content */}
      </div>{/* closes styles.page */}
      <GlobalBottomSections />
      <Footer />
    </>
  );
}
