import { NAV_LINKS_ROLE } from "@/src/constants/navigationLinks";
import { Role } from "@/src/types/roles";
import HeaderView from "../../client/headerView/HeaderView";

function getSession() {
  return { user: { role: "GUEST" as const } };
}

export async function Header() {
  const session = getSession();
  const role: Role = session?.user.role ?? "GUEST";
  const links = NAV_LINKS_ROLE[role] ?? [];

  return <HeaderView links={links} />;
}
