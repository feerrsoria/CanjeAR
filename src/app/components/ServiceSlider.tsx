'use client';
// components/ServiceSlider/ServiceSlider.js
import React, { useRef, useState, useEffect } from 'react';
import AnnouncedServiceCard from './AnnouncedServiceCard';
import styles from './ServiceSlider.module.css';
import { ServiceWithVendor } from '../types/ServiceWithVendor';
import { useAuth } from '@clerk/nextjs';

export default function ServiceSlider() {
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const [announcedServices, setAnnouncedServices] = useState<ServiceWithVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useAuth();
  console.log('User ID:', userId);
  useEffect(() => {
    // Don't fetch if there's no user ID
    if (!userId) {
      setIsLoading(false);
      setAnnouncedServices([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`/api/profile/services?clerkUserId=${userId}`)
      .then(async (res) => {
        if (!res.ok) {
          // Attempt to get a meaningful error message from the response body
          const errorData = await res.json().catch(() => ({ message: 'An unknown error occurred.' }));
          throw new Error(errorData.message || `Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(setAnnouncedServices)
      .catch((err) => {
        console.error('Failed to fetch services:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [userId]); // Add userId to the dependency array

  // Define cuánto se moverá el slider con cada click
  const scrollAmount = 360; 

  const scrollLeft = () => {
    if (cardsWrapperRef.current) {
      cardsWrapperRef.current.scrollBy({
        left: -scrollAmount, // Desplaza hacia la izquierda (valor negativo)
        behavior: 'smooth',   // Hace que el desplazamiento sea suave
      });
    }
  };

  const scrollRight = () => {
    if (cardsWrapperRef.current) {
      cardsWrapperRef.current.scrollBy({
        left: scrollAmount, // Desplaza hacia la derecha (valor positivo)
        behavior: 'smooth',
      });
    }
  };

  const renderSliderContent = () => {
    if (isLoading) {
      return <p className={styles.sliderMessage}>Cargando tus servicios...</p>;
    }

    if (error) {
      return <p className={styles.sliderMessage}>Error al cargar los servicios: {error}</p>;
    }

    if (announcedServices.length === 0) {
      return <p className={styles.sliderMessage}>Aún no has anunciado ningún servicio.</p>;
    }

    return (
      <div className={styles.sliderContentWrapper}>
        <button onClick={scrollLeft} className={`${styles.navButton} ${styles.navButtonLeft}`}>
          &lt; {/* Símbolo de flecha izquierda */}
        </button>

        <div className={styles.cardsWrapper} ref={cardsWrapperRef}>
          {announcedServices.map(service => (
            <AnnouncedServiceCard key={service.id} service={service} />
          ))}
        </div>

        <button onClick={scrollRight} className={`${styles.navButton} ${styles.navButtonRight}`}>
          &gt; {/* Símbolo de flecha derecha */}
        </button>
      </div>
    );
  };

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Mis Servicios</h2>
      <p className={styles.sliderSubtitle}>Aquí puedes ver los servicios que has anunciado.</p>
      {renderSliderContent()}
    </div>
  );
}
