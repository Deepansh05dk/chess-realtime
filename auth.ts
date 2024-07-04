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
            id: user.id,
          },
          where: {
            email: user.email,
          },
        });
      }
      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session) {
        session.user.id = token.id;
      }
      return session;
    },
  },
});
