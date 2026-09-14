"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Product, MOCK_PRODUCTS } from "@/data/products";
import { CategoryItem, CATEGORIES } from "@/data/categories";
import { BannerItem, BANNERS } from "@/data/banners";
import { HeroSlide, SLIDES } from "@/data/hero-slides";

interface DataContextType {
  products: Product[];
  currentPage: number;
  totalPages: number;
  loadProducts: (
    page: number,
    category?: string,
    search?: string,
  ) => Promise<void>;
  categories: CategoryItem[];
  banners: BannerItem[];
  heroSlides: HeroSlide[];
  isLoaded: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: CategoryItem) => void;
  updateCategory: (name: string, category: Partial<CategoryItem>) => void;
  deleteCategory: (name: string) => void;
  addHeroSlide: (slide: Omit<HeroSlide, "id">) => void;
  updateHeroSlide: (id: number, slide: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: number) => void;
  addBanner: (banner: Omit<BannerItem, "id">) => void;
  updateBanner: (id: number, banner: Partial<BannerItem>) => void;
  deleteBanner: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load application data on mount
  const loadProducts = useCallback(
    async (page: number, category?: string, search?: string) => {
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "10",
        });

        if (category && category !== "All") {
          params.set("category", category);
        }

        if (search?.trim()) {
          params.set("search", search.trim());
        }

        const response = await fetch(`/api/products?${params.toString()}`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
        setCurrentPage(data.pagination.page);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
        setCurrentPage(1);
        setTotalPages(1);
      }
    },
    [],
  );
  useEffect(() => {
    const loadData = async () => {
      try {
        await loadProducts(1);
        // -----------------------------
        // Categories → localStorage
        // -----------------------------
        const storedCategories = localStorage.getItem("fc_categories");

        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        } else {
          setCategories(CATEGORIES);
          localStorage.setItem("fc_categories", JSON.stringify(CATEGORIES));
        }

        // -----------------------------
        // Banners → localStorage
        // -----------------------------
        const storedBanners = localStorage.getItem("fc_banners");

        if (storedBanners) {
          setBanners(JSON.parse(storedBanners));
        } else {
          setBanners(BANNERS);
          localStorage.setItem("fc_banners", JSON.stringify(BANNERS));
        }

        // -----------------------------
        // Hero slides → localStorage
        // -----------------------------
        const storedSlides = localStorage.getItem("fc_slides");

        if (storedSlides) {
          setHeroSlides(JSON.parse(storedSlides));
        } else {
          setHeroSlides(SLIDES);
          localStorage.setItem("fc_slides", JSON.stringify(SLIDES));
        }
      } catch (error) {
        console.error("Error loading data:", error);

        // Product fallback
        setProducts(MOCK_PRODUCTS);

        // Existing fallbacks
        setCategories(CATEGORIES);
        setBanners(BANNERS);
        setHeroSlides(SLIDES);
      } finally {
        setIsLoaded(true);
      }
    };

    loadData();
  }, [loadProducts]);
  // Helper to update localStorage on change
  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save to storage:", e);
      }
    }
  };

  // Products CRUD
  const addProduct = async (newProd: Omit<Product, "id">) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProd),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const createdProduct: Product = await response.json();

      setProducts((prev) => [createdProduct, ...prev]);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct: Product = await response.json();

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product)),
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  // Categories CRUD
  const addCategory = (cat: CategoryItem) => {
    setCategories((prev) => {
      // Avoid duplicate names
      if (prev.some((c) => c.name.toLowerCase() === cat.name.toLowerCase())) {
        return prev;
      }
      const updated = [...prev, cat];
      saveToStorage("fc_categories", updated);
      return updated;
    });
  };

  const updateCategory = (
    name: string,
    updatedFields: Partial<CategoryItem>,
  ) => {
    setCategories((prev) => {
      const updated = prev.map((c) =>
        c.name === name ? { ...c, ...updatedFields } : c,
      );
      saveToStorage("fc_categories", updated);
      return updated;
    });
  };

  const deleteCategory = (name: string) => {
    setCategories((prev) => {
      const updated = prev.filter((c) => c.name !== name);
      saveToStorage("fc_categories", updated);
      return updated;
    });
  };

  // Hero Slides CRUD
  const addHeroSlide = (slide: Omit<HeroSlide, "id">) => {
    setHeroSlides((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((s) => s.id)) + 1 : 1;
      const slideWithId: HeroSlide = { ...slide, id: nextId };
      const updated = [...prev, slideWithId];
      saveToStorage("fc_slides", updated);
      return updated;
    });
  };

  const updateHeroSlide = (id: number, updatedFields: Partial<HeroSlide>) => {
    setHeroSlides((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, ...updatedFields } : s,
      );
      saveToStorage("fc_slides", updated);
      return updated;
    });
  };

  const deleteHeroSlide = (id: number) => {
    setHeroSlides((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveToStorage("fc_slides", updated);
      return updated;
    });
  };

  // Banners CRUD
  const addBanner = (banner: Omit<BannerItem, "id">) => {
    setBanners((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 1;
      const bannerWithId: BannerItem = { ...banner, id: nextId };
      const updated = [...prev, bannerWithId];
      saveToStorage("fc_banners", updated);
      return updated;
    });
  };

  const updateBanner = (id: number, updatedFields: Partial<BannerItem>) => {
    setBanners((prev) => {
      const updated = prev.map((b) =>
        b.id === id ? { ...b, ...updatedFields } : b,
      );
      saveToStorage("fc_banners", updated);
      return updated;
    });
  };

  const deleteBanner = (id: number) => {
    setBanners((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      saveToStorage("fc_banners", updated);
      return updated;
    });
  };

  return (
    <DataContext.Provider
      value={{
        products,
        categories,
        banners,
        heroSlides,
        isLoaded,
        currentPage,
        totalPages,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        addBanner,
        updateBanner,
        deleteBanner,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
