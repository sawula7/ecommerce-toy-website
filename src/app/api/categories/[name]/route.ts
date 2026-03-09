import { NextRequest, NextResponse } from "next/server";
import { DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { auth } from "@/lib/auth";
import { db, CATEGORIES_TABLE, PRODUCTS_TABLE } from "@/lib/dynamodb";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const session = await auth();
  if (!["admin", "manager"].includes(session?.user?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  // Block deletion if any product uses this category
  const products = await db.send(
    new ScanCommand({
      TableName: PRODUCTS_TABLE,
      FilterExpression: "category = :cat",
      ExpressionAttributeValues: { ":cat": categoryName },
      Select: "COUNT",
    })
  );

  if ((products.Count ?? 0) > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${products.Count} product(s) use this category` },
      { status: 409 }
    );
  }

  await db.send(
    new DeleteCommand({ TableName: CATEGORIES_TABLE, Key: { name: categoryName } })
  );

  return NextResponse.json({ ok: true });
}
