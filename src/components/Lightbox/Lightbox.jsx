"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import styles from "./Lightbox.module.css";

export default function Lightbox({ image, onClose }) {
  // Prevent scrolling when lightbox is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div className={styles.lightboxOverlay} onClick={onClose}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close fullscreen">
        <X size={32} />
      </button>
      <div 
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing
      >
        <Image
          src={image.url || image} // Handle object or string
          alt={image.caption || "Fullscreen image"}
          fill
          style={{ objectFit: "contain" }}
          sizes="100vw"
          priority
        />
        {image.caption && (
          <div className={styles.caption}>
            {image.caption}
          </div>
        )}
      </div>
    </div>
  );
}
