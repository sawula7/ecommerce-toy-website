import { NextResponse } from "next/server";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { auth } from "@/lib/auth";
import { db, USERS_TABLE } from "@/lib/dynamodb";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await db.send(new ScanCommand({ TableName: USERS_TABLE }));
  const users = (result.Items ?? []).map(({ passwordHash: _ph, ...u }) => u);

  return NextResponse.json(users);
}
