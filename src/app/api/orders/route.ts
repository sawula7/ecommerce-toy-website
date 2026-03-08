import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ScanCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { authOptions } from "@/lib/auth";
import { db, ORDERS_TABLE } from "@/lib/dynamodb";

const ADMIN_EMAIL = "admin@edutoys.lk";

// GET /api/orders — admin gets all; logged-in user gets their own
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (session.user.email === ADMIN_EMAIL) {
    const result = await db.send(new ScanCommand({ TableName: ORDERS_TABLE }));
    const orders = (result.Items ?? []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json(orders);
  }

  // Regular user — query by GSI
  const result = await db.send(
    new QueryCommand({
      TableName: ORDERS_TABLE,
      IndexName: "userEmail-index",
      KeyConditionExpression: "userEmail = :email",
      ExpressionAttributeValues: { ":email": session.user.email },
    })
  );
  const orders = (result.Items ?? []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(orders);
}

// POST /api/orders — create order (guest or logged-in)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = `ET-${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString();

  const order = {
    ...body,
    id,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  await db.send(new PutCommand({ TableName: ORDERS_TABLE, Item: order }));

  return NextResponse.json(order, { status: 201 });
}
