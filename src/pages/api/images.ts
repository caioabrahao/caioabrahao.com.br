import type { APIRoute } from "astro";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from "astro:env/server";

//setup the client credentials
const s3 = new S3Client({
  region: "auto",                          
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

//setup the bucket as one single component with its parameters
const bucketParams = {
    Bucket: R2_BUCKET_NAME,
    MaxKeys: 100,
}

//make the function that lists the whole thing
const listObjects = async () => {
    try{
        const command = new ListObjectsV2Command(bucketParams);
        const data = await s3.send(command);

        console.log("Success", data.Contents);

        return data;
    } catch (err){
        console.error("Error", err);
        return undefined;
    }
}

//expose de api route
export const GET: APIRoute = async () => {
    //format the s3 response into clean json
    const data = await listObjects();

    if (!data) {
    return new Response(JSON.stringify({ error: "Failed to list images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
    }

    const parsed = (data?.Contents ?? []).map((item) => ({
        filename: item.Key ?? "",
        url: `${R2_PUBLIC_URL}/${item.Key ?? ""}`
    }))
    .sort((a, b) => b.filename.localeCompare(a.filename)); // newest first

    const jsonOutput = JSON.stringify({ images: parsed });

    return new Response(jsonOutput, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};
