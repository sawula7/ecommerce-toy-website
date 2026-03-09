import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUploadPresignedUrl } from "@/lib/s3";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4", "video/webm"];

// POST /api/upload — admin/manager only; returns a presigned S3 PUT URL.
// The browser then PUTs the file directly to S3 — file bytes never pass through Lambda.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!["admin", "manager"].includes(session?.user?.role ?? "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { filename, contentType } = await req.json();

  if (!filename || !contentType) {
    return NextResponse.json({ error: "filename and contentType are required" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const ext = filename.split(".").pop() ?? "bin";
  const key = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { uploadUrl, publicUrl } = await getUploadPresignedUrl(key, contentType);

  return NextResponse.json({ uploadUrl, publicUrl });
}
