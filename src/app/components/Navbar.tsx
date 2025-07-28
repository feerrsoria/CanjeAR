
"use client";
import React, { useState, useEffect } from "react";

import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { SiSpacex } from "react-icons/si";
import { FaRegUser } from "react-icons/fa6";
import { useTheme } from "next-themes";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <nav className={styles.navbar}>
            <div>
                <Link href="/" className={styles.logo} aria-label="Ir al inicio">
                    <Image src="/NavLogo.png" alt="CanjeAR logo" width={100} height={100} priority />
                </Link>
                <div className={styles.searchBox}>
                    <input type="text" placeholder="Buscar productos..." />
                    <button><FaSearch /></button>
                </div>
            </div>
            <div className={styles.actions}>
                {/* profile */}
                <button className={styles.iconBtn} title="profile"><FaUserCircle /></button>
                {/* cart */}
                <button className={styles.iconBtn} title="cart"><FaShoppingCart /></button>
                {/* Knock notificactions */}
                <button className={styles.iconBtn} title="Knock">
                    <SiSpacex />
                </button>
                {/* Single theme toggle button, only render after mount to avoid hydration error */}
                {mounted && (
                  <button
                    className={styles.iconBtn}
                    aria-label="Cambiar tema"
                    onClick={handleThemeToggle}
                  >
                    {theme === "dark" ? (
                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" /></svg>
                    ) : (
                        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="currentColor" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    )}
                  </button>
                )}
            </div>
            <Link href="/productos" className={styles.productosBtn}>
                <span className={styles.productosBtnText}>Productos</span>
            </Link>
        </nav>
    );
}
