"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoHeart, IoHeartOutline, IoAdd, IoRemove, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";
import { Product } from "@/data/products";
import { Rating } from "@/components/ui/Rating";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart, setCartOpen } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  // Discount calculation
  const discountPercent = product.originalPrice && product.originalPrice > product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setCartOpen(true);
    }, 600);
  };

  const maxStock = product.stockLeft ?? 99;

  return (
    <div className="flex flex-col text-left">
      {/* 1. Category */}
      <div className="mb-2">
        <span className="inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-md">{product.category}</span>
      </div>

      {/* 2. Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground mb-3 leading-tight">{product.title}</h1>

      {/* 3. Rating & 4. Reviews */}
      <div className="flex items-center gap-2 mb-4">
        <Rating value={product.rating} size={17} />
        <span className="text-sm font-bold text-foreground">{product.rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground font-medium">({product.reviewsCount} reviews)</span>
      </div>

      {/* 5. Price, 6. Original Price & 7. Discount */}
      <div className="flex items-baseline flex-wrap gap-3 pb-4 mb-4 border-b border-border">
        <span className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">${product.price.toFixed(2)}</span>

        {product.originalPrice && <span className="text-lg text-muted-foreground line-through font-semibold">${product.originalPrice.toFixed(2)}</span>}

        {discountPercent ? <span className="bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-xs">{discountPercent}% OFF</span> : product.badge ? <span className="bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-xs">{product.badge.text}</span> : null}
      </div>

      {/* 8. Unit Size */}
      <div className="mb-5">
        <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Unit Size</div>
        <div className="inline-flex items-center gap-2">
          <span className="px-4 py-2 border-2 border-primary bg-primary/10 text-primary font-bold text-xs rounded-xl shadow-xs">{product.unit}</span>
        </div>
      </div>

      {/* 9. Stock Status & Stock Left Indicator */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg">
              <IoCheckmarkCircle className="size-4" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-1 rounded-lg">
              <IoCloseCircle className="size-4" />
              Currently Out of Stock
            </span>
          )}
        </div>

        {product.inStock && product.stockLeft !== undefined && (
          <div className="max-w-xs">
            <div className="flex justify-between text-xs text-muted-foreground mb-1 font-medium">
              <span>Only {product.stockLeft} items left</span>
              <span>Fast Selling</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.max(10, (product.stockLeft / (product.stockTotal || 20)) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* 10. Quantity, 11. Add to Cart & 12. Wishlist */}
      <div className="flex flex-wrap items-center gap-3 pt-2 mb-6">
        {/* Quantity Stepper */}
        {product.inStock && (
          <div className="flex items-center border border-border bg-card rounded-xl overflow-hidden shadow-xs">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-40 cursor-pointer" aria-label="Decrease quantity">
              <IoRemove className="size-4" />
            </button>

            <span className="w-12 text-center text-sm font-bold text-foreground select-none">{quantity}</span>

            <button type="button" onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))} disabled={quantity >= maxStock} className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors disabled:opacity-40 cursor-pointer" aria-label="Increase quantity">
              <IoAdd className="size-4" />
            </button>
          </div>
        )}

        {/* Add to Cart CTA */}
        {product.inStock ? (
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={handleAddToCart} className="flex-1 min-w-[160px] py-3.5 px-6 bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer">
            <FaCartPlus className="size-4" />
            <span>{isAdded ? "Added to Cart!" : "Add to Cart"}</span>
          </motion.button>
        ) : (
          <div className="flex-1 min-w-[160px] py-3.5 px-6 bg-muted text-muted-foreground font-bold text-sm rounded-xl text-center border border-border">Out of Stock</div>
        )}

        {/* Wishlist Toggle Button */}
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" onClick={() => toggleWishlist(product.id)} className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-xs ${wishlisted ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900/50 dark:bg-red-950/30" : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"}`} title={wishlisted ? "Remove from wishlist" : "Add to wishlist"} aria-label="Toggle Wishlist">
          {wishlisted ? <IoHeart className="size-5 text-red-500 fill-current" /> : <IoHeartOutline className="size-5" />}
        </motion.button>
      </div>

      {/* Trust & Delivery Highlights */}
      {/* <div className="border-t border-border pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <IoFlashOutline className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">Fast Delivery</div>
            <div>Within 2 hours</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <IoShieldCheckmarkOutline className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">100% Fresh</div>
            <div>Quality guaranteed</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <IoReloadOutline className="size-4" />
          </div>
          <div>
            <div className="font-bold text-foreground">Easy Returns</div>
            <div>No questions asked</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
