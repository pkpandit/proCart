"use client";

import React from "react";
import Link from "next/link";
import {
  IoGridOutline,
  IoBagHandleOutline,
  IoListOutline,
  IoImagesOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

interface SidebarProps {
  isSidebarOpen: boolean;
  pathname: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function Sidebar({ isSidebarOpen, pathname }: SidebarProps) {
  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: <IoGridOutline className="size-5" />,
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: <IoBagHandleOutline className="size-5" />,
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: <IoListOutline className="size-5" />,
    },
    {
      label: "Slides & Banners",
      href: "/admin/promotions",
      icon: <IoImagesOutline className="size-5" />,
    },
  ];

  return (
    <aside
      className={`bg-card border-r border-border flex flex-col transition-all duration-300 z-30 shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo / Header */}
      <div className="h-16 px-6 border-b border-border flex items-center gap-3">
        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-extrabold text-lg shadow-sm shrink-0">
          F
        </div>
        {isSidebarOpen && (
          <span className="font-extrabold text-lg text-foreground tracking-tight leading-none font-heading select-none">
            FreshCart <span className="text-primary">Admin</span>
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-bold transition-all group cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className={isActive ? "" : "text-muted-foreground group-hover:text-foreground"}>
                {item.icon}
              </span>
              {isSidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          href="/"
          className="flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
        >
          <IoArrowBackOutline className="size-5" />
          {isSidebarOpen && <span>Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
}
