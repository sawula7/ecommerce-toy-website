import { NextRequest, NextResponse } from "next/server";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { auth } from "@/lib/auth";
import { db, USERS_TABLE } from "@/lib/dynamodb";
import type { UserRole } from "@/types/next-auth";

const VALID_ROLES: UserRole[] = ["admin", "manager", "user"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email } = await params;
  const { role } = await req.json() as { role: UserRole };

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  }

  await db.send(
    new UpdateCommand({
      TableName: USERS_TABLE,
      Key: { email: decodeURIComponent(email) },
      UpdateExpression: "SET #r = :role",
      ExpressionAttributeNames: { "#r": "role" },
      ExpressionAttributeValues: { ":role": role },
    })
  );

  return NextResponse.json({ ok: true });
}
