"use client";

import type { ReactNode } from "react";
import { DataProvider } from "@/contexts/DataContext";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <DataProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </DataProvider>
  );
}
