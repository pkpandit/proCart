"use client";

import React, { useState, useEffect } from "react";
import { CategoryItem } from "@/data/categories";
import { Dialog } from "@/components/ui/Dialog";
import Image from "next/image";

interface CategoryFormModalProps {
  open: boolean;
  onClose: () => void;
  category: CategoryItem | null;
  onSave: (data: CategoryItem) => void;
}

const PRESET_CAT_IMAGES = [
  { label: "Dairy, Bread & Eggs", value: "/images/category/category-dairy-bread-eggs.jpg" },
  { label: "Snack & Munchies", value: "/images/category/category-snack-munchies.jpg" },
  { label: "Bakery & Biscuits", value: "/images/category/category-bakery-biscuits.jpg" },
  { label: "Instant Food", value: "/images/category/category-instant-food.jpg" },
  { label: "Tea, Coffee & Drinks", value: "/images/category/category-tea-coffee-drinks.jpg" },
  { label: "Atta, Rice & Dal", value: "/images/category/category-atta-rice-dal.jpg" },
  { label: "Baby Care", value: "/images/category/category-baby-care.jpg" },
  { label: "Chicken, Meat & Fish", value: "/images/category/category-chicken-meat-fish.jpg" },
  { label: "Cleaning Essentials", value: "/images/category/category-cleaning-essentials.jpg" },
  { label: "Pet Care", value: "/images/category/category-pet-care.jpg" },
  { label: "Fruits & Vegetables", value: "/images/category/category-fruits-vegetables.jpg" },
  { label: "Cold Drinks & Juices", value: "/images/category/category-cold-drinks-juices.jpg" },
];

export function CategoryFormModal({
  open,
  onClose,
  category,
  onSave,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [itemCount, setItemCount] = useState("");
  const [imageUrl, setImageUrl] = useState("/images/category/category-dairy-bread-eggs.jpg");

  // Sync form state
  useEffect(() => {
    if (category) {
      setName(category.name);
      setItemCount(category.itemCount);
      setImageUrl(category.image);
    } else {
      setName("");
      setItemCount("0 items");
      setImageUrl(PRESET_CAT_IMAGES[0]?.value || "");
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      itemCount,
      image: imageUrl,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={category ? "Modify Category Details" : "Create New Category Department"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Category Name *</label>
          <input
            type="text"
            required
            disabled={!!category} // name is the unique key
            placeholder="e.g. Snack & Munchies"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background disabled:bg-muted disabled:text-muted-foreground font-semibold"
          />
          {category && (
            <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">
              Category names function as IDs and cannot be modified once created.
            </p>
          )}
        </div>

        {/* Item Count */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Item count label *</label>
          <input
            type="text"
            required
            placeholder="e.g. 15 items"
            value={itemCount}
            onChange={(e) => setItemCount(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        {/* Preset image selector */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Category Image *</label>
          <select
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background font-bold"
          >
            {PRESET_CAT_IMAGES.map((img) => (
              <option key={img.label} value={img.value}>
                {img.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 mt-3 p-2 bg-muted/10 border border-border/80 rounded-xl w-max">
            <span className="text-xs font-bold text-muted-foreground">Preview:</span>
            <div className="size-12 rounded-lg bg-muted flex items-center justify-center p-1 overflow-hidden shrink-0">
              <Image
                src={imageUrl}
                alt=""
                height={40}
                width={40}
                className="object-contain size-full"
              />
            </div>
          </div>
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
            {category ? "Update Category" : "Create Category"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
