import { NextRequest, NextResponse } from "next/server";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
import { db, USERS_TABLE } from "@/lib/dynamodb";
import { sendPasswordResetEmail } from "@/lib/ses";

export async function POST(req: NextRequest) {
  const { email } = await req.json() as { email?: string };
  const normalised = email?.trim().toLowerCase();

  if (!normalised) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Always respond with the same message to avoid user enumeration
  const ok = NextResponse.json({
    message: "If an account exists for that email, a reset link has been sent.",
  });

  const result = await db.send(new GetCommand({ TableName: USERS_TABLE, Key: { email: normalised } }));
  if (!result.Item) return ok;

  // Only accounts with a passwordHash can use email-based reset
  if (!result.Item.passwordHash) return ok;

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min

  await db.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { email: normalised },
      UpdateExpression: "SET resetToken = :t, resetTokenExpiry = :e",
      ExpressionAttributeValues: { ":t": token, ":e": expiry },
    })
  );

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  try {
    await sendPasswordResetEmail(normalised, resetUrl);
  } catch (err) {
    console.error("[forgot-password] SES send failed:", err);
    // Don't expose email send failures to the client
  }

  return ok;
}
