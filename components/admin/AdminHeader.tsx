"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Package,
  ShoppingBag,
  User,
  LogOut,
  Settings,
} from "lucide-react";

interface AdminHeaderProps {
  onToggleMobileSidebar: () => void;
}

export function AdminHeader({ onToggleMobileSidebar }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-4 sm:px-6 backdrop-blur-md">
      {/* Left side: Hamburger button + Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-md">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="size-5" />
        </button>

        {/* Search Bar */}
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full rounded-xl border border-border bg-muted/40 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Customer Storefront Link Button */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg border border-border transition-colors"
        >
          <ExternalLink className="size-3.5" />
          <span>Live Store</span>
        </Link>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-emerald-500 rounded-full ring-2 ring-card" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-card border border-border shadow-xl z-50 p-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-border/60 max-h-72 overflow-y-auto">
                  <div className="py-3 flex items-start gap-3 hover:bg-muted/40 px-2 rounded-lg transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 shrink-0">
                      <ShoppingBag className="size-4" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-foreground">New Order #FC-10921 received</p>
                      <p className="text-muted-foreground">Sarah Jenkins placed an order of $78.50</p>
                      <span className="text-[10px] text-muted-foreground mt-1 block">5 mins ago</span>
                    </div>
                  </div>
                  <div className="py-3 flex items-start gap-3 hover:bg-muted/40 px-2 rounded-lg transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 shrink-0">
                      <Package className="size-4" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-foreground">Low stock alert</p>
                      <p className="text-muted-foreground">Blueberry Greek Yogurt has only 6 items remaining</p>
                      <span className="text-[10px] text-muted-foreground mt-1 block">28 mins ago</span>
                    </div>
                  </div>
                  <div className="py-3 flex items-start gap-3 hover:bg-muted/40 px-2 rounded-lg transition-colors cursor-pointer">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 shrink-0">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-semibold text-foreground">Order #FC-10920 delivered</p>
                      <p className="text-muted-foreground">Marcus Vance received their package</p>
                      <span className="text-[10px] text-muted-foreground mt-1 block">2 hours ago</span>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-border text-center">
                  <Link
                    href="/admin/orders"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin Profile"
              className="size-8 rounded-full object-cover ring-2 ring-primary/20"
            />
            <ChevronDown className="size-3.5 text-muted-foreground hidden sm:block" />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-card border border-border shadow-xl z-50 p-2 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-border/80">
                  <p className="text-xs font-semibold text-foreground">Admin Manager</p>
                  <p className="text-[11px] text-muted-foreground">admin@freshcart.com</p>
                </div>
                <div className="py-1">
                  <Link
                    href="/admin/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <ExternalLink className="size-4" />
                    <span>View Store</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-border/80">
                  <Link
                    href="/"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                  >
                    <LogOut className="size-4" />
                    <span>Exit Admin</span>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
