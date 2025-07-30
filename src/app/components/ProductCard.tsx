// components/ProductCard/ProductCard.js
"use client";
import React from "react";
import Image from "next/image";
import { FaCartPlus, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./ProductCard.module.css";
import BlankImage from "./BlankImage"; // Asegúrate de que BlankImage.js exista en el mismo directorio
import { useCart } from "./CartContext"; // Asegúrate de que CartContext.js exista y tenga un hook useCart
import { ProductWithVendor } from "../types/ProductWithVendor"; // Asegúrate de que este tipo esté definido correctamente


export default function ProductCard({ product }: { product: ProductWithVendor }) {
  const { addToCart } = useCart();
  return (
    <div className={styles.card}>
      {product.images && product.images.length > 0 ? (
        <Image src={product.images[0]} alt={product.name} width={320} height={220} className={styles.img} />
      ) : (
        <BlankImage width={320} height={220} />
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.vendorLoc}>
          <span className={styles.vendor}>{product.vendor.name}</span>
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