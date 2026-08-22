"use client";

import React from "react";
import { Product } from "@/data/products";
import Image from "next/image";
import {
  IoPencilOutline,
  IoTrashOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

interface ProductsTableProps {
  products: Product[];
  onEdit: (prod: Product) => void;
  onDelete: (prod: Product) => void;
  onToggleStock: (id: string, inStock: boolean) => void;
}

export function ProductsTable({
  products,
  onEdit,
  onDelete,
  onToggleStock,
}: ProductsTableProps) {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground border-dashed border-border border rounded-b-2xl">
            No products match the selected criteria.
          </div>
        ) : (
          <table className="w-full text-sm border-collapse text-left">
            <thead>
              <tr className="bg-muted/40 border-b border-border text-xs text-muted-foreground font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Availability</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {products.map((prod) => {
                const isOutOfStock = !prod.inStock || prod.stockLeft === 0;
                const isLowStock =
                  prod.stockLeft !== undefined && prod.stockLeft > 0 && prod.stockLeft < 15;

                return (
                  <tr key={prod.id} className="hover:bg-muted/10 transition-colors">
                    {/* Product Image & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-12 bg-muted rounded-xl flex items-center justify-center p-1 border border-border/80 overflow-hidden shrink-0 relative">
                          {prod.images[0] ? (
                            <Image
                              src={prod.images[0]}
                              alt=""
                              height={40}
                              width={40}
                              className="object-contain size-full"
                            />
                          ) : (
                            <div className="text-[10px] text-muted-foreground font-bold">No img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-foreground line-clamp-1 leading-snug">
                            {prod.title}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-muted-foreground font-bold uppercase">
                              {prod.unit}
                            </span>
                            {prod.badge && (
                              <span
                                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md leading-none ${
                                  prod.badge.type === "hot"
                                    ? "bg-red-500 text-white"
                                    : prod.badge.type === "sale"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-amber-500 text-white"
                                }`}
                              >
                                {prod.badge.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-muted-foreground font-semibold">
                      {prod.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-extrabold text-foreground">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through font-medium">
                            ${prod.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock Level */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span
                            className={
                              isOutOfStock
                                ? "text-destructive"
                                : isLowStock
                                ? "text-amber-500"
                                : "text-foreground"
                            }
                          >
                            {prod.stockLeft !== undefined ? `${prod.stockLeft} left` : "Unlimited"}
                          </span>
                        </div>
                        {prod.stockLeft !== undefined && prod.stockTotal && (
                          <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                isOutOfStock
                                  ? "bg-destructive"
                                  : isLowStock
                                  ? "bg-amber-500"
                                  : "bg-primary"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.round((prod.stockLeft / prod.stockTotal) * 100)
                                )}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Availability */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onToggleStock(prod.id, prod.inStock)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all hover:scale-102 cursor-pointer ${
                          prod.inStock
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                        }`}
                      >
                        {prod.inStock ? (
                          <>
                            <IoCheckmarkCircleOutline className="size-3.5" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <IoCloseCircleOutline className="size-3.5" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Action buttons */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onEdit(prod)}
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-lg transition-all cursor-pointer"
                          title="Edit Product"
                        >
                          <IoPencilOutline className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(prod)}
                          className="p-1.5 text-destructive hover:bg-destructive/10 border border-destructive/20 rounded-lg transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <IoTrashOutline className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
