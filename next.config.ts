// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { // <--- Agrega este bloque
    domains: [
      'via.placeholder.com','source.unsplash.com' // <--- Añade este dominio a la lista
      // Si tienes otras fuentes de imágenes externas, agrégalas aquí también
      // 'otra-web-de-imagenes.com',
    ],
  },
};

export default nextConfig;