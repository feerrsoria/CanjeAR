"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../page.module.css";

export default function CheckoutPage() {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <h1 className={styles.productsTitle}>Checkout</h1>
          <div className={styles.checkoutBox}>
            <p>Pronto podrás pagar con MercadoPago aquí.</p>
            <button className={styles.bigButton} disabled>
              Pagar con MercadoPago
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
