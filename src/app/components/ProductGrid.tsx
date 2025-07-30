'use client';
import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

import styles from './ProductGrid.module.css';
import { ProductWithVendor } from '../types/ProductWithVendor';

const PRODUCTS_PER_PAGE = 6; // Máximo de 4-6 productos por página. Ajusta si quieres 4 o 5.

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductWithVendor[]>([]);

  React.useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);
  // Calcula el número total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(products.length / PRODUCTS_PER_PAGE);
  }, [products.length]);

  // Obtiene los productos para la página actual
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [currentPage, products]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={styles.gridSection}>
      <h2 className={styles.gridTitle}>Explorar Productos</h2>

      <div className={styles.gridContainer}>
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Anterior
        </button>
        <span className={styles.pageInfo}>Página {currentPage} de {totalPages}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}