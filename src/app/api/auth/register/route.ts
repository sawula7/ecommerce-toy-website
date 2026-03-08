import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const user = await registerUser(name, email, password);
    return NextResponse.json({ message: "Account created successfully.", user }, { status: 201 });
  } catch (err: unknown) {
    // Log full error server-side; return generic message to client
    console.error("[register]", err);
    const isKnown = err instanceof Error && err.message.includes("already exists");
    const message = isKnown ? (err as Error).message : "Registration failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
