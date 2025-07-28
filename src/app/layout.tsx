

import { Inter, Merriweather } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "./components/ThemeContext";
import { CartProvider } from "./components/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CanjeAR",
  description: '<span class="canjearText">CanjeAR</span> - Intercambiamos, objetos, servicios y humanidad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >   <CartProvider>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            {children}

          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  );
}
