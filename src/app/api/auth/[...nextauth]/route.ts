// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "placeholder-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const emailStr = String(credentials.email);
        const passStr = String(credentials.password);

        const user = await prisma.user.findUnique({ where: { email: emailStr } });
        if (!user || !user.password) return null;
        const isValid = await bcrypt.compare(passStr, user.password);
        if (!isValid) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.plan = token.plan;
        session.user.role = token.role;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (dbUser) {
          token.plan = dbUser.plan;
          token.role = dbUser.role;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev-mode-only-docsetu",
});

export const { GET, POST } = handlers;
