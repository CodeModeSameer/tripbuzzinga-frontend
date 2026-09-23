"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../legal.module.css";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.legalHero}>
        <h1 className={styles.legalHeroTitle}>Terms & Conditions</h1>
        <p className={styles.legalHeroSubtitle}>
          Please read these terms carefully before using our website and services.
        </p>
      </section>

      {/* Main Content */}
      <div className={styles.legalContainer}>
        <div className={styles.legalContent}>
          <p className={styles.lastUpdated}>Last Updated: May/2026</p>
          
          <p>
            Welcome to <strong>TripBuzzinga.com</strong> (hereinafter referred to as "the Website"). These Terms and Conditions ("Terms") govern your use of the Website and the services provided by TripBuzzinga (hereinafter referred to as "we," "our," or "us"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Website.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. If you do not agree to these Terms or our Privacy Policy, please do not use the Website.
          </p>

          <h2>2. User Registration</h2>
          <p>
            <strong>A.</strong> To use certain features of the Website, you may be required to register for an account. You must provide accurate and complete information when registering and keep your information up-to-date.
          </p>
          <p>
            <strong>B.</strong> You are responsible for maintaining the confidentiality of your account information and password, and you are responsible for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>3. Content</h2>
          <p>
            <strong>A.</strong> All content on the Website, including text, images, videos, and other materials, is provided for informational purposes only. We do not guarantee the accuracy, completeness, or reliability of any content on the Website.
          </p>
          <p>
            <strong>B.</strong> You may not use, reproduce, distribute, or display any content from the Website without our prior written consent.
          </p>

          <h2>4. User Conduct</h2>
          <p>
            <strong>A.</strong> You agree to use the Website in a lawful and responsible manner and not engage in any activity that may harm the Website or other users.
          </p>
          <p>
            <strong>B.</strong> You agree not to impersonate any person or entity or falsely claim an affiliation with any person or entity.
          </p>
          <p>
            <strong>C.</strong> You agree not to use the Website for any commercial purposes without our prior written consent.
          </p>

          <h2>5. Third-Party Links and Services</h2>
          <p>
            <strong>A.</strong> The Website may contain links to third-party websites or services that are not owned or controlled by us. We do not endorse or assume any responsibility for these third-party websites or services.
          </p>
          <p>
            <strong>B.</strong> You acknowledge and agree that we are not responsible for the content or policies of third-party websites or services, and your use of such websites or services is at your own risk.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            <strong>A.</strong> The Website and its content are protected by copyright, trademark, and other intellectual property laws. You may not use any trademarks, logos, or copyrighted material from the Website without our prior written consent.
          </p>
          <p>
            <strong>B.</strong> You retain ownership of any content you submit to the Website, but you grant us a worldwide, royalty-free, non-exclusive, sublicensable, and transferable license to use, reproduce, distribute, modify, adapt, display, and create derivative works from your content in connection with the Website and our services.
          </p>

          <h2>7. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to the Website at our sole discretion, with or without cause, and without notice.
          </p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>
            The Website is provided "as is" and "as available" without any warranties of any kind, whether express or implied. We do not warrant that the Website will be error-free or uninterrupted.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
          </p>

          <h2>10. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of Bhopal Jurisdiction. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Bhopal.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Website after any changes to these Terms constitutes your acceptance of the updated Terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms, please contact us at <strong>info@tripbuzzinga.com</strong>
          </p>
          <p>
            By using the Website, you acknowledge that you have read, understood, and agree to these Terms and Conditions. Thank you for using <strong>TripBuzzinga.com</strong>
          </p>

        </div>
      </div>

      <Footer />
    </>
  );
}
