import { DefaultSession } from "next-auth";
import { SessionRoles } from "../shared/constants/navigationLinks";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      role?: SessionRoles;
    } & DefaultSession["user"];
  }

  interface User {
    role?: SessionRoles;
  }

  declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      role: string;
      accessToken?: string;
      expiresAt?: number;
    }
  }
}
