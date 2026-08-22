"use client";

import React from "react";

interface AvailabilityChartProps {
  inStockPct: number;
  outPct: number;
}

export function AvailabilityChart({ inStockPct, outPct }: AvailabilityChartProps) {
  // SVG circumference: 2 * PI * r = 2 * 3.14159 * 52 ≈ 326.7
  const strokeDasharray = 326.7;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * inStockPct) / 100;

  return (
    <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between h-full">
      <div className="space-y-1.5">
        <h3 className="font-extrabold font-heading text-base text-foreground tracking-tight">
          Availability Status
        </h3>
        <p className="text-xs text-muted-foreground">
          Percentage of in-stock vs out-of-stock catalog.
        </p>
      </div>

      <div className="py-6 flex items-center justify-center relative">
        {/* Visual Ring Chart */}
        <div className="relative size-32 flex items-center justify-center">
          <svg className="size-full rotate-270">
            <circle
              cx="64"
              cy="64"
              r="52"
              className="stroke-muted"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="52"
              className="stroke-primary transition-all duration-500"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-extrabold text-foreground leading-none">
              {inStockPct}%
            </span>
            <span className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">
              Available
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-around border-t border-border/80 pt-4 text-xs font-bold">
        <div className="flex items-center gap-1.5 font-bold">
          <span className="size-2.5 rounded-full bg-primary" />
          <span className="text-foreground">In Stock ({inStockPct}%)</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold">
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="text-muted-foreground">Out of Stock ({outPct}%)</span>
        </div>
      </div>
    </div>
  );
}
