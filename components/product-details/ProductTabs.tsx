"use client";

import React, { useState } from "react";
import { Product } from "@/data/products";
import { Rating } from "@/components/ui/Rating";
import { IoCheckmark, IoPersonCircle } from "react-icons/io5";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "spec" | "reviews">("desc");

  return (
    <div className="mt-12 bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Tab Headers */}
      <div className="flex border-b border-border gap-6 sm:gap-8 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("desc")}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "desc"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Product Details
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("spec")}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "spec"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Specifications
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`pb-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === "reviews"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span>Customer Reviews</span>
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
            {product.reviewsCount}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === "desc" && (
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Experience the freshness and pure quality of <strong className="text-foreground">{product.title}</strong>, curated specifically to meet your daily kitchen and lifestyle needs. FreshCart guarantees each item is checked against rigorous standards for freshness, authentic taste, and optimum shelf life.
            </p>
            <p>
              Perfect for quick home meals, family gatherings, or everyday snacking. Store in a cool, dry place away from direct sunlight to preserve peak aroma and texture.
            </p>

            <div className="pt-2">
              <h4 className="font-bold text-foreground text-sm mb-3">Key Highlights:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li className="flex items-center gap-2">
                  <IoCheckmark className="text-emerald-500 size-4 shrink-0" />
                  <span>Sourced directly from verified, quality-tested producers</span>
                </li>
                <li className="flex items-center gap-2">
                  <IoCheckmark className="text-emerald-500 size-4 shrink-0" />
                  <span>Sealed in tamper-evident hygienic packaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <IoCheckmark className="text-emerald-500 size-4 shrink-0" />
                  <span>No harmful synthetic colors or prohibited additives</span>
                </li>
                <li className="flex items-center gap-2">
                  <IoCheckmark className="text-emerald-500 size-4 shrink-0" />
                  <span>100% satisfaction or full refund guaranteed</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "spec" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <tbody>
                <tr className="border-b border-border/60">
                  <td className="py-2.5 font-bold text-foreground w-1/3">Product Category</td>
                  <td className="py-2.5 text-muted-foreground">{product.category}</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2.5 font-bold text-foreground">Unit / Net Weight</td>
                  <td className="py-2.5 text-muted-foreground">{product.unit}</td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2.5 font-bold text-foreground">Availability</td>
                  <td className="py-2.5 text-muted-foreground">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </td>
                </tr>
                <tr className="border-b border-border/60">
                  <td className="py-2.5 font-bold text-foreground">Storage Instructions</td>
                  <td className="py-2.5 text-muted-foreground">Keep refrigerated or at room temperature</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-foreground">Shelf Life</td>
                  <td className="py-2.5 text-muted-foreground">Best within 3 to 6 months from packaging</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Rating breakdown summary */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="text-center sm:text-left">
                <div className="text-4xl font-extrabold text-foreground leading-none mb-1">
                  {product.rating.toFixed(1)}
                </div>
                <Rating value={product.rating} size={18} />
                <div className="text-xs text-muted-foreground mt-1">
                  Based on {product.reviewsCount} reviews
                </div>
              </div>
              <div className="flex-1 space-y-1.5 text-xs">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const pct = stars === 5 ? 75 : stars === 4 ? 18 : stars === 3 ? 5 : 2;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="w-8 text-muted-foreground">{stars} star</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-muted-foreground">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mock recent reviews */}
            <div className="space-y-4 pt-2">
              <div className="border-b border-border/60 pb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <IoPersonCircle className="size-6 text-muted-foreground" />
                    <span className="text-sm font-bold text-foreground">Sarah Jenkins</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <Rating value={5} size={14} className="mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Excellent freshness and super fast delivery. Packed neatly with cold insulation. Will definitely buy again!
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <IoPersonCircle className="size-6 text-muted-foreground" />
                    <span className="text-sm font-bold text-foreground">Michael R.</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
                <Rating value={4.5} size={14} className="mb-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Great value for the price. Taste and quality are consistently top notch compared to other local stores.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
