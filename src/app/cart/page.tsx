"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard, { Product } from "../components/ProductCard";
import styles from "../page.module.css";

// Demo: cart state in localStorage or context would be used in a real app
const demoCart: Product[] = [];

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>(demoCart);

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <h1 className={styles.productsTitle}>Carrito de compras</h1>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <div className={styles.productsGridHome}>
                {cart.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className={styles.cartTotal}>
                <span>Total: ${total.toFixed(2)}</span>
                <a href="/checkout" className={styles.bigButton}>
                  Ir a pagar
                </a>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
