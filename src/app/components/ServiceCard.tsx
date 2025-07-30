'use client';
// components/AddServiceCard/AddServiceCard.js
import React, { useState } from 'react';
import Image from 'next/image'; // Make sure you import Image

import styles from './AddProductCard.module.css';

export default function AddServiceCard() {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const handleImageUpload = () => {
        if (uploadedImages.length < 3) {
            // Reference your LOCAL placeholder images here
            // Ensure these files actually exist in your /public folder
            const newImage = `/placeholder-image-${uploadedImages.length + 1}.jpg`; 
            setUploadedImages([...uploadedImages, newImage]);
            alert('Simulating image upload. In a real app, this would upload a file.');
        } else {
            alert('You can only upload up to 3 images.');
        }
    };

    return (
        <div className={styles.container}>
            {/* Card on the left */}
            <div className={styles.card}>
                <h2>Agregar servicio</h2>
                <p>Completa los detalles del Servicio que deseas ofrecer.</p>
                <label>Nombre</label>
                <input type="text" placeholder="Nombre del servicio" />
                <label>Descripción</label>
                <textarea placeholder="Descripción del servicio"></textarea>
                <label>Precio</label>
                <input type="number" placeholder="Precio del servicio" />

                {/* Image Upload Section */}
                <label>Imágenes del Servicio (hasta 3)</label>
                <div className={styles.uploadSection}>
                    <button type="button" onClick={handleImageUpload} className={styles.uploadButton}>
                        <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.5 7.05v9.9c0 .75-.6 1.35-1.35 1.35H5.85c-.75 0-1.35-.6-1.35-1.35v-9.9c0-.75.6-1.35 1.35-1.35h12.3c.75 0 1.35.6 1.35 1.35zM6 16.5l3.5-4.5 2.5 3.25 3-4 4 5.25H6z"/>
                        </svg>
                        Subir Imágenes
                    </button>
                    <div className={styles.imagePreviews}>
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className={styles.imagePlaceholder}>
                                {uploadedImages[index] ? (
                                    // Use explicit width/height for placeholder images too
                                    <Image
                                        src={uploadedImages[index]}
                                        alt={`Imagen subida ${index + 1}`}
                                        width={100} // Matches .imagePlaceholder width
                                        height={100} // Matches .imagePlaceholder height
                                        objectFit="cover" // Use objectFit directly on Image for these small ones if needed
                                    />
                                ) : (
                                    <div className={styles.placeholderText}>+</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <label>Ubicación</label>
                <input type="text" placeholder="Ubicación del servicio" />
                <button>Agregar Servicio</button>
            </div>

            {/* Decorative Image on the right */}
            <div className={styles.imageWrapper}>
              <Image src="/IMG-20250728-WA0002.jpg" alt="Cartera vintage" width={450} height={600}/>
            </div>
        </div>
    );
}