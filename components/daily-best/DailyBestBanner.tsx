"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function DailyBestBanner() {
  return (
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
        alt="Mega Deal Coffee Banner"
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
  );
}
