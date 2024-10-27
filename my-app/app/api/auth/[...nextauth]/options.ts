import prisma from "@/prisma/client";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// הגדרת טיפוס עבור המשתמש ב-Session
type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  passwordSet?: boolean;
};

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
          include: { password: true },
        });

        if (!user || !user.password) {
          throw new Error("User not found or password not set");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password.hash);
        if (!isPasswordCorrect) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          passwordSet: !!user.password, // הוספת passwordSet בעת הכניסה
        } as SessionUser;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !user.email) return false;

      if (account?.provider === "google") {
        await prisma.users.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            image: user.image,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      if (token?.email) {
        const user = await prisma.users.findUnique({
          where: { email: token.email },
          include: { password: true },
        });
        session.user = {
          ...session.user,
          passwordSet: !!user?.password, // הוספת passwordSet ל-session.user
        } as SessionUser;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
};
