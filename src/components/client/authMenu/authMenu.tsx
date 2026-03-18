"use client";

import { handleSignOut } from "@/src/actions/signout";
import { AUTH_BUTTONS } from "@/src/shared/constants/navigationLinks";
import { Button } from "../button/button";
import LinkButton from "@/src/components/server/linkButton/linkButton";

export type UserActionsProps = { logged: true; userName: string } | { logged: false };

export function AuthMenu(props: UserActionsProps) {
  return (
    <div className="flex items-center gap-4">
      {props.logged ? (
        <>
          <p className="hidden sm:block text-sm font-medium">Hello, {props.userName}</p>
          <Button content="Quit" padding="small" onClick={handleSignOut} />
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
