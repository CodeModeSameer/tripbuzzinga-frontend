"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import {
  FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn,
  FaYoutube, FaPinterestP, FaSpotify
} from "react-icons/fa6";
import { FaTripadvisor } from "react-icons/fa";
import styles from "./Footer.module.css";

const FOOTER_PAGES = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Payment Policy", href: "/payment-policy" },
  { label: "Terms & Condition", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const SOCIAL_ICONS = [
  { Icon: FaFacebookF, label: "Facebook", href: "#", color: "#1877F2" },
  { Icon: FaXTwitter, label: "X", href: "#", color: "#000000" },
  { Icon: FaInstagram, label: "Instagram", href: "#", color: "#E4405F" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "#", color: "#0A66C2" },
  { Icon: FaYoutube, label: "YouTube", href: "#", color: "#FF0000" },
  { Icon: FaPinterestP, label: "Pinterest", href: "#", color: "#E60023" },
  { Icon: FaTripadvisor, label: "TripAdvisor", href: "#", color: "#34E0A1" },
  { Icon: FaSpotify, label: "Spotify", href: "#", color: "#1DB954" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const columnRefs = useRef([]);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      let mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        mm.add("(min-width: 1024px)", () => {
          const validCols = columnRefs.current.filter(Boolean);
          if (validCols.length > 0) {
            gsap.fromTo(
              validCols,
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: footerRef.current,
                  start: "top 90%",
                },
              }
            );
          }
        });
      }, footerRef);
    };
    initGSAP();
    return () => ctx?.revert();
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef} id="footer">
      <div className={styles.footerWave} />

      <div className={styles.footerContent}>

        {/* Contact Us (Mobile First Priority) */}
        <div className={styles.contactWrapper} ref={(el) => (columnRefs.current[1] = el)}>
          <div className={styles.contactBox}>
            <h4 className={styles.columnTitle}>Contact Us</h4>
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>270, Udyog Vihar II Rd, Phase II, Udyog Vihar III, Sector 20, Gurugram, Haryana 122016</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <span>+91 8251056139</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <span>planners@tripbuzzinga.com</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className={styles.socialWrapper} ref={(el) => (columnRefs.current[2] = el)}>
          <h4 className={styles.socialTitle}>CONNECT WITH US</h4>
          <div className={styles.socialGrid}>
            {SOCIAL_ICONS.map(({ Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                className={styles.socialGridIcon}
                style={{ backgroundColor: color }}
                aria-label={label}
              >
                <Icon color="white" size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className={styles.linksWrapper} ref={(el) => (columnRefs.current[3] = el)}>
          <div className={styles.flatLinksGroup}>
            <h4 className={styles.columnTitle}>Company</h4>
            <div className={styles.flatLinksContent}>
              {FOOTER_PAGES.map((link) => (
                <Link key={link.label} href={link.href} className={styles.footerLink}>{link.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Logo column (Moved to bottom or kept in desktop flow) */}
        <div
          className={styles.footerLogo}
          ref={(el) => (columnRefs.current[0] = el)}
        >
          <div className={styles.footerLogoTitle}>
            Trip<span className={styles.footerLogoTitleHighlight}>Buzzinga</span>
          </div>
          <span className={styles.footerLogoTagline}>Buzz your Vacation</span>
          <p className={styles.footerLogoDesc}>
            Your trusted travel companion for discovering the world's most incredible destinations.
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          © {new Date().getFullYear()} Trip Buzzinga. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
