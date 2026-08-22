"use client";

import React, { useState, useEffect } from "react";
import { HeroSlide } from "@/data/hero-slides";
import { Dialog } from "@/components/ui/Dialog";
import Image from "next/image";

interface HeroSlideModalProps {
  open: boolean;
  onClose: () => void;
  slide: HeroSlide | null;
  onSave: (data: any) => void;
}

const PRESET_SLIDE_IMAGES = [
  { label: "Slider Green (Fresh Vegs)", value: "/images/slider/slide-1.jpg" },
  { label: "Slider Yellow (Fresh Breads)", value: "/images/slider/slider-2.jpg" },
];

export function HeroSlideModal({ open, onClose, slide, onSave }: HeroSlideModalProps) {
  const [slideBadge, setSlideBadge] = useState("");
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideImageUrl, setSlideImageUrl] = useState("/images/slider/slide-1.jpg");

  useEffect(() => {
    if (slide) {
      setSlideBadge(slide.badge || "");
      setSlideTitle(slide.title);
      setSlideSubtitle(slide.subtitle);
      setSlideImageUrl(slide.image);
    } else {
      setSlideBadge("New Offer!");
      setSlideTitle("");
      setSlideSubtitle("");
      setSlideImageUrl(PRESET_SLIDE_IMAGES[0]?.value || "");
    }
  }, [slide, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      badge: slideBadge,
      title: slideTitle,
      subtitle: slideSubtitle,
      image: slideImageUrl,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={slide ? "Edit Slide Campaign" : "Add New Slide Campaign"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Campaign Badge</label>
          <input
            type="text"
            placeholder="e.g. Opening Sale Discount 50%"
            value={slideBadge}
            onChange={(e) => setSlideBadge(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Headline Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Super market for fresh grocery"
            value={slideTitle}
            onChange={(e) => setSlideTitle(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Subheading Description *</label>
          <textarea
            required
            rows={3}
            placeholder="Describe the campaign briefly..."
            value={slideSubtitle}
            onChange={(e) => setSlideSubtitle(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Background Image Preset *</label>
          <select
            value={slideImageUrl}
            onChange={(e) => setSlideImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background font-bold"
          >
            {PRESET_SLIDE_IMAGES.map((img) => (
              <option key={img.label} value={img.value}>
                {img.label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 mt-3 p-2 bg-muted/10 border border-border/80 rounded-xl w-max">
            <span className="text-xs font-bold text-muted-foreground">Preview:</span>
            <div className="w-24 h-12 rounded-lg bg-muted relative overflow-hidden shrink-0 border border-border">
              <Image
                src={slideImageUrl}
                alt=""
                fill
                className="object-cover size-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground font-bold text-xs rounded-xl hover:bg-primary/95 shadow-xs transition-colors cursor-pointer"
          >
            Save Slide
          </button>
        </div>
      </form>
    </Dialog>
  );
}
