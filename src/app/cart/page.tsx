"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import styles from "../page.module.css";
import { useCart } from "../components/CartContext";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <h1 className={styles.productsTitle}>Carrito de compras</h1>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <div className={styles.productsGridHome}>
                {cart.map((product, idx) => (
                  <div key={product.id + '-' + idx} style={{ position: 'relative' }}>
                    <ProductCard product={product} />
                    <button
                      onClick={() => removeFromCart(product.id)}
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'var(--primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(184,74,27,0.12)'
                      }}
                      title="Quitar del carrito"
                    >
                      <FaTrash />
                    </button>
                  </div>
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
    </div>
  );
}
