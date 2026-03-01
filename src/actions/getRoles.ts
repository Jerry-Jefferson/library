"use server";

import User from "@/src/models/user";
import { UserRole } from "../shared/types/newUser";

export interface roleOption {
  title: string;
  value: UserRole;
}

export async function getRoles(): Promise<roleOption[]> {
  const roles = User.schema.path("role").enumValues as UserRole[];
  return roles.map((role) => ({
    title: role.charAt(0) + role.slice(1).toLowerCase(),
    value: role,
  }));
}
