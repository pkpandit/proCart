import React from "react";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

interface BreadcrumbProps {
  category: string;
  title: string;
}

export function Breadcrumb({ category, title }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs font-semibold text-muted-foreground py-4 gap-1.5 flex-wrap">
      <Link
        href="/"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        Home
      </Link>
      <IoChevronForward className="size-3 text-muted-foreground/50 shrink-0" />

      <span className="hover:text-primary transition-colors cursor-pointer">
        {category}
      </span>
      <IoChevronForward className="size-3 text-muted-foreground/50 shrink-0" />

      <span className="text-foreground font-bold truncate max-w-[240px] sm:max-w-md" title={title}>
        {title}
      </span>
    </nav>
  );
}
