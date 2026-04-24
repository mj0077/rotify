import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

import { AuthOptions } from "next-auth";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        console.log(`[NextAuth] Login attempt for user: "${credentials.username}"`);
        
        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) {
          console.log(`[NextAuth] Admin user NOT found: "${credentials.username}"`);
          return null;
        }

        console.log(`[NextAuth] User found. Comparing passwords...`);
        const isValid = await bcrypt.compare(credentials.password, admin.password);

        if (!isValid) {
          console.log(`[NextAuth] Password MISMATCH for user: "${credentials.username}"`);
          return null;
        }

        console.log(`[NextAuth] Login SUCCESS for user: "${credentials.username}"`);

        return {
          id: String(admin.id),
          name: admin.name || admin.username,
          username: admin.username,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
