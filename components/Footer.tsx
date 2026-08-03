"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS = [
  {
    title: "Categories",
    links: [
      "Vegetables & Fruits",
      "Breakfast & Instant Food",
      "Bakery & Biscuits",
      "Atta, Rice & Dal",
      "Snacks & Munchies",
      "Baby Care",
      "Cleaning Essentials",
      "Personal Care",
    ],
  },
  {
    title: "Get to know us",
    links: ["Company", "About", "Blog", "Help Center", "Our Value"],
  },
  {
    title: "For Consumers",
    links: ["Payments", "Shipping", "Product Returns", "FAQ", "Shop Checkout"],
  },
  {
    title: "Become a Shopper",
    links: [
      "Shopper Opportunities",
      "Become a Shopper",
      "Earnings",
      "Ideas & Guides",
      "New Retailers",
    ],
  },
  {
    title: "Freshcart programs",
    links: [
      "Freshcart programs",
      "Gift Cards",
      "Promos & Coupons",
      "Freshcart Ads",
      "Careers",
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-muted/30 border-t border-border mt-16 text-left">
      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {FOOTER_LINKS.map((group) => (
          <div key={group.title} className="space-y-4">
            <h4 className="text-sm font-bold font-heading text-foreground uppercase tracking-wide">
              {group.title}
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
              {group.links.map((link) => (
                <li key={link}>
                  <Link
                    className="hover:text-primary transition-colors"
                    href="#"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Middle Divider */}
      <div className="border-t border-border/60 max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Payment Partners */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
          <span className="text-xs font-bold uppercase tracking-wider">
            Payment Partners:
          </span>
          <div className="flex gap-2">
            <Image
              height={32}
              width={32}
              src="/images/payment/visa.svg"
              alt="Visa"
              className="h-6 w-auto border border-border bg-card rounded px-1.5 py-0.5"
            />
            <Image
              height={32}
              width={32}
              src="/images/payment/mastercard.svg"
              alt="Mastercard"
              className="h-6 w-auto border border-border bg-card rounded px-1.5 py-0.5"
            />

            <Image
              height={32}
              width={32}
              src="/images/payment/paypal.svg"
              alt="PayPal"
              className="h-6 w-auto border border-border bg-card rounded px-1.5 py-0.5"
            />
            <Image
              height={32}
              width={32}
              src="/images/payment/american-express.svg"
              alt="American Express"
              className="h-6 w-auto border border-border bg-card rounded px-1.5 py-0.5"
            />
            <Image
              height={32}
              width={32}
              src="/images/payment/amazonpay.svg"
              alt="Amazon Pay"
              className="h-6 w-auto border border-border bg-card rounded px-1.5 py-0.5"
            />
          </div>
        </div>

        {/* App Stores */}
        <div className="flex items-center gap-3">
          <Link href="#" className="hover:opacity-90 transition-opacity">
            <Image
              height={166}
              width={48}
              src="/images/appbutton/appstore-btn.svg"
              alt="App Store"
              className="h-8.5 w-auto"
            />
          </Link>
          <Link href="#" className="hover:opacity-90 transition-opacity">
            <Image
              height={166}
              width={48}
              src="/images/appbutton/googleplay-btn.svg"
              alt="Google Play"
              className="h-8.5 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Bottom copyright info */}
      <div className="bg-muted/50 border-t border-border/40 py-6 text-center text-xs text-muted-foreground font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} FreshCart E-Commerce. All rights
            reserved.
          </span>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
