import { auth } from "@/src/auth";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getAccessType } from "./shared/utils/getAccessType";
import { getProxyActions } from "./shared/utils/getProxyActions";

async function proxy(request: NextRequest & { auth: Session | null }) {
  const { auth, nextUrl } = request;
  const pathname = nextUrl.pathname;
  const userRole = auth?.user?.role;

  const accessType = getAccessType(pathname);

  const actions = getProxyActions({ userRole, nextUrl });

  const response = actions[accessType]();
  if (response) return response;

  return NextResponse.next();
}

export default auth(proxy);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
