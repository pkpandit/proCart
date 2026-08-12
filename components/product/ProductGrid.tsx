"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useCart } from "@/contexts/CartContext";
import { MOCK_PRODUCTS } from "@/data/products";

const CATEGORIES = ["All", "Dairy, Bread & Eggs", "Snacks & Munchies", "Fruits & Vegetables", "Instant Food"];

export function ProductGrid() {
  const { searchQuery } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    // Only take the first 10 products that match criteria (to mirror the FreshCart layout)
    let list = MOCK_PRODUCTS.filter((prod) => !prod.id.startsWith("best-"));

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return list.slice(0, 10);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 text-left">
      {/* Header and Filter Tab Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-extrabold font-heading text-foreground tracking-tight">
          Popular Products
        </h2>

        {/* Tab Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">
          No products found matching your search.
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
