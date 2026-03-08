import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { authOptions } from "@/lib/auth";
import { db, ORDERS_TABLE } from "@/lib/dynamodb";

const ADMIN_EMAIL = "admin@edutoys.lk";

// PATCH /api/orders/[id] — update order status (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json();
  const now = new Date().toISOString();

  await db.send(
    new UpdateCommand({
      TableName: ORDERS_TABLE,
      Key: { id },
      UpdateExpression: "SET #s = :status, updatedAt = :now",
      ExpressionAttributeNames: { "#s": "status" },
      ExpressionAttributeValues: { ":status": status, ":now": now },
    })
  );

  return NextResponse.json({ success: true });
}
