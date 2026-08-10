"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  days: number;
}

export function CountdownTimer({ days }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // reset / wrap
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="flex gap-1.5 mt-4">
      <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
        <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
          {days}
        </span>
        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
          Days
        </span>
      </div>
      <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
        <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
          Hours
        </span>
      </div>
      <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
        <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
          Mins
        </span>
      </div>
      <div className="flex-1 border border-border/40 bg-muted/30 rounded-lg p-1.5 text-center">
        <span className="block text-xs font-bold text-foreground font-mono leading-none mb-1">
          {pad(timeLeft.seconds)}
        </span>
        <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wide">
          Secs
        </span>
      </div>
    </div>
  );
}
