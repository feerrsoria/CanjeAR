import React from 'react';
import AddProductCard from '@/app/components/AddProductCard';
import ColorGuard from '@/app/components/ColorGuard';
import ProductGrid from '@/app/components/ProductGrid'; // Asegúrate de que ProductGrid.js exista y tenga la cuadrícula de productos
import Head from 'next/head'; // Para el título de la página

export default function ProductosPage() {
  return (
    <>
      <Head>
        <title>CanjeAR - Productos</title>
        <meta name="description" content="Explora y anuncia productos en CanjeAR" />
      </Head>

      <main>
        {/* Sección principal de "Agregar Producto" con la imagen a la derecha */}
        <AddProductCard />

        {/* La guarda horizontal debajo de la primera sección */}
        <ColorGuard />

        {/* La cuadrícula de productos con paginación */}
        <ProductGrid />
      </main>
    </>
  );
}