"use client";

import React from "react";
import { Product } from "@/data/products";
import { IoCheckmarkCircleOutline, IoReloadOutline } from "react-icons/io5";

interface LowStockAlertsProps {
  lowStockProducts: Product[];
  onRefill: (id: string) => void;
}

export function LowStockAlerts({ lowStockProducts, onRefill }: LowStockAlertsProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
      <div className="p-6 border-b border-border">
        <h3 className="font-extrabold font-heading text-base text-foreground tracking-tight">
          Low Stock Alerts
        </h3>
        <p className="text-xs text-muted-foreground">
          Items requiring immediate restocking.
        </p>
      </div>
      <div className="overflow-x-auto">
        {lowStockProducts.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2">
            <IoCheckmarkCircleOutline className="size-10 text-primary" />
            <span className="text-xs font-bold">All products are adequately stocked!</span>
          </div>
        ) : (
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock Left</th>
                <th className="px-6 py-4">Stock Total</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {lowStockProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-muted/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-foreground">
                    {prod.title}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {prod.category}
                  </td>
                  <td className="px-6 py-4 font-extrabold text-amber-500">
                    {prod.stockLeft}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {prod.stockTotal || 100}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onRefill(prod.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground font-bold text-xs rounded-lg hover:bg-primary/95 shadow-xs transition-colors cursor-pointer"
                    >
                      <IoReloadOutline className="size-3.5" />
                      <span>Quick Refill (60)</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
