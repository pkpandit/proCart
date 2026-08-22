"use client";

import React, { useState, useEffect } from "react";
import { BannerItem } from "@/data/banners";
import { Dialog } from "@/components/ui/Dialog";
import Image from "next/image";

interface PromoBannerModalProps {
  open: boolean;
  onClose: () => void;
  banner: BannerItem | null;
  onSave: (data: any) => void;
}

const PRESET_BANNER_IMAGES = [
  { label: "Promo Left (Vegs Pack)", value: "/images/banner/grocery-banner.png" },
  { label: "Promo Right (Baked Buns)", value: "/images/banner/grocery-banner-2.jpg" },
];

export function PromoBannerModal({ open, onClose, banner, onSave }: PromoBannerModalProps) {
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerDiscount, setBannerDiscount] = useState("");
  const [bannerBtnText, setBannerBtnText] = useState("Shop Now");
  const [bannerImageUrl, setBannerImageUrl] = useState("/images/banner/grocery-banner.png");

  useEffect(() => {
    if (banner) {
      setBannerTitle(banner.title);
      setBannerDiscount(banner.discount);
      setBannerBtnText(banner.btnText);
      setBannerImageUrl(banner.image);
    } else {
      setBannerTitle("");
      setBannerDiscount("20%");
      setBannerBtnText("Shop Now");
      setBannerImageUrl(PRESET_BANNER_IMAGES[0]?.value || "");
    }
  }, [banner, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: bannerTitle,
      discount: bannerDiscount,
      btnText: bannerBtnText,
      image: bannerImageUrl,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={banner ? "Edit Campaign Banner" : "Add Campaign Banner"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Campaign Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Freshly Baked Buns"
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Discount percentage *</label>
          <input
            type="text"
            required
            placeholder="e.g. 25%, 30%"
            value={bannerDiscount}
            onChange={(e) => setBannerDiscount(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Button Text *</label>
          <input
            type="text"
            required
            placeholder="e.g. Shop Now, Get Offer"
            value={bannerBtnText}
            onChange={(e) => setBannerBtnText(e.target.value)}
            className="w-full px-3.5 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-foreground">Banner Background Image *</label>
          <select
            value={bannerImageUrl}
            onChange={(e) => setBannerImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-xl text-sm outline-hidden focus:border-primary text-foreground bg-background font-bold"
          >
            {PRESET_BANNER_IMAGES.map((img) => (
              <option key={img.label} value={img.value}>
                {img.label}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 mt-3 p-2 bg-muted/10 border border-border/80 rounded-xl w-max">
            <span className="text-xs font-bold text-muted-foreground">Preview:</span>
            <div className="w-24 h-12 rounded-lg bg-muted relative overflow-hidden shrink-0 border border-border">
              <Image
                src={bannerImageUrl}
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
            Save Banner
          </button>
        </div>
      </form>
    </Dialog>
  );
}
