"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "../legal.module.css";

export default function PaymentPolicyPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.legalHero}>
        <h1 className={styles.legalHeroTitle}>Payment Policy</h1>
        <p className={styles.legalHeroSubtitle}>
          Clear and transparent terms for payments, cancellations, and refunds.
        </p>
      </section>

      {/* Main Content */}
      <div className={styles.legalContainer}>
        <div className={styles.legalContent}>
          
          <h2>Payment terms</h2>
          <ul>
            <li><strong>1)</strong> A non-refundable booking deposit of 30% of the total trip cost is required to confirm your reservation.</li>
            <li><strong>2)</strong> To secure your tour, 50% of the remaining balance must be settled at least 50 days prior to the commencement of your trip.</li>
            <li><strong>3)</strong> The final 50% of the remaining balance is due 30 days before the start date of your journey.</li>
            <li><strong>4)</strong> For flight arrangements, a full payment of 100% of the total flight cost is needed at the time of flight booking. Please note that flight prices are subject to change, and the quoted flight prices may vary at the time of actual booking.</li>
            <li><strong>5)</strong> The TCS amount has to be paid at the time of booking.</li>
          </ul>

          <h2>Cancellation policy</h2>
          <p>
            At TripBuzzinga, we value our customers and strive to provide a fair cancellation policy. Please review our updated policy below:
          </p>
          <ul>
            <li><strong>1)</strong> Cancellations made 30 days or less before the start date of the trip will incur a cancellation fee equal to 100% of the trip cost.</li>
            <li><strong>2)</strong> Cancellations made between 45 and 30 days before the start date of the trip will incur a cancellation fee equal to 50% of the trip cost.</li>
            <li><strong>3)</strong> Cancellations made between 60 and 45 days before the start date of the trip will incur a cancellation fee equal to 25% of the trip cost.</li>
            <li><strong>4)</strong> The TCS amount is not refundable. (applicable only on Indian passport holders)</li>
          </ul>
          <p>
            Please note that no refund shall be made with respect to the initial booking amount for any cancellations.
          </p>
          <p>
            In cases where unforeseen weather conditions or government restrictions result in the cancellation of certain activities, we understand the disappointment it may cause. Our dedicated operators will make every effort to offer an alternative feasible activity (If Possible). However, it's important to note that no refund will be provided for such cases.
          </p>

          <h2>Refund Policy</h2>
          
          <h3>International</h3>
          <ul>
            <li><strong>GST:</strong> Any GST charged on any transaction will not be refunded.</li>
            <li><strong>TCS:</strong> The amount charged for TCS will not be refunded.</li>
            <li><strong>Pending Refund:</strong> Any refund pending on your booking will be credited to the same mode of payment through which you paid in 5-7 working days. The Refund amount depicted is subjected to change based on international exchange rates, refunds received from suppliers and payments received from customers till date. Any change in refund amount will be communicated to customers by their respective account owners.</li>
            <li><strong>Partial Refund:</strong> Any case in which a partial refund will be issued will be calculated after deducting the Booking Amount and Cancellation Charges depending on the time of Cancellation.</li>
            <li><strong>Remaining Amount:</strong> Will be calculated on the amount paid over and above the booking amount.</li>
          </ul>

          <h3>Domestic</h3>
          <ul>
            <li><strong>GST:</strong> Any GST charged on any transaction will not be refunded.</li>
            <li><strong>Pending Refund:</strong> Any refund pending on your booking will be credited to the same mode of payment through which you paid in 5-7 working days.</li>
            <li><strong>Partial Refund:</strong> Any case in which a partial refund will be issued will be calculated after deducting the Booking Amount and Cancellation Charges depending on the time of Cancellation.</li>
            <li><strong>Remaining Amount:</strong> Will be calculated on the amount paid over and above the booking amount.</li>
          </ul>

        </div>
      </div>

      <Footer />
    </>
  );
}
