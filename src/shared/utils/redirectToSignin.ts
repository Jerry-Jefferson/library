import { NextResponse } from "next/server";
import { routes } from "../constants/routes";

export function redirectToSignin(nextUrl: URL) {
  const { pathname, search, origin } = nextUrl;
  const url = new URL(routes.signIn, origin);

  url.searchParams.set("callbackUrl", pathname + search);

  return NextResponse.redirect(url);
}
