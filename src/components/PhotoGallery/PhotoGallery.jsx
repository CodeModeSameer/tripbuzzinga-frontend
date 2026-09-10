"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Mousewheel } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import Lightbox from "@/components/Lightbox/Lightbox";
import styles from "./PhotoGallery.module.css";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function PhotoGallery() {
  const { gallery } = useSiteData();
  const [lightboxImage, setLightboxImage] = useState(null);
  const swiperRef = useRef(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          {/* <span className={styles.subtitle}>GALLERY</span> */}
          <h2 className={styles.title}>Visual Gallery </h2>
          {/* <p className={styles.desc}>
            See the world through my lens.
            <br />Adventures in photos and videos.
          </p> */}
        </div>


        {/* Coverflow Carousel */}
        <div className={styles.swiperWrapper}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[EffectCoverflow, Autoplay, Mousewheel]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={gallery.length > 3}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 80,
              depth: 200,
              modifier: 1,
              scale: 0.9,
              slideShadows: false,
            }}
            className={styles.swiperContainer}
          >
            {gallery.map((item) => (
              <SwiperSlide key={item.id} className={styles.slide}>
                <div
                  className={styles.slideInner}
                  onClick={() => setLightboxImage(item)}
                >
                  <Image
                    src={item.url}
                    alt={item.caption || "Gallery image"}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 80vw, 480px"
                    draggable={false}
                  />
                  <div className={styles.slideOverlay}>
                    <Maximize2 size={28} className={styles.expandIcon} />
                    {item.caption && (
                      <span className={styles.caption}>{item.caption}</span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav Arrows */}
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* View More Link */}
        <div className={styles.filtersWrapper}>
          <div className={styles.filtersList}>
            <Link href="/gallery" className={styles.viewMoreBtn}>
              View More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </section>
  );
}
