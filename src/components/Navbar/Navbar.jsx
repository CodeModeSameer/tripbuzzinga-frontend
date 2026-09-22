"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, User, PhoneCall } from "lucide-react";
import styles from "./Navbar.module.css";

import { useSiteData } from "@/context/SiteDataContext";

export default function Navbar() {
  const { headerCategories } = useSiteData();
  
  const NAV_LINKS = [
    { label: "Home", href: "/" },
    ...(headerCategories || []).map(cat => ({ label: cat.label, href: `/categories/${cat.slug}` })),
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "#contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll to add shadow/background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      id="main-navbar"
    >
      <div className={styles.navInner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Tripbuzzinga Logo"
            width={200}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${styles.navLink} ${link.badge ? styles.hasBadge : ""}`}
            >
              {link.label}
              {link.dropdown && <ChevronDown size={14} className={styles.dropdownIcon} />}
              {link.badge && (
                <span className={styles.badge}>{link.badge}</span>
              )}
            </a>
          ))}
        </div>

        {/* Right Section: Phone & Icons */}
        <div className={styles.rightActions}>
          <div className={styles.phoneSection}>
            <div className={styles.phoneIconWrapper}>
              <PhoneCall size={16} />
            </div>
            <div className={styles.phoneText}>
              <span className={styles.phoneLabel}>Call Us</span>
              <span className={styles.phoneNumber}>+91-8982122207</span>
            </div>
          </div>

        </div>

        {/* Hamburger */}
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          role="button"
          tabIndex={0}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        >
          {/* Mobile Search Bar */}
          <div className={styles.mobileMenuSearch}>
            <input type="text" placeholder="Type Location..." className={styles.mobileMenuSearchInput} />
            <button className={styles.mobileMenuSearchBtn}>
              <Search size={18} />
            </button>
          </div>

          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              {link.badge && <span className={styles.badge}>{link.badge}</span>}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
