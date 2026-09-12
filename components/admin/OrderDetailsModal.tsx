"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Clock, Truck, Package, XCircle, CreditCard, MapPin, Mail, Phone, User } from "lucide-react";
import { Order, OrderStatus } from "./types";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);

  const handleStatusChange = (status: OrderStatus) => {
    setCurrentStatus(status);
    onUpdateStatus(order.id, status);
  };

  const statusColors: Record<OrderStatus, { bg: string; text: string; icon: React.ReactNode }> = {
    Pending: {
      bg: "bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-400",
      icon: <Clock className="size-4" />,
    },
    Processing: {
      bg: "bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800",
      text: "text-blue-700 dark:text-blue-400",
      icon: <Package className="size-4" />,
    },
    Shipped: {
      bg: "bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800",
      text: "text-purple-700 dark:text-purple-400",
      icon: <Truck className="size-4" />,
    },
    Delivered: {
      bg: "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: <CheckCircle2 className="size-4" />,
    },
    Cancelled: {
      bg: "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800",
      text: "text-rose-700 dark:text-rose-400",
      icon: <XCircle className="size-4" />,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-card border border-border rounded-2xl max-w-2xl w-full my-8 p-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold text-foreground">Order {order.id}</h3>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[currentStatus].bg} ${statusColors[currentStatus].text}`}
              >
                {statusColors[currentStatus].icon}
                <span>{currentStatus}</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Placed on {order.date}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-lg p-1.5 hover:bg-muted transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 py-4 space-y-6 pr-1">
          {/* Status Updater */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-foreground block">Update Fulfillment Status</span>
              <span className="text-[11px] text-muted-foreground">Notify customer of delivery progress</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as OrderStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleStatusChange(status)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      currentStatus === status
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Customer & Shipping Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Information */}
            <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <User className="size-4 text-primary" />
                <span>Customer Information</span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                {order.customer.avatar ? (
                  <img
                    src={order.customer.avatar}
                    alt={order.customer.name}
                    className="size-10 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="size-10 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                    {order.customer.name[0]}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-foreground">{order.customer.name}</p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                    <Mail className="size-3" />
                    <span>{order.customer.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Payment */}
            <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <MapPin className="size-4 text-primary" />
                <span>Shipping Address</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                {order.shippingAddress}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1 border-t border-border/60">
                <CreditCard className="size-3.5 text-primary" />
                <span className="font-medium text-foreground">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
              Order Items ({order.items.length})
            </h4>
            <div className="border border-border rounded-xl divide-y divide-border/60 overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-lg border border-border/80 overflow-hidden p-1 bg-muted/20 shrink-0">
                      <img src={item.image} alt={item.title} className="size-full object-contain" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="p-4 rounded-xl bg-muted/20 border border-border space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-semibold text-foreground">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Standard Delivery</span>
              <span className="font-semibold text-emerald-600">Free</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Estimated Tax</span>
              <span className="font-semibold text-foreground">$0.00</span>
            </div>
            <div className="pt-2 border-t border-border flex justify-between text-sm font-bold text-foreground">
              <span>Total Paid</span>
              <span className="text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
