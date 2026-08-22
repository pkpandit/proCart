"use client";

import React from "react";
import { CategoryItem } from "@/data/categories";
import { IoSearchOutline } from "react-icons/io5";

interface ProductsFilterProps {
  search: string;
  setSearch: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  stockFilter: string;
  setStockFilter: (val: string) => void;
  categories: CategoryItem[];
}

export function ProductsFilter({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  categories,
}: ProductsFilterProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-card border border-border rounded-2xl shadow-xs">
      {/* Search */}
      <div className="relative">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
        />
      </div>

      {/* Category Filter */}
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background font-bold"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Stock Filter */}
      <div>
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background font-bold"
        >
          <option value="All">All Stocks</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
          <option value="Low Stock">Low Stock</option>
        </select>
      </div>
    </div>
  );
}
