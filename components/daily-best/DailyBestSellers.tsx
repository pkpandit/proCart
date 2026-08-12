"use client";

import React from "react";
import { MOCK_PRODUCTS } from "@/data/products";
import { DailyBestBanner } from "./DailyBestBanner";
import { DailyBestCard } from "./DailyBestCard";

export function DailyBestSellers() {
  const bestSellers = MOCK_PRODUCTS.filter((prod) =>
    prod.id.startsWith("best-")
  );

  return (
    <div className="space-y-6 text-left">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-extrabold font-heading text-foreground tracking-tight">
          Daily Best Sellers
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Banner Left Column */}
        <DailyBestBanner />

        {/* Products Right Column */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bestSellers.map((product, idx) => (
            <DailyBestCard key={product.id} product={product} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
