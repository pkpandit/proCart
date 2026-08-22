"use client";

import React from "react";
import { CategoryItem } from "@/data/categories";
import { Dialog } from "@/components/ui/Dialog";

interface CategoryDeleteModalProps {
  open: boolean;
  onClose: () => void;
  category: CategoryItem | null;
  onConfirm: () => void;
}

export function CategoryDeleteModal({
  open,
  onClose,
  category,
  onConfirm,
}: CategoryDeleteModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Confirm Category Deletion"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-left">
        <p className="text-sm text-foreground">
          Are you sure you want to permanently delete category{" "}
          <span className="font-bold text-foreground">"{category?.name}"</span>?
        </p>
        <p className="text-xs text-muted-foreground font-medium">
          This action cannot be undone. Stores, banners, or lists dependent on this category may display empty layouts.
        </p>
        <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-destructive text-destructive-foreground font-bold text-xs rounded-xl hover:bg-destructive/90 transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
}
