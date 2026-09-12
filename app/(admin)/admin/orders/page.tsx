"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Package,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { MOCK_ORDERS } from "@/components/admin/admin-data";
import { Order, OrderStatus } from "@/components/admin/types";
import { OrderDetailsModal } from "@/components/admin/OrderDetailsModal";
import { useAdminToast } from "@/components/admin/AdminToast";

const TABS: { label: string; value: "All" | OrderStatus; count?: number }[] = [
  { label: "All Orders", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState<"All" | OrderStatus>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { showToast } = useAdminToast();

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast({
      type: "success",
      title: "Order Status Updated",
      description: `Order ${orderId} is now marked as ${newStatus}.`,
    });
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesTab = activeTab === "All" || order.status === activeTab;
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchTerm]);

  const statusStyles: Record<OrderStatus, string> = {
    Pending: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    Processing: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    Shipped: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    Delivered: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    Cancelled: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Customer Orders Fulfillment
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track fulfillment statuses, inspect customer delivery info, and manage orders.
        </p>
      </div>

      {/* Tabs & Search Bar */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-xs space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border/70 pb-3">
          {TABS.map((tab) => {
            const count =
              tab.value === "All"
                ? orders.length
                : orders.filter((o) => o.status === tab.value).length;
            const isActive = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs shadow-primary/20"
                    : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? "bg-white/20 text-white" : "bg-muted text-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, customer name, email..."
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/20 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date Placed</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/40 transition-colors group">
                    <td className="py-3.5 px-4 font-bold text-foreground">{order.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        {order.customer.avatar ? (
                          <img
                            src={order.customer.avatar}
                            alt={order.customer.name}
                            className="size-8 rounded-full object-cover ring-1 ring-border shrink-0"
                          />
                        ) : (
                          <div className="size-8 rounded-full bg-muted flex items-center justify-center font-bold text-[10px] shrink-0">
                            {order.customer.name[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {order.customer.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                      {order.date}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                      {order.paymentMethod}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-foreground whitespace-nowrap">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted hover:bg-muted/80 text-foreground transition-colors"
                      >
                        <Eye className="size-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="size-12 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="size-6" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">No orders found</p>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        No transactions found for the selected tab or search query.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Inspection Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
