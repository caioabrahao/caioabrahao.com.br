import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "node:buffer";
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from "astro:env/server";
import { invalidateImageCache } from "./images";
import exifr from "exifr";
import "../../../env.d.ts"


// 1. Create the S3 client pointed at Cloudflare R2
const s3 = new S3Client({
  region: "auto",                          // R2 uses "auto" as the region
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export const POST: APIRoute = async ({ request, locals }) => {
    const db = locals.runtime.env.DB; // D1 database

  // 2. Parse the incoming form data
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

   if (!files.length) {
    return new Response(JSON.stringify({ error: "No files provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const uploads = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const url = `${R2_PUBLIC_URL}/${filename}`;

      await s3.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: file.type,
      }));

      // --- 2. Extract EXIF ---
      // exifr.parse returns null if no EXIF data found (e.g. screenshots, PNGs)
      const exif = await exifr.parse(buffer, {
        pick: [
          "ISO",
          "ExposureTime",
          "FNumber",
          "ImageWidth",
          "ImageHeight",
          "DateTimeOriginal",
          "Make",
          "Model",
          "FocalLength",
          "Flash",
          "ExposureCompensation",
          "MeteringMode",
        ],
      }).catch(() => null);   // if parsing fails, just continue without EXIF

      // --- 3. Save to D1 ---
      await db.prepare(`
        INSERT INTO images (
          key, url, size, uploaded_at, is_public,
          exif_iso, exif_shutter, exif_aperture,
          exif_width, exif_height, exif_taken_at,
          exif_make, exif_model, exif_focal_length,
          exif_flash, exif_exposure, exif_metering
        ) VALUES (
          ?, ?, ?, ?, 0,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?,
          ?, ?, ?
        )
      `).bind(
        filename,
        url,
        file.size,
        new Date().toISOString(),
        exif?.ISO?.toString() ?? null,
        exif?.ExposureTime ? `1/${Math.round(1 / exif.ExposureTime)}` : null, // converts 0.005 → "1/200"
        exif?.FNumber ? `f/${exif.FNumber}` : null,                           // converts 1.8 → "f/1.8"
        exif?.ImageWidth ?? null,
        exif?.ImageHeight ?? null,
        exif?.DateTimeOriginal?.toISOString() ?? null,
        exif?.Make ?? null,
        exif?.Model ?? null,
        exif?.FocalLength ? `${exif.FocalLength}mm` : null,
        exif?.Flash ?? null,
        exif?.ExposureCompensation?.toString() ?? null,
        exif?.MeteringMode ?? null,
      ).run();
      
      invalidateImageCache();
      return { filename, url };
    })
  );

  return new Response(JSON.stringify({ uploads }), { status: 200 });

};