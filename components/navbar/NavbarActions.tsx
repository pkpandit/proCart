"use client";

import React from "react";
import { IoHeartOutline, IoPersonOutline, IoBagOutline } from "react-icons/io5";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";

export function NavbarActions() {
  const {
    cartCount,
    setAuthModalOpen,
    setCartOpen,
  } = useCart();
  const { wishlist, setWishlistOpen } = useWishlist();

  return (
    <div className="flex items-center gap-4">
      {/* Wishlist Icon */}
      <button
        onClick={() => setWishlistOpen(true)}
        className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
        title="Wishlist"
      >
        <IoHeartOutline className="size-6" />
        {wishlist.length > 0 && (
          <span className="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-3 bg-primary text-white text-center font-bold text-[10px] flex items-center justify-center leading-none">
            {wishlist.length}
          </span>
        )}
      </button>

      {/* Profile Icon */}
      <button
        onClick={() => setAuthModalOpen(true)}
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
        title="Account"
      >
        <IoPersonOutline className="size-6" />
      </button>

      {/* Cart Icon */}
      <button
        onClick={() => setCartOpen(true)}
        className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
        title="Shopping Cart"
      >
        <IoBagOutline className="size-6" />
        {cartCount > 0 && (
          <span className="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-3 bg-primary text-white text-center font-bold text-[10px] flex items-center justify-center leading-none">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
}
