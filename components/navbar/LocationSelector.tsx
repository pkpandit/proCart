"use client";

import React from "react";
import { IoLocationOutline, IoChevronDownOutline } from "react-icons/io5";
import { useCart } from "@/contexts/CartContext";

interface LocationSelectorProps {
  variant?: "desktop" | "mobile";
  onSelectCallback?: () => void;
}

export function LocationSelector({
  variant = "desktop",
  onSelectCallback,
}: LocationSelectorProps) {
  const { location, setLocationModalOpen } = useCart();

  const handleOpen = () => {
    setLocationModalOpen(true);
    if (onSelectCallback) {
      onSelectCallback();
    }
  };

  if (variant === "mobile") {
    return (
      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-between p-3 border border-border rounded-lg text-xs font-semibold text-muted-foreground hover:bg-muted/10 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <IoLocationOutline className="size-4 text-primary" />
          <span>
            Deliver to:{" "}
            <span className="text-foreground">{location || "Select Location"}</span>
          </span>
        </div>
        <IoChevronDownOutline className="size-3.5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleOpen}
      className="inline-flex items-center gap-x-2 bg-transparent text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-border/60 hover:text-foreground hover:bg-muted font-bold text-xs py-2 px-3.5 rounded-lg transition-all cursor-pointer"
    >
      <IoLocationOutline className="size-4" />
      <span>{location || "Location"}</span>
    </button>
  );
}
