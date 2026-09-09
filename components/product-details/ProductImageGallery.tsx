"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  badge?: {
    text: string;
    type: "hot" | "sale" | "new" | "discount";
  } | null;
  inStock: boolean;
}

export function ProductImageGallery({ images, title, badge, inStock }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<{ [key: string]: string }>({
    transformOrigin: "center center",
  });
  const [isZooming, setIsZooming] = useState(false);

  useEffect(() => {
    setSelectedIndex(0);
    setIsZooming(false);
  }, [images]);

  const displayImages = images && images.length > 0 ? images : ["/images/products/product-img-1.jpg"];
  const currentImage = displayImages[selectedIndex] || displayImages[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const getBadgeClass = (type?: string) => {
    switch (type) {
      case "hot":
        return "bg-red-500 text-white";
      case "sale":
        return "bg-orange-500 text-white";
      case "new":
        return "bg-blue-500 text-white";
      case "discount":
        return "bg-green-600 text-white";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Viewport */}
      <div className="relative aspect-square w-full rounded-2xl bg-card border border-border flex items-center justify-center p-6 overflow-hidden cursor-crosshair group shadow-sm" onMouseEnter={() => setIsZooming(true)} onMouseLeave={() => setIsZooming(false)} onMouseMove={handleMouseMove}>
        {/* Badge */}
        {badge && <span className={`absolute top-4 left-4 z-20 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow-sm ${getBadgeClass(badge.type)}`}>{badge.text}</span>}

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs z-20 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-sm">Out of Stock</span>
          </div>
        )}

        {/* Animated Main Image with Hover Zoom */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedIndex} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="w-full h-full flex items-center justify-center relative">
            <Image
              src={currentImage}
              alt={title}
              width={700}
              height={700}
              priority
              className="max-h-full max-w-full object-contain transition-transform duration-150 select-none"
              style={{
                transform: isZooming ? "scale(1.7)" : "scale(1)",
                transformOrigin: zoomStyle.transformOrigin,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom prompt hint */}
        <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-xs border border-border/60 text-[10px] text-muted-foreground px-2 py-0.5 rounded-md pointer-events-none">Roll over to zoom</div>
      </div>

      {/* Thumbnails row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
          {displayImages.map((img, idx) => {
            const isActive = selectedIndex === idx;
            return (
              <button key={idx} type="button" onClick={() => setSelectedIndex(idx)} className={`relative shrink-0 size-20 sm:size-22 rounded-xl p-2 bg-card border transition-all duration-200 cursor-pointer overflow-hidden flex items-center justify-center ${isActive ? "border-primary ring-2 ring-primary/25 shadow-sm scale-102" : "border-border hover:border-primary/50 opacity-75 hover:opacity-100"}`}>
                <Image src={img} alt={`${title} thumbnail ${idx + 1}`} width={90} height={90} className="max-h-full max-w-full object-contain" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
