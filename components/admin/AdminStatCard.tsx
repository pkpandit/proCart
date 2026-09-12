"use client";

import React from "react";
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, TrendingDown } from "lucide-react";
import { KpiMetric } from "./types";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="size-5" />,
  ShoppingBag: <ShoppingBag className="size-5" />,
  Package: <Package className="size-5" />,
  Users: <Users className="size-5" />,
};

export function AdminStatCard({ metric }: { metric: KpiMetric }) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{metric.title}</span>
        <div className={`p-2.5 rounded-xl ${metric.bgColor}`}>
          {iconMap[metric.iconName] || <Package className="size-5" />}
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{metric.value}</h3>
        <div
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            metric.isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
          }`}
        >
          {metric.isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          <span>{metric.change}</span>
        </div>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{metric.period}</p>
    </div>
  );
}
