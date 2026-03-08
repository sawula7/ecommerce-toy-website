import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------------------------
// In-memory user store (replace with a real database in production)
// ---------------------------------------------------------------------------
interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
}

const users: StoredUser[] = [];

export async function registerUser(name: string, email: string, password: string) {
  if (users.find((u) => u.email === email)) {
    throw new Error("An account with this email already exists.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user: StoredUser = { id: crypto.randomUUID(), name, email, passwordHash };
  users.push(user);
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
        const user = users.find((u) => u.email === credentials.email);
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  secret: (() => {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) throw new Error("NEXTAUTH_SECRET environment variable is not set.");
    return secret;
  })(),
};
