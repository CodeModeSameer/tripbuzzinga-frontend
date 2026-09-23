"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import GlobalBottomSections from "@/components/GlobalBottomSections/GlobalBottomSections";
import styles from "./Contact.module.css";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending
    alert("Thank you for contacting us! We will get back to you shortly.");
    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Navbar />
      
      <main style={{ backgroundColor: "#fcfcfc" }}>
        <div className={styles.contactContainer}>
          
          {/* Top Info Grid */}
          <div className={styles.infoGrid}>
            <div className={styles.infoColumn}>
              <div className={styles.iconWrapper}>
                <MapPin size={24} />
              </div>
              <h3 className={styles.infoTitle}>Address</h3>
              <p className={styles.infoText}>Plot No. 270, Phase 2, Udyog Vihar,</p>
              <p className={styles.infoText}>Sector 20, Gurugram, Haryana 122016</p>
            </div>
            
            <div className={styles.infoColumn}>
              <div className={styles.iconWrapper}>
                <Phone size={24} />
              </div>
              <h3 className={styles.infoTitle}>Contact</h3>
              <p className={styles.infoText}>+91 8251056139</p>
              <p className={styles.infoText}>planners@tripbuzzinga.com</p>
              
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
                <a href="#" className={styles.socialIcon}><Facebook size={20} /></a>
                <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
                <a href="#" className={styles.socialIcon}><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div className={styles.infoColumn}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <h3 className={styles.infoTitle}>Opening Hours</h3>
              <div className={styles.hoursGrid}>
                <span>Mon - Fri</span>
                <span>10:00 am – 9:00 pm</span>
                
                <span>Saturday</span>
                <span>10:00 am – 7:00 pm</span>
                
                <span>Sunday</span>
                <span>10:00 am – 7:00 pm</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Form & Map Grid */}
          <div className={styles.formMapGrid}>
            
            <div className={styles.formSection}>
              <h2 className={styles.formTitle}>Get in Touch</h2>
              <p className={styles.formSubtitle}>Have a question or want to plan your next trip? Drop us a message.</p>
              
              <form onSubmit={handleSubmit}>
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      className={styles.inputField} 
                      placeholder=" " 
                      required 
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <label htmlFor="firstName" className={styles.inputLabel}>First Name *</label>
                  </div>
                  <div className={styles.inputGroup}>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      className={styles.inputField} 
                      placeholder=" " 
                      required 
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <label htmlFor="lastName" className={styles.inputLabel}>Last Name *</label>
                  </div>
                </div>
                
                <div className={styles.inputGroup} style={{ marginBottom: "30px" }}>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    className={styles.inputField} 
                    placeholder=" " 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className={styles.inputLabel}>Email *</label>
                </div>
                
                <div className={styles.inputGroup}>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    className={styles.inputField} 
                    placeholder=" " 
                    required 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone" className={styles.inputLabel}>Phone *</label>
                </div>
                
                <div className={styles.textAreaGroup}>
                  <textarea 
                    id="message" 
                    name="message"
                    className={styles.textArea} 
                    placeholder=" " 
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message" className={styles.inputLabel}>Message *</label>
                </div>
                
                <button type="submit" className={styles.sendBtn}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
            
            <div className={styles.mapSection}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3506.119253457121!2d77.08632481508215!3d28.50604818247071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d194411130e55%3A0xc47e3a985d2eb34!2sUdyog%20Vihar%20Phase%20II%2C%20Udyog%20Vihar%20III%2C%20Sector%2020%2C%20Gurugram%2C%20Haryana%20122016!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className={styles.mapIframe}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
          </div>
          
        </div>
      </main>
      
      <GlobalBottomSections />
      <Footer />
    </>
  );
}
