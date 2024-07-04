import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({})],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, profile }) {
      if (user.email && user.id) {
        const updatedUser = await db.user.upsert({
          create: {
            email: user.email,
            name: profile?.name,
            provider: "GOOGLE",
            id: user.id,
          },
          update: {
            name: profile?.name,
          },
          where: {
            email: user.email,
          },
        });
      }
      return true;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
});
