"use client";

import { useEffect, useRef } from "react";
import { MapPin, Phone } from "lucide-react";
import styles from "./Footer.module.css";

/* Inline SVG social icons since lucide-react doesn't include brand icons */
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);




const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const COMPANY_LINKS = [
  { label: "Blog", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "FAQ's", href: "#" },
  { label: "Contact", href: "#" },
];

const QUICK_LINKS = [
  { label: "Style Guide", href: "#" },
  { label: "Career", href: "#" },
  { label: "Help Text", href: "#" },
];

const SOCIAL_ICONS = [
  { Icon: FacebookIcon, label: "Facebook", href: "#" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: YoutubeIcon, label: "YouTube", href: "#" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const columnRefs = useRef([]);

  useEffect(() => {
    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      let mm = gsap.matchMedia();
      ctx = gsap.context(() => {
        mm.add("(min-width: 768px)", () => {
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
        {/* Logo column */}
        <div
          className={styles.footerLogo}
          ref={(el) => (columnRefs.current[0] = el)}
        >
          <div className={styles.footerLogoTitle}>
            Trip{" "}
            <span className={styles.footerLogoTitleHighlight}>Buzzinga</span>
          </div>
          <span className={styles.footerLogoTagline}>Buzz your Vacation</span>
          <p className={styles.footerLogoDesc}>
            Your trusted travel companion for discovering the world&apos;s most
            incredible destinations. Plan, explore, and create memories that
            last a lifetime.
          </p>
        </div>

        {/* Company */}
        <div ref={(el) => (columnRefs.current[1] = el)}>
          <h4 className={styles.columnTitle}>Company</h4>
          <div className={styles.footerLinks}>
            {COMPANY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.footerLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div ref={(el) => (columnRefs.current[2] = el)}>
          <h4 className={styles.columnTitle}>Contact Us</h4>
          <div className={styles.contactItem}>
            <MapPin size={16} className={styles.contactIcon} />
            <span>9300 SE 82nd Ave Orego, Happy Valley, United States</span>
          </div>
          <div className={styles.contactItem}>
            <Phone size={16} className={styles.contactIcon} />
            <span>+88440-550-8763</span>
          </div>
        </div>

        {/* Quick Links */}
        <div ref={(el) => (columnRefs.current[3] = el)}>
          <h4 className={styles.columnTitle}>Quick Link</h4>
          <div className={styles.footerLinks}>
            {QUICK_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={styles.footerLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Social */}
        <div ref={(el) => (columnRefs.current[4] = el)}>
          <h4 className={styles.columnTitle}>Social Share</h4>
          <div className={styles.socialIcons}>
            {SOCIAL_ICONS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className={styles.socialIcon}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          © {new Date().getFullYear()} Trip Buzzinga. All Rights Reserved.
          Powered by{" "}
          <a href="#" className={styles.copyrightLink}>
            Trip Buzzinga
          </a>
        </p>
      </div>
    </footer>
  );
}
