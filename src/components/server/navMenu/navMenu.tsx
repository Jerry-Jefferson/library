"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "../logo/logo";

export type NavLink = { href: string; label: string };

export interface NavMenuProps {
  links: readonly NavLink[];
}

export function NavMenu({ links }: NavMenuProps) {
  return (
    <Disclosure as="nav" className="relative flex items-center">
      {({ open }) => (
        <>
          <div className="flex items-center justify-between gap-4">
            <Logo />

            <div className="hidden md:flex gap-4 items-center">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm lg:text-base hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <DisclosureButton className="md:hidden text-2xl">
              {open ? <FiX /> : <FiMenu />}
            </DisclosureButton>
          </div>

          <DisclosurePanel className="md:hidden absolute bg-background top-14 left-0 w-[50vw] rounded-xl border border-primary flex flex-col items-center gap-4 py-4 shadow-md z-50">
            {links.map((link) => (
              <Link key={link.label} href={link.href} className="text-base">
                {link.label}
              </Link>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
