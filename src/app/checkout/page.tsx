'use client';
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useCart } from "../components/CartContext";
import Select from 'react-select';
import { Vendor } from "@prisma/client";
import { FaComments } from "react-icons/fa";
import { useAuth, useUser } from "@clerk/nextjs";
import { getStreamUserToken } from "../actions/chatActions";
import {
  Chat,
  Channel as StreamChannel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import { StreamChat, type Channel as StreamChatChannel } from 'stream-chat';

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

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [userLocation, setUserLocation] = useState(argentinaLocations[0]);
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const [mounted, setMounted] = useState(false);
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChatChannel | null>(null);

  useEffect(() => setMounted(true), []);

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  const differentVendors: Vendor[] = cart.reduce((acc: Vendor[], item) => {
    if (!acc.some((v: Vendor) => v.id === item.vendor.id)) {
      acc.push(item.vendor);
    }
    return acc;
  }, []);

  const cartGroupedByVendor = differentVendors.map(vendor => {
    const items = cart.filter(item => item.vendor.id === vendor.id);
    return { vendor, items };
  });

  const { isLoaded, userId } = useAuth();
  const { user } = useUser();

  const [userToken, setUserToken] = useState<string | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    async function fetchToken() {
      if (!isLoaded || !userId) return;
      try {
        const tok = await getStreamUserToken(userId);
        setUserToken(tok);
      } catch (error) {
        console.error("Error fetching Stream token:", error);
      }
    }

    fetchToken();
  }, [isLoaded, userId]);

  useEffect(() => {
    if (!userToken || !userId || !user?.fullName || !user?.imageUrl) return;

    const chatClient = StreamChat.getInstance(apiKey);

    chatClient
      .connectUser(
        {
          id: userId,
          name: user.fullName,
          image: user.imageUrl,
        },
        userToken
      )
      .then(() => {
        setClient(chatClient);
      })
      .catch((error) => {
        console.error("Error connecting Stream user:", error);
      });

    return () => {
      chatClient.disconnectUser();
    };
  }, [userToken, userId, user?.fullName, user?.imageUrl]);

  useEffect(() => {
    if (!client || !activeVendor || !userId) return;

    const createOrGetChannel = async () => {
      try {
        const newChannel = client.channel('messaging', {
          members: [userId, activeVendor.clerkUserId],
        });
        await newChannel.watch();
        setChannel(newChannel);
      } catch (err) {
        console.error("Error creating channel:", err);
      }
    };

    createOrGetChannel();
  }, [client, activeVendor, userId]);

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
            <div style={{ flex: 1, minWidth: 260 }}>
              <h2 style={{ color: '#B84A1B', fontSize: 22, marginBottom: 16 }}>Tus productos</h2>
              {orderPlaced ? (
                <p>¡Gracias por tu compra! Tu pedido ha sido realizado.</p>
              ) : cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                cartGroupedByVendor.map(({ vendor, items }) => (
                  <div key={vendor.id} style={{ marginBottom: 24 }}>
                    <h3 style={{ color: '#B84A1B', fontSize: 18, marginBottom: 8 }}>
                      {vendor.name} {vendor.lastname}
                    </h3>

                    <button
                      style={{
                        background: '#FFF',
                        border: '1px solid #B84A1B',
                        color: '#B84A1B',
                        borderRadius: 6,
                        padding: '6px 10px',
                        cursor: 'pointer',
                        fontSize: 14,
                        marginBottom: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                      onClick={() => setActiveVendor(vendor)}
                    >
                      <FaComments />
                      Chatear con este vendedor
                    </button>

                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {items.map((item) => (
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
                          <span style={{ fontSize: 14, color: '#7A3E1B' }}>Ubicación: {item.location}</span>
                          <span style={{ fontSize: 15, color: '#333', marginTop: 2 }}>${item.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
              {!orderPlaced && cart.length > 0 && (
                <p style={{ fontWeight: 'bold', color: '#B84A1B', marginTop: 18, fontSize: 18 }}>Total: ${total.toFixed(2)}</p>
              )}
            </div>

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

      {client && channel && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          width: 320,
          height: 400,
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Chat client={client}>
            <StreamChannel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
            </StreamChannel>
          </Chat>
        </div>
      )}
    </div>
  );
}
