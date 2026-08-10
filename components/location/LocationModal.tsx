"use client";

import React, { useState } from "react";
import { IoSearchOutline, IoCheckmark } from "react-icons/io5";
import { useCart } from "@/components/cart/CartContext";
import { Dialog } from "@/components/ui/Dialog";

const CITIES = [
  "Chicago, IL",
  "New York, NY",
  "Los Angeles, CA",
  "Seattle, WA",
  "Miami, FL",
  "San Francisco, CA",
  "Austin, TX",
  "Boston, MA",
  "Denver, CO"
];

export function LocationModal() {
  const { location, locationModalOpen, setLocationModalOpen, changeLocation } = useCart();
  const [filter, setFilter] = useState("");

  const filteredCities = CITIES.filter((city) =>
    city.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Dialog
      open={locationModalOpen}
      onClose={() => setLocationModalOpen(false)}
      title="Choose your Delivery Location"
      maxWidth="max-w-md"
    >
      <div className="py-2 flex flex-col gap-4">
        <p className="text-xs text-muted-foreground">
          Select your city to see product availability and delivery speeds for your specific area.
        </p>

        {/* Search input */}
        <div className="relative">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search your city..."
            className="w-full pl-9 pr-4 py-2 border border-border bg-card rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary/80 focus:ring-3 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* City List */}
        <div className="max-h-60 overflow-y-auto space-y-1 pr-1 border border-border/50 rounded-lg divide-y divide-border/30">
          {filteredCities.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground font-medium">
              No cities found for &quot;{filter}&quot;
            </div>
          ) : (
            filteredCities.map((city) => {
              const isSelected = city === location;
              return (
                <button
                  key={city}
                  onClick={() => {
                    changeLocation(city);
                    setLocationModalOpen(false);
                    setFilter("");
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm text-left font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "text-primary bg-primary/5 hover:bg-primary/10"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span>{city}</span>
                  {isSelected && <IoCheckmark className="size-4 text-primary" />}
                </button>
              );
            })
          )}
        </div>
      </div>
    </Dialog>
  );
}
