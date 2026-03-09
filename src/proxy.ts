import { auth } from "@/src/auth";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { roles } from "./shared/constants/roles";
import { routes } from "./shared/constants/routes";

async function proxy(request: NextRequest & { auth: Session | null }) {
  const { auth, nextUrl } = request;

  const loggedIn = Boolean(auth);
  const userRole = auth?.user?.role;

  const publicRoute =
    nextUrl.pathname === "/" ||
    nextUrl.pathname === "/403" ||
    nextUrl.pathname.startsWith("/books") ||
    nextUrl.pathname.startsWith("/authors");

  const authRoute = [routes.signIn, routes.signUp, routes.recovery].includes(nextUrl.pathname);

  const adminRoute = nextUrl.pathname.startsWith("/admin");

  if (authRoute) {
    if (loggedIn) {
      return NextResponse.redirect(new URL(routes.home, nextUrl));
    }
    return NextResponse.next();
  }

  if (!loggedIn && !publicRoute) {
    const url = nextUrl.clone();

    url.pathname = routes.signIn;
    url.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);

    return NextResponse.redirect(url);
  }

  if (adminRoute) {
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
