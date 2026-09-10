"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Maximize2 } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Lightbox from "@/components/Lightbox/Lightbox";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./gallery.module.css";

export default function GalleryPage() {
  const { gallery } = useSiteData();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!gallery) return null;

  const locations = ["All", ...new Set(gallery.map(img => img.location).filter(Boolean))];
  
  const filteredGallery = activeFilter === "All" 
    ? gallery 
    : gallery.filter(img => img.location === activeFilter);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <span className={styles.subtitle}>FULL GALLERY</span>
          <h1 className={styles.title}>Visual Diary</h1>
          <p className={styles.desc}>
            Explore our complete collection of travel memories from around the world.
          </p>

          <div className={styles.filtersWrapper}>
            <div className={styles.filtersList}>
              {locations.map((loc) => (
                <button
                  key={loc}
                  className={`${styles.filterBtn} ${activeFilter === loc ? styles.active : ""}`}
                  onClick={() => setActiveFilter(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              className={styles.gridItem}
              onClick={() => setLightboxImage(item)}
            >
              <Image
                src={item.url}
                alt={item.caption || "Gallery image"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.imageOverlay}>
                <Maximize2 size={24} className={styles.expandIcon} />
                {item.caption && <span className={styles.caption}>{item.caption}</span>}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />

      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      )}
    </>
  );
}
