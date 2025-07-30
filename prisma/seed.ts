// prisma/seed.ts
// Este script poblará la base de datos con datos iniciales de productos, servicios y un proveedor.

import { Prisma, PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

const prisma = new PrismaClient();

export interface Producto {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  vendorId: string;
  location: string;
  publishedDate: Date;
}

export interface Servicio {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  publishedDate: Date;
  images: string[];
  vendorId: string;
}

export interface Vendedor {
  id: string;
  clerkUserId: string;
  name: string;
  lastname: string;
  sales: number;
  rating: number;
  description: string;
  location: string;
  services: Servicio[];
  products: Producto[];
}

// ---------- Datos semilla ----------

const vendorId = uuid();
const clerkUserId = "user_30YaOH5QxpUROCxRa1JmLgkHlvU";

const now = new Date();

const servicios: Servicio[] = [
  {
    id: uuid(),
    name: "Corte de Pelo",
    description: "Servicio profesional de peluquería",
    price: 30,
    location: "Centro",
    images: ["https://source.unsplash.com/400x300/?haircut"],
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Lavado de Autos",
    description: "Limpieza interior y exterior del vehículo",
    price: 25,
    location: "Zona Industrial",
    images: ["https://source.unsplash.com/400x300/?car-wash"],
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Paseo de Perros",
    description: "Paseo de 30 minutos para tu mascota",
    price: 15,
    location: "Parque Central",
    images: ["https://source.unsplash.com/400x300/?dog-walking"],
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Limpieza de Hogar",
    description: "Servicio de limpieza de 2 horas",
    price: 60,
    location: "Zona Residencial",
    images: ["https://source.unsplash.com/400x300/?cleaning"],
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Clases de Guitarra",
    description: "Clase básica de guitarra de 1 hora",
    price: 40,
    location: "Estudio Musical",
    images: ["https://source.unsplash.com/400x300/?guitar"],
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Entrenamiento Personal",
    description: "Entrenador personal por 1 hora",
    price: 50,
    location: "Gimnasio Central",
    images: ["https://source.unsplash.com/400x300/?fitness"],
    vendorId,
    publishedDate: now,
  },
];

const productos: Producto[] = [
  {
    id: uuid(),
    name: "Mouse Inalámbrico",
    description: "Mouse ergonómico con Bluetooth",
    price: 20,
    images: ["https://source.unsplash.com/400x300/?wireless-mouse"],
    category: "Electrónica",
    location: "Depósito A",
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Colchoneta de Yoga",
    description: "Colchoneta antideslizante",
    price: 25,
    images: ["https://source.unsplash.com/400x300/?yoga-mat"],
    category: "Fitness",
    location: "Depósito B",
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Cuaderno",
    description: "Cuaderno con tapa dura y rayado",
    price: 10,
    images: ["https://source.unsplash.com/400x300/?notebook"],
    category: "Papelería",
    location: "Tienda Centro",
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Lámpara LED",
    description: "Lámpara de escritorio ajustable",
    price: 35,
    images: ["https://source.unsplash.com/400x300/?desk-lamp"],
    category: "Oficina",
    location: "Depósito C",
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Botella Térmica",
    description: "Botella de acero inoxidable",
    price: 18,
    images: ["https://source.unsplash.com/400x300/?water-bottle"],
    category: "Camping",
    location: "Tienda Centro",
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Parlante Bluetooth",
    description: "Parlante portátil con bajo potente",
    price: 45,
    images: ["https://source.unsplash.com/400x300/?bluetooth-speaker"],
    category: "Electrónica",
    location: "Depósito A",
    vendorId,
    publishedDate: now,
  },
  {
    id: uuid(),
    name: "Taza de Café",
    description: "Taza de cerámica con tapa",
    price: 12,
    images: ["https://source.unsplash.com/400x300/?coffee-mug"],
    category: "Cocina",
    location: "Tienda Centro",
    vendorId,
    publishedDate: now,
  },
];

const vendedores: Vendedor[] = [
  {
    id: vendorId,
    clerkUserId,
    name: "Fernando",
    lastname: "Soria",
    sales: 100,
    rating: 4.9,
    description: "Vendedor y prestador de servicios con amplia experiencia",
    location: "Ciudad Central",
    services: servicios,
    products: productos,
  },
];

// ---------- Lógica de seed ----------

async function main() {
  console.log(`Start seeding ...`);
  for (const vendedor of vendedores) {
    const { services, products, ...vendorData } = vendedor;

    await prisma.vendor.upsert({
      where: { clerkUserId: vendorData.clerkUserId },
      update: {},
      create: {
        ...vendorData,
        products: {
          create: products.map(({ vendorId, ...p }) => p),
        },
        services: {
          create: services.map(({ vendorId, ...s }) => s),
        },
      },
    });
  }
  console.log(`Seeding finished.`);
}

main()
  .then(() => {
    console.log("✅ Database seeded successfully with online images");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error("❌ Error al poblar la base de datos:", err);
    return prisma.$disconnect().then(() => process.exit(1));
  });
