"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenuOutline, IoChevronDownOutline } from "react-icons/io5";
import Link from "next/link";

const DEPARTMENTS = [
  { title: "Dairy, Bread & Eggs", pageUrl: "/dairy_bread_eggs" },
  { title: "Snacks & Munchies", pageUrl: "/snacks_munchies" },
  { title: "Fruits & Vegetables", pageUrl: "/fruits_vegetables" },
  { title: "Cold Drinks & Juices", pageUrl: "/cold_drinks_juices" },
  { title: "Breakfast & Instant Food", pageUrl: "/breakfast_instant_food" },
  { title: "Bakery & Biscuits", pageUrl: "/bakery_biscuits" },
  { title: "Chicken, Meat & Fish", pageUrl: "/chicken_meat_fish" },
];

export function DepartmentsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-xs hover:bg-primary/95 transition-colors cursor-pointer"
      >
        <IoMenuOutline className="size-4" />
        <span>All Departments</span>
        <IoChevronDownOutline className="size-3.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg p-2 z-50 text-xs font-semibold text-muted-foreground"
          >
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.title}
                href={dept.pageUrl}
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
