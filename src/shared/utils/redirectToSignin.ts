import { NextResponse } from "next/server";
import { routes } from "../constants/routes";

export function redirectToSignin(nextUrl: URL) {
  const segments = nextUrl.pathname.split("/");
  const locale = segments[1];

  return NextResponse.redirect(new URL(`/${locale}${routes.signIn}`, nextUrl.origin));
}
