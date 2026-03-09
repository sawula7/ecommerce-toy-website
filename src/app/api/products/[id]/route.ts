import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { authOptions } from "@/lib/auth";
import { db, PRODUCTS_TABLE } from "@/lib/dynamodb";

// PATCH /api/products/[id] — update stock (admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!["admin", "manager"].includes(session?.user?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { stock } = await req.json();

  await db.send(
    new UpdateCommand({
      TableName: PRODUCTS_TABLE,
      Key: { id: Number(id) },
      UpdateExpression: "SET stock = :stock",
      ExpressionAttributeValues: { ":stock": stock },
    })
  );

  return NextResponse.json({ success: true });
}
