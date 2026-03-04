"use client";

import { routes } from "@/src/shared/constants/routes";
import { signOut } from "next-auth/react";
import { NavMenu } from "./navMenu";
import { UserActions } from "./userActions";

export type NavLink = { href: string; label: string };

export interface HeaderViewProps {
  links: readonly NavLink[];
  logged: boolean;
  userName?: string | null;
}

const handleSignOut = async () => {
  await signOut({ callbackUrl: routes.signIn });
};

export default function HeaderView({ links, logged, userName }: HeaderViewProps) {
  return (
    <div className="box-border bg-background border-b-1 border-secondary flex justify-between px-6 py-4 text-base w-full">
      <NavMenu links={links} />
      <UserActions logged={logged} userName={userName} onSignOut={handleSignOut} />
    </div>
  );
}
