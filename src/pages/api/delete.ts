//API TO DELETE AN OBJECT FROM THE BUCKET
import type { APIRoute } from "astro";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from "astro:env/server";

const s3 = new S3Client({
  region: "auto",                          
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

const deleteS3Object = async (objectKey:string) => {
  const params = {
    Bucket: R2_BUCKET_NAME, // The name of your S3 bucket
    Key: objectKey,     // The full path/key of the object (e.g., "folder/filename.ext")
  };

  try {
    const command = new DeleteObjectCommand(params);
    const response = await s3.send(command);
    console.log("Object deleted successfully:", response);
    // Note: A successful delete returns a 204 No Content response, even if the object didn't exist.
  } catch (err) {
    console.error("Error deleting object:", err);
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing 'key' query parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await deleteS3Object(key);
    await db.prepare(`DELETE FROM images WHERE key = ?`).bind(key).run();
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("Filed deleting object: ", err)
    throw err;
  }
};