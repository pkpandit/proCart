"use client";

import React, { useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useCart } from "@/components/cart/CartContext";

interface SearchInputProps {
  variant?: "desktop" | "mobile";
}

export function SearchInput({ variant = "desktop" }: SearchInputProps) {
  const { searchQuery, setSearchQuery } = useCart();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is reactive and already filters the grid dynamically.
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (variant === "mobile") {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
        <input
          ref={inputRef}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full pl-10 pr-4 py-2 border border-border bg-muted/20 text-sm text-foreground rounded-lg focus:outline-hidden placeholder:text-muted-foreground/60"
        />
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        ref={inputRef}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for products"
        aria-label="Search for products"
        className="w-full border border-gray-300 dark:border-border/60 text-gray-900 dark:text-foreground rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:border-primary block p-2 px-3 outline-hidden text-base bg-card placeholder:text-muted-foreground/50 transition-all duration-200"
      />
      <button
        onClick={handleIconClick}
        className="absolute right-0 top-0 p-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        type="button"
        aria-label="Focus search input"
      >
        <IoSearchOutline className="size-4 stroke-[2.5px]" />
      </button>
    </form>
  );
}
