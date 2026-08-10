"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { LocationSelector } from "./LocationSelector";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border px-4 py-4 space-y-4 bg-card overflow-hidden"
        >
          {/* Search (Mobile) */}
          <SearchInput variant="mobile" />

          {/* Mobile Location Selector */}
          <LocationSelector variant="mobile" onSelectCallback={onClose} />

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-3 text-sm font-bold text-muted-foreground">
            {["Home", "Shop", "Stores", "Pages", "Account", "Dashboard"].map(
              (link) => (
                <Link
                  key={link}
                  href="#"
                  onClick={onClose}
                  className="hover:text-primary transition-colors py-1.5 border-b border-border/30 block"
                >
                  {link}
                </Link>
              )
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
