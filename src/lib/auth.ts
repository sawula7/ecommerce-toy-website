import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { db, USERS_TABLE } from "@/lib/dynamodb";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

export async function registerUser(name: string, email: string, password: string) {
  const existing = await db.send(new GetCommand({ TableName: USERS_TABLE, Key: { email } }));
  if (existing.Item) {
    throw new Error("An account with this email already exists.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: StoredUser = { id: crypto.randomUUID(), name, email, passwordHash };
  await db.send(new PutCommand({ TableName: USERS_TABLE, Item: user }));
  return { id: user.id, name: user.name, email: user.email };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const result = await db.send(
          new GetCommand({ TableName: USERS_TABLE, Key: { email: credentials.email } })
        );
        const user = result.Item as StoredUser | undefined;
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: (() => {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) throw new Error("NEXTAUTH_SECRET environment variable is not set.");
    return secret;
  })(),
};
