import React from "react";
import Link from "next/link";
import { DESKTOP_NAV_LINKS } from "@/data/navigation";

export function DesktopNav() {
  return (
    <nav className="flex items-center gap-6 text-xs font-bold text-muted-foreground">
      {DESKTOP_NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
