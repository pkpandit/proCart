"use client";

import { Product } from "@/data/products";
import { Breadcrumb } from "./Breadcrumb";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
// import { ProductTabs } from "./ProductTabs";

interface ProductDetailsViewProps {
  initialProduct: Product;
}

export function ProductDetailsView({ initialProduct }: ProductDetailsViewProps) {
  const product = initialProduct;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb category={product.category} title={product.title} />

        {/* Top Fold: Image Gallery & Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-2 items-start">
          {/* Left Column: Product Images (Main Image + Thumbnails) */}
          <div className="w-full">
            <ProductImageGallery images={product.images} title={product.title} badge={product.badge} inStock={product.inStock} />
          </div>

          {/* Right Column: Product Information */}
          <div className="w-full">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabbed Section: Details, Specifications, Reviews */}
        {/*<ProductTabs product={product} />*/}
      </div>
    </div>
  );
}
