'use client';
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';

import styles from './ProductGrid.module.css';
import { ProductWithVendor } from '../types/ProductWithVendor';
import { useAuth } from '@clerk/nextjs';

const PRODUCTS_PER_PAGE = 6;

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<ProductWithVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      setProducts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    // The API route for user-specific products should be under /api, not a page route.
    // Assuming the correct endpoint is /api/products based on the API code provided.
    fetch(`/api/profile/products?clerkUserId=${userId}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({ message: 'An unknown error occurred.' }));
          throw new Error(errorData.message || `Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(setProducts)
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

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

  const renderContent = () => {
    if (isLoading) {
      return <p className={styles.gridMessage}>Cargando tus productos...</p>;
    }

    if (error) {
      return <p className={styles.gridMessage}>Error al cargar los productos: {error}</p>;
    }

    if (products.length === 0) {
      return <p className={styles.gridMessage}>Aún no has anunciado ningún producto.</p>;
    }

    return (
      <>
        <div className={styles.gridContainer}>
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
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
        )}
      </>
    );
  };

  return (
    <div className={styles.gridSection}>
      <h2 className={styles.gridTitle}>Mis Productos</h2>
      {renderContent()}
    </div>
  );
}
