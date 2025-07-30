"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductWithVendor } from "../types/ProductWithVendor";

interface CartContextType {
  cart: ProductWithVendor[];
  addToCart: (productWProductWithVendor: ProductWithVendor) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ProductWithVendor[]>([]);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (productWProductWithVendor: ProductWithVendor) => {
    setCart((prev) => [...prev, productWProductWithVendor]);
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
