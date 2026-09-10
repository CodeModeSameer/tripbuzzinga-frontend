"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./page.module.css";

export default function BlogsListing() {
  const { blogs } = useSiteData();
  const [activeCategory, setActiveCategory] = useState("All");

  if (!blogs) return null;

  // Extract unique categories
  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  // Filter blogs based on active category
  const filteredBlogs = activeCategory === "All" 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Travel Guides & Stories</h1>
          <p className={styles.subtitle}>Discover tips, guides, and inspiration for your next adventure.</p>
        </div>

        <div className={styles.container}>
          {/* Filters */}
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          <div className={styles.grid}>
            {filteredBlogs.map((blog) => (
              <Link href={`/blogs/${blog.id}`} key={blog.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className={styles.image} 
                    style={{ objectFit: 'cover' }}
                  />
                  {blog.isFeatured && <span className={styles.featuredBadge}>Featured</span>}
                </div>
                <div className={styles.content}>
                  <span className={styles.category}>{blog.category}</span>
                  <h2 className={styles.cardTitle}>{blog.title}</h2>
                  <div className={styles.meta}>
                    <span>{blog.publishedAt}</span>
                    <span className={styles.dot}>•</span>
                    <span>{blog.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {filteredBlogs.length === 0 && (
            <div className={styles.noResults}>
              No blogs found in this category.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
