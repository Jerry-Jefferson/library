import { NextResponse } from "next/server";
import { roles } from "../constants/roles";
import { routes, RouteType } from "../constants/routes";
import { redirectToSignin } from "./redirectToSignin";

interface ActionContext {
  userRole?: string;
  nextUrl: URL;
}

export function getProxyActions({
  userRole,
  nextUrl,
}: ActionContext): Record<RouteType, () => NextResponse | null> {
  const { origin } = nextUrl;

  return {
    AUTH: () => {
      if (userRole) return NextResponse.redirect(new URL(routes.home, origin));
      return null;
    },
    ADMIN: () => {
      if (!userRole) return redirectToSignin(nextUrl);
      if (userRole !== roles.admin) {
        return NextResponse.rewrite(new URL(routes.denied, origin));
      }
      return null;
    },
    PRIVATE: () => {
      if (!userRole) return redirectToSignin(nextUrl);
      return null;
    },
    PUBLIC: () => null,
  };
}
