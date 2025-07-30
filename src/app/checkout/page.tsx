"use client";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useCart } from "../components/CartContext";
import Select from 'react-select';

const argentinaLocations = [
  { value: 'Buenos Aires, AR', label: 'Buenos Aires' },
  { value: 'Córdoba, AR', label: 'Córdoba' },
  { value: 'Rosario, AR', label: 'Rosario' },
  { value: 'Mendoza, AR', label: 'Mendoza' },
  { value: 'La Plata, AR', label: 'La Plata' },
  { value: 'San Miguel de Tucumán, AR', label: 'San Miguel de Tucumán' },
  { value: 'Mar del Plata, AR', label: 'Mar del Plata' },
  { value: 'Salta, AR', label: 'Salta' },
  { value: 'Santa Fe, AR', label: 'Santa Fe' },
  { value: 'San Juan, AR', label: 'San Juan' },
  { value: 'Resistencia, AR', label: 'Resistencia' },
  { value: 'Neuquén, AR', label: 'Neuquén' },
  { value: 'Santiago del Estero, AR', label: 'Santiago del Estero' },
  { value: 'Corrientes, AR', label: 'Corrientes' },
  { value: 'Bahía Blanca, AR', label: 'Bahía Blanca' },
  { value: 'Other', label: 'Otra ubicación...' },
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userLocation, setUserLocation] = useState(argentinaLocations[0]);
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div>
      <main className={styles.main} style={{ background: '#FFF8F0', minHeight: '100vh' }}>
        <section className={styles.productsSection}>
          <h1 className={styles.productsTitle} style={{ color: '#B84A1B', marginBottom: 32 }}>Checkout</h1>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 32,
            background: '#FFF3E6',
            borderRadius: 24,
            boxShadow: '0 4px 18px rgba(184,74,27,0.08)',
            padding: 32,
            maxWidth: 800,
            margin: '0 auto',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}>
            {/* Left: Product Info */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <h2 style={{ color: '#B84A1B', fontSize: 22, marginBottom: 16 }}>Tus productos</h2>
              {orderPlaced ? (
                <p>¡Gracias por tu compra! Tu pedido ha sido realizado.</p>
              ) : cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cart.map((item) => (
                    <li key={item.id} style={{
                      background: '#FFF',
                      borderRadius: 12,
                      marginBottom: 12,
                      padding: '12px 16px',
                      boxShadow: '0 2px 8px rgba(184,74,27,0.06)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2
                    }}>
                      <span style={{ fontWeight: 600, color: '#B84A1B' }}>{item.name}</span>
                      <span style={{ fontSize: 14, color: '#7A3E1B' }}>Vendedor: {item.vendor.name} {item.vendor.lastname}</span>
                      <span style={{ fontSize: 14, color: '#7A3E1B' }}>Ubicación: {item.location}</span>
                      <span style={{ fontSize: 15, color: '#333', marginTop: 2 }}>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {!orderPlaced && cart.length > 0 && (
                <p style={{ fontWeight: 'bold', color: '#B84A1B', marginTop: 18, fontSize: 18 }}>Total: ${total.toFixed(2)}</p>
              )}
            </div>
            {/* Right: User Info */}
            <div style={{
              flex: 1,
              minWidth: 220,
              background: '#FFF',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 2px 8px rgba(184,74,27,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}>
              <h2 style={{ color: '#B84A1B', fontSize: 20, marginBottom: 8 }}>Tus datos</h2>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 17 }}>Usuario Demo</div>
                <div style={{ fontSize: 15, color: '#7A3E1B', marginTop: 2 }}>Ubicación:</div>
                {mounted && (
                  <Select
                    options={argentinaLocations}
                    value={userLocation}
                    onChange={option => option && setUserLocation(option)}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderRadius: 8,
                        borderColor: '#B84A1B',
                        boxShadow: 'none',
                        fontSize: 15,
                      }),
                      option: (base, state) => ({
                        ...base,
                        background: state.isSelected ? '#B84A1B' : state.isFocused ? '#FFF3E6' : '#FFF',
                        color: state.isSelected ? '#FFF' : '#B84A1B',
                        fontSize: 15,
                      }),
                    }}
                    placeholder="Selecciona tu ubicación"
                    isSearchable
                  />
                )}
              </div>
              {!orderPlaced && cart.length > 0 && (
                <button className={styles.bigButton} style={{ background: '#B84A1B', color: '#FFF', borderRadius: 8, marginTop: 16 }} onClick={handlePlaceOrder}>
                  Realizar pedido
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
