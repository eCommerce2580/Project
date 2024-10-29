import prisma from "@/prisma/client";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

type SessionUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null| undefined;
  passwordSet?: boolean;
  isVerified?: boolean;
  address?: {
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zipCode: string;
  } | null;
  employee?: {
    id: string;
    businessId: string;
    business: {
      id: string;
      name: string;
      logo: string;
      phone: string;
      email: string;
    };
  } | null;
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

        if (user.isVerified === false) {
          throw new Error("Email not verified");
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password.hash);
        if (!isPasswordCorrect) throw new Error("Invalid password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          passwordSet: !!user.password,
          isVerified: user.isVerified,
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
            isVerified: true,
          },
          create: {
            email: user.email,
            name: user.name,
            image: user.image,
            isVerified: true,
          },
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.users.findUnique({
          where: { email: user.email! },
          include: {
            password: true, 
            address: true,
            employee: {
              include: { business: true },
            },
          },
        });
    
        if (dbUser) {
          token = {
            ...token,
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            image: dbUser.image,
            address: dbUser.address // Full address details if an address exists
              ? {
                  country: dbUser.address.country,
                  city: dbUser.address.city,
                  street: dbUser.address.street,
                  houseNumber: dbUser.address.houseNumber,
                  zipCode: dbUser.address.zipCode,
                }
              : null,
            employee: dbUser.employee
              ? {
                  id: dbUser.employee.id,
                  businessId: dbUser.employee.businessId,
                  business: {
                    id: dbUser.employee.business.id,
                    name: dbUser.employee.business.name,
                    logo: dbUser.employee.business.logo,
                    phone: dbUser.employee.business.phone,
                    email: dbUser.employee.business.email,
                  },
                }
              : null,
          };
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        image: token.image,
        passwordSet: token.passwordSet,
        isVerified: token.isVerified,
        address: token.address,
        employee: token.employee,
      };
      return session;
    },
  },
};
