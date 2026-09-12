"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  Package,
  Layers,
  Users,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  ExternalLink,
} from "lucide-react";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { ADMIN_KPIS, MOCK_ORDERS, SALES_CHART_DATA } from "@/components/admin/admin-data";
import { useData } from "@/contexts/DataContext";
import { OrderDetailsModal } from "@/components/admin/OrderDetailsModal";
import { Order, OrderStatus } from "@/components/admin/types";

export default function AdminDashboardPage() {
  const { products, categories } = useData();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Compute dynamic stats if products exist
  const lowStockCount = products.filter(
    (p) => p.inStock && p.stockLeft !== undefined && p.stockLeft < 20
  ).length;

  const dynamicKpis = [
    {
      ...ADMIN_KPIS[0],
    },
    {
      ...ADMIN_KPIS[1],
      value: `${orders.length * 280 + 160}`,
    },
    {
      ...ADMIN_KPIS[2],
      value: `${products.length > 0 ? products.length : 124}`,
    },
    {
      ...ADMIN_KPIS[3],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-emerald-500/10 via-primary/5 to-transparent p-6 rounded-3xl border border-primary/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold mb-2">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            Live Store Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Welcome to FreshCart Admin
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Monitor real-time sales, manage your grocery inventory, track orders, and configure store settings from one centralized console.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs shadow-primary/20"
          >
            <Plus className="size-4" />
            <span>Manage Products</span>
          </Link>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold transition-colors"
          >
            <ShoppingBag className="size-4" />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dynamicKpis.map((metric) => (
          <AdminStatCard key={metric.title} metric={metric} />
        ))}
      </div>

      {/* Analytics & Quick Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart (2 columns) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-border/70">
            <div>
              <h3 className="text-base font-bold text-foreground">Revenue Analytics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly revenue performance and sales volume
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <span className="size-2.5 rounded-full bg-primary" /> Revenue ($)
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="mt-6 flex items-end justify-between gap-2 sm:gap-4 h-52 pt-4 px-2">
            {SALES_CHART_DATA.map((item, index) => {
              const maxSales = 55000;
              const heightPercent = Math.round((item.sales / maxSales) * 100);
              const isPeak = index === SALES_CHART_DATA.length - 1;

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold bg-foreground text-background px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap pointer-events-none mb-1">
                    ${(item.sales / 1000).toFixed(1)}k
                  </div>
                  {/* Bar */}
                  <div
                    className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                      isPeak
                        ? "bg-primary shadow-sm shadow-primary/30"
                        : "bg-primary/30 group-hover:bg-primary/70"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  {/* Month Label */}
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="size-4" /> Average growth: +14.8% per month
            </span>
            <span>All currency amounts displayed in USD ($)</span>
          </div>
        </div>

        {/* Quick Nav / Highlights (1 column) */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-foreground">Catalog Quick Health</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Inventory alerts and quick jumps</p>
          </div>

          <div className="space-y-3">
            {/* Low stock alert */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800 flex items-start gap-3">
              <AlertCircle className="size-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  {lowStockCount > 0 ? `${lowStockCount} Products Low on Stock` : "Inventory Levels Healthy"}
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                  Items below 20 units threshold should be replenished promptly.
                </p>
                <Link
                  href="/admin/products"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 dark:text-amber-100 hover:underline mt-2"
                >
                  Inspect Products <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* Categories quick stat */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Layers className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Configured Categories</p>
                  <p className="text-[11px] text-muted-foreground">{categories.length} active departments</p>
                </div>
              </div>
              <Link
                href="/admin/categories"
                className="text-xs font-semibold text-primary hover:underline"
              >
                View
              </Link>
            </div>

            {/* Customers quick stat */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Registered Customers</p>
                  <p className="text-[11px] text-muted-foreground">3,240 active shoppers</p>
                </div>
              </div>
              <Link
                href="/admin/customers"
                className="text-xs font-semibold text-primary hover:underline"
              >
                View
              </Link>
            </div>
          </div>

          <div className="pt-3 border-t border-border">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-muted/70 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
            >
              <ExternalLink className="size-3.5" />
              <span>Preview Customer Storefront</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border/80">
          <div>
            <h3 className="text-base font-bold text-foreground">Recent Customer Orders</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest transactions placed across your grocery catalog
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All Orders</span>
            <ChevronRight className="size-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/60 bg-muted/20 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {orders.slice(0, 5).map((order) => {
                const statusStyles = {
                  Pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800",
                  Processing: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800",
                  Shipped: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800",
                  Delivered: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
                  Cancelled: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800",
                };

                return (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-foreground">{order.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        {order.customer.avatar ? (
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="size-7 rounded-full object-cover ring-1 ring-border"
                          />
                        ) : (
                          <div className="size-7 rounded-full bg-muted flex items-center justify-center font-bold text-[10px]">
                            {order.customer.name[0]}
                          </div>
                        )}
                        <span className="font-semibold text-foreground">{order.customer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{order.date}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.itemsCount} items</td>
                    <td className="py-3 px-4 font-bold text-foreground">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}
