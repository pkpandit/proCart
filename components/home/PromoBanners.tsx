"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { BANNERS } from "@/data/banners";

export function PromoBanners() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {BANNERS.map((banner, idx) => (
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="relative h-50 md:h-55 rounded-2xl overflow-hidden border border-border/30 bg-[#f0f3f2] group shadow-xs cursor-pointer"
          onClick={() => alert(`Navigating to: ${banner.title}`)}
        >
          {/* Background Image */}
          <Image
            src={banner.image}
            alt=""
            height={781}
            width={300}
            priority
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />

          {/* Text Content overlay */}
          <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-10 space-y-2 max-w-[65%]">
            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 tracking-tight leading-tight">
              {banner.title}
            </h3>
            <p className="text-xs md:text-sm font-medium text-gray-500">
              Get Upto{" "}
              <span className="font-bold text-gray-900">{banner.discount}</span>{" "}
              Off
            </p>
            <button className="px-4 py-2 bg-[#212529] text-white hover:bg-[#212529]/90 text-xs font-bold rounded-lg shadow-xs transition-colors mt-2 cursor-pointer w-max">
              {banner.btnText}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
