"use client";

import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "../navbar/SearchInput";
import { LocationSelector } from "../navbar/LocationSelector";
import { NavbarActions } from "../navbar/NavbarActions";
import { DepartmentsDropdown } from "../navbar/DepartmentsDropdown";
import { MobileMenu } from "../navbar/MobileMenu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-card sticky top-0 z-40 shadow-xs">
      {/* Top Banner */}
      <div className="bg-muted/50 border-b border-border/30 text-xs py-2 px-4 text-muted-foreground font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <span>Super Value Deals - Save more with coupons</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-muted-foreground">
            <button className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1.5">
              <span>
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path d="M0 0.5H16V12.5H0V0.5Z" fill="#012169" />
                    <path
                      d="M1.875 0.5L7.975 5.025L14.05 0.5H16V2.05L10 6.525L16 10.975V12.5H14L8 8.025L2.025 12.5H0V11L5.975 6.55L0 2.1V0.5H1.875Z"
                      fill="white"
                    />
                    <path
                      d="M10.6 7.525L16 11.5V12.5L9.225 7.525H10.6ZM6 8.025L6.15 8.9L1.35 12.5H0L6 8.025ZM16 0.5V0.575L9.775 5.275L9.825 4.175L14.75 0.5H16ZM0 0.5L5.975 4.9H4.475L0 1.55V0.5Z"
                      fill="#C8102E"
                    />
                    <path
                      d="M6.025 0.5V12.5H10.025V0.5H6.025ZM0 4.5V8.5H16V4.5H0Z"
                      fill="white"
                    />
                    <path
                      d="M0 5.325V7.725H16V5.325H0ZM6.825 0.5V12.5H9.225V0.5H6.825Z"
                      fill="#C8102E"
                    />
                  </g>
                </svg>
              </span>
              <span>English</span>
            </button>
            <span className="text-border">|</span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Help Center
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="outline-hidden group">
            <Image
              height={31}
              width={160}
              src="/images/logo/freshcart-logo.svg"
              alt="FreshCart"
              className="h-7 w-auto group-hover:scale-102 transition-transform"
            />
          </Link>
        </div>

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
            <nav className="flex items-center gap-6 text-xs font-bold text-muted-foreground">
              {["Home", "Shop", "Stores", "Dashboard"].map((link) => (
                <Link
                  key={link}
                  href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </div>

          {/* Promo offer */}
          <div className="hidden lg:block text-xs font-bold text-primary">
            🎉 Get 20% off on your first order! Use code:{" "}
            <span className="underline uppercase">FRESH20</span>
          </div>
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
