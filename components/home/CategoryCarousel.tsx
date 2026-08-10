"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CATEGORIES } from "@/data/categories";

export function CategoryCarousel() {
  return (
    <div className="space-y-6 text-left">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold font-heading text-foreground tracking-tight">
            Featured Categories
          </h2>
          <div className="flex items-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>

        <CarouselContent className="-ml-4">
          {CATEGORIES.map((cat, idx) => (
            <CarouselItem
              key={cat.name}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="w-full bg-card border border-border rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:shadow-[0_5px_12px_rgba(0,0,0,0.12)] hover:border-primary transition-all duration-200 cursor-pointer group"
                onClick={() => alert(`Selected Category: ${cat.name}`)}
              >
                {/* Image Container (Rectangular/Square) */}
                <div className="w-full aspect-square max-h-32 mb-4 flex items-center justify-center p-2 rounded-lg overflow-hidden">
                  <Image
                    height={120}
                    width={120}
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xs md:text-sm font-extrabold text-foreground line-clamp-1 mb-1 leading-tight font-heading">
                  {cat.name}
                </h3>

                {/* Counts */}
                <span className="text-[10px] md:text-xs text-muted-foreground font-semibold">
                  {cat.itemCount}
                </span>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

