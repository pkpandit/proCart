"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { useCart } from "@/contexts/CartContext";
import { useData } from "@/contexts/DataContext";

const CATEGORIES = ["All", "Dairy, Bread & Eggs", "Snacks & Munchies", "Fruits & Vegetables", "Instant Food"];

export function ProductGrid() {
  const { searchQuery } = useCart();
  const { products, currentPage, totalPages, loadProducts } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(1, selectedCategory, searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, loadProducts]);
  const filteredProducts = products.filter((prod) => !prod.id.startsWith("best-"));
  return (
    <div className="space-y-6 text-left">
      {/* Header and Filter Tab Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-extrabold font-heading text-foreground tracking-tight">Popular Products</h2>

        {/* Tab Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${isSelected ? "bg-primary text-primary-foreground shadow-xs" : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product List Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-sm text-muted-foreground border border-dashed border-border rounded-xl">No products found matching your search.</div>
      ) : (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button onClick={() => loadProducts(currentPage - 1, selectedCategory, searchQuery)} disabled={currentPage === 1} className="px-4 py-2 rounded-lg text-sm font-semibold border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted">
            Previous
          </button>

          <span className="text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={() => loadProducts(currentPage + 1, selectedCategory, searchQuery)} disabled={currentPage === totalPages} className="px-4 py-2 rounded-lg text-sm font-semibold border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
