"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoTrashOutline } from "react-icons/io5";
import { useCart } from "./CartContext";
import { Drawer } from "./ui/Drawer";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateCartQuantity, removeFromCart } =
    useCart();

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title="Shop Cart"
    >
      <div className="flex flex-col h-full text-left">
        {/* Subtitle */}
        <div className="text-[11px] text-muted-foreground font-semibold -mt-3.5 mb-4 pl-0.5">
          Location in 382480
        </div>

        {/* Free Shipping Alert Banner */}
        <div className="bg-[#fee2e2] text-[#b91c1c] border border-red-200/50 rounded-lg p-3.5 mb-4 text-[11px] font-bold text-left">
          You&apos;ve got FREE delivery. Start checkout now!
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
          {cart.length === 0 ? (
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold font-heading mb-1 text-foreground">
                Your cart is empty
              </h4>
              <p className="text-xs text-muted-foreground max-w-50">
                Add items to your cart to see them here and start shopping!
              </p>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-border/60">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4 py-4 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="size-16 shrink-0 bg-transparent flex items-center justify-center p-1">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        width={64}
                        height={64}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-foreground truncate hover:text-primary transition-colors cursor-pointer font-heading">
                          {item.product.title}
                        </h5>
                        <span className="text-[10px] text-muted-foreground font-semibold block mt-0.5">
                          {item.product.unit || "250g"}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer mt-2 w-max"
                      >
                        <IoTrashOutline className="size-3.5 text-primary" />
                        <span>Remove</span>
                      </button>
                    </div>

                    {/* Controls & Price */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      {/* Quantity Adjuster */}
                      <div className="flex items-center border border-gray-300 dark:border-border/60 rounded-md overflow-hidden bg-card text-xs">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1,
                            )
                          }
                          className="px-2.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 font-bold text-foreground min-w-4.5 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1,
                            )
                          }
                          className="px-2.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price / Total */}
                      <div className="text-right">
                        <span
                          className={
                            item.product.id === "popular-2"
                              ? "text-xs font-extrabold text-red-600 block"
                              : "text-xs font-extrabold text-foreground block"
                          }
                        >
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-[10px] text-muted-foreground line-through block mt-0.5">
                            $
                            {(
                              item.product.originalPrice * item.quantity
                            ).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="pt-4 mt-4 bg-card">
            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCartOpen(false)}
                className="w-full py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer text-center"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => alert("Cart update flow is not simulated.")}
                className="w-full py-2.5 bg-[#212529] hover:bg-[#212529]/90 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer text-center"
              >
                Update Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
