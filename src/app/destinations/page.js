"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function AllDestinationsPage() {
  const { exploreInternational, exploreDomestic } = useSiteData();
  const allDestinations = [...exploreInternational, ...exploreDomestic];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <h1 className={styles.title}>All Destinations</h1>
          <p className={styles.subtitle}>Discover all of our handpicked adventures across the globe.</p>

          <div className={styles.grid}>
            {allDestinations.map((dest) => (
              <div key={dest.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={(dest.images?.[0] || dest.image)}
                    alt={dest.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{dest.name}</h3>
                  <p className={styles.cardDesc}>{dest.desc.slice(0, 100)}...</p>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.locationTag}>
                      <MapPin size={14} /> Explore
                    </span>
                    <Link href={`/destinations/${dest.name.toLowerCase()}`} className={styles.detailsLink}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
