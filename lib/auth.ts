import { prismaClient } from "@/lib/db";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        name: {
          label: "Username",
          type: "text",
          placeholder: "Joseph",
        },

        email: {
          label: "Email",
          type: "email",
          placeholder: "Joseph@gmail.com",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email) return null;

        let user = await prismaClient.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          user = await prismaClient.user.create({
            data: {
              email: credentials.email,
              name: credentials.name ?? "",
              provider: "Credentials",
            },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "secret",

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      const existingUser = await prismaClient.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!existingUser) {
        await prismaClient.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
            provider: "Google",
          },
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prismaClient.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};