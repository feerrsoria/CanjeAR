// page.tsx (Server Component)
import styles from "./page.module.css";
import HeroSection from "./components/HeroSection";
import ProductCard from "./components/ProductCard";
import { ProductWithVendor } from "./types/ProductWithVendor";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  const featuredProducts: ProductWithVendor[] = await prisma.product.findMany({
    take: 4, 
    orderBy: { id: "asc" },
    include: { vendor: true },
  });

  return (
    <div>
      <HeroSection />
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <div className={styles.productsGridHome}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className={styles.moreProductsSection}>
            <a href="/productos" className={styles.bigButton}>
              Ver más productos
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
