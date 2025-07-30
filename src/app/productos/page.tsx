"use client";
import React, { useState } from "react";

import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import styles from "../page.module.css";
import Image from "next/image";
import { ProductWithVendor } from "../types/ProductWithVendor";

export default function ProductosPage() {
   const [products, setProducts] = useState<ProductWithVendor[]>([]);
  const [page, setPage] = useState(1);
  
  React.useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const pageSize = 8;
  const totalPages = Math.ceil(products.length / pageSize);
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', marginBottom: '1.2rem', flexWrap: 'wrap', paddingTop:'4.2rem' }}>
            <Image src="/ImagenDecorativa3.png" alt="Decoración 3" width={70} height={70} style={{ borderRadius: '1.5rem 50% 1.5rem 50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: '0 4px 18px rgba(58,44,26,0.13)' }} />
            <Image src="/ImagenDecorativa4.png" alt="Decoración 4" width={90} height={90} style={{ borderRadius: '1.5rem 50% 1.5rem 50%', objectFit: 'cover', border: '3px solid var(--primary)', boxShadow: '0 4px 18px rgba(58,44,26,0.13)' }} />
          </div>
          <h1 className={styles.productsTitle}>Todos los productos</h1>
          <div className={styles.productsGrid}>
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </section>
      </main>
    </div>
  );
}
