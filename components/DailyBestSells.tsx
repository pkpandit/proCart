"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { useCart, MOCK_PRODUCTS } from "./CartContext";
import { Rating } from "./ui/Rating";
import Image from "next/image";

export function DailyBestSells() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  // Mock Countdown Timer ticking down
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // reset to 24h
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const bestSellers = MOCK_PRODUCTS.filter((prod) =>
    prod.id.startsWith("best-"),
  );

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="space-y-6 text-left">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-extrabold font-heading text-foreground tracking-tight">
          Daily Best Sells
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Banner Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 h-80 lg:h-full min-h-75 rounded-2xl overflow-hidden relative group border border-border/40 shadow-xs flex flex-col justify-end p-6 text-left"
        >
          <Image
            src="/images/banner/banner-deal.jpg"
            height={526}
            width={376}
            alt=""
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 space-y-3">
            <span className="bg-primary/20 border border-primary/20 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Mega Deal
            </span>
            <h3 className="text-xl font-extrabold font-heading text-white leading-tight">
              100% Organic Coffee Beans.
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-semibold">
              Get the best deal before close.
            </p>
            <button
              onClick={() => alert("Mega deal coffee added!")}
              className="px-4 py-1.5 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <span>Shop Now</span>
              <span>&rarr;</span>
            </button>
          </div>
        </motion.div>

        {/* Products Right Column */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bestSellers.map((product, idx) => {
            const getDaysLeft = (id: string) => {
              if (id === "best-1") return 785;
              if (id === "best-2") return 858;
              return 100;
            };

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-card border border-border rounded-xl p-4 flex flex-col hover:shadow-xl transition-all group overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square w-full mb-3 flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden relative">
                  <Image
                    width={220}
                    height={220}
                    src={product.images[0]}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-primary text-primary-foreground uppercase tracking-wider">
                      {product.badge.text}
                    </span>
                  )}
                </div>

                {/* Category & Title */}
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {product.category}
                </span>
                <h4 className="text-sm font-semibold font-heading text-foreground mb-1 hover:text-primary transition-colors cursor-pointer line-clamp-1">
                  {product.title}
                </h4>

                {/* Star Ratings */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Rating value={product.rating} size={12} />
                  <span className="text-xs text-muted-foreground font-semibold">
                    {product.rating}
                  </span>
                </div>

                {/* Price & Unit */}
                <div className="flex justify-between items-baseline mb-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {product.unit}
                  </span>
                </div>

                {/* Action button */}
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full mt-auto py-2 bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1 shadow-sm"
                >
                  <FaPlus className="size-3" />
                  <span>Add to Cart</span>
                </button>

                {/* Timer Box Grid */}
                <div className="flex gap-1.5 mt-4">
                  <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
                    <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
                      {getDaysLeft(product.id)}
                    </span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
                      Days
                    </span>
                  </div>
                  <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
                    <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
                      {pad(timeLeft.hours)}
                    </span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
                      Hours
                    </span>
                  </div>
                  <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
                    <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
                      {pad(timeLeft.minutes)}
                    </span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
                      Mins
                    </span>
                  </div>
                  <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
                    <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
                      {pad(timeLeft.seconds)}
                    </span>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
                      Secs
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
