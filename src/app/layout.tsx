import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduToys – DIY Wooden STEM Toys & Educational Puzzles",
  description:
    "Discover premium DIY wooden STEM toys, assembly puzzles, and Montessori materials for kids. Safe, eco-friendly, and crafted to inspire creativity and learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SessionProviderWrapper>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
