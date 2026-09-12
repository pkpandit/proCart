"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  title: string;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  title,
  itemName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div className="p-3 bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 rounded-xl">
            <AlertTriangle className="size-6" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground rounded-lg p-1 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Are you sure you want to delete <span className="font-semibold text-foreground">"{itemName}"</span>? This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow-xs disabled:opacity-50 flex items-center gap-1.5"
          >
            {isDeleting ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </div>
    </div>
  );
}
