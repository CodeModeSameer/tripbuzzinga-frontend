"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./TripCategories.module.css";

export default function TripCategories() {
  const { tripCategories } = useSiteData();

  if (!tripCategories || tripCategories.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.pillContainer}>
          <div className={styles.scrollTrack}>
            {tripCategories.map((cat) => (
              <Link href="#" key={cat.id} className={styles.categoryItem}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={cat.image}
                      alt={cat.label}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                <span className={styles.label}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
