import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

import { db, ORDERS_TABLE } from "@/lib/dynamodb";

// PATCH /api/orders/[id] — update order status (admin/manager only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!["admin", "manager"].includes(session?.user?.role ?? "")) {
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
