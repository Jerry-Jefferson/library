"use client";

import BookIcon from "@/public/book.png";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./headerView";

export interface NavMenuProps {
  links: readonly NavLink[];
}

export function NavMenu({ links }: NavMenuProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative w-[24px] h-[24px]">
        <Image fill alt="book icon" src={BookIcon} className="object-cover" />
      </div>
      {links.map((link) => (
        <Link
          className="text-xs md:text-sm lg:text-base hover:text-primary transition-colors"
          key={link.label}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
