import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { authOptions } from "@/lib/auth";
import { db, PRODUCTS_TABLE } from "@/lib/dynamodb";
import { products as staticProducts } from "@/data/products";

const ADMIN_EMAIL = "admin@edutoys.lk";

// GET /api/products — public; seeds DynamoDB from static data on first run
export async function GET() {
  const result = await db.send(new ScanCommand({ TableName: PRODUCTS_TABLE }));
  let items = result.Items ?? [];

  // First-run seed
  if (items.length === 0) {
    await Promise.all(
      staticProducts.map((p) =>
        db.send(new PutCommand({ TableName: PRODUCTS_TABLE, Item: p }))
      )
    );
    items = staticProducts;
  }

  items.sort((a, b) => (a.id as number) - (b.id as number));
  return NextResponse.json(items);
}

// POST /api/products — add new product (admin only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  // Determine next ID from existing items
  const scanResult = await db.send(
    new ScanCommand({
      TableName: PRODUCTS_TABLE,
      ProjectionExpression: "id",
    })
  );
  const maxId = Math.max(...(scanResult.Items ?? []).map((p) => p.id as number), 0);
  const product = { ...body, id: maxId + 1 };

  await db.send(new PutCommand({ TableName: PRODUCTS_TABLE, Item: product }));

  return NextResponse.json(product, { status: 201 });
}
