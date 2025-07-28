import { Product } from "./components/ProductCard";

export const products: Product[] = [
  {
    id: 1,
    name: "Bolso de Cuero Artesanal",
    price: 129.99,
    image: undefined,
    description: "Bolso hecho a mano con cuero genuino, inspirado en la tradición argentina.",
    vendor: "Artesanías del Sur",
    location: "Buenos Aires, AR",
  },
  {
    id: 2,
    name: "Cartera Vintage",
    price: 99.99,
    image: undefined,
    description: "Cartera elegante y resistente, perfecta para cualquier ocasión.",
    vendor: "Vintage Bags",
    location: "Córdoba, AR",
  },
  {
    id: 3,
    name: "Bolso Moderno",
    price: 109.99,
    image: undefined,
    description: "Diseño moderno y funcional, ideal para el día a día.",
    vendor: "Urban Style",
    location: "Rosario, AR",
  },
  {
    id: 4,
    name: "Cartera Urbana",
    price: 89.99,
    image: undefined,
    description: "Cartera urbana con detalles únicos y materiales de alta calidad.",
    vendor: "Urbano",
    location: "Mendoza, AR",
  },
  // Demo products with blank images for easy DB hydration
  ...Array.from({ length: 16 }, (_, i) => ({
    id: 5 + i,
    name: `Producto ${5 + i}`,
    price: 50 + i * 10,
    image: undefined,
    description: "Producto de ejemplo para paginación y pruebas.",
    vendor: `Vendedor ${5 + i}`,
    location: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"][i % 4] + ", AR",
  })),
];
