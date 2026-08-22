"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { CategoryItem } from "@/data/categories";
import { Dialog } from "@/components/ui/Dialog";
import Image from "next/image";

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  categories: CategoryItem[];
  onSave: (data: any) => void;
}

const PRESET_IMAGES = [
  { label: "Haldiram's Sev Bhujia", value: "/images/products/product-img-1.jpg" },
  { label: "Digestive Biscuit", value: "/images/products/product-img-2.jpg" },
  { label: "Cadbury Chocolate", value: "/images/products/product-img-3.jpg" },
  { label: "Onion Potato Chips", value: "/images/products/product-img-4.jpg" },
  { label: "Instant Popcorn", value: "/images/products/product-img-5.jpg" },
  { label: "Greek Yogurt", value: "/images/products/product-img-6.jpg" },
  { label: "Cheese Slices", value: "/images/products/product-img-7.jpg" },
  { label: "Cereals Kellogg's", value: "/images/products/product-img-8.jpg" },
  { label: "Millet Chocolate Cereal", value: "/images/products/product-img-9.jpg" },
  { label: "Amul Butter", value: "/images/products/product-img-10.jpg" },
  { label: "Ground Coffee", value: "/images/products/product-img-12.jpg" },
  { label: "Crushed Tomatoes", value: "/images/products/product-img-13.jpg" },
  { label: "Golden Pineapple", value: "/images/products/product-img-14.jpg" },
];

export function ProductFormModal({
  open,
  onClose,
  product,
  categories,
  onSave,
}: ProductFormModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [inStock, setInStock] = useState(true);
  const [stockLeft, setStockLeft] = useState("");
  const [stockTotal, setStockTotal] = useState("");
  const [badgeText, setBadgeText] = useState("");
  const [badgeType, setBadgeType] = useState<"hot" | "sale" | "new" | "discount">("sale");
  const [imageUrl, setImageUrl] = useState("/images/products/product-img-1.jpg");

  // Sync form values with selected product
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setCategory(product.category);
      setPrice(product.price.toString());
      setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : "");
      setUnit(product.unit);
      setInStock(product.inStock);
      setStockLeft(product.stockLeft !== undefined ? product.stockLeft.toString() : "");
      setStockTotal(product.stockTotal !== undefined ? product.stockTotal.toString() : "");
      setBadgeText(product.badge?.text || "");
      setBadgeType(product.badge?.type || "sale");
      setImageUrl(product.images[0] || PRESET_IMAGES[0]?.value || "");
    } else {
      setTitle("");
      setCategory(categories[0]?.name || "Dairy, Bread & Eggs");
      setPrice("");
      setOriginalPrice("");
      setUnit("1 Unit");
      setInStock(true);
      setStockLeft("50");
      setStockTotal("100");
      setBadgeText("");
      setBadgeType("sale");
      setImageUrl(PRESET_IMAGES[0]?.value || "");
    }
  }, [product, categories, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(price) || 0;
    const origPriceNum = originalPrice ? parseFloat(originalPrice) : undefined;
    const stockLeftNum = stockLeft ? parseInt(stockLeft) : undefined;
    const stockTotalNum = stockTotal ? parseInt(stockTotal) : undefined;

    onSave({
      title,
      category,
      price: priceNum,
      originalPrice: origPriceNum,
      unit,
      inStock,
      stockLeft: stockLeftNum,
      stockTotal: stockTotalNum,
      images: [imageUrl, imageUrl, imageUrl],
      badge: badgeText ? { text: badgeText, type: badgeType } : undefined,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={product ? "Edit Product Details" : "Add New Store Product"}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Haldiram's Bhujia Sev"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Category *</label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            >
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Packaging / Unit */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Packaging / Unit *</label>
            <input
              type="text"
              required
              placeholder="e.g. 250g, 1 Unit, 4 pieces"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="e.g. 15.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            />
          </div>

          {/* Original Price */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Original Price ($ - Optional)</label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 20.00"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Stock Left */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Current Stock Count</label>
            <input
              type="number"
              placeholder="e.g. 50"
              value={stockLeft}
              onChange={(e) => setStockLeft(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            />
          </div>

          {/* Stock Total */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Total Capacity Count</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={stockTotal}
              onChange={(e) => setStockTotal(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            />
          </div>
        </div>

        {/* Badge Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/60 pt-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Promo Badge Text</label>
            <input
              type="text"
              placeholder="e.g. Hot, Sale, 10% Off"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground">Promo Badge Type</label>
            <select
              value={badgeType}
              onChange={(e) => setBadgeType(e.target.value as any)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
            >
              <option value="sale">Sale (Green)</option>
              <option value="hot">Hot (Red)</option>
              <option value="new">New (Amber)</option>
              <option value="discount">Discount (Amber)</option>
            </select>
          </div>
        </div>

        {/* Image Selection Presets */}
        <div className="space-y-1 border-t border-border/60 pt-3">
          <label className="text-xs font-bold text-foreground">Product Image Preset</label>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background font-bold"
            >
              {PRESET_IMAGES.map((img) => (
                <option key={img.label} value={img.value}>
                  {img.label}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground">Preview:</span>
              <div className="size-10 border border-border rounded-lg bg-muted flex items-center justify-center p-1 overflow-hidden shrink-0">
                <Image
                  src={imageUrl}
                  alt=""
                  height={32}
                  width={32}
                  className="object-contain size-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* In Stock Boolean */}
        <div className="flex items-center gap-2 border-t border-border/60 pt-3">
          <input
            type="checkbox"
            id="inStockCheckbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="accent-primary size-4 rounded-md border-border cursor-pointer"
          />
          <label htmlFor="inStockCheckbox" className="text-xs font-bold text-foreground cursor-pointer select-none">
            Product is immediately available for purchase (In Stock)
          </label>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-xl hover:bg-primary/95 shadow-xs transition-colors cursor-pointer"
          >
            {product ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
