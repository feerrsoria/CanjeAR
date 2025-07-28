"use client";
import React from "react";
import Image from "next/image";
import { FaCartPlus, FaMapMarkerAlt } from "react-icons/fa";

import styles from "./ProductCard.module.css";
import BlankImage from "./BlankImage";
import { useCart } from "./CartContext";

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
  vendor: string;
  location: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  return (
    <div className={styles.card}>
      {product.image ? (
        <Image src={product.image} alt={product.name} width={320} height={220} className={styles.img} />
      ) : (
        <BlankImage width={320} height={220} />
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.vendorLoc}>
          <span className={styles.vendor}>{product.vendor}</span>
          <span className={styles.location}><FaMapMarkerAlt /> {product.location}</span>
        </div>
        <p className={styles.desc}>{product.description}</p>
        <div className={styles.bottom}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
                <button className={styles.cartBtn} title="Agregar al carrito" onClick={() => addToCart(product)}>
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
