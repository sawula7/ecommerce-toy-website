import { NextRequest, NextResponse } from "next/server";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { auth } from "@/lib/auth";
import { db, CATEGORIES_TABLE } from "@/lib/dynamodb";

export interface CategoryItem {
  name: string;
  image?: string;
  createdAt: string;
}

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    name: "STEM Toys",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
    createdAt: new Date(0).toISOString(),
  },
  {
    name: "DIY Puzzles",
    image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&h=400&fit=crop&auto=format",
    createdAt: new Date(0).toISOString(),
  },
  {
    name: "Wooden Toys",
    image: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=600&h=400&fit=crop&auto=format",
    createdAt: new Date(0).toISOString(),
  },
];

export async function GET() {
  const result = await db.send(new ScanCommand({ TableName: CATEGORIES_TABLE }));
  let items = (result.Items ?? []) as CategoryItem[];

  // Seed defaults if table is empty
  if (items.length === 0) {
    await Promise.all(
      DEFAULT_CATEGORIES.map((cat) =>
        db.send(new PutCommand({
          TableName: CATEGORIES_TABLE,
          ConditionExpression: "attribute_not_exists(#n)",
          ExpressionAttributeNames: { "#n": "name" },
          Item: cat,
        })).catch(() => {/* already exists */})
      )
    );
    items = DEFAULT_CATEGORIES;
  }

  const sorted = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!["admin", "manager"].includes(session?.user?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, image } = await req.json() as { name?: string; image?: string };
  const trimmed = name?.trim();
  if (!trimmed) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const item: CategoryItem = { name: trimmed, createdAt: new Date().toISOString() };
  if (image?.trim()) item.image = image.trim();

  try {
    await db.send(new PutCommand({
      TableName: CATEGORIES_TABLE,
      ConditionExpression: "attribute_not_exists(#n)",
      ExpressionAttributeNames: { "#n": "name" },
      Item: item,
    }));
  } catch {
    return NextResponse.json({ error: "Category already exists" }, { status: 409 });
  }

  return NextResponse.json(item, { status: 201 });
}
