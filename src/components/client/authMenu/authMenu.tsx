"use client";

import { handleSignOut } from "@/src/actions/auth/signout";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { AUTH_BUTTONS } from "@/src/shared/constants/navigationLinks";
import { Button } from "../button/button";

export type UserActionsProps = { logged: true; userName: string } | { logged: false };

export function AuthMenu(props: UserActionsProps) {
  return (
    <div className="flex items-center gap-4">
      {props.logged ? (
        <>
          <p className="hidden sm:block text-sm font-medium">Hello, {props.userName}</p>
          <Button padding="small" onClick={handleSignOut}>
            Quit
          </Button>
        </>
      ) : (
        <>
          {AUTH_BUTTONS.map((link) => (
            <LinkButton key={link.label} href={link.href}>
              {link.label}
            </LinkButton>
          ))}
        </>
      )}
    </div>
  );
}
