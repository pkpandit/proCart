import { prisma } from "@/lib/prisma";
import { Product, MOCK_PRODUCTS } from "@/data/products";

/**
 * Fetch a single product by ID.
 * Queries Prisma database first with graceful fallback to MOCK_PRODUCTS.
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (dbProduct) {
      return {
        id: dbProduct.id,
        title: dbProduct.title,
        category: dbProduct.category,
        price: Number(dbProduct.price),
        originalPrice: dbProduct.originalPrice ? Number(dbProduct.originalPrice) : null,
        rating: Number(dbProduct.rating),
        reviewsCount: dbProduct.reviewsCount,
        images: dbProduct.images && dbProduct.images.length > 0 ? dbProduct.images : ["/images/products/product-img-1.jpg"],
        unit: dbProduct.unit,
        badge: (dbProduct.badge as { text: string; type: "hot" | "sale" | "new" | "discount" }) || null,
        inStock: dbProduct.inStock,
        stockLeft: dbProduct.stockLeft ?? undefined,
        stockTotal: dbProduct.stockTotal ?? undefined,
      };
    }
  } catch {
    // If DB is offline or not configured, continue to mock fallback
  }

  // Fallback to MOCK_PRODUCTS
  const mockProduct = MOCK_PRODUCTS.find((p) => p.id === id);
  return mockProduct || null;
}

/**
 * Get related products within the same category.
 */
export async function getRelatedProducts(currentId: string, category: string, limit = 4): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: {
        category,
        id: { not: currentId },
      },
      take: limit,
    });

    if (dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: p.id,
        title: p.title,
        category: p.category,
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : null,
        rating: Number(p.rating),
        reviewsCount: p.reviewsCount,
        images: p.images && p.images.length > 0 ? p.images : ["/images/products/product-img-1.jpg"],
        unit: p.unit,
        badge: (p.badge as { text: string; type: "hot" | "sale" | "new" | "discount" }) || null,
        inStock: p.inStock,
        stockLeft: p.stockLeft ?? undefined,
        stockTotal: p.stockTotal ?? undefined,
      }));
    }
  } catch {
    // Ignore and fallback to mock
  }

  // Mock fallback
  const related = MOCK_PRODUCTS.filter((p) => p.id !== currentId && p.category.toLowerCase() === category.toLowerCase()).slice(0, limit);
  if (related.length > 0) return related;

  return MOCK_PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);
}
