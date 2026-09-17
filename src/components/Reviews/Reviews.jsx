"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./Reviews.module.css";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48" className={styles.googleIcon}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const QuoteWatermark = () => (
  <svg width="120" height="100" viewBox="0 0 100 100" className={styles.quoteWatermark} fill="currentColor">
    <path d="M40.2 46.8c0 14.2-8.3 27.5-22.1 33.2l-3.3-6c10.4-4.8 15.4-12.7 15.4-20H13.6V20h26.6v26.8z m46.2 0c0 14.2-8.3 27.5-22.1 33.2l-3.3-6c10.4-4.8 15.4-12.7 15.4-20H60V20h26.4v26.8z"/>
  </svg>
);

export default function Reviews() {
  const { reviews: REVIEWS } = useSiteData();
  const [expandedReviews, setExpandedReviews] = useState({});
  const scrollRef = useRef(null);

  const toggleExpand = (id) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
      }
    }
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>REVIEWS</span>
          <h2 className={styles.title}>What Our Clients Say About Us</h2>
        </div>

        <div className={styles.cardsContainer} ref={scrollRef}>
          {REVIEWS.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <QuoteWatermark />
              
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  <div className={styles.avatarInitial} style={{ backgroundColor: review.avatarBg || '#0ea5e9' }}>
                    {review.name ? review.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className={styles.reviewerInfo}>
                    <h4 className={styles.reviewerName}>{review.name}</h4>
                    <div className={styles.ratingRow}>
                      <GoogleIcon />
                      <div className={styles.stars}>
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <a 
                  href={review.reviewLink || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.externalLinkBtn}
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className={styles.cardBody}>
                <p className={`${styles.reviewText} ${!expandedReviews[review.id] ? styles.reviewTextCollapsed : ""}`}>
                  {review.text}
                </p>
                <button 
                  className={styles.readMoreBtn} 
                  onClick={() => toggleExpand(review.id)}
                >
                  {expandedReviews[review.id] ? "Read less" : "Read more"}
                </button>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.tripCard}>
                  <div className={styles.tripImageWrapper}>
                    <Image src={review.tripImage} alt="Trip" fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.tripDetails}>
                    <p className={styles.tripName}>{review.tripName}</p>
                    <button className={styles.tryBtn}>
                      Try Yourself <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.navigation}>
          <button className={styles.navArrow} onClick={scrollLeft}><ChevronLeft size={20} /></button>
          <button className={styles.navArrow} onClick={scrollRight}><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
}

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);
