import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ProductCard, { Product } from "./components/ProductCard";
import { products } from "./products";

export default function Home() {
  // Always show at least 2, up to 4 if available
  const featuredProducts = products.slice(0, 4);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <main className={styles.main}>
        <section className={styles.productsSection}>
          <div className={styles.productsGridHome}>
            {featuredProducts.map((product: Product) => (
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
      <Footer />
    </div>
  );
}
