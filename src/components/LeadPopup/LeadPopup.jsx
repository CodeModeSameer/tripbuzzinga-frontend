"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import styles from "./LeadPopup.module.css";

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "IN +91",
    phone: "",
    details: ""
  });

  useEffect(() => {
    // Check if the user has already seen the popup this session
    const hasSeenPopup = sessionStorage.getItem("leadPopupShown");
    
    if (!hasSeenPopup) {
      // Show popup after 15 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem("leadPopupShown", "true");
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsVisible(false), 2000);
      }
    } catch (err) {
      console.error('Failed to submit lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Close popup">
          <X size={24} />
        </button>
        
        <h2 className={styles.title}>Plan Your Next Trip</h2>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">First name *</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                placeholder="First name"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Last name *</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName"
                placeholder="Last name"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email *</label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.row}>
            <div className={styles.inputGroup} style={{ flex: '0 0 120px' }}>
              <label htmlFor="countryCode">Code *</label>
              <div className={styles.selectWrapper}>
                <select 
                  id="countryCode" 
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                >
                  <option value="IN +91">IN +91</option>
                  <option value="US +1">US +1</option>
                  <option value="GB +44">GB +44</option>
                  <option value="AU +61">AU +61</option>
                  <option value="AE +971">AE +971</option>
                </select>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone *</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="details">Give us more details</label>
            <input 
              type="text" 
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.submitWrapper}>
            {isSuccess ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontWeight: 600 }}>
                <CheckCircle size={20} /> Thank you! We&apos;ll be in touch soon.
              </div>
            ) : (
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Details"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
