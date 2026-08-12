"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoHeart, IoHeartOutline, IoAdd, IoRemove } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Dialog } from "@/components/ui/Dialog";
import { Rating } from "@/components/ui/Rating";
import Image from "next/image";

export function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
  } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset local state when product changes
  useEffect(() => {
    Promise.resolve().then(() => {
      setActiveImageIndex(0);
      setQuantity(1);
    });
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const wishlisted = isWishlisted(product.id);

  return (
    <Dialog
      open={quickViewProduct !== null}
      onClose={closeQuickView}
      title="Product Quick View"
      maxWidth="max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden flex items-center justify-center relative border border-border/50">
            {/* Main Image */}
            <motion.img
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={product.images[activeImageIndex]}
              alt={product.title}
              className="max-h-full max-w-full object-contain p-4"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`size-16 rounded-lg bg-muted/40 p-1 flex items-center justify-center border cursor-pointer transition-all ${
                    activeImageIndex === idx
                      ? "border-primary ring-2 ring-primary/20 scale-105"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    height={220}
                    width={220}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col text-left">
          {/* Category */}
          <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">
            {product.title}
          </h2>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-4">
            <Rating value={product.rating} size={15} />
            <span className="text-sm text-muted-foreground font-medium">
              {product.rating.toFixed(1)} ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.badge && (
              <span className="bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 text-xs font-bold px-2 py-0.5 rounded">
                {product.badge.text}
              </span>
            )}
          </div>

          <hr className="border-border my-4" />

          {/* Mock Description */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            FreshCart offers the finest selection of grocery products, sourced
            fresh and delivered straight to your door. This premium product is
            packed with nutrients, fresh, and meets our strict organic
            guidelines. Save time and shop local!
          </p>

          {/* Sizes / Units */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-muted-foreground block mb-2 uppercase tracking-wide">
              Unit Size:
            </span>
            <span className="px-3 py-1.5 border border-primary bg-primary/5 text-primary text-xs font-bold rounded-lg">
              {product.unit}
            </span>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-auto">
            {/* Quantity Selector */}
            {product.inStock && (
              <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <IoRemove size={14} />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <IoAdd size={14} />
                </button>
              </div>
            )}

            {/* Add to Cart */}
            {product.inStock ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  addToCart(product, quantity);
                  closeQuickView();
                }}
                className="flex-1 py-2 px-6 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold text-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaPlus className="size-3.5" />
                <span>Add to Cart</span>
              </motion.button>
            ) : (
              <span className="py-2 px-6 border border-red-200 dark:border-red-950 text-red-500 bg-red-50 dark:bg-red-950/20 font-bold text-sm rounded-lg flex-1 text-center">
                Out of Stock
              </span>
            )}

            {/* Wishlist Icon */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleWishlist(product.id)}
              className="p-2.5 border border-border hover:border-muted-foreground/30 hover:bg-muted text-foreground rounded-lg cursor-pointer transition-colors"
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlisted ? (
                <IoHeart className="size-5 text-red-500" />
              ) : (
                <IoHeartOutline className="size-5 text-muted-foreground hover:text-foreground" />
              )}
            </motion.button>
          </div>

          {/* Product Metadata */}
          <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground font-medium">
            <div>
              <span>Status: </span>
              <span
                className={
                  product.inStock
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                }
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div>
              <span>Category: </span>
              <span className="text-foreground">{product.category}</span>
            </div>
            <div>
              <span>Delivery: </span>
              <span className="text-foreground">Within 2 Hours</span>
            </div>
            <div>
              <span>Rating: </span>
              <span className="text-foreground">{product.rating} / 5</span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
