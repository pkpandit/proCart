"use client";

import React from "react";
import { HeroSlide } from "@/data/hero-slides";
import Image from "next/image";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

interface HeroSlidesTabProps {
  slides: HeroSlide[];
  onEdit: (slide: HeroSlide) => void;
  onDelete: (slide: HeroSlide) => void;
}

export function HeroSlidesTab({ slides, onEdit, onDelete }: HeroSlidesTabProps) {
  return (
    <div className="space-y-6">
      {slides.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground bg-card border border-dashed border-border rounded-2xl">
          No hero slides configured. Create one to populate the homepage carousel!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow relative group"
            >
              {/* Actions overlay */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={() => onEdit(slide)}
                  className="p-1.5 bg-card border border-border text-muted-foreground hover:text-foreground rounded-lg shadow-md transition-colors cursor-pointer"
                  title="Edit Slide"
                >
                  <IoPencilOutline className="size-4" />
                </button>
                <button
                  onClick={() => onDelete(slide)}
                  className="p-1.5 bg-card border border-destructive/20 text-destructive hover:bg-destructive/10 rounded-lg shadow-md transition-colors cursor-pointer"
                  title="Delete Slide"
                >
                  <IoTrashOutline className="size-4" />
                </button>
              </div>

              {/* Thumbnail / Image Preview */}
              <div className="relative w-full h-44 bg-muted overflow-hidden">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover size-full"
                />
                {slide.badge && (
                  <span className="absolute bottom-3 left-4 bg-amber-500 text-gray-900 font-extrabold text-[10px] px-2 py-1 rounded-md shadow-xs">
                    {slide.badge}
                  </span>
                )}
              </div>

              {/* Text Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-extrabold text-foreground text-sm font-heading leading-tight line-clamp-1">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {slide.subtitle}
                  </p>
                </div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Slide ID: #{slide.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
