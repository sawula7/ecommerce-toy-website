import { NextRequest, NextResponse } from "next/server";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { db, USERS_TABLE } from "@/lib/dynamodb";

// Temporary debug endpoint — remove after fixing login.
// GET /api/debug-auth?email=you@example.com
// Returns: table name, whether user was found, field names present.
// Does NOT return passwords or sensitive data.
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Pass ?email=..." });
  }

  try {
    const result = await db.send(
      new GetCommand({ TableName: USERS_TABLE, Key: { email } })
    );
    const item = result.Item;
    return NextResponse.json({
      table: USERS_TABLE,
      found: !!item,
      // only return the field names (keys), not the values
      fields: item ? Object.keys(item) : [],
      hasPasswordHash: item ? "passwordHash" in item : false,
    });
  } catch (err: unknown) {
    return NextResponse.json({
      table: USERS_TABLE,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
