"use client";

import React from "react";
import { BannerItem } from "@/data/banners";
import Image from "next/image";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

interface PromoBannersTabProps {
  banners: BannerItem[];
  onEdit: (banner: BannerItem) => void;
  onDelete: (banner: BannerItem) => void;
}

export function PromoBannersTab({ banners, onEdit, onDelete }: PromoBannersTabProps) {
  return (
    <div className="space-y-6">
      {banners.length === 0 ? (
        <div className="py-16 text-center text-sm text-muted-foreground bg-card border border-dashed border-border rounded-2xl">
          No promotional banners configured. Create one to show on storefront!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow relative group"
            >
              {/* Actions overlay */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={() => onEdit(banner)}
                  className="p-1.5 bg-card border border-border text-muted-foreground hover:text-foreground rounded-lg shadow-md transition-colors cursor-pointer"
                  title="Edit Banner"
                >
                  <IoPencilOutline className="size-4" />
                </button>
                <button
                  onClick={() => onDelete(banner)}
                  className="p-1.5 bg-card border border-destructive/20 text-destructive hover:bg-destructive/10 rounded-lg shadow-md transition-colors cursor-pointer"
                  title="Delete Banner"
                >
                  <IoTrashOutline className="size-4" />
                </button>
              </div>

              {/* Thumbnail / Image Preview */}
              <div className="relative w-full h-44 bg-muted overflow-hidden">
                <Image
                  src={banner.image}
                  alt=""
                  fill
                  className="object-cover size-full"
                />
                <span className="absolute bottom-3 left-4 bg-primary text-primary-foreground font-extrabold text-[10px] px-2 py-1 rounded-md shadow-xs">
                  Get Upto {banner.discount} Off
                </span>
              </div>

              {/* Text Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-extrabold text-foreground text-sm font-heading leading-tight line-clamp-1">
                    {banner.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Button Action: <span className="font-bold text-foreground">{banner.btnText}</span>
                  </p>
                </div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  Banner ID: #{banner.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
