"use client";

import { handleSignOut } from "@/src/actions/signout";
import { AUTH_BUTTONS } from "@/src/shared/constants/navigationLinks";
import Link from "next/link";
import { UserActionsProps } from "../../server/header/header";
import { Button } from "../button/button";

export function UserActions(props: UserActionsProps) {
  const { auth } = AUTH_BUTTONS;

  return (
    <div className="flex items-center gap-4">
      {props.logged ? (
        <>
          <p className="hidden sm:block text-sm font-medium">Hello, {props.userName}</p>
          <Button content="Quit" padding="small" onClick={handleSignOut} />
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
