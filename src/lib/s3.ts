import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "ap-southeast-1",
});

const BUCKET = process.env.AWS_S3_BUCKET!;
const REGION = process.env.AWS_REGION ?? "ap-southeast-1";

/**
 * Generate a presigned PUT URL so the browser can upload directly to S3.
 * The Lambda never touches the file bytes — only the presigned URL is generated here.
 *
 * @param key  S3 object key, e.g. "products/1234567890-photo.jpg"
 * @param contentType  MIME type of the file, e.g. "image/jpeg"
 * @returns uploadUrl — PUT this URL directly from the browser (expires in 5 min)
 * @returns publicUrl — permanent URL of the uploaded object
 */
export async function getUploadPresignedUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

  return { uploadUrl, publicUrl };
}
