"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSiteData } from '@/context/SiteDataContext';
import { 
  LayoutDashboard, 
  MapPin, 
  Image as ImageIcon, 
  Compass, 
  Star, 
  HelpCircle, 
  Megaphone,
  LogOut,
  Globe,
  Route,
  UploadCloud
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const NAV_SECTIONS = [
  { id: 'hero', label: 'Hero Section', icon: LayoutDashboard, href: '/admin?section=hero' },
  { id: 'header-categories', label: 'Header Section', icon: Route, href: '/admin?section=header-categories' },
  { id: 'popular-destinations', label: 'Popular Destinations', icon: MapPin, href: '/admin?section=popular-destinations' },
  { id: 'trip-categories', label: 'Trip Categories', icon: Route, href: '/admin?section=trip-categories' },
  { id: 'flyer', label: 'Flyer / Banner', icon: Megaphone, href: '/admin?section=flyer' },
  { id: 'explore-destinations', label: 'Explore Destinations', icon: Compass, href: '/admin?section=explore-destinations' },
  { id: 'itineraries', label: 'Itineraries', icon: Route, href: '/admin?section=itineraries' },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, href: '/admin?section=gallery' },
  { id: 'reviews', label: 'Reviews', icon: Star, href: '/admin?section=reviews' },
  { id: 'blogs', label: 'Blogs', icon: ImageIcon, href: '/admin?section=blogs' },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, href: '/admin?section=faq' },
];

export default function AdminSidebar({ activeSection, onSectionChange }) {
  const [isPublishing, setIsPublishing] = useState(false);
  const { publishSiteData } = useSiteData();

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const success = await publishSiteData();
      if (success) {
        alert("Publish successful! Your changes are now live on the website.");
      } else {
        alert("Failed to publish. Please check your connection or try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while trying to publish.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logoRow}>
          <Globe size={22} className={styles.logoIcon} />
          <h1 className={styles.logo}>TripBuzzinga</h1>
        </div>
        <p className={styles.logoSub}>Admin Dashboard</p>
      </div>
      
      <nav className={styles.nav}>
        <span className={styles.navLabel}>SECTIONS</span>
        {NAV_SECTIONS.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={18} className={styles.icon} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button 
          className={styles.publishBtn} 
          onClick={handlePublish}
          disabled={isPublishing}
        >
          <UploadCloud size={14} />
          <span>{isPublishing ? "Publishing..." : "Publish"}</span>
        </button>
        <Link href="/" className={styles.viewSiteBtn}>
          <Globe size={14} />
          <span>View Site</span>
        </Link>
        <button className={styles.logoutBtn}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
