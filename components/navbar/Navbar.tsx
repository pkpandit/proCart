"use client";

import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { TopBanner } from "./TopBanner";
import { Logo } from "./Logo";
import { SearchInput } from "./SearchInput";
import { LocationSelector } from "./LocationSelector";
import { NavbarActions } from "./NavbarActions";
import { DepartmentsDropdown } from "./DepartmentsDropdown";
import { DesktopNav } from "./DesktopNav";
import { PromoOffer } from "./PromoOffer";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-card sticky top-0 z-40 shadow-xs">
      {/* Top Banner */}
      <TopBanner />

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo />

        {/* Search Input (Desktop) */}
        <div className="hidden lg:block lg:w-2/5">
          <SearchInput variant="desktop" />
        </div>

        {/* Deliver to Location Selector */}
        <div className="hidden lg:block lg:w-1/5 text-center">
          <LocationSelector variant="desktop" />
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Toggle or Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <IoMenuOutline className="size-6" />
          </button>

          {/* Wishlist, Profile, and Cart triggers */}
          <NavbarActions />
        </div>
      </div>

      {/* Departments & Navigation Links */}
      <div className="hidden md:block border-t border-border/80 bg-card py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Departments Dropdown */}
            <DepartmentsDropdown />

            {/* Nav Links */}
            <DesktopNav />
          </div>

          {/* Promo offer */}
          <PromoOffer />
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
