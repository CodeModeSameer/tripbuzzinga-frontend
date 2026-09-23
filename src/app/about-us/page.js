"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Quote, Map, Heart, Users } from "lucide-react";
import styles from "./AboutUs.module.css";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.aboutHero}>
        <h1 className={styles.aboutHeroTitle}>About TripBuzzinga</h1>
        <p className={styles.aboutHeroSubtitle}>
          Transforming the travel industry through transparency and commitment
        </p>
      </section>

      {/* Main Content */}
      <div className={styles.aboutContainer}>
        
        <div className={styles.introSection}>
          <p>
            TripBuzzinga was founded in 2023, built on a simple idea: Buzz means Explore, and Buzzinga means Explorer. That concept was born from a strong desire to transform the travel industry through transparency and commitment — giving travellers accurate information at every stage, from planning to the final day of their trip.
          </p>
        </div>

        <div className={styles.quoteSection}>
          <Quote size={60} className={styles.quoteIcon} />
          <p className={styles.quoteText}>
            "Anyone can travel, but an explorer is someone who has a deep love for the places they visit."
          </p>
        </div>

        <div className={styles.featuresGrid}>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <Map size={24} />
            </div>
            <h3 className={styles.featureTitle}>Curated Journeys</h3>
            <p className={styles.featureDesc}>
              From the beaches of Bali and the Maldives to the temples of Thailand, the skylines of Dubai, the culture of Japan, and the timeless cities of Europe — alongside homegrown favourites like Kerala, Himachal Pradesh, and Andaman — we curate journeys for every kind of traveller.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <Heart size={24} />
            </div>
            <h3 className={styles.featureTitle}>Leisure Focus</h3>
            <p className={styles.featureDesc}>
              Our primary focus is leisure travel — vacations with friends, family, and couples — and we're committed to making every journey seamless, memorable, and stress-free.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrap}>
              <Users size={24} />
            </div>
            <h3 className={styles.featureTitle}>Lasting Relationships</h3>
            <p className={styles.featureDesc}>
              In addition, we aim to build lasting relationships with our travellers, so that every trip with TripBuzzinga feels less like a transaction and more like an experience worth returning for.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}
