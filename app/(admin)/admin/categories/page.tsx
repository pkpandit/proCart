"use client";

import React, { useState } from "react";
import { Layers, Plus, Edit2, Trash2, Search, X, Sparkles, Image as ImageIcon } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { useAdminToast } from "@/components/admin/AdminToast";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { CategoryItem } from "@/data/categories";

const PRESET_CATEGORY_IMAGES = [
  "/images/category/category-dairy-bread-eggs.jpg",
  "/images/category/category-snack-munchies.jpg",
  "/images/category/category-bakery-biscuits.jpg",
  "/images/category/category-instant-food.jpg",
  "/images/category/category-tea-coffee-drinks.jpg",
  "/images/category/category-atta-rice-dal.jpg",
  "/images/category/category-baby-care.jpg",
  "/images/category/category-chicken-meat-fish.jpg",
  "/images/category/category-cleaning-essentials.jpg",
  "/images/category/category-fruits-vegetables.jpg",
  "/images/category/category-cold-drinks-juices.jpg",
];

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const { showToast } = useAdminToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [currentCategory, setCurrentCategory] = useState<CategoryItem | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [image, setImage] = useState(PRESET_CATEGORY_IMAGES[0]);
  const [itemCount, setItemCount] = useState("12 items");

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setCurrentCategory(null);
    setModalMode("create");
    setName("");
    setImage(PRESET_CATEGORY_IMAGES[0]);
    setItemCount("10 items");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setCurrentCategory(cat);
    setModalMode("edit");
    setName(cat.name);
    setImage(cat.image);
    setItemCount(cat.itemCount);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (modalMode === "create") {
      addCategory({
        name: name.trim(),
        image,
        itemCount: itemCount.trim() || "0 items",
      });
      showToast({
        type: "success",
        title: "Category Created",
        description: `"${name}" department has been added.`,
      });
    } else if (currentCategory) {
      updateCategory(currentCategory.name, {
        name: name.trim(),
        image,
        itemCount: itemCount.trim() || currentCategory.itemCount,
      });
      showToast({
        type: "success",
        title: "Category Updated",
        description: `"${name}" details have been updated.`,
      });
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;
    deleteCategory(categoryToDelete.name);
    showToast({
      type: "info",
      title: "Category Removed",
      description: `"${categoryToDelete.name}" department was deleted.`,
    });
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Category Management
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organize departments, category banner images, and catalog classifications.
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-xs shadow-primary/20 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">
          {filteredCategories.length} active departments
        </span>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredCategories.map((cat) => (
          <div
            key={cat.name}
            className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="size-16 rounded-xl border border-border/70 overflow-hidden bg-muted/20 shrink-0 p-1 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="size-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/category/category-dairy-bread-eggs.jpg";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-muted text-[11px] font-medium text-muted-foreground">
                  {cat.itemCount}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(cat)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Edit Category"
              >
                <Edit2 className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoryToDelete(cat);
                  setIsDeleteDialogOpen(true);
                }}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Delete Category"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-base font-bold text-foreground">
                {modalMode === "create" ? "Add Category" : "Edit Category"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground rounded-lg p-1 hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Organic Produce"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Item Count Label
                </label>
                <input
                  type="text"
                  value={itemCount}
                  onChange={(e) => setItemCount(e.target.value)}
                  placeholder="e.g. 24 items"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Category Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="size-14 rounded-xl border border-border overflow-hidden shrink-0 bg-muted/20 p-1 flex items-center justify-center">
                    <img src={image} alt="Preview" className="size-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="/images/category/..."
                      className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-1">
                      {PRESET_CATEGORY_IMAGES.slice(0, 6).map((img) => (
                        <button
                          key={img}
                          type="button"
                          onClick={() => setImage(img)}
                          className={`size-6 rounded-md border overflow-hidden transition-all ${
                            image === img ? "ring-2 ring-primary border-primary" : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="Thumb" className="size-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="size-3.5" />
                  <span>{modalMode === "create" ? "Add Category" : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete Category"
        itemName={categoryToDelete?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
          setCategoryToDelete(null);
        }}
      />
    </div>
  );
}
