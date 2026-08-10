import type { Metadata } from "next";
import { Inter, Poppins, Geist_Mono } from "next/font/google";
import "../style/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartContext";
import { WishlistProvider } from "@/components/wishlist/WishlistContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { LocationModal } from "@/components/location/LocationModal";
import { AuthModal } from "@/components/auth/AuthModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  children: React.ReactNode; // Children can  be of any type, including React elements, strings, numbers, etc.
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <WishlistProvider>
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
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
