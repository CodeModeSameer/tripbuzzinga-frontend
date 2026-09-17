"use client";

import { FaFacebookF, FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa6";
import styles from "./SocialFloaters.module.css";

export default function SocialFloaters() {
  return (
    <div className={styles.floatersContainer}>
      <a
        href="https://www.facebook.com/tripbuzzinga/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.socialBtn} ${styles.facebook}`}
        aria-label="Facebook"
      >
        <FaFacebookF size={18} />
      </a>

      <a
        href="https://api.whatsapp.com/send?phone=%2B918251056139&token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyNSJ9.eyJleHAiOjE3ODk2NDgxOTIsInBob25lIjoiKzkxODI1MTA1NjEzOSIsImNvbnRleHQiOiJBZmlnamx4b3UyQlRMTHA5b2JIMVUxZVl1clA0ZWp3QUlvTkdvaGdvNFFGdjNfZmxFMTlObzl5VnRrMlJpM3FNSjE3el9PNlRMS1piOGRmSmowMkxYaUtrcE1sdWUwdjZEUWY4NmFiYzhvbFJuMFlGR0dPb014UmVXWEtoS2pCX3J2V2phVHhBOE1IcjNfWFBEX1QzOVpEQnhRIiwic291cmNlIjoiRkJfUGFnZSIsImFwcCI6ImZhY2Vib29rIiwiZW50cnlfcG9pbnQiOiJwYWdlX2N0YSJ9.eeB21rrcNvceSOidF1aaUBI7FV0dTUagL29SBO5VR9H2flqpYUrqux7k40aSBl8Q0Njw6OfUxjKR0i46Z_DL3Q&fbclid=IwY2xjawUXaxlwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMWhGRjNIdUhaUFVBZkp1NkpzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeP917zy3jHOsUoz1AF7mbnbkLE3r_6UppZYxlh1roNkmz-EPOD7QUEPScQcA_aem_MpERZR-5FLsJSQhMl_cH7Q"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.socialBtn} ${styles.whatsapp}`}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={18} />
      </a>

      <a
        href="https://www.instagram.com/tripbuzzinga?stkn=cGFvZm91aDNpNmFr&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.socialBtn} ${styles.instagram}`}
        aria-label="Instagram"
      >
        <FaInstagram size={18} />
      </a>

      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.socialBtn} ${styles.youtube}`}
        aria-label="YouTube"
      >
        <FaYoutube size={18} />
      </a>
    </div>
  );
}
