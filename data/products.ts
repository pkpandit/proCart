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
