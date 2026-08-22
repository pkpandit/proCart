"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { useData } from "@/contexts/DataContext";

export function HeroCarousel() {
  const { heroSlides } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    if (heroSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlide];

  if (!slide) return null;

  return (
    <div className="relative w-full h-80 md:h-112.5 overflow-hidden rounded-2xl border border-border/40 group shadow-xs">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Overlay text content */}
          <div className="lg:py-32 lg:pl-16 p-12 xl:w-2/5 md:w-3/5 text-left flex flex-col items-start gap-4">
            {slide.badge && (
              <span className="inline-block bg-yellow-500 text-gray-900 font-semibold rounded-lg text-xs px-2.5 py-1.5 align-baseline leading-none shadow-xs">
                {slide.badge}
              </span>
            )}
            <div className="my-3 flex flex-col gap-2">
              {slide.id === 2 ? (
                <h1 className="text-[#21313c] text-2xl lg:text-5xl font-bold leading-tight font-heading">
                  Free Shipping on orders over{" "}
                  <span className="text-primary font-bold">$100</span>
                </h1>
              ) : (
                <h1 className="text-[#21313c] text-2xl lg:text-5xl font-bold leading-tight font-heading">
                  {slide.title}
                </h1>
              )}
              <p className="text-xs md:text-sm font-medium text-gray-500 mt-2 max-w-lg leading-relaxed">
                {slide.subtitle}
              </p>
            </div>
            <button
              onClick={() => alert("Shop Now clicked!")}
              className="px-5 py-2.5 bg-[#212529] hover:bg-[#212529]/90 text-white font-bold text-xs md:text-sm rounded-lg shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Shop Now</span>
              <span>&rarr;</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-card hover:bg-muted text-foreground border border-border rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <IoChevronBackOutline size={18} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-card hover:bg-muted text-foreground border border-border rounded-full shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next slide"
      >
        <IoChevronForwardOutline size={18} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              currentSlide === idx
                ? "bg-[#0aad0a]"
                : "border border-[#0aad0a] bg-transparent hover:bg-[#0aad0a]/10"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
