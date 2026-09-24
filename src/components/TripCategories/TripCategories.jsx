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
              <Link href={`/categories/${cat.slug}`} key={cat.id} className={styles.categoryItem}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={(cat.images?.[0] || cat.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop")}
                      alt={cat.label}
                      fill
                      sizes="150px"
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
