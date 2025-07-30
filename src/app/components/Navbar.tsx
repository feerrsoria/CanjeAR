
"use client";
import React, { useState, useEffect } from "react";
import { AiFillProduct } from "react-icons/ai";
import { FaServicestack } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useTheme } from "next-themes";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./CartContext";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton,
} from '@clerk/nextjs'
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { cart } = useCart();
    useEffect(() => { setMounted(true); }, []);
    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    // Calculate total number of products in cart (not just unique items)
    const cartCount = cart.length;
    const router = useRouter();


    const handleMisServiciosClick = () => {
        router.push('/profile/servicios');
    };
    const handleMisProductosClick = () => {
        router.push('/profile/productos');
    }

    return (
        <nav>
            <div className={styles.navbar}>
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
                    {/* profile - replaced with Clerk UserButton */}
                    <div className={styles.iconBtn} title="profile">
                        <SignedOut>
                            <SignInButton>
                                <button className={styles.roundButton} aria-label="Sign in">
                                    <FaSignInAlt className={styles.icon} />
                                </button>
                            </SignInButton>
                            <SignUpButton>
                                <button className={styles.roundButton} aria-label="Sign up">
                                    <FaSignOutAlt className={styles.icon} />
                                </button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton>
                                <UserButton.MenuItems>
                                    <UserButton.Action
                                        label="Mis productos"
                                        labelIcon={<AiFillProduct />}
                                        onClick={() => handleMisProductosClick()}
                                    />
                                    <UserButton.Action
                                        label="Mis servicios"
                                        labelIcon={<FaServicestack />}
                                        onClick={() => handleMisServiciosClick()}
                                    />
                                </UserButton.MenuItems>
                            </UserButton>
                        </SignedIn>
                    </div>
                    {/* cart */}
                    <Link href="/cart" className={styles.iconBtn} title="cart" style={{ position: 'relative' }}>
                        <FaShoppingCart />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-6px',
                                background: 'var(--primary)',
                                color: '#fff',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                minWidth: '20px',
                                textAlign: 'center',
                                zIndex: 1
                            }}>{cartCount}</span>
                        )}
                    </Link>
                    {/* Knock notifications - placeholder for future integration */}
                    {/* <KnockBell /> */}
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
            </div>
            <ol className={styles.navLinks}>
                <li>
                    <Link href="/productos" className={styles.navLink}>
                        <span className={styles.navLinkText}>Productos</span>
                    </Link>
                </li>
                <li>
                    <Link href="/servicios" className={styles.navLink}>
                        <span className={styles.navLinkText}>Servicios</span>
                    </Link>
                </li>
            </ol>
        </nav>
    );
}
