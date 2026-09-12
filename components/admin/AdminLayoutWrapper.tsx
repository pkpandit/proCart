"use client";

import React, { useState, ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminToastProvider } from "./AdminToast";

export function AdminLayoutWrapper({ children }: { children: ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <AdminToastProvider>
      <div className="min-h-screen bg-background text-foreground flex">
        {/* Sidebar (Desktop fixed, Mobile drawer) */}
        <AdminSidebar
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
          <AdminHeader onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
            {children}
          </main>
        </div>
      </div>
    </AdminToastProvider>
  );
}
