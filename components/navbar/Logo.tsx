import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="outline-hidden group">
        <Image
          height={31}
          width={160}
          src="/images/logo/freshcart-logo.svg"
          alt="FreshCart"
          className="h-7 w-auto group-hover:scale-102 transition-transform"
        />
      </Link>
    </div>
  );
}
