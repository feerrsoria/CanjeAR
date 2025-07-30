'use client';
// components/ServiceSlider/ServiceSlider.js
import React, { useRef, useState } from 'react'; // <--- Importa useRef
import AnnouncedServiceCard from './AnnouncedServiceCard';
import styles from './ServiceSlider.module.css';
import { ServiceWithVendor } from '../types/ServiceWithVendor';

export default function ServiceSlider() {
  const cardsWrapperRef = useRef<HTMLDivElement>(null);
  const [announcedServices, setAnnouncedServices] = useState<ServiceWithVendor[]>([]);

  React.useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setAnnouncedServices)
      .catch(console.error);
  }, []);
  // Define cuánto se moverá el slider con cada click
  // Un buen valor es el ancho aproximado de una tarjeta más su margen/gap.
  // Si las tarjetas son ~320px de ancho y tienen 1.5rem (24px) de gap, un desplazamiento de 350-360px es ideal.
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

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.sliderTitle}>Mis Servicios</h2>
      <p className={styles.sliderSubtitle}>Aquí puedes ver los servicios que has anunciado.</p>
      
      {/* Nuevo contenedor para posicionar las flechas absolutamente */}
      <div className={styles.sliderContentWrapper}> 
        <button onClick={scrollLeft} className={`${styles.navButton} ${styles.navButtonLeft}`}>
          &lt; {/* Símbolo de flecha izquierda */}
        </button>

        <div className={styles.cardsWrapper} ref={cardsWrapperRef}> {/* <-- Asigna la referencia aquí */}
          {announcedServices.map(service => (
            <AnnouncedServiceCard key={service.id} service={service} />
          ))}
        </div>

        <button onClick={scrollRight} className={`${styles.navButton} ${styles.navButtonRight}`}>
          &gt; {/* Símbolo de flecha derecha */}
        </button>
      </div>
    </div>
  );
}