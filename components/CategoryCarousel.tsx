"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "Snack & Munchies",
    image: "/images/category/category-snack-munchies.jpg",
    itemCount: "18 items",
  },
  {
    name: "Bakery & Biscuits",
    image: "/images/category/category-bakery-biscuits.jpg",
    itemCount: "12 items",
  },
  {
    name: "Instant Food",
    image: "/images/category/category-instant-food.jpg",
    itemCount: "30 items",
  },
  {
    name: "Tea, Coffee & Drinks",
    image: "/images/category/category-tea-coffee-drinks.jpg",
    itemCount: "25 items",
  },
  {
    name: "Atta, Rice & Dal",
    image: "/images/category/category-atta-rice-dal.jpg",
    itemCount: "15 items",
  },
  {
    name: "Baby Care",
    image: "/images/category/category-baby-care.jpg",
    itemCount: "8 items",
  },
];

export function CategoryCarousel() {
  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-extrabold font-heading text-foreground tracking-tight">
          Featured Categories
        </h2>
      </div>

      {/* Horizontal Scroll Layout */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="flex-1 min-w-35 md:min-w-42.5 bg-card border border-border rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group"
            onClick={() => alert(`Selected Category: ${cat.name}`)}
          >
            {/* Image Container (Rectangular/Square) */}
            <div className="w-full aspect-square max-h-32 mb-4 flex items-center justify-center p-2 rounded-lg overflow-hidden bg-muted/20">
              <Image
                height={120}
                width={120}
                src={cat.image}
                alt={cat.name}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Title */}
            <h3 className="text-xs md:text-sm font-extrabold text-foreground line-clamp-1 mb-1 leading-tight font-heading">
              {cat.name}
            </h3>

            {/* Counts */}
            <span className="text-[10px] md:text-xs text-muted-foreground font-semibold">
              {cat.itemCount}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
