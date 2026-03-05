// src/pages/api/upload.ts
import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "node:buffer";
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from "astro:env/server";


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
  const files = formData.getAll("files") as File[];

   if (!files.length) {
    return new Response(JSON.stringify({ error: "No files provided" }), {
      status: 400,
    });
  }

  const uploads = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;

      await s3.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      }));

      return { filename, url: `${R2_PUBLIC_URL}/${filename}` };
      
    })
  );

  return new Response(JSON.stringify({ uploads }), { status: 200 });

};