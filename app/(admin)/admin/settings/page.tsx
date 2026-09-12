"use client";

import React, { useState } from "react";
import { Store, Bell, Truck, Shield, Save, CheckCircle2 } from "lucide-react";
import { useAdminToast } from "@/components/admin/AdminToast";

export default function AdminSettingsPage() {
  const { showToast } = useAdminToast();

  const [storeName, setStoreName] = useState("FreshCart Grocery & Essentials");
  const [supportEmail, setSupportEmail] = useState("support@freshcart.com");
  const [phone, setPhone] = useState("+1 (800) 555-CART");
  const [currency, setCurrency] = useState("USD ($)");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("35.00");
  const [standardDeliveryFee, setStandardDeliveryFee] = useState("4.99");
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: "success",
      title: "Settings Saved",
      description: "Store configuration has been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Store & System Settings
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure store identity, delivery threshold rules, and operational alerts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Store Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/70">
            <Store className="size-5 text-primary" />
            <div>
              <h3 className="text-sm font-bold text-foreground">Store Identity</h3>
              <p className="text-xs text-muted-foreground">General information displayed to shoppers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Store Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Primary Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="USD ($)">USD ($) - US Dollar</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Delivery & Shipping Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/70">
            <Truck className="size-5 text-primary" />
            <div>
              <h3 className="text-sm font-bold text-foreground">Delivery & Fulfillment Rules</h3>
              <p className="text-xs text-muted-foreground">Thresholds for checkout calculation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Free Delivery Threshold ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              <span className="text-[10px] text-muted-foreground mt-1 block">
                Orders above this amount qualify for zero delivery fees.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Standard Delivery Fee ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={standardDeliveryFee}
                onChange={(e) => setStandardDeliveryFee(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
              />
              <span className="text-[10px] text-muted-foreground mt-1 block">
                Applied to orders below the free delivery minimum.
              </span>
            </div>
          </div>
        </div>

        {/* Notifications & System Alerts */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border/70">
            <Bell className="size-5 text-primary" />
            <div>
              <h3 className="text-sm font-bold text-foreground">Admin Notifications</h3>
              <p className="text-xs text-muted-foreground">Alert preferences for store events</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
              <div>
                <p className="text-xs font-semibold text-foreground">Low Stock Inventory Alerts</p>
                <p className="text-[11px] text-muted-foreground">
                  Receive notification alerts when product items fall below 20 units
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={lowStockAlerts}
                  onChange={(e) => setLowStockAlerts(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
              <div>
                <p className="text-xs font-semibold text-foreground">New Order Email Dispatch</p>
                <p className="text-[11px] text-muted-foreground">
                  Send real-time alerts whenever a customer completes checkout
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={orderNotifications}
                  onChange={(e) => setOrderNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs shadow-primary/20"
          >
            <Save className="size-4" />
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
