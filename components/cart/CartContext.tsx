"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import {
  CartItem,
  addToCartHelper,
  removeFromCartHelper,
  updateCartQuantityHelper,
  calculateCartTotal,
  calculateCartCount,
} from "@/lib/types/cart";

export type { Product, CartItem };

interface CartContextType {
  cart: CartItem[];
  location: string;
  searchQuery: string;
  quickViewProduct: Product | null;
  authModalOpen: boolean;
  locationModalOpen: boolean;
  cartOpen: boolean;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  changeLocation: (newLocation: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setAuthModalOpen: (open: boolean) => void;
  setLocationModalOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const defaultProducts = MOCK_PRODUCTS.slice(0, 5);
    return defaultProducts.map((p) => ({ product: p, quantity: 1 }));
  });
  const [location, setLocation] = useState("Chicago, IL");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart and location from localStorage on mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem("freshcart_cart");
    const savedLocation = localStorage.getItem("freshcart_location");

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        Promise.resolve().then(() => setCart(parsed));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedLocation) {
      Promise.resolve().then(() => setLocation(savedLocation));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("freshcart_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => addToCartHelper(prev, product, quantity));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => removeFromCartHelper(prev, productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) => updateCartQuantityHelper(prev, productId, quantity));
  };

  const clearCart = () => setCart([]);

  const changeLocation = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("freshcart_location", newLocation);
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const cartTotal = calculateCartTotal(cart);
  const cartCount = calculateCartCount(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        location,
        searchQuery,
        quickViewProduct,
        authModalOpen,
        locationModalOpen,
        cartOpen,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        changeLocation,
        openQuickView,
        closeQuickView,
        setAuthModalOpen,
        setLocationModalOpen,
        setCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
