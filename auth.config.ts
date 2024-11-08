import GitHub from "next-auth/providers/github";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import { db } from "./lib/db";

// Notice this is only an object, not a full Auth.js instance
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export default {
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;

        const existingUser = await db.user.findUnique({
          where: {
            id: user.id,
          },
          include: {
            subscriptions: true,
          },
        });

        if (existingUser && !existingUser.subscriptions) {
          await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              subscriptions: {
                create: {
                  plan: "FREE",
                },
              },
            },
          });
        }
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
