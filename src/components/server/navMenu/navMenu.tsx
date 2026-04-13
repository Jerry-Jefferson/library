import Link from "next/link";
import { Logo } from "../logo/logo";

export type NavLink = { href: string; label: string };

export interface NavMenuProps {
  links: readonly NavLink[];
}

export function NavMenu({ links }: NavMenuProps) {
  return (
    <div className="flex gap-4 items-center shrink">
      <Logo />
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
