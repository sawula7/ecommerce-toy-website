import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcryptjs";
import { db, USERS_TABLE } from "@/lib/dynamodb";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json() as { token?: string; password?: string };

  if (!token || !password) {
    return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // Find user by token
  const result = await db.send(
    new ScanCommand({
      TableName: USERS_TABLE,
      FilterExpression: "resetToken = :t",
      ExpressionAttributeValues: { ":t": token },
    })
  );

  const user = result.Items?.[0];
  if (!user) {
    return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
  }

  // Check expiry
  if (!user.resetTokenExpiry || new Date(user.resetTokenExpiry) < new Date()) {
    return NextResponse.json({ error: "Reset link has expired. Please request a new one." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { email: user.email },
      UpdateExpression: "SET passwordHash = :h REMOVE resetToken, resetTokenExpiry",
      ExpressionAttributeValues: { ":h": passwordHash },
    })
  );

  return NextResponse.json({ message: "Password updated successfully" });
}
