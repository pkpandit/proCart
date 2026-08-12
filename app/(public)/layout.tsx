import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../style/globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { LocationModal } from "@/components/location/LocationModal";
import { AuthModal } from "@/components/auth/AuthModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart | Fresh Groceries Delivered",
  description:
    "Shop fresh groceries, fruits, vegetables, dairy, snacks, and everyday essentials with FreshCart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode; // Children can  be of any type, including React elements, strings, numbers, etc.
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppProviders>
          <div className="flex-1 bg-background flex flex-col">
            {/* Header Navigation */}
            <Navbar />
            {children}
            {/* Overlay Modals & Drawers */}
            <CartDrawer />
            <WishlistDrawer />
            <QuickViewModal />
            <LocationModal />
            <AuthModal />
            {/* Footer */}
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
