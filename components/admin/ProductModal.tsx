"use client";

import React, { useState, useEffect } from "react";
import { X, Image as ImageIcon, Sparkles } from "lucide-react";
import { Product } from "./types";
import { CATEGORIES } from "@/data/categories";

interface ProductModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialProduct?: Product | null;
  onClose: () => void;
  onSave: (product: Omit<Product, "id"> | Product) => void;
}

const PRESET_IMAGES = [
  "/images/products/product-img-1.jpg",
  "/images/products/product-img-2.jpg",
  "/images/products/product-img-3.jpg",
  "/images/products/product-img-4.jpg",
  "/images/products/product-img-5.jpg",
  "/images/products/product-img-6.jpg",
  "/images/products/product-img-7.jpg",
  "/images/products/product-img-8.jpg",
];

export function ProductModal({
  isOpen,
  mode,
  initialProduct,
  onClose,
  onSave,
}: ProductModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]?.name || "Snack & Munchies");
  const [price, setPrice] = useState<number>(10);
  const [originalPrice, setOriginalPrice] = useState<number | "">("");
  const [unit, setUnit] = useState("250g");
  const [inStock, setInStock] = useState(true);
  const [stockLeft, setStockLeft] = useState<number | "">(50);
  const [stockTotal, setStockTotal] = useState<number | "">(100);
  const [badgeText, setBadgeText] = useState("");
  const [badgeType, setBadgeType] = useState<"hot" | "sale" | "new" | "discount" | "">("");
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialProduct && mode === "edit") {
      setTitle(initialProduct.title);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice ?? "");
      setUnit(initialProduct.unit || "250g");
      setInStock(initialProduct.inStock);
      setStockLeft(initialProduct.stockLeft ?? "");
      setStockTotal(initialProduct.stockTotal ?? "");
      setBadgeText(initialProduct.badge?.text || "");
      setBadgeType(initialProduct.badge?.type || "");
      setImageUrl(initialProduct.images?.[0] || PRESET_IMAGES[0]);
    } else {
      setTitle("");
      setCategory(CATEGORIES[0]?.name || "Snack & Munchies");
      setPrice(15);
      setOriginalPrice("");
      setUnit("250g");
      setInStock(true);
      setStockLeft(50);
      setStockTotal(100);
      setBadgeText("");
      setBadgeType("");
      setImageUrl(PRESET_IMAGES[0]);
    }
  }, [initialProduct, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || price <= 0) return;

    setIsSubmitting(true);

    const productData = {
      ...(initialProduct && mode === "edit" ? { id: initialProduct.id } : {}),
      title: title.trim(),
      category,
      price: Number(price),
      originalPrice: originalPrice !== "" ? Number(originalPrice) : null,
      rating: initialProduct?.rating ?? 4.5,
      reviewsCount: initialProduct?.reviewsCount ?? 12,
      images: [imageUrl],
      unit,
      badge:
        badgeText && badgeType
          ? { text: badgeText, type: badgeType as "hot" | "sale" | "new" | "discount" }
          : null,
      inStock,
      stockLeft: stockLeft !== "" ? Number(stockLeft) : undefined,
      stockTotal: stockTotal !== "" ? Number(stockTotal) : undefined,
    };

    onSave(productData as any);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-card border border-border rounded-2xl max-w-2xl w-full my-8 p-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {mode === "create" ? "Add New Product" : "Edit Product"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mode === "create"
                ? "Fill in details to add a new grocery item to the catalog."
                : `Update product specifications for ${initialProduct?.title || ""}`}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground rounded-lg p-1.5 hover:bg-muted transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 py-4 space-y-4 pr-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Organic Cavendish Bananas"
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Category & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Unit / Package Size <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. 250g, 1 kg, 6 pcs"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Selling Price ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                required
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Original Price ($) <span className="text-muted-foreground font-normal">(Optional strikeout)</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value === "" ? "" : parseFloat(e.target.value))}
                placeholder="e.g. 24.00"
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Stock Status & Quantities */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-foreground block">In Stock Status</span>
                <span className="text-[11px] text-muted-foreground">Is this item ready for purchase?</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Remaining Stock
                </label>
                <input
                  type="number"
                  value={stockLeft}
                  onChange={(e) => setStockLeft(e.target.value === "" ? "" : parseInt(e.target.value))}
                  placeholder="e.g. 45"
                  className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                  Total Target Stock
                </label>
                <input
                  type="number"
                  value={stockTotal}
                  onChange={(e) => setStockTotal(e.target.value === "" ? "" : parseInt(e.target.value))}
                  placeholder="e.g. 100"
                  className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Badge & Promo Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Badge Type
              </label>
              <select
                value={badgeType}
                onChange={(e) => setBadgeType(e.target.value as any)}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-xs text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">No Badge</option>
                <option value="sale">Sale (Green)</option>
                <option value="hot">Hot (Red)</option>
                <option value="discount">Discount (Orange)</option>
                <option value="new">New (Blue)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Badge Text
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="e.g. 15% Off, Best Seller"
                disabled={!badgeType}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Product Image
            </label>
            <div className="flex items-center gap-3">
              <div className="size-16 rounded-xl border border-border overflow-hidden shrink-0 bg-muted/40 flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt="Preview" className="size-full object-cover" />
                ) : (
                  <ImageIcon className="size-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/products/product-img-1.jpg"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-muted-foreground self-center mr-1">Presets:</span>
                  {PRESET_IMAGES.slice(0, 6).map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setImageUrl(img)}
                      className={`size-6 rounded-md border overflow-hidden transition-all ${
                        imageUrl === img ? "ring-2 ring-primary border-primary" : "border-border opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`P${i + 1}`} className="size-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="pt-4 border-t border-border flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs disabled:opacity-50 flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5" />
              <span>{mode === "create" ? "Create Product" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
