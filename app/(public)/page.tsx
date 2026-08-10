"use client";

import React from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { CategoryCarousel } from "@/components/home/CategoryCarousel";
import { PromoBanners } from "@/components/home/PromoBanners";
import { ProductGrid } from "@/components/product/ProductGrid";
import { DailyBestSells } from "@/components/daily-best/DailyBestSells";
import { ServiceHighlights } from "@/components/home/ServiceHighlights";

export default function Home() {
  return (
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
  );
}
