"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  IoListOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoChevronDownOutline,
  IoHardwareChipOutline,
  IoStorefrontOutline,
} from "react-icons/io5";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

export function Header({
  isSidebarOpen,
  setIsSidebarOpen,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleSignOut = () => {
    alert("Signing out... Redirecting to storefront.");
    window.location.href = "/";
  };

  return (
    <header className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shrink-0 relative z-40">
      {/* Toggle button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <IoListOutline className="size-5 rotate-90" />
      </button>

      {/* User Actions Section */}
      <div className="flex items-center gap-4">
        {/* Profile Card & Dropdown Toggle */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-muted/60 transition-colors text-left cursor-pointer"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
          >
            <IoPersonCircleOutline className="size-8 text-muted-foreground shrink-0" />
            <div className="hidden sm:block select-none">
              <div className="text-xs font-extrabold text-foreground leading-tight">Admin User</div>
              <div className="text-[10px] text-muted-foreground font-semibold">Super Admin</div>
            </div>
            <IoChevronDownOutline
              className={`size-3.5 text-muted-foreground transition-transform duration-200 hidden sm:block ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Premium User Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-2xl p-2 animate-in fade-in-50 slide-in-from-top-1 duration-200">
              {/* Profile card summary */}
              <div className="p-3 flex items-center gap-3 border-b border-border/60">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 font-extrabold text-sm">
                  AD
                </div>
                <div className="text-left">
                  <div className="text-sm font-extrabold text-foreground leading-tight">Admin User</div>
                  <div className="text-xs text-muted-foreground leading-snug">admin@freshcart.com</div>
                  <span className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 bg-primary/10 text-primary rounded-md">
                    Super Admin
                  </span>
                </div>
              </div>

              {/* Action Menu links */}
              <div className="py-1.5 space-y-0.5">
                {/* Profile */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Opening profile details settings...");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                >
                  <IoPersonOutline className="size-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                  <div className="text-xs font-bold leading-normal">
                    <div>My Profile</div>
                    <div className="text-[10px] text-muted-foreground font-normal">View personal settings</div>
                  </div>
                </button>

                {/* Account Settings */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Opening console configurations...");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                >
                  <IoSettingsOutline className="size-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                  <div className="text-xs font-bold leading-normal">
                    <div>Console Settings</div>
                    <div className="text-[10px] text-muted-foreground font-normal">Security & permissions</div>
                  </div>
                </button>

                {/* Store configuration settings */}
                <Link
                  href="/"
                  onClick={() => setDropdownOpen(false)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                >
                  <IoStorefrontOutline className="size-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                  <div className="text-xs font-bold leading-normal">
                    <div>Store Setup</div>
                    <div className="text-[10px] text-muted-foreground font-normal">Hours, location details</div>
                  </div>
                </Link>

                {/* Backend System Logs */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    alert("Opening console server logs...");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                >
                  <IoHardwareChipOutline className="size-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                  <div className="text-xs font-bold leading-normal">
                    <div>System Logs</div>
                    <div className="text-[10px] text-muted-foreground font-normal">Check server diagnostics</div>
                  </div>
                </button>
              </div>

              {/* Sign out section */}
              <div className="border-t border-border/60 pt-1.5 mt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-destructive hover:bg-destructive/10 transition-colors cursor-pointer font-bold text-xs"
                >
                  <IoLogOutOutline className="size-4.5 shrink-0" />
                  <span>Sign Out Console</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
