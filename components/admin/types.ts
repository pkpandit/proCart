import { Product } from "@/data/products";
import { CategoryItem } from "@/data/categories";

export type { Product, CategoryItem };

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  date: string;
  itemsCount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  shippingAddress: string;
  items: OrderItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: "Active" | "Inactive";
}

export interface KpiMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  iconName: string;
  bgColor: string;
  textColor: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}
