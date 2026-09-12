"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Settings,
  ExternalLink,
  Store,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Layers,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    badge: "6",
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar({ isMobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-border/80">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm shadow-primary/30">
              <Store className="size-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-foreground">FreshCart</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                  Admin
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Main Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`size-4.5 transition-colors ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="size-4 opacity-70" />
                )}
              </Link>
            );
          })}

          {/* Quick Access to Store */}
          <div className="pt-6 px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Links
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="size-4.5 text-muted-foreground" />
              <span>Customer Storefront</span>
            </div>
            <ChevronRight className="size-4 text-muted-foreground/50" />
          </Link>
        </div>

        {/* User Card & System Status */}
        <div className="p-3 border-t border-border/80 bg-muted/20">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-card border border-border/60">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin Profile"
              className="size-9 rounded-full object-cover ring-2 ring-primary/20"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Admin Manager</p>
              <p className="text-[11px] text-muted-foreground truncate">admin@freshcart.com</p>
            </div>
            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        </div>
      </aside>
    </>
  );
}
