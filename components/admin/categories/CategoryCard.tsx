"use client";

import React from "react";
import { CategoryItem } from "@/data/categories";
import Image from "next/image";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

interface CategoryCardProps {
  category: CategoryItem;
  onEdit: (cat: CategoryItem) => void;
  onDelete: (cat: CategoryItem) => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center justify-between text-center relative hover:shadow-[0_5px_12px_rgba(0,0,0,0.06)] hover:border-primary/80 transition-all duration-200 group">
      {/* Actions overlay */}
      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(category)}
          className="p-1 bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted rounded-md shadow-xs transition-colors cursor-pointer"
          title="Edit Category"
        >
          <IoPencilOutline className="size-3.5" />
        </button>
        <button
          onClick={() => onDelete(category)}
          className="p-1 bg-card border border-destructive/20 text-destructive hover:bg-destructive/10 rounded-md shadow-xs transition-colors cursor-pointer"
          title="Delete Category"
        >
          <IoTrashOutline className="size-3.5" />
        </button>
      </div>

      {/* Category Image */}
      <div className="w-full aspect-square max-h-24 mb-4 flex items-center justify-center p-2 rounded-lg overflow-hidden bg-muted/20">
        <Image
          src={category.image}
          alt={category.name}
          height={80}
          width={80}
          className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
        />
      </div>

      {/* Text Info */}
      <div className="w-full">
        <h3 className="text-xs md:text-sm font-extrabold text-foreground line-clamp-2 leading-tight mb-1 font-heading">
          {category.name}
        </h3>
        <span className="text-[10px] md:text-xs text-muted-foreground font-semibold">
          {category.itemCount}
        </span>
      </div>
    </div>
  );
}
