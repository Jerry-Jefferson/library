import { roles } from "../constants/roles";

export type UserRole = (typeof roles)[keyof typeof roles];

export interface NewUser {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}
