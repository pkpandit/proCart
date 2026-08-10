export interface FooterLinkGroup {
  title: string;
  links: string[];
}

export const FOOTER_LINKS: FooterLinkGroup[] = [
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
