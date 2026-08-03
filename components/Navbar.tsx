"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoBagOutline,
  IoMenuOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import { useCart } from "./CartContext";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const {
    location,
    cartCount,
    wishlist,
    searchQuery,
    setSearchQuery,
    setAuthModalOpen,
    setLocationModalOpen,
    setCartOpen,
    setWishlistOpen,
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDept, setActiveDept] = useState(false);

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
          <Link href="#" className="outline-hidden group">
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
        <div className="hidden lg:block lg:w-2/5 relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products"
            className="w-full border border-gray-300 dark:border-border/60 text-gray-900 dark:text-foreground rounded-lg focus:shadow-[0_0_0_.25rem_rgba(10,173,10,.25)] focus:border-primary block p-2 px-3 outline-hidden text-base bg-card placeholder:text-muted-foreground/50 transition-all duration-200"
          />
          <button
            onClick={() => alert(`Searching for: ${searchQuery}`)}
            className="absolute right-0 top-0 p-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            type="button"
          >
            <IoSearchOutline className="size-4 stroke-[2.5px]" />
          </button>
        </div>

        {/* Deliver to Location Selector */}
        <div className="hidden lg:block lg:w-1/5 text-center">
          <button
            onClick={() => setLocationModalOpen(true)}
            className="inline-flex items-center gap-x-2 bg-transparent text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-border/60 hover:text-foreground hover:bg-muted font-bold text-xs py-2 px-3.5 rounded-lg transition-all cursor-pointer"
          >
            <IoLocationOutline className="size-4" />
            <span>{location || "Location"}</span>
          </button>
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

          {/* Wishlist Icon */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
            title="Wishlist"
          >
            <IoHeartOutline className="size-6" />
            <span className="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-3 bg-primary text-white text-center font-bold text-[10px] flex items-center justify-center leading-none">
              {wishlist.length}
            </span>
          </button>

          {/* Profile Icon */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
            title="Account"
          >
            <IoPersonOutline className="size-6" />
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors cursor-pointer"
            title="Shopping Cart"
          >
            <IoBagOutline className="size-6" />
            <span className="absolute top-0 -mt-1 left-full rounded-full h-5 w-5 -ml-3 bg-primary text-white text-center font-bold text-[10px] flex items-center justify-center leading-none">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Departments & Navigation Links */}
      <div className="hidden md:block border-t border-border/80 bg-card py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Departments Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDept(!activeDept)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-lg shadow-xs hover:bg-primary/95 transition-colors cursor-pointer"
              >
                <IoMenuOutline className="size-4" />
                <span>All Departments</span>
                <IoChevronDownOutline className="size-3.5" />
              </button>

              <AnimatePresence>
                {activeDept && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg p-2 z-50 text-xs font-semibold text-muted-foreground"
                  >
                    {[
                      "Dairy, Bread & Eggs",
                      "Snacks & Munchies",
                      "Fruits & Vegetables",
                      "Cold Drinks & Juices",
                      "Breakfast & Instant Food",
                      "Bakery & Biscuits",
                      "Chicken, Meat & Fish",
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          alert(`Navigating to category: ${item}`);
                          setActiveDept(false);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-muted hover:text-foreground rounded-lg transition-colors cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav Links */}
            <nav className="flex items-center gap-6 text-xs font-bold text-muted-foreground">
              {[
                "Home",
                "Shop",
                "Stores",
                "Mega menu",
                "Pages",
                "Account",
                "Dashboard",
              ].map((link) => (
                <Link
                  key={link}
                  href="#"
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border px-4 py-4 space-y-4 bg-card"
          >
            {/* Search (Mobile) */}
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-border bg-muted/20 text-sm text-foreground rounded-lg focus:outline-hidden placeholder:text-muted-foreground/60"
              />
            </div>

            {/* Mobile Location Selector */}
            <button
              onClick={() => {
                setLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 border border-border rounded-lg text-xs font-semibold text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <IoLocationOutline className="size-4 text-primary" />
                <span>
                  Deliver to:{" "}
                  <span className="text-foreground">{location}</span>
                </span>
              </div>
              <IoChevronDownOutline className="size-3.5" />
            </button>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-3 text-sm font-bold text-muted-foreground">
              {["Home", "Shop", "Stores", "Pages", "Account", "Dashboard"].map(
                (link) => (
                  <Link
                    key={link}
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors py-1.5 border-b border-border/30"
                  >
                    {link}
                  </Link>
                ),
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
