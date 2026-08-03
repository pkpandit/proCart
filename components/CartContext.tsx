"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  unit: string;
  badge?: {
    text: string;
    type: "hot" | "sale" | "new" | "discount";
  };
  inStock: boolean;
  stockLeft?: number;
  stockTotal?: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "popular-1",
    title: "Haldiram's Sev Bhujia",
    category: "Snack & Munchies",
    price: 5.00,
    rating: 4.5,
    reviewsCount: 148,
    images: [
      "/images/products/product-img-1.jpg",
      "/images/products/product-single-img-1.jpg",
      "/images/products/product-single-img-2.jpg"
    ],
    unit: ".98 / lb",
    badge: { text: "10% Off", type: "discount" },
    inStock: true,
  },
  {
    id: "popular-2",
    title: "NutriChoice Digestive Biscuit",
    category: "Bakery & Biscuits",
    price: 20.00,
    originalPrice: 26.00,
    rating: 4.5,
    reviewsCount: 89,
    images: [
      "/images/products/product-img-2.jpg",
      "/images/products/product-single-img-2.jpg",
      "/images/products/product-single-img-3.jpg"
    ],
    unit: "250g",
    inStock: true,
  },
  {
    id: "popular-3",
    title: "Cadbury 5 Star Chocolate",
    category: "Bakery & Biscuits",
    price: 15.00,
    originalPrice: 20.00,
    rating: 5.0,
    reviewsCount: 320,
    images: [
      "/images/products/product-img-3.jpg",
      "/images/products/product-single-img-3.jpg",
      "/images/products/product-single-img-4.jpg"
    ],
    unit: "1 kg",
    badge: { text: "Hot", type: "hot" },
    inStock: true,
  },
  {
    id: "popular-4",
    title: "Onion Flavour Potato Chips",
    category: "Snack & Munchies",
    price: 15.00,
    originalPrice: 20.00,
    rating: 4.5,
    reviewsCount: 65,
    images: [
      "/images/products/product-img-4.jpg",
      "/images/products/product-single-img-4.jpg",
      "/images/products/product-single-img-1.jpg"
    ],
    unit: "250g",
    inStock: true,
  },
  {
    id: "popular-5",
    title: "Salted Instant Popcorn",
    category: "Instant Food",
    price: 15.00,
    originalPrice: 25.00,
    rating: 4.5,
    reviewsCount: 112,
    images: [
      "/images/products/product-img-5.jpg",
      "/images/products/product-single-img-1.jpg",
      "/images/products/product-single-img-2.jpg"
    ],
    unit: "100g",
    badge: { text: "Sale", type: "sale" },
    inStock: true,
  },
  {
    id: "popular-6",
    title: "Blueberry Greek Yogurt",
    category: "Dairy, Bread & Eggs",
    price: 20.00,
    rating: 4.5,
    reviewsCount: 204,
    images: [
      "/images/products/product-img-6.jpg",
      "/images/products/product-single-img-2.jpg",
      "/images/products/product-single-img-3.jpg"
    ],
    unit: "200g",
    inStock: true,
  },
  {
    id: "popular-7",
    title: "Britannia Cheese Slices",
    category: "Dairy, Bread & Eggs",
    price: 24.00,
    rating: 4.5,
    reviewsCount: 92,
    images: [
      "/images/products/product-img-7.jpg",
      "/images/products/product-single-img-3.jpg",
      "/images/products/product-single-img-4.jpg"
    ],
    unit: "200g",
    inStock: true,
  },
  {
    id: "popular-8",
    title: "Kellogg's Original Cereals",
    category: "Instant Food",
    price: 32.00,
    rating: 4.0,
    reviewsCount: 410,
    images: [
      "/images/products/product-img-8.jpg",
      "/images/products/product-single-img-4.jpg",
      "/images/products/product-single-img-1.jpg"
    ],
    unit: "450g",
    inStock: true,
  },
  {
    id: "popular-9",
    title: "Slurrp Millet Chocolate Cereal",
    category: "Snack & Munchies",
    price: 3.00,
    originalPrice: 5.00,
    rating: 4.5,
    reviewsCount: 47,
    images: [
      "/images/products/product-img-9.jpg",
      "/images/products/product-single-img-1.jpg",
      "/images/products/product-single-img-2.jpg"
    ],
    unit: "250g",
    badge: { text: "New", type: "new" },
    inStock: true,
  },
  {
    id: "popular-10",
    title: "Amul Butter - 500 g",
    category: "Dairy, Bread & Eggs",
    price: 18.00,
    rating: 4.5,
    reviewsCount: 512,
    images: [
      "/images/products/product-img-10.jpg",
      "/images/products/product-single-img-2.jpg",
      "/images/products/product-single-img-3.jpg"
    ],
    unit: "500g",
    inStock: true,
  },
  // Daily Best Sells
  {
    id: "best-1",
    title: "Roast Ground Coffee",
    category: "Tea, Coffee & Drinks",
    price: 13.00,
    originalPrice: 18.00,
    rating: 4.3,
    reviewsCount: 195,
    images: [
      "/images/products/product-img-12.jpg",
      "/images/products/product-single-img-4.jpg",
      "/images/products/product-single-img-1.jpg"
    ],
    unit: "250g",
    badge: { text: "20% Off", type: "sale" },
    inStock: true,
    stockLeft: 12,
    stockTotal: 50,
  },
  {
    id: "best-2",
    title: "Crushed Tomatoes",
    category: "Fruits & Vegetables",
    price: 13.00,
    originalPrice: 18.00,
    rating: 4.3,
    reviewsCount: 88,
    images: [
      "/images/products/product-img-13.jpg",
      "/images/products/product-single-img-1.jpg",
      "/images/products/product-single-img-2.jpg"
    ],
    unit: "400g",
    badge: { text: "Hot", type: "hot" },
    inStock: true,
    stockLeft: 38,
    stockTotal: 100,
  },
  {
    id: "best-3",
    title: "Golden Pineapple",
    category: "Fruits & Vegetables",
    price: 13.00,
    originalPrice: 18.00,
    rating: 4.3,
    reviewsCount: 220,
    images: [
      "/images/products/product-img-14.jpg",
      "/images/products/product-single-img-2.jpg",
      "/images/products/product-single-img-3.jpg"
    ],
    unit: "1 Unit",
    badge: { text: "Sale", type: "sale" },
    inStock: true,
    stockLeft: 8,
    stockTotal: 30,
  }
];

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  location: string;
  searchQuery: string;
  quickViewProduct: Product | null;
  authModalOpen: boolean;
  locationModalOpen: boolean;
  cartOpen: boolean;
  wishlistOpen: boolean;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  changeLocation: (newLocation: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setAuthModalOpen: (open: boolean) => void;
  setLocationModalOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const defaultProducts = MOCK_PRODUCTS.slice(0, 5);
    return defaultProducts.map((p) => ({ product: p, quantity: 1 }));
  });
  const [wishlist, setWishlist] = useState<string[]>(["popular-1", "popular-2", "popular-3", "popular-4", "popular-5"]);
  const [location, setLocation] = useState("Chicago, IL");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Load cart and wishlist from localStorage on mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem("freshcart_cart");
    const savedWishlist = localStorage.getItem("freshcart_wishlist");
    const savedLocation = localStorage.getItem("freshcart_location");
    
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        Promise.resolve().then(() => setCart(parsed));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedWishlist) {
      try {
        const parsed = JSON.parse(savedWishlist);
        Promise.resolve().then(() => setWishlist(parsed));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedLocation) {
      Promise.resolve().then(() => setLocation(savedLocation));
    }
  }, []);

  // Save cart, wishlist, and location to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("freshcart_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("freshcart_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1) => {
    if (!product.inStock) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const changeLocation = (newLocation: string) => {
    setLocation(newLocation);
    localStorage.setItem("freshcart_location", newLocation);
  };

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        location,
        searchQuery,
        quickViewProduct,
        authModalOpen,
        locationModalOpen,
        cartOpen,
        wishlistOpen,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        changeLocation,
        openQuickView,
        closeQuickView,
        setAuthModalOpen,
        setLocationModalOpen,
        setCartOpen,
        setWishlistOpen,
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
