"use client";

import React from "react";
import { CartProvider } from "@/components/CartContext";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CategoryCarousel } from "@/components/CategoryCarousel";
import { PromoBanners } from "@/components/PromoBanners";
import { ProductGrid } from "@/components/ProductGrid";
import { DailyBestSells } from "@/components/DailyBestSells";
import { ServiceHighlights } from "@/components/ServiceHighlights";
import { Footer } from "@/components/Footer";

// Modals / Overlays
import { CartDrawer } from "@/components/CartDrawer";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { QuickViewModal } from "@/components/QuickViewModal";
import { LocationModal } from "@/components/LocationModal";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  return (
    <CartProvider>
      <div className="flex-1 bg-background flex flex-col">
        {/* Header Navigation */}
        <Navbar />

        {/* Page Content Container */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
          {/* Hero Slider banner */}
          <HeroCarousel />

          {/* Featured Categories list */}
          <CategoryCarousel />

          {/* Double Promotional Banners */}
          <PromoBanners />

          {/* Interactive Popular Products tabbed grid */}
          <ProductGrid />

          {/* Daily Best Sellers with progress bars & countdown timer */}
          <DailyBestSells />

          {/* Reusable Service Info Features list */}
          <ServiceHighlights />
        </main>

        {/* Overlay Modals & Drawers */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <LocationModal />
        <AuthModal />

        {/* Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
