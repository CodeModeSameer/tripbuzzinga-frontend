"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";
import Footer from "@/components/Footer/Footer";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./FaqsPage.module.css";

export default function FaqsPage() {
  const { faq: FAQ_DATA } = useSiteData();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // Extract unique categories from FAQ data
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    FAQ_DATA.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [FAQ_DATA]);

  // Filter FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [FAQ_DATA, activeCategory, searchQuery]);

  const toggleAccordion = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <main className={styles.main}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>FAQs</h1>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          
          {/* Header & Search */}
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Frequently asked questions</h2>
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                className={styles.searchInput}
                placeholder="Looking for something?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className={styles.searchIcon} size={20} />
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className={styles.categoriesWrapper}>
            <div className={styles.categoriesContainer}>
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryActive : ""}`}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {categories.length > 5 && (
              <div className={styles.scrollHint}>
                <ChevronRight size={20} className={styles.scrollIcon} />
              </div>
            )}
          </div>

          {/* FAQ Accordion List */}
          <div className={styles.faqList}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.id} className={styles.faqItem}>
                    <button 
                      className={styles.faqHeader}
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className={styles.question}>{item.question}</h3>
                      {isOpen ? (
                        <ChevronUp size={22} className={styles.chevron} />
                      ) : (
                        <ChevronDown size={22} className={styles.chevron} />
                      )}
                    </button>
                    <div 
                      className={styles.faqBody}
                      style={{ 
                        maxHeight: isOpen ? "300px" : "0", 
                        paddingBottom: isOpen ? "24px" : "0",
                        opacity: isOpen ? 1 : 0
                      }}
                    >
                      <p className={styles.answer}>{item.answer}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noResults}>
                <p>No FAQs found matching your criteria.</p>
                <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className={styles.clearBtn}>Clear Filters</button>
              </div>
            )}
          </div>

        </div>
      </section>
      
      <GlobalBottomSections />
      <Footer />
    </main>
  );
}
