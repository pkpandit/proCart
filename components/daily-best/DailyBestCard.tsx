"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/data/products";
import { Rating } from "@/components/ui/Rating";
import Image from "next/image";
import { CountdownTimer } from "./CountdownTimer";

interface DailyBestCardProps {
  product: Product;
  idx: number;
}

export function DailyBestCard({ product, idx }: DailyBestCardProps) {
  const { addToCart } = useCart();

  const getDaysLeft = (id: string) => {
    if (id === "best-1") return 785;
    if (id === "best-2") return 858;
    return 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      className="bg-card border border-border rounded-xl p-4 flex flex-col hover:shadow-[0_5px_12px_rgba(0,0,0,0.12)] hover:border-primary transition-all duration-200 group overflow-hidden"
    >
      {/* Image */}
      <div className="aspect-square w-full mb-3 flex items-center justify-center bg-white rounded-lg overflow-hidden relative">
        <Image
          width={220}
          height={220}
          src={product.images[0]}
          alt={product.title}
          className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-primary text-primary-foreground uppercase tracking-wider">
            {product.badge.text}
          </span>
        )}
      </div>

      {/* Category & Title */}
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        {product.category}
      </span>
      <h4 className="text-sm font-semibold font-heading text-foreground mb-1 hover:text-primary transition-colors cursor-pointer line-clamp-1">
        {product.title}
      </h4>

      {/* Star Ratings */}
      <div className="flex items-center gap-1.5 mb-2">
        <Rating value={product.rating} size={12} />
        <span className="text-xs text-muted-foreground font-semibold">
          {product.rating}
        </span>
      </div>

      {/* Price & Unit */}
      <div className="flex justify-between items-baseline mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <span className="text-[10px] text-muted-foreground font-semibold">
          {product.unit}
        </span>
      </div>

      {/* Action button */}
      <button
        onClick={() => addToCart(product, 1)}
        className="w-full mt-auto py-2 bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1 shadow-sm"
      >
        <FaPlus className="size-3" />
        <span>Add to Cart</span>
      </button>

      {/* Encapsulated Countdown Timer */}
      <CountdownTimer days={getDaysLeft(product.id)} />
    </motion.div>
  );
}
