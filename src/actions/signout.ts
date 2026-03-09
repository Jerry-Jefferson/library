"use server";

import { signOut } from "../auth";
import { routes } from "../shared/constants/routes";

export async function handleSignOut() {
  await signOut({ redirectTo: routes.signIn });
}
