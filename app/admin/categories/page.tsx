"use client";

import React, { useState, useMemo } from "react";
import { useData } from "@/contexts/DataContext";
import { CategoryItem } from "@/data/categories";
import { CategoryCard } from "@/components/admin/categories/CategoryCard";
import { CategoryFormModal } from "@/components/admin/categories/CategoryFormModal";
import { CategoryDeleteModal } from "@/components/admin/categories/CategoryDeleteModal";
import { IoAddOutline, IoSearchOutline } from "react-icons/io5";

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useData();

  // Search & Dialog status
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);

  // Filtering category list
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const handleOpenCreateForm = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const handleOpenEditForm = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setFormOpen(true);
  };

  const handleSaveCategory = (catData: CategoryItem) => {
    if (selectedCategory) {
      updateCategory(selectedCategory.name, catData);
    } else {
      addCategory(catData);
    }
    setFormOpen(false);
  };

  const handleConfirmDelete = (cat: CategoryItem) => {
    setSelectedCategory(cat);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory.name);
    }
    setDeleteOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground font-heading tracking-tight mb-2">
            Categories Directory
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            View, add, or customize category departments featured on your shop storefront.
          </p>
        </div>

        <button
          onClick={handleOpenCreateForm}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/95 shadow-sm transition-colors cursor-pointer w-max self-start sm:self-auto"
        >
          <IoAddOutline className="size-4.5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center p-4 bg-card border border-border rounded-2xl shadow-xs">
        <div className="relative max-w-sm w-full">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground bg-card border border-dashed border-border rounded-2xl">
          No categories found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              onEdit={handleOpenEditForm}
              onDelete={handleConfirmDelete}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Category Dialog */}
      <CategoryFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />

      {/* Delete confirmation Dialog */}
      <CategoryDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        category={selectedCategory}
        onConfirm={handleDelete}
      />
    </div>
  );
}
