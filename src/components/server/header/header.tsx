import { auth } from "@/src/auth";
import { NAV_LINKS_ROLE, SessionRoles } from "@/src/shared/constants/navigationLinks";
import { roles } from "@/src/shared/constants/roles";
import { AuthMenu } from "../../client/authMenu/authMenu";
import { NavMenu } from "../navMenu/navMenu";

export async function Header() {
  const session = await auth();

  const role: SessionRoles = session?.user.role ?? roles.guest;

  const { nav } = NAV_LINKS_ROLE[role];

  return (
    <header className="box-border bg-background border-b border-secondary flex justify-between px-6 py-4 text-base w-full">
      <NavMenu links={nav} />
      <AuthMenu
        {...(session ? { logged: true, userName: session.user.name, role } : { logged: false })}
      />
    </header>
  );
}
