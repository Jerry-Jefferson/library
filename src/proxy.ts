import { auth } from "@/src/auth";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { roles } from "./shared/constants/roles";
import { routes } from "./shared/constants/routes";

async function proxy(request: NextRequest & { auth: Session | null }) {
  const { auth, nextUrl } = request;

  const LoggedIn = Boolean(auth);
  const userRole = auth?.user?.role;

  const PublicRoute =
    nextUrl.pathname === "/" ||
    nextUrl.pathname === "/403" ||
    nextUrl.pathname.startsWith("/books") ||
    nextUrl.pathname.startsWith("/authors");

  const AuthRoute = [routes.signIn, routes.signUp, routes.recovery].includes(nextUrl.pathname);

  const AdminRoute = nextUrl.pathname.startsWith("/admin");

  if (AuthRoute) {
    if (LoggedIn) {
      return NextResponse.redirect(new URL(routes.home, nextUrl));
    }
    return NextResponse.next();
  }

  if (!LoggedIn && !PublicRoute) {
    const url = nextUrl.clone();

    url.pathname = routes.signIn;
    url.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);

    return NextResponse.redirect(url);
  }

  if (AdminRoute) {
    if (userRole !== roles.admin) {
      return NextResponse.rewrite(new URL("/403", nextUrl));
    }
  }

  return NextResponse.next();
}

export default auth(proxy);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
