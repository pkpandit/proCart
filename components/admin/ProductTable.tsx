"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Star,
  Package,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Product } from "./types";
import { CATEGORIES } from "@/data/categories";

const PAGE_SIZE = 10;
interface ProductTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (
    category?: string,
    search?: string,
    stockStatus?: string,
    sortBy?: string,
  ) => void;
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

export function ProductTable({
  products,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState("All");
  const [sortBy, setSortBy] = useState<
    "title" | "price-asc" | "price-desc" | "rating"
  >("title");
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);

    onFilterChange(
      selectedCategory === "All" ? undefined : selectedCategory,
      value,
      selectedStockStatus === "All" ? undefined : selectedStockStatus,
    );
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    onFilterChange(
      value === "All" ? undefined : value,
      searchTerm,
      selectedStockStatus === "All" ? undefined : selectedStockStatus,
    );
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedStockStatus("All");
    setSortBy("title");

    onFilterChange(undefined, undefined, undefined, "title");
  };

  /* const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.title.localeCompare(b.title);
    });
  }, [products, sortBy]); */

  const startItem =
    products.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;

  const endItem = products.length === 0 ? 0 : startItem + products.length - 1;

  return (
    <div className="space-y-4">
      {/* Controls: Search, Category Filter, Stock Filter, Sort, Add Button */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-card p-4 rounded-2xl border border-border shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by title or category..."
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={selectedStockStatus}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedStockStatus(value);

              onFilterChange(
                selectedCategory === "All" ? undefined : selectedCategory,
                searchTerm,
                value === "All" ? undefined : value,
              );
            }}
            className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock (&lt; 20)</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => {
              const value = e.target.value as
                "title" | "price-asc" | "price-desc" | "rating";

              setSortBy(value);

              onFilterChange(
                selectedCategory === "All" ? undefined : selectedCategory,
                searchTerm,
                selectedStockStatus === "All" ? undefined : selectedStockStatus,
                value,
              );
            }}
            className="rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="title">Sort: Name (A-Z)</option>
            <option value="price-asc">Sort: Price (Low to High)</option>
            <option value="price-desc">Sort: Price (High to Low)</option>
            <option value="rating">Sort: Top Rated</option>
          </select>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={onAddProduct}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs shadow-primary/20 shrink-0"
          >
            <Plus className="size-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/30 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border/60 text-xs">
              {products.length > 0 ? (
                products.map((product) => {
                  const isLowStock =
                    product.inStock &&
                    product.stockLeft !== undefined &&
                    product.stockLeft < 20;
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-muted/40 transition-colors group"
                    >
                      {/* Product Thumbnail & Details */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="size-11 rounded-xl border border-border/70 overflow-hidden bg-muted/20 shrink-0 flex items-center justify-center p-1">
                            <img
                              src={
                                product.images?.[0] ||
                                "/images/products/product-img-1.jpg"
                              }
                              alt={product.title}
                              className="size-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/images/products/product-img-1.jpg";
                              }}
                            />
                          </div>
                          <div className="min-w-0 max-w-[220px]">
                            <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                              {product.title}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-muted-foreground">
                                {product.unit}
                              </span>
                              {product.badge && (
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                                    product.badge.type === "hot"
                                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400"
                                      : product.badge.type === "sale"
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                                  }`}
                                >
                                  {product.badge.text}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium text-foreground">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-foreground">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-muted-foreground line-through">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Stock Status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {product.inStock ? (
                          isLowStock ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                              <AlertCircle className="size-3" />
                              <span>Low ({product.stockLeft} left)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="size-3" />
                              <span>
                                In Stock{" "}
                                {product.stockLeft
                                  ? `(${product.stockLeft})`
                                  : ""}
                              </span>
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                            <AlertCircle className="size-3" />
                            <span>Out of Stock</span>
                          </span>
                        )}
                      </td>

                      {/* Rating */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-foreground">
                            {product.rating}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            ({product.reviewsCount})
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Live preview in store */}
                          <Link
                            href={`/product/${product.id}`}
                            target="_blank"
                            title="View in Customer Storefront"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            <ExternalLink className="size-3.5" />
                          </Link>

                          {/* Edit button */}
                          <button
                            type="button"
                            onClick={() => onEditProduct(product)}
                            title="Edit Product"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Edit2 className="size-3.5" />
                          </button>

                          {/* Delete button */}
                          <button
                            type="button"
                            onClick={() => onDeleteProduct(product)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="size-12 rounded-full bg-muted/80 flex items-center justify-center text-muted-foreground">
                        <Package className="size-6" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">
                        No products found
                      </p>
                      <p className="text-xs text-muted-foreground max-w-sm">
                        No items match your filter criteria. Try clearing your
                        search term or adjusting filters.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-2 text-xs font-semibold text-primary hover:underline"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 border-t border-border bg-muted/10 text-xs text-muted-foreground">
          <div>
            Showing{" "}
            <span className="font-semibold text-foreground">{startItem}</span>{" "}
            to <span className="font-semibold text-foreground">{endItem}</span>{" "}
            products
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="px-3 py-1 text-xs font-semibold text-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
