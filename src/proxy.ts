import { auth } from "@/src/auth";
import { Session } from "next-auth";
import { NextRequest } from "next/server";
import { getAccessType } from "./shared/utils/getAccessType";
import { getProxyActions } from "./shared/utils/getProxyActions";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { removeLocaleFromPathname } from "./shared/utils/removeLocaleFromPathname";

const intlMiddleware = createMiddleware(routing);

async function proxy(request: NextRequest & { auth: Session | null }) {
  const { auth: session, nextUrl } = request;

  const pathnameWithoutLocale = removeLocaleFromPathname(nextUrl.pathname);

  const userRole = session?.user?.role;

  const accessType = getAccessType(pathnameWithoutLocale);

  const actions = getProxyActions({
    userRole,
    nextUrl,
  });

  const response = actions[accessType]();

  if (response) return response;
  return intlMiddleware(request);
}

export default auth(proxy);

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
