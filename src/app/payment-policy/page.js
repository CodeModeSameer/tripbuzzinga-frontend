"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";

export default function PaymentPolicyPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "60vh", padding: "120px 20px 60px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--color-primary)", marginBottom: "30px", borderBottom: "2px solid var(--color-accent-gold)", paddingBottom: "10px" }}>
          Payment Policy
        </h1>
        <div style={{ lineHeight: "1.8", color: "#444", fontSize: "1.1rem" }}>
          <p>Please review our payment policy carefully before making any bookings with Trip Buzzinga.</p>
          <br/>
          <p>More details coming soon...</p>
        </div>
      </div>
      <GlobalBottomSections />
      <Footer />
    </>
  );
}
