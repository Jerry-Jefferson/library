"use client";

import BookIcon from "@/public/book.png";
import { routes } from "@/src/shared/constants/routes";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../server/button/button";

type NavLink = { href: string; label: string };
type HeaderLinks = {
  nav: readonly NavLink[];
};

export interface HeaderViewProps {
  links: HeaderLinks;
  Logged: boolean;
  userName?: string | null;
}

async function handleSignOut() {
  await signOut({ callbackUrl: routes.signIn });
}

export default function HeaderView({ links, Logged, userName }: HeaderViewProps) {
  const { nav } = links;
  return (
    <div className="box-border bg-background border-b-1 border-secondary flex justify-between px-6 py-4 text-base w-screen">
      <div className="flex gap-4 items-center">
        <div className="relative w-[24px] h-[24px]">
          <Image fill alt="book icon" src={BookIcon} className="object-cover" />
        </div>
        {nav.map((link) => (
          <Link className="hover:text-primary" key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        {Logged ? (
          <>
            <p>Hello, {userName}</p>
            <Button content="Quit" onClick={handleSignOut} />
          </>
        ) : (
          <>
            <Link
              className="border border-secondary rounded-md inline-block hover:bg-primary-hover hover:text-background px-4 py-2 transition-colors"
              href={routes.signIn}
            >
              Sign in
            </Link>
            <Link
              className="border border-secondary rounded-md inline-block hover:bg-primary-hover hover:text-background px-4 py-2 transition-colors"
              href={routes.signUp}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
