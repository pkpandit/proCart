"use client";

import React from "react";

interface CategoryCount {
  name: string;
  count: number;
}

interface CategoryBreakdownProps {
  categoryCounts: CategoryCount[];
}

export function CategoryBreakdown({ categoryCounts }: CategoryBreakdownProps) {
  return (
    <div className="bg-card border border-border p-6 rounded-2xl space-y-6 flex-1">
      <div>
        <h3 className="font-extrabold font-heading text-base text-foreground tracking-tight">
          Top Categories Inventory
        </h3>
        <p className="text-xs text-muted-foreground">
          Distribution of products across leading categories.
        </p>
      </div>
      <div className="space-y-4">
        {categoryCounts.length === 0 ? (
          <div className="text-center text-xs text-muted-foreground py-10">
            No product distribution data available.
          </div>
        ) : (
          categoryCounts.map((item, index) => {
            const maxVal = categoryCounts[0]?.count || 1;
            const percent = Math.round((item.count / maxVal) * 100);
            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">{item.count} items</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
