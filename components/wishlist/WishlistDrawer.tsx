"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { MOCK_PRODUCTS } from "@/data/products";
import { Drawer } from "@/components/ui/Drawer";

export function WishlistDrawer() {
  const { addToCart } = useCart();
  const { wishlist, wishlistOpen, setWishlistOpen, toggleWishlist } =
    useWishlist();

  // Find actual products in the wishlist
  const wishlistProducts = wishlist
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is (typeof MOCK_PRODUCTS)[0] => !!p);

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[0]) => {
    addToCart(product, 1);
  };

  return (
    <Drawer
      open={wishlistOpen}
      onClose={() => setWishlistOpen(false)}
      title="My Wishlist"
    >
      <div className="flex flex-col h-full text-left">
        {/* Subtitle */}
        <div className="text-[11px] text-muted-foreground font-semibold -mt-3.5 mb-4 pl-0.5">
          {wishlistProducts.length} items in wishlist
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-24 h-24 mb-4 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold font-heading mb-1 text-foreground">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-muted-foreground max-w-50">
                Save items you like to your wishlist to keep track of them!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {wishlistProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4 p-4 border border-border/40 rounded-xl bg-card hover:border-primary/20 transition-all overflow-hidden"
                  >
                    {/* Image */}
                    <div className="size-16 shrink-0 bg-muted/20 rounded-lg flex items-center justify-center p-1">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={64}
                        height={64}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-foreground truncate hover:text-primary transition-colors cursor-pointer font-heading">
                          {product.title}
                        </h5>
                        <span className="text-[10px] text-muted-foreground font-semibold block mt-0.5">
                          {product.unit || "250g"}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors cursor-pointer mt-2 w-max"
                      >
                        <IoTrashOutline className="size-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    {/* Action / Add & Price */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      {/* Price / Total */}
                      <div className="text-right">
                        <span className="text-xs font-extrabold text-foreground block">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[10px] text-muted-foreground line-through block mt-0.5">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-2.5 py-1.5 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-[10px] rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1 cursor-pointer mt-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Wishlist Summary / Close */}
        {wishlistProducts.length > 0 && (
          <div className="border-t border-border/60 pt-4 mt-4 bg-card">
            <button
              onClick={() => setWishlistOpen(false)}
              className="w-full py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer text-center"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </Drawer>
  );
}
