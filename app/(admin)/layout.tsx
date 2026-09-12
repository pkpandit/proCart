import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "../style/globals.css";
import { AdminLayoutWrapper } from "@/components/admin/AdminLayoutWrapper";
import { DataProvider } from "@/contexts/DataContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart Admin | Store Management Dashboard",
  description: "FreshCart administrative dashboard for managing products, categories, orders, and customers.",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans">
        <DataProvider>
          <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
        </DataProvider>
      </body>
    </html>
  );
}
