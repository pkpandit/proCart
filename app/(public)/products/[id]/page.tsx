import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/lib/products";
import { ProductDetailsView } from "@/components/product-details/ProductDetailsView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | FreshCart",
      description: "The requested grocery product could not be found.",
    };
  }

  return {
    title: `${product.title} | FreshCart`,
    description: `Buy ${product.title} (${product.unit}) for $${product.price.toFixed(
      2
    )}. Fresh, organic groceries delivered to your door.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailsView initialProduct={product} />;
}
