"use client";

import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingProps {
  value: number;
  max?: number;
  className?: string;
  size?: number;
}

export function Rating({ value, max = 5, className = "text-yellow-500", size = 16 }: RatingProps) {
  const stars = [];
  const floorValue = Math.floor(value);
  const hasHalf = value % 1 !== 0;

  for (let i = 1; i <= max; i++) {
    if (i <= floorValue) {
      stars.push(<IoStar key={i} size={size} />);
    } else if (i === floorValue + 1 && hasHalf) {
      stars.push(<IoStarHalf key={i} size={size} />);
    } else {
      stars.push(<IoStarOutline key={i} size={size} />);
    }
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars}
    </div>
  );
}
