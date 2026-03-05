// src/pages/api/upload.ts
import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "node:buffer";
// import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from "astro:env/server";


// 1. Create the S3 client pointed at Cloudflare R2
const s3 = new S3Client({
  region: "auto",                          // R2 uses "auto" as the region
  endpoint: `https://${import.meta.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
  },
});

export const POST: APIRoute = async ({ request }) => {
  // 2. Parse the incoming form data
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return new Response(JSON.stringify({ error: "No file provided" }), {
      status: 400,
    });
  }

  // 3. Convert the File to a Buffer (what S3 expects)
  const buffer = Buffer.from(await file.arrayBuffer());

  // 4. Create a unique filename to avoid collisions
  const filename = `${Date.now()}-${file.name}`;

  // 5. Upload to R2
  await s3.send(
    new PutObjectCommand({
      Bucket: import.meta.env.R2_BUCKET_NAME,
      Key: filename,           // the path/name inside the bucket
      Body: buffer,
      ContentType: file.type,  // e.g. "image/png"
    })
  );

  // 6. Return the public URL (if your bucket is public)
  const url = `${import.meta.env.R2_PUBLIC_URL}/${filename}`;
  return new Response(JSON.stringify({ url, filename }), { status: 200 });
};