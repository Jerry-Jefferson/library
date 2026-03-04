"use client";

import { AUTH_BUTTONS } from "@/src/shared/constants/navigationLinks";
import Link from "next/link";
import { Button } from "../button/button";

export interface UserActionsProps {
  logged: boolean;
  userName?: string | null;
  onSignOut: () => void;
}

export function UserActions({ logged, userName, onSignOut }: UserActionsProps) {
  const { auth } = AUTH_BUTTONS;

  return (
    <div className="flex items-center gap-4">
      {logged ? (
        <>
          <p className="hidden sm:block text-sm font-medium">Hello, {userName}</p>
          <Button content="Quit" padding="small" onClick={onSignOut} />
        </>
      ) : (
        <>
          {auth.map((link) => (
            <Link
              key={link.label}
              className="border border-secondary rounded-md inline-block hover:bg-primary-hover hover:text-background px-4 py-2 transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
