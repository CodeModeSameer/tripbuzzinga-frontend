"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./Blogs.module.css";

export default function Blogs() {
  const { blogs } = useSiteData();

  if (!blogs || blogs.length === 0) return null;

  const featuredBlog = blogs.find(blog => blog.isFeatured) || blogs[blogs.length - 1];
  const regularBlogs = blogs.filter(blog => !blog.isFeatured);

  return (
    <section className={styles.blogsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>B L O G S</span>
          <h2 className={styles.title}>Our Blogs</h2>
        </div>

        <div className={styles.content}>
          {/* Left Column: Regular Blogs */}
          <div className={styles.regularBlogsCol}>
            {regularBlogs.map((blog) => (
              <Link 
                href={`/blogs/${blog.id}`}
                key={blog.id} 
                className={styles.regularBlogCard}
              >
                <div className={styles.regularImageWrapper}>
                  <Image 
                    src={(blog.images?.[0] || blog.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop")} 
                    alt={blog.title} 
                    fill 
                    className={styles.blogImage} 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.regularBlogInfo}>
                  <div className={styles.metaRow}>
                    <span className={styles.date}>Published on {blog.publishedAt}</span>
                    <span className={styles.readTime}>{blog.readingTime}</span>
                  </div>
                  <h3 className={styles.regularTitle}>{blog.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Right Column: Featured Blog */}
          {featuredBlog && (
            <div className={styles.featuredBlogCol}>
              <Link href={`/blogs/${featuredBlog.id}`} className={styles.featuredCard}>
                <div className={styles.featuredImageWrapper}>
                  <Image 
                    src={(featuredBlog.images?.[0] || featuredBlog.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop")} 
                    alt={featuredBlog.title} 
                    fill 
                    className={styles.blogImage} 
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={styles.imageOverlay}>
                    <h3 className={styles.overlayTitle}>
                      <span className={styles.highlightText}>25 BEST PLACES TO VISIT IN INDIA</span> IN SEPTEMBER
                    </h3>
                  </div>
                </div>
                <div className={styles.featuredContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.date}>Published on {featuredBlog.publishedAt}</span>
                    <span className={styles.readTime}>{featuredBlog.readingTime}</span>
                  </div>
                  <h3 className={styles.featuredTitle}>{featuredBlog.title}</h3>
                  <div className={styles.featuredDesc} dangerouslySetInnerHTML={{ __html: featuredBlog.description }} />
                </div>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.viewAllWrapper}>
          <Link href="/blogs" className={styles.viewAllBtn}>View All &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
