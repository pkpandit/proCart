"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "../../app/style/globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-background text-foreground flex">
        <AppProviders>
          <div className="flex w-full h-full min-h-screen overflow-hidden">
            {/* Sidebar Navigation */}
            <Sidebar isSidebarOpen={isSidebarOpen} pathname={pathname} />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-muted/20 dark:bg-background">
              {/* Header Navigation */}
              <Header
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />

              {/* Content viewport */}
              <main className="flex-1 overflow-y-auto p-6 md:p-8">
                {children}
              </main>
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
