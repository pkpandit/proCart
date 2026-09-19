"use client";

import React, { useState } from "react";
import {
  Package,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { ProductTable } from "@/components/admin/ProductTable";
import { ProductModal } from "@/components/admin/ProductModal";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { useAdminToast } from "@/components/admin/AdminToast";
import { Product } from "@/components/admin/types";

export default function AdminProductsPage() {
  const {
    products,
    currentPage,
    totalPages,
    productStats,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useData();
  const { showToast } = useAdminToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Handlers
  const handleOpenAddModal = () => {
    setCurrentProduct(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setCurrentProduct(product);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, "id"> | Product) => {
    if (modalMode === "create") {
      addProduct(productData as Omit<Product, "id">);
      showToast({
        type: "success",
        title: "Product Created",
        description: `"${productData.title}" has been successfully added to the catalog.`,
      });
    } else if (currentProduct) {
      updateProduct(currentProduct.id, productData);
      showToast({
        type: "success",
        title: "Product Updated",
        description: `"${productData.title}" details have been updated.`,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id);
    showToast({
      type: "info",
      title: "Product Deleted",
      description: `"${productToDelete.title}" has been removed from inventory.`,
    });
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Metric Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Product Catalog Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your grocery items, prices, stock statuses, and marketing
            badges.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs shadow-primary/20 shrink-0 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
            <Package className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">
              Total Catalog
            </span>
            <span className="text-lg font-bold text-foreground">
              {productStats.total} Items
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">
              In Stock
            </span>
            <span className="text-lg font-bold text-foreground">
              {productStats.inStock} Items
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 shrink-0">
            <AlertTriangle className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">
              Low Stock (&lt;20)
            </span>
            <span className="text-lg font-bold text-foreground">
              {productStats.lowStock} Items
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 shrink-0">
            <XCircle className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">
              Out of Stock
            </span>
            <span className="text-lg font-bold text-foreground">
              {productStats.outOfStock} Items
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Products Table */}
      <ProductTable
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page, category, search, stockStatus, sortBy) =>
          loadProducts(page, category, search, stockStatus, sortBy)
        }
        onFilterChange={(category, search, stockStatus, sortBy) =>
          loadProducts(1, category, search, stockStatus, sortBy)
        }
        onAddProduct={handleOpenAddModal}
        onEditProduct={handleOpenEditModal}
        onDeleteProduct={handleOpenDeleteDialog}
      />

      {/* Product Add/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialProduct={currentProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Product"
        itemName={productToDelete?.title || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}
