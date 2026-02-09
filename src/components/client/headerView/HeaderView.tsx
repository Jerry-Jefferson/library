"use client";

import BookIcon from "@/public/book.png";
import Image from "next/image";
import Link from "next/link";

type NavLink = { href: string; label: string };
type HeaderLinks = {
  nav: readonly NavLink[];
  auth: readonly NavLink[];
};

export interface HeaderViewProps {
  links: HeaderLinks;
}

export default function HeaderView({ links }: HeaderViewProps) {
  const { nav, auth } = links;
  return (
    <div className="box-border bg-background border-b-1 border-secondary flex justify-between p-6 text-base w-screen">
      <div className="flex gap-4">
        <Image alt="book icon" src={BookIcon} />
        {nav.map((link) => (
          <Link className="hover:text-primary-hover" key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        {auth.map((link) => (
          <Link className="hover:text-primary-hover" key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
