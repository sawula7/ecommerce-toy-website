import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, USERS_TABLE } from "@/lib/dynamodb";
import type { UserRole } from "@/types/next-auth";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export async function registerUser(name: string, email: string, password: string) {
  const existing = await db.send(new GetCommand({ TableName: USERS_TABLE, Key: { email } }));
  if (existing.Item) {
    throw new Error("An account with this email already exists.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: StoredUser = { id: crypto.randomUUID(), name, email, passwordHash, role: "user" };
  await db.send(new PutCommand({ TableName: USERS_TABLE, Item: user }));
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Only register OAuth providers when their credentials are configured —
    // passing empty strings causes NextAuth to throw a server error.
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []),
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [FacebookProvider({
          clientId: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        })]
      : []),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const result = await db.send(
            new GetCommand({ TableName: USERS_TABLE, Key: { email: credentials.email } })
          );
          const user = result.Item as StoredUser | undefined;
          if (!user) return null;
          const valid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!valid) return null;
          return { id: user.id, name: user.name, email: user.email, role: user.role ?? "user" };
        } catch (err) {
          console.error("[auth] authorize error:", err);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  // NEXTAUTH_SECRET must be set in Amplify env vars.
  // Fallback keeps the app running but sessions won't persist across Lambda cold starts.
  secret: process.env.NEXTAUTH_SECRET ?? "edutoys-fallback-secret-set-NEXTAUTH_SECRET-in-amplify",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: UserRole }).role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as UserRole) ?? "user";
      }
      return session;
    },
  },
};
