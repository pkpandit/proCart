"use client";

import React, { useState, useMemo } from "react";
import { useData } from "@/contexts/DataContext";
import { Product } from "@/data/products";
import { ProductsFilter } from "@/components/admin/products/ProductsFilter";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { ProductFormModal } from "@/components/admin/products/ProductFormModal";
import { ProductDeleteModal } from "@/components/admin/products/ProductDeleteModal";
import { IoAddOutline } from "react-icons/io5";

export default function AdminProducts() {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useData();

  // Search & Filter state
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");

  // Modal / Form state
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filters logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchSearch =
        prod.title.toLowerCase().includes(search.toLowerCase()) ||
        prod.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory = categoryFilter === "All" || prod.category === categoryFilter;

      let matchStock = true;
      if (stockFilter === "In Stock") {
        matchStock = prod.inStock;
      } else if (stockFilter === "Out of Stock") {
        matchStock = !prod.inStock || prod.stockLeft === 0;
      } else if (stockFilter === "Low Stock") {
        matchStock = prod.stockLeft !== undefined && prod.stockLeft > 0 && prod.stockLeft < 15;
      }

      return matchSearch && matchCategory && matchStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  const handleOpenCreateForm = () => {
    setSelectedProduct(null);
    setFormOpen(true);
  };

  const handleOpenEditForm = (prod: Product) => {
    setSelectedProduct(prod);
    setFormOpen(true);
  };

  const handleSaveProduct = (prodData: any) => {
    const fullData = {
      ...prodData,
      rating: selectedProduct ? selectedProduct.rating : 4.5,
      reviewsCount: selectedProduct ? selectedProduct.reviewsCount : 12,
    };

    if (selectedProduct) {
      updateProduct(selectedProduct.id, fullData);
    } else {
      addProduct(fullData);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = (prod: Product) => {
    setSelectedProduct(prod);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
    }
    setDeleteOpen(false);
  };

  const handleToggleStock = (id: string, currentStatus: boolean) => {
    updateProduct(id, { inStock: !currentStatus });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground font-heading tracking-tight mb-2">
            Products Directory
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Manage your FreshCart product list, update prices, and stock availability.
          </p>
        </div>

        <button
          onClick={handleOpenCreateForm}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/95 shadow-sm transition-colors cursor-pointer w-max self-start sm:self-auto"
        >
          <IoAddOutline className="size-4.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <ProductsFilter
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        categories={categories}
      />

      {/* Products Table */}
      <ProductsTable
        products={filteredProducts}
        onEdit={handleOpenEditForm}
        onDelete={handleConfirmDelete}
        onToggleStock={handleToggleStock}
      />

      {/* Add / Edit Form Modal */}
      <ProductFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        product={selectedProduct}
        categories={categories}
        onSave={handleSaveProduct}
      />

      {/* Delete confirmation Dialog */}
      <ProductDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        product={selectedProduct}
        onConfirm={handleDelete}
      />
    </div>
  );
}
