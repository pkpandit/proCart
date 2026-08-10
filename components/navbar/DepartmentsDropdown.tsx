"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenuOutline, IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";

import { DEPARTMENTS } from "@/data/navigation";

export function DepartmentsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="departments-menu"
        id="departments-menu-button"
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-xs hover:bg-primary/95 transition-colors cursor-pointer"
      >
        <IoMenuOutline className="size-4" />
        <span>All Departments</span>
        <IoChevronDownOutline className="size-3.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="departments-menu"
            role="menu"
            aria-labelledby="departments-menu-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg p-2 z-50 text-xs font-semibold text-muted-foreground"
          >
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.title}
                href={dept.pageUrl}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="w-full text-left px-3 py-2 hover:bg-muted hover:text-foreground rounded-lg transition-colors cursor-pointer block"
              >
                {dept.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
