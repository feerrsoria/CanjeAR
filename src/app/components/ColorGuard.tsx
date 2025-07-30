import React from 'react';
import styles from './ColorGuard.module.css';

export default function ColorGuard() {
  // Define la paleta de colores extraída de la imagen
  const paletteColors = [
    '#F9EDDF', // Fondo claro
    '#DC6F40', // Naranja rojizo (texto principal)
    '#F3C78B', // Amarillo/naranja claro (piel/ropa)
    '#E5B26E', // Naranja más oscuro (ropa/objetos)
    '#6A8D56', // Verde (planta)
    '#8D5A3A', // Marrón (libros)
  ];

  return (
    <div className={styles.guardContainer}>
      {paletteColors.map((color, index) => (
        <div
          key={index} // Una clave única para cada elemento en la lista
          className={styles.colorBlock}
          style={{ backgroundColor: color }} // Aplicamos el color de fondo dinámicamente
          title={color} // Opcional: muestra el código de color al pasar el ratón
        ></div>
      ))}
    </div>
  );
}