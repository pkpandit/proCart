import { IoTimeOutline, IoGiftOutline, IoLayersOutline, IoRefreshOutline } from "react-icons/io5";
import React from "react";

export interface ServiceHighlight {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export const HIGHLIGHTS: ServiceHighlight[] = [
  {
    icon: IoTimeOutline,
    title: "10 minute grocery now",
    desc: "Get your order delivered to your doorstep at lightning fast speed in under 10 minutes.",
  },
  {
    icon: IoGiftOutline,
    title: "Best Prices & Offers",
    desc: "Cheaper prices than your local supermarket, plus great cashback coupons and rewards.",
  },
  {
    icon: IoLayersOutline,
    title: "Wide Assortment",
    desc: "Choose from 5,000+ products across food, personal care, household, and other items.",
  },
  {
    icon: IoRefreshOutline,
    title: "Easy Returns",
    desc: "Not satisfied with a product? Return it at the doorstep and get a refund instantly.",
  },
];
