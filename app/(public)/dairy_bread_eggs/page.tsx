import React from "react";
import TitlePage from "@/components/page-title/TitlePage";
const dairy_bread_eggs = () => {
  return (
    <header className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <TitlePage
        page_title="Dairy, Bread & Eggs"
        page_description={[
          "Provides daily breakfast staples including fresh milk, artisan breads, butter, cheeses, and organic eggs.",
          "Serves as a high-frequency entry point that drives recurring weekly customer visits and builds customer loyalty.",
          "Emphasizes swift, temperature-controlled delivery to ensure critical freshness and complete food safety.",
        ]}
      />
    </header>
  );
};

export default dairy_bread_eggs;
