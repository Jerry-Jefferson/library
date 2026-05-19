"use client";

import Link from "next/link";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { Logo } from "../logo/logo";
import { useTranslations } from "next-intl";

export type NavLink = {
  href: string;
  label: string;
};
export interface NavMenuProps {
  links: readonly NavLink[];
}

export function NavMenu({ links }: NavMenuProps) {
  const t = useTranslations("Dashboard.navLinks");
  return (
    <Disclosure as="nav" className="relative flex items-center">
      {({ open, close }) => (
        <>
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <div className="hidden md:flex items-center gap-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="
                    text-sm
                    lg:text-base
                    hover:text-primary
                    transition-colors
                  "
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
            <DisclosureButton
              className="
                md:hidden
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              {open ? <FiX /> : <FiMenu />}
            </DisclosureButton>
          </div>

          <DisclosurePanel className="md:hidden absolute top-14 left-0 z-50 flex w-64 max-w-[80vw] flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-background/50 backdrop-blur py-4 shadow-xl">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => close()}
                className="
                  text-base
                  hover:text-primary
                  transition-colors
                "
              >
                {t(link.label)}
              </Link>
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
