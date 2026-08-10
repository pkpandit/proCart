export interface BannerItem {
  id: number;
  title: string;
  discount: string;
  btnText: string;
  image: string;
}

export const BANNERS: BannerItem[] = [
  {
    id: 1,
    title: "Fruits & Vegetables",
    discount: "30%",
    btnText: "Shop Now",
    image: "/images/banner/grocery-banner.png",
  },
  {
    id: 2,
    title: "Freshly Baked Buns",
    discount: "25%",
    btnText: "Shop Now",
    image: "/images/banner/grocery-banner-2.jpg",
  },
];
