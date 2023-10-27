import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  DefaultUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import type { User, UserRole } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: number;
      // ...other properties
      role: UserRole;
    };
  }

  interface User extends DefaultUser {
    id: number;
    // ...other properties
    role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, user = {}, token = {} }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id || token.id,
          role: user.role || token.role,
        },
      };
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "text", placeholder: "juan@mail.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!(credentials?.email && credentials?.password)) return null;
        const user = await db.user.findUniqueOrThrow({
          where: {
            email: credentials.email.trim().toLowerCase(),
            password: credentials.password.trim(),
          },
        });
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
