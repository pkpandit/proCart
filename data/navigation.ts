export interface NavigationLink {
  label: string;
  href: string;
  isAction?: boolean;
}

export interface DepartmentItem {
  title: string;
  pageUrl: string;
}

export const DEPARTMENTS: DepartmentItem[] = [
  { title: "Dairy, Bread & Eggs", pageUrl: "/dairy_bread_eggs" },
  { title: "Snacks & Munchies", pageUrl: "/snacks_munchies" },
  { title: "Fruits & Vegetables", pageUrl: "/fruits_vegetables" },
  { title: "Cold Drinks & Juices", pageUrl: "/cold_drinks_juices" },
  { title: "Breakfast & Instant Food", pageUrl: "/breakfast_instant_food" },
  { title: "Bakery & Biscuits", pageUrl: "/bakery_biscuits" },
  { title: "Chicken, Meat & Fish", pageUrl: "/chicken_meat_fish" },
];

export const DESKTOP_NAV_LINKS: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Stores", href: "/stores" },
  { label: "Dashboard", href: "/dashboard" },
];

export const MOBILE_NAV_LINKS: NavigationLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Stores", href: "/stores" },
  { label: "Pages", href: "/pages" },
  { label: "Account", href: "#", isAction: true },
  { label: "Dashboard", href: "/dashboard" },
];
