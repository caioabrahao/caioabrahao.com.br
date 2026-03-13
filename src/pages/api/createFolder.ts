import type { APIRoute } from "astro";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { R2_BUCKET_NAME } from "astro:env/server";
import { s3 } from "../../lib/s3Client"

export const POST: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const folderName = url.searchParams.get("folderName");

    if (!folderName) {
    return new Response(JSON.stringify({ error: "Please provide a folder name" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
    
    try{
        await s3.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: (folderName + '/'),
            Body: '',
        }));

        return new Response(JSON.stringify({ success: true, folder: folderName + "/"}), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }catch (err) {
    console.error("Error updating!", err);
    return new Response(JSON.stringify({ error: "Failed to create directory!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

}