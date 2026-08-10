import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Add an item to the cart immitably, merging quantities if the item already exists.
 */
export function addToCartHelper(
  cart: CartItem[],
  product: Product,
  quantity = 1
): CartItem[] {
  if (!product.inStock) return cart;

  const existingIndex = cart.findIndex((item) => item.product.id === product.id);

  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [...cart, { product, quantity }];
}

/**
 * Remove an item from the cart immitably.
 */
export function removeFromCartHelper(
  cart: CartItem[],
  productId: string
): CartItem[] {
  return cart.filter((item) => item.product.id !== productId);
}

/**
 * Update an item's quantity in the cart.
 * If quantity is 0 or less, the item will be removed.
 */
export function updateCartQuantityHelper(
  cart: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCartHelper(cart, productId);
  }

  return cart.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item
  );
}

/**
 * Calculate the total cost of all items in the cart.
 */
export function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Calculate the total item count in the cart.
 */
export function calculateCartCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
