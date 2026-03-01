import { auth } from "@/src/auth";
import { NAV_LINKS_ROLE, SessionRoles } from "@/src/shared/constants/navigationLinks";
import { roles } from "@/src/shared/constants/roles";
import HeaderView from "../../client/headerView/HeaderView";

export async function Header() {
  const session = await auth();

  const role: SessionRoles = session?.user.role ?? roles.guest;
  const Logged = Boolean(session);
  const userName = session?.user?.name;

  const links = NAV_LINKS_ROLE[role];

  return <HeaderView links={links} Logged={Logged} userName={userName} />;
}
