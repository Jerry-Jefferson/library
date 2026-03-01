import User from "@/src/models/user";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DATE_SECONDS, JWT_DURATION } from "./shared/constants/durations";
import { SessionRoles } from "./shared/constants/navigationLinks";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt", maxAge: JWT_DURATION },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;

          const user = await User.findOne({ email: credentials?.email }).select("+password").lean();

          if (!user) return null;

          const Match = await bcrypt.compare(credentials?.password as string, user.password);

          if (!Match) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          role: user.role,
          id: user.id,
          expiresAt: Math.floor(DATE_SECONDS) + JWT_DURATION,
        };
      }
      const now = Math.floor(DATE_SECONDS);
      if (now > (token.expiresAt as number)) {
        return null;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as SessionRoles;
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});
