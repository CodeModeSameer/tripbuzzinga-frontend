"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "60vh", padding: "120px 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--color-primary)", marginBottom: "30px", borderBottom: "2px solid var(--color-accent-gold)", paddingBottom: "10px" }}>
          Contact Us
        </h1>
        <div style={{ lineHeight: "1.8", color: "#444", fontSize: "1.1rem" }}>
          <p>We'd love to hear from you!</p>
          <br/>
          <p><strong>Address:</strong> 270, Udyog Vihar II Rd, Phase II, Udyog Vihar III, Sector 20, Gurugram, Haryana 122016</p>
          <p><strong>Phone:</strong> +91 8251056139</p>
          <p><strong>Email:</strong> planners@tripbuzzinga.com</p>
        </div>
      </div>
      <GlobalBottomSections />
      <Footer />
    </>
  );
}
