"use client";

import React from "react";
import {
  IoBagHandleOutline,
  IoListOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";

interface DashboardStatsProps {
  totalProducts: number;
  totalCategories: number;
  outOfStockCount: number;
  lowStockCount: number;
}

export function DashboardStats({
  totalProducts,
  totalCategories,
  outOfStockCount,
  lowStockCount,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Products */}
      <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
            Total Products
          </span>
          <div className="text-3xl font-extrabold font-heading text-foreground">
            {totalProducts}
          </div>
        </div>
        <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
          <IoBagHandleOutline className="size-6" />
        </div>
      </div>

      {/* Total Categories */}
      <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
            Categories
          </span>
          <div className="text-3xl font-extrabold font-heading text-foreground">
            {totalCategories}
          </div>
        </div>
        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
          <IoListOutline className="size-6" />
        </div>
      </div>

      {/* Out Of Stock */}
      <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
            Out of Stock
          </span>
          <div className="text-3xl font-extrabold font-heading text-destructive">
            {outOfStockCount}
          </div>
        </div>
        <div className="p-3 bg-destructive/10 rounded-xl text-destructive shrink-0">
          <IoAlertCircleOutline className="size-6" />
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-card border border-border p-6 rounded-2xl flex items-center justify-between shadow-xs">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
            Low Stock Alerts
          </span>
          <div className="text-3xl font-extrabold font-heading text-amber-500">
            {lowStockCount}
          </div>
        </div>
        <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 shrink-0">
          <IoAlertCircleOutline className="size-6" />
        </div>
      </div>
    </div>
  );
}
