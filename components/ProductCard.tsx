"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoEyeOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useCart, Product } from "./CartContext";
import { Rating } from "./ui/Rating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted, openQuickView } = useCart();
  const wishlisted = isWishlisted(product.id);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "hot": return "bg-red-500 text-white";
      case "sale": return "bg-orange-500 text-white";
      case "new": return "bg-blue-500 text-white";
      case "discount": return "bg-green-600 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative bg-card border border-border rounded-xl p-4 flex flex-col h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden"
    >
      {/* Badge */}
      {product.badge && (
        <span className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeColor(product.badge.type)}`}>
          {product.badge.text}
        </span>
      )}

      {/* Image Container with Actions */}
      <div className="relative aspect-square w-full mb-4 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300 p-2"
          loading="lazy"
        />

        {/* Hover Actions (wishlist, quick view) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2.5 bg-card hover:bg-muted text-foreground border border-border rounded-full shadow-md cursor-pointer transition-colors"
            title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlisted ? (
              <IoHeart className="size-5 text-red-500" />
            ) : (
              <IoHeartOutline className="size-5 text-muted-foreground hover:text-foreground" />
            )}
          </motion.button>

          {/* Quick View Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="p-2.5 bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border rounded-full shadow-md cursor-pointer transition-colors"
            title="Quick view"
          >
            <IoEyeOutline className="size-5" />
          </motion.button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        {/* Category */}
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </span>

        {/* Title */}
        <h4
          onClick={() => openQuickView(product)}
          className="text-sm font-semibold font-heading text-foreground mb-1.5 line-clamp-2 hover:text-primary cursor-pointer transition-colors leading-tight"
        >
          {product.title}
        </h4>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <Rating value={product.rating} size={13} />
          <span className="text-xs text-muted-foreground font-medium">
            {product.rating.toFixed(1)} ({product.reviewsCount})
          </span>
        </div>

        {/* Size / Unit */}
        <span className="text-xs text-muted-foreground mb-3 font-medium">
          {product.unit}
        </span>

        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.inStock ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product, 1)}
              className="px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold text-xs rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
            >
              <FaPlus className="size-3" />
              <span>Add</span>
            </motion.button>
          ) : (
            <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
