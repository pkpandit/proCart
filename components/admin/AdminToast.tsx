"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { ToastMessage } from "./types";

interface AdminToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
}

const AdminToastContext = createContext<AdminToastContextType | undefined>(undefined);

export function AdminToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastMessage, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: ToastMessage = { ...toast, id };

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <AdminToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const icons = {
            success: <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />,
            error: <AlertCircle className="size-5 text-rose-600 shrink-0 mt-0.5" />,
            warning: <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />,
            info: <Info className="size-5 text-blue-600 shrink-0 mt-0.5" />,
          };

          const borderColors = {
            success: "border-emerald-200 bg-emerald-50/90 text-emerald-950 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-100",
            error: "border-rose-200 bg-rose-50/90 text-rose-950 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-100",
            warning: "border-amber-200 bg-amber-50/90 text-amber-950 dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-100",
            info: "border-blue-200 bg-blue-50/90 text-blue-950 dark:bg-blue-950/80 dark:border-blue-800 dark:text-blue-100",
          };

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${borderColors[toast.type]}`}
            >
              {icons[toast.type]}
              <div className="flex-1 text-sm">
                <p className="font-semibold leading-tight">{toast.title}</p>
                {toast.description && <p className="text-xs opacity-90 mt-0.5">{toast.description}</p>}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-muted-foreground hover:text-foreground rounded p-1 transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </AdminToastContext.Provider>
  );
}

export function useAdminToast() {
  const context = useContext(AdminToastContext);
  if (!context) {
    throw new Error("useAdminToast must be used within AdminToastProvider");
  }
  return context;
}
