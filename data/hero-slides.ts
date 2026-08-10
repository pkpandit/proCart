export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
}

export const SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge: "Opening Sale Discount 50%",
    title: "Super market for fresh grocery",
    subtitle:
      "Introduced a new model for online grocery shopping and convenient home delivery.",
    image: "/images/slider/slide-1.jpg",
  },
  {
    id: 2,
    badge: "Free Shipping - orders over $100",
    title: "Free shipping on orders over $100",
    subtitle:
      "Free Shipping to First-Time Customers Only, After promotions and discounts are applied.",
    image: "/images/slider/slider-2.jpg",
  },
];
