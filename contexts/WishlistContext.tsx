"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type WishlistContextType = {
  wishlist: string[];
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([
    "popular-1",
    "popular-2",
    "popular-3",
    "popular-4",
    "popular-5",
  ]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist from localStorage on mount (client-side only)
  useEffect(() => {
    const savedWishlist = localStorage.getItem("freshcart_wishlist");
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setWishlist(parsed);
      } catch (e) {
        console.error(e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("freshcart_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isHydrated]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistOpen,
        setWishlistOpen,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
