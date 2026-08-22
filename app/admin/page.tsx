"use client";

import React, { useMemo } from "react";
import { useData } from "@/contexts/DataContext";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { CategoryBreakdown } from "@/components/admin/dashboard/CategoryBreakdown";
import { AvailabilityChart } from "@/components/admin/dashboard/AvailabilityChart";
import { LowStockAlerts } from "@/components/admin/dashboard/LowStockAlerts";

export default function AdminDashboard() {
  const { products, categories, updateProduct } = useData();

  // Metrics calculations
  const totalProducts = products.length;
  const totalCategories = categories.length;

  const outOfStockProducts = useMemo(() => {
    return products.filter((p) => !p.inStock || p.stockLeft === 0);
  }, [products]);

  const lowStockProducts = useMemo(() => {
    return products.filter(
      (p) => p.stockLeft !== undefined && p.stockLeft > 0 && p.stockLeft < 15
    );
  }, [products]);

  // Category distribution calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // top 5
  }, [products]);

  // Stock status segments
  const stockRatio = useMemo(() => {
    if (totalProducts === 0) return { inStockPct: 100, outPct: 0 };
    const outCount = outOfStockProducts.length;
    const inCount = totalProducts - outCount;
    return {
      inStockPct: Math.round((inCount / totalProducts) * 100),
      outPct: Math.round((outCount / totalProducts) * 100),
    };
  }, [totalProducts, outOfStockProducts]);

  const handleQuickRefill = (id: string) => {
    updateProduct(id, {
      stockLeft: 60,
      stockTotal: 100,
      inStock: true,
    });
  };

  return (
    <div className="space-y-8 text-left">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground font-heading tracking-tight mb-2">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time snapshot of your FreshCart inventory and store statistics.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <DashboardStats
        totalProducts={totalProducts}
        totalCategories={totalCategories}
        outOfStockCount={outOfStockProducts.length}
        lowStockCount={lowStockProducts.length}
      />

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown (Top 5) */}
        <div className="lg:col-span-8 flex">
          <CategoryBreakdown categoryCounts={categoryCounts} />
        </div>

        {/* Stock Status breakdown */}
        <div className="lg:col-span-4">
          <AvailabilityChart
            inStockPct={stockRatio.inStockPct}
            outPct={stockRatio.outPct}
          />
        </div>
      </div>

      {/* Low Stock alerts list */}
      <LowStockAlerts
        lowStockProducts={lowStockProducts}
        onRefill={handleQuickRefill}
      />
    </div>
  );
}
