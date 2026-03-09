import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { auth } from "@/lib/auth";
import { db, CATEGORIES_TABLE } from "@/lib/dynamodb";

const DEFAULT_CATEGORIES = ["STEM Toys", "DIY Puzzles", "Wooden Toys"];

export async function GET() {
  const result = await db.send(new ScanCommand({ TableName: CATEGORIES_TABLE }));
  let items = result.Items ?? [];

  // Seed defaults if table is empty
  if (items.length === 0) {
    await Promise.all(
      DEFAULT_CATEGORIES.map((name) =>
        db.send(new PutCommand({
          TableName: CATEGORIES_TABLE,
          ConditionExpression: "attribute_not_exists(#n)",
          ExpressionAttributeNames: { "#n": "name" },
          Item: { name, createdAt: new Date().toISOString() },
        })).catch(() => {/* already exists */})
      )
    );
    items = DEFAULT_CATEGORIES.map((name) => ({ name, createdAt: new Date().toISOString() }));
  }

  const names = items.map((i) => i.name as string).sort();
  return NextResponse.json(names);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!["admin", "manager"].includes(session?.user?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name } = await req.json() as { name?: string };
  const trimmed = name?.trim();
  if (!trimmed) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    await db.send(new PutCommand({
      TableName: CATEGORIES_TABLE,
      ConditionExpression: "attribute_not_exists(#n)",
      ExpressionAttributeNames: { "#n": "name" },
      Item: { name: trimmed, createdAt: new Date().toISOString() },
    }));
  } catch {
    return NextResponse.json({ error: "Category already exists" }, { status: 409 });
  }

  return NextResponse.json({ name: trimmed }, { status: 201 });
}
