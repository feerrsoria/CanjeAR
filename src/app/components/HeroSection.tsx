import React from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.images}>
        <Image src="/IMG-20250728-WA0002.jpg" alt="Bolso artesanal" width={400} height={300} className={styles.heroImg} />
        <Image src="/IMG-20250728-WA0003.jpg" alt="Cartera vintage" width={400} height={300} className={styles.heroImg} />
      </div>
      <div className={styles.imagesDecorativas}>
        <Image src="/ImagenDecorativa3.png" alt="Decoración 3" width={110} height={110} className={styles.decorImg} />
        <Image src="/ImagenDecorativa4.png" alt="Decoración 4" width={140} height={140} className={styles.decorImg} />
      </div>
      <div className={styles.texts}>
        <h1 className={styles.title}>Bienvenido a <span className="canjearText">CanjeAR</span></h1>
        <p className={styles.subtitle}>Descubre productos únicos, hechos con pasión y calidad.</p>
      </div>
    </section>
  );
}
