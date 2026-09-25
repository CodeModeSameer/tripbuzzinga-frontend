"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useSiteData } from "@/context/SiteDataContext";
import styles from "./page.module.css";

export default function BlogPost({ params }) {
  // In Next.js 15, params is a Promise, so we use React.use() to unwrap it
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const { blogs } = useSiteData();

  if (!blogs) return null;

  const blog = blogs.find(b => b.id.toString() === id);

  if (!blog) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <h1>Blog Post Not Found</h1>
              <p>The article you are looking for does not exist or has been removed.</p>
              <Link href="/blogs" className={styles.backBtn}>
                <ArrowLeft size={16} /> Back to Blogs
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Article Header */}
        <div className={styles.header}>
          <div className={styles.container}>
            <Link href="/blogs" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to all blogs
            </Link>
            <div className={styles.categoryWrap}>
              <span className={styles.category}>{blog.category}</span>
            </div>
            <h1 className={styles.title}>{blog.title}</h1>
            
            <div className={styles.metaData}>
              <div className={styles.metaItem}>
                <User size={16} />
                <span>{blog.author || "TripBuzzinga Team"}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{blog.publishedAt}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{blog.readingTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImageWrapper}>
          <div className={styles.container}>
            <div className={styles.imageContainer}>
              <Image 
                src={(blog.images?.[0] || blog.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop")} 
                alt={blog.title} 
                fill 
                className={styles.image} 
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className={styles.container}>
          <article className={styles.article}>
            {blog.content ? (
              <div 
                className={styles.paragraph} 
                dangerouslySetInnerHTML={{ __html: (blog.content || '') }} 
              />
            ) : (
              <p className={styles.paragraph}>No content provided for this blog post.</p>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
