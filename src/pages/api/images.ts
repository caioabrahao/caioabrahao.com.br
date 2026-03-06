// API SERVICE TO RETURN A LIST OF ALL THE IMAGES IN THE BUCKET
import type { APIRoute } from "astro";
import { S3Client, ListObjectsV2Command, type ListObjectsV2CommandInput } from "@aws-sdk/client-s3";
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from "astro:env/server";

const enableRequestCashing = false; //toggle caching for dev purposes

//setup the client credentials
const s3 = new S3Client({
  region: "auto",                          
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

//make the function that lists the whole thing
const listObjects = async (params: ListObjectsV2CommandInput) => {
    try{
        const command = new ListObjectsV2Command(params);
        const data = await s3.send(command);

        console.log("Success", data.Contents);

        return data;
    } catch (err){
        console.error("Error", err);
        return undefined;
    }
}

//Handle cashing to avoid calling the S3 api every time
const cache = new Map<string, {images:{ filename: string; url: string}[]; timestamp: number}>();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(maxKeys: number, prefix: string, order: string){
  return `${maxKeys}-${prefix}-${order}`
}

function isCacheValid(key: string) {
  const entry = cache.get(key);
  if(!entry) return false;
  return Date.now() - entry.timestamp < CACHE_TTL;
}

//expose de api route
export const GET: APIRoute = async ({request}) => {

  //setup query params
  const url = new URL(request.url);
  const maxKeys = Number(url.searchParams.get("maxKeys")) || 100; //get maxKeys from url parameters, defaults to 100 requests
  const prefix = url.searchParams.get("prefix") ?? "";
  const order = url.searchParams.get("order") ?? "desc";

  //setup the bucket as one single component with its parameters
  const bucketParams = {
      Bucket: R2_BUCKET_NAME,
      MaxKeys: maxKeys,
      Prefix: prefix,
      Delimiter: "/", //directory separator
  };

  const cacheKey = getCacheKey(maxKeys, prefix, order);
  // return cache if its still fresh
  if (enableRequestCashing && isCacheValid(cacheKey)) {
    return new Response(JSON.stringify({ images: cache.get(cacheKey)!.images }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  // otherwise fetch from R2
  const data = await listObjects(bucketParams);

  if (!data) {
    return new Response(JSON.stringify({ error: "Failed to list images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // build, store, and return the fresh list
  // const cachedImages = (data.Contents ?? [])
  //   .map((item) => ({
  //     filename: item.Key ?? "",
  //     url: `${R2_PUBLIC_URL}/${item.Key ?? ""}`,
  //   }))
  //   .sort((a, b) => b.filename.localeCompare(a.filename));

  //Defining images vs folders(directories)
  const images = (data.Contents ?? [])
  .map((item) => ({
    type: "file" as const,
    filename: item.Key ?? "",
    url: `${R2_PUBLIC_URL}/${item.Key ?? ""}`,
  }))
  .sort((a, b) =>
    order === "desc"
      ? b.filename.localeCompare(a.filename)
      : a.filename.localeCompare(b.filename)
  );
  const folders = (data.CommonPrefixes ?? []).map((p) => ({
    type: "folder" as const,
    prefix: p.Prefix ?? "",
    name: p.Prefix?.replace(prefix, "").replace("/", "") ?? "", // just the folder name, not full path
  }));

  if(enableRequestCashing){
    cache.set(cacheKey, { images, timestamp: Date.now() }); //take the json response and save it to the cache map.
  }

  return new Response(JSON.stringify({ images, folders }), {
    headers: { "Content-Type": "application/json" },
  });

};

export function invalidateImageCache() {
  cache.clear();
}