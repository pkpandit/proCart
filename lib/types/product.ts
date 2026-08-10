import { Product, MOCK_PRODUCTS } from "@/data/products";

/**
 * Retrieve all available mock products.
 */
export function getProducts(): Product[] {
  return MOCK_PRODUCTS;
}

/**
 * Retrieve a specific product by its ID.
 */
export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((product) => product.id === id);
}

/**
 * Retrieve products filtered by category.
 * Case-insensitive matching.
 */
export function getProductsByCategory(category: string): Product[] {
  const normalizedCategory = category.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (product) => product.category.toLowerCase() === normalizedCategory
  );
}
