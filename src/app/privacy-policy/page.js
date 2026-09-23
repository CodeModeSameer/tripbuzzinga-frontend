"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../legal.module.css";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.legalHero}>
        <h1 className={styles.legalHeroTitle}>Privacy Policy</h1>
        <p className={styles.legalHeroSubtitle}>
          We are committed to protecting your privacy and security.
        </p>
      </section>

      {/* Main Content */}
      <div className={styles.legalContainer}>
        <div className={styles.legalContent}>
          <p className={styles.lastUpdated}>Last Updated: 2026</p>
          
          <p>
            Welcome to TripBuzzinga! At TripBuzzinga, we are committed to protecting the privacy and security of your personal information.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website <strong>www.tripbuzzinga.com</strong> and the services we offer. By using our website and services, you consent to the practices described in this Privacy Policy.
          </p>

          <h2>1. Information We Collect</h2>
          
          <h3>1.1. Personal Information</h3>
          <p>We may collect personal information that you provide to us when you use our website and services. This includes:</p>
          <ul>
            <li><strong>Contact Information:</strong> Your name, email address, phone number, and postal address.</li>
            <li><strong>Travel Preferences:</strong> Information about your travel preferences, including destination choices, dates of travel, and accommodation preferences.</li>
            <li><strong>Payment Information:</strong> Credit card information or other payment details when you make bookings or payments on our platform.</li>
            <li><strong>Communication:</strong> Records of your interactions with our customer support team and any feedback you provide to us.</li>
            <li><strong>Account Information:</strong> Usernames, passwords, and other security related information used for account registration and login.</li>
            <li><strong>Social Media:</strong> Information from your social media profiles if you choose to log in or connect with us through social media.</li>
          </ul>

          <h3>1.2. Usage Information</h3>
          <p>We automatically collect certain information when you use our website and services, including:</p>
          <ul>
            <li><strong>Device Information:</strong> Information about your device, such as IP address, browser type, operating system, and device identifiers.</li>
            <li><strong>Usage Data:</strong> Details about how you use our website, including pages visited, features used, and the actions you take.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to collect information about your browsing behavior. You can manage your cookie preferences through your browser settings.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul>
            <li><strong>2.1. Provide Services:</strong> To provide you with travel planning and booking services, including reservations, travel itineraries, and trip recommendations.</li>
            <li><strong>2.2. Customer Support:</strong> To respond to your inquiries, provide customer support, and address your feedback.</li>
            <li><strong>2.3. Personalization:</strong> To personalize your experience on our website, including recommendations and content tailored to your preferences.</li>
            <li><strong>2.4. Marketing and Communication:</strong> To send you promotional offers, newsletters, and other marketing communications, where permitted by law. You can opt out of these communications at any time.</li>
            <li><strong>2.5. Analytics and Improvement:</strong> To analyze user behavior and improve our website and services.</li>
            <li><strong>2.6. Legal Compliance:</strong> To comply with legal obligations, resolve disputes, and enforce our terms and policies.</li>
          </ul>

          <h2>3. How We Share Your Information</h2>
          <p>We may share your information with the following entities:</p>
          <ul>
            <li><strong>3.1. Service Providers:</strong> We may share your information with third party service providers who assist us in providing and improving our services, including payment processors, data analysis providers, and marketing partners.</li>
            <li><strong>3.2. Business Partners:</strong> We may share information with trusted business partners who offer products or services that may be of interest to you.</li>
            <li><strong>3.3. Legal Requirements:</strong> We may disclose your information to comply with applicable laws, regulations, legal processes, or government requests.</li>
            <li><strong>3.4. Protection of Rights:</strong> We may share information to protect our rights, privacy, safety, or property, and the rights, privacy, safety, or property of our users and others.</li>
          </ul>

          <h2>4. Your Choices and Rights</h2>
          <ul>
            <li><strong>4.1. Access and Correction:</strong> You can access and update your personal information through your account settings. If you need assistance, please contact our customer support team.</li>
            <li><strong>4.2. OptOut:</strong> You can opt out of marketing communications by following the instructions provided in the communication or by contacting us directly.</li>
            <li><strong>4.3. Cookies:</strong> You can manage your cookie preferences through your browser settings.</li>
          </ul>

          <h2>5. Security</h2>
          <p>
            We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, and destruction. However, no data transmission or storage system is completely secure, so we cannot guarantee the security of your information.
          </p>

          <h2>6. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The updated Privacy Policy will be posted on our website, and the date of the latest revision will be indicated at the top of the page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at: <strong>info@tripbuzzinga.com</strong>
          </p>
          <p>
            Please read this Privacy Policy carefully to understand how we handle your information. By using TripBuzzinga, you agree to the practices described in this Privacy Policy.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
