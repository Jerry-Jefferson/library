"use client";

import { handleSignOut } from "@/src/actions/auth/signout";
import LinkButton from "@/src/components/server/linkButton/linkButton";
import { AUTH_BUTTONS, SessionRoles } from "@/src/shared/constants/navigationLinks";
import { roles } from "@/src/shared/constants/roles";
import { routes } from "@/src/shared/constants/routes";
import { Button } from "../button/button";

export type UserActionsProps =
  | { logged: true; userName: string; role: SessionRoles }
  | { logged: false };

export function AuthMenu(props: UserActionsProps) {
  return (
    <div className="flex items-center gap-4">
      {props.logged ? (
        <>
          {props.role === roles.admin && (
            <LinkButton href={routes.admin} className="font-normal">
              Dashboard
            </LinkButton>
          )}
          <Button fullWidth size="small" variant="primary" onClick={handleSignOut}>
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
