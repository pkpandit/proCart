"use client";

import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { HeroSlide } from "@/data/hero-slides";
import { BannerItem } from "@/data/banners";
import { HeroSlidesTab } from "@/components/admin/promotions/HeroSlidesTab";
import { PromoBannersTab } from "@/components/admin/promotions/PromoBannersTab";
import { HeroSlideModal } from "@/components/admin/promotions/HeroSlideModal";
import { PromoBannerModal } from "@/components/admin/promotions/PromoBannerModal";
import { Dialog } from "@/components/ui/Dialog";
import {
  IoAddOutline,
  IoImagesOutline,
  IoRibbonOutline,
} from "react-icons/io5";

export default function AdminPromotions() {
  const {
    heroSlides,
    banners,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    addBanner,
    updateBanner,
    deleteBanner,
  } = useData();

  const [activeTab, setActiveTab] = useState<"slides" | "banners">("slides");

  // Modals state
  const [slideFormOpen, setSlideFormOpen] = useState(false);
  const [slideDeleteOpen, setSlideDeleteOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);

  const [bannerFormOpen, setBannerFormOpen] = useState(false);
  const [bannerDeleteOpen, setBannerDeleteOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<BannerItem | null>(null);

  // Slide actions
  const handleOpenSlideCreate = () => {
    setSelectedSlide(null);
    setSlideFormOpen(true);
  };

  const handleOpenSlideEdit = (slide: HeroSlide) => {
    setSelectedSlide(slide);
    setSlideFormOpen(true);
  };

  const handleSaveSlide = (data: any) => {
    if (selectedSlide) {
      updateHeroSlide(selectedSlide.id, data);
    } else {
      addHeroSlide(data);
    }
    setSlideFormOpen(false);
  };

  const handleConfirmSlideDelete = (slide: HeroSlide) => {
    setSelectedSlide(slide);
    setSlideDeleteOpen(true);
  };

  const handleSlideDelete = () => {
    if (selectedSlide) {
      deleteHeroSlide(selectedSlide.id);
    }
    setSlideDeleteOpen(false);
  };

  // Banner actions
  const handleOpenBannerCreate = () => {
    setSelectedBanner(null);
    setBannerFormOpen(true);
  };

  const handleOpenBannerEdit = (banner: BannerItem) => {
    setSelectedBanner(banner);
    setBannerFormOpen(true);
  };

  const handleSaveBanner = (data: any) => {
    if (selectedBanner) {
      updateBanner(selectedBanner.id, data);
    } else {
      addBanner(data);
    }
    setBannerFormOpen(false);
  };

  const handleConfirmBannerDelete = (banner: BannerItem) => {
    setSelectedBanner(banner);
    setBannerDeleteOpen(true);
  };

  const handleBannerDelete = () => {
    if (selectedBanner) {
      deleteBanner(selectedBanner.id);
    }
    setBannerDeleteOpen(false);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground font-heading tracking-tight mb-2">
            Promotions & Campaigns
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Configure homepage sliders and discount banners for customer engagement.
          </p>
        </div>

        {activeTab === "slides" ? (
          <button
            onClick={handleOpenSlideCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/95 shadow-sm transition-colors cursor-pointer w-max self-start sm:self-auto"
          >
            <IoAddOutline className="size-4.5" />
            <span>Create Hero Slide</span>
          </button>
        ) : (
          <button
            onClick={handleOpenBannerCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/95 shadow-sm transition-colors cursor-pointer w-max self-start sm:self-auto"
          >
            <IoAddOutline className="size-4.5" />
            <span>Create Promo Banner</span>
          </button>
        )}
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab("slides")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === "slides"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <IoImagesOutline className="size-4.5" />
          <span>Home Hero Slides</span>
        </button>
        <button
          onClick={() => setActiveTab("banners")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 cursor-pointer transition-colors ${
            activeTab === "banners"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <IoRibbonOutline className="size-4.5" />
          <span>Promo Campaign Banners</span>
        </button>
      </div>

      {/* Tab Content Panels */}
      {activeTab === "slides" ? (
        <HeroSlidesTab
          slides={heroSlides}
          onEdit={handleOpenSlideEdit}
          onDelete={handleConfirmSlideDelete}
        />
      ) : (
        <PromoBannersTab
          banners={banners}
          onEdit={handleOpenBannerEdit}
          onDelete={handleConfirmBannerDelete}
        />
      )}

      {/* Hero Slide Form Modal */}
      <HeroSlideModal
        open={slideFormOpen}
        onClose={() => setSlideFormOpen(false)}
        slide={selectedSlide}
        onSave={handleSaveSlide}
      />

      {/* Slide Delete confirmation Dialog */}
      <Dialog
        open={slideDeleteOpen}
        onClose={() => setSlideDeleteOpen(false)}
        title="Confirm Slide Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          <p className="text-sm text-foreground">
            Are you sure you want to permanently delete this slider campaign?
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            This action will immediately remove the slide from the storefront homepage carousel.
          </p>
          <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
            <button
              onClick={() => setSlideDeleteOpen(false)}
              className="px-4 py-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSlideDelete}
              className="px-4 py-2 bg-destructive text-destructive-foreground font-bold text-xs rounded-xl hover:bg-destructive/90 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>

      {/* Banner Form Modal */}
      <PromoBannerModal
        open={bannerFormOpen}
        onClose={() => setBannerFormOpen(false)}
        banner={selectedBanner}
        onSave={handleSaveBanner}
      />

      {/* Banner Delete confirmation Dialog */}
      <Dialog
        open={bannerDeleteOpen}
        onClose={() => setBannerDeleteOpen(false)}
        title="Confirm Banner Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-left">
          <p className="text-sm text-foreground">
            Are you sure you want to permanently delete this promotional banner?
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            This action will immediately remove the banner card from the storefront homepage.
          </p>
          <div className="flex items-center justify-end gap-3 border-t border-border pt-4 mt-6">
            <button
              onClick={() => setBannerDeleteOpen(false)}
              className="px-4 py-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleBannerDelete}
              className="px-4 py-2 bg-destructive text-destructive-foreground font-bold text-xs rounded-xl hover:bg-destructive/90 transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
