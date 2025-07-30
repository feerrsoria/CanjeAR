import React from 'react';
import Image from 'next/image';
import styles from './AnnouncedServiceCard.module.css';
import { ServiceWithVendor } from '../types/ServiceWithVendor';
export default function AnnouncedServiceCard({ service }: { service: ServiceWithVendor }) {
  if (!service) {
    return null; // No renderiza nada si no hay servicio
  }

  

  // Formatear el precio a moneda local (ej: pesos argentinos)
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS', // Puedes cambiar a 'USD' si es necesario
    minimumFractionDigits: 0, // Sin decimales para números enteros
    maximumFractionDigits: 0,
  }).format(service.price);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={service.images[0]}
          alt={service.name}
          width={300} // Ajusta el tamaño de la imagen dentro de la tarjeta
          height={200}
          layout="responsive" // Hace que la imagen sea responsiva dentro de su contenedor
          objectFit="cover" // Cubre el área, recortando si es necesario
          className={styles.cardImage}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{service.name}</h3>
        <p className={styles.description}>{service.description}</p>
        <div className={styles.details}>
          <span className={styles.price}>{formattedPrice}</span>
          <span className={styles.location}>{service.location}</span>
        </div>
        <div className={styles.providerInfo}>
          <span className={styles.providerName}>Por: {service.vendor.name + ' ' + service.vendor.lastname}</span>
          <span className={styles.postedDate}>Anunciado: {new Date(service.publishedDate).toLocaleDateString('es-AR')}</span>
        </div>
        {/* Aquí podrías añadir un botón de "Ver detalles" */}
      </div>
    </div>
  );
}