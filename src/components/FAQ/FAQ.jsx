"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Minus } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const { faq: FAQ_DATA } = useSiteData();
  // Default first item to open to match the image
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        
        {/* Left Column: Content */}
        <div className={styles.leftCol}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          
          <div className={styles.searchBar}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Search question here" 
            />
            <Search className={styles.searchIcon} size={20} />
          </div>

          <div className={styles.accordion}>
            {FAQ_DATA.slice(0, 4).map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.id} className={styles.accordionItem}>
                  <button 
                    className={styles.accordionHeader} 
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className={`${styles.question} ${isOpen ? styles.questionOpen : ""}`}>
                      {item.question}
                    </span>
                    {isOpen ? (
                      <Minus size={18} className={styles.iconOpen} />
                    ) : (
                      <Plus size={18} className={styles.iconClosed} />
                    )}
                  </button>
                  <div 
                    className={styles.accordionBody} 
                    style={{ maxHeight: isOpen ? "200px" : "0", paddingBottom: isOpen ? "24px" : "0" }}
                  >
                    <div className={styles.answerText} dangerouslySetInnerHTML={{ __html: item.answer }} />
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className={styles.viewMoreWrapper}>
            <Link href="/faqs" className={styles.viewMoreBtn}>
              View More FAQs
            </Link>
          </div>
        </div>

        {/* Right Column: Illustration */}
        <div className={styles.rightCol}>
          <div className={styles.illustrationWrapper}>
            {/* Using a placeholder SVG or image. 
                For best results matching the exact image, an exported SVG should be placed in public/faq-illustration.png */}
            <Image 
              src="/faq-illustration.jpg" 
              alt="FAQ Illustration" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
