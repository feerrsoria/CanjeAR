import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} <span className="canjearText">CanjeAR</span>. Todos los derechos reservados.</div>
      <div className={styles.links}>
        <a href="#">Términos</a>
        <a href="#">Privacidad</a>
        <a href="#">Contacto</a>
      </div>
    </footer>
  );
}
