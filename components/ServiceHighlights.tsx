"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoTimeOutline, IoGiftOutline, IoLayersOutline, IoRefreshOutline } from "react-icons/io5";

const HIGHLIGHTS = [
  {
    icon: <IoTimeOutline className="size-6 text-primary" />,
    title: "10 minute grocery now",
    desc: "Get your order delivered to your doorstep at lightning fast speed in under 10 minutes.",
  },
  {
    icon: <IoGiftOutline className="size-6 text-primary" />,
    title: "Best Prices & Offers",
    desc: "Cheaper prices than your local supermarket, plus great cashback coupons and rewards.",
  },
  {
    icon: <IoLayersOutline className="size-6 text-primary" />,
    title: "Wide Assortment",
    desc: "Choose from 5,000+ products across food, personal care, household, and other items.",
  },
  {
    icon: <IoRefreshOutline className="size-6 text-primary" />,
    title: "Easy Returns",
    desc: "Not satisfied with a product? Return it at the doorstep and get a refund instantly.",
  },
];

export function ServiceHighlights() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
      {HIGHLIGHTS.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          whileHover={{ y: -3 }}
          className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 flex flex-col gap-3 group"
        >
          {/* Icon Container */}
          <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            {item.icon}
          </div>

          {/* Texts */}
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-heading text-foreground tracking-tight">
              {item.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
