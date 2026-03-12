//API TO READ AN IMAGE METADATA FROM THE D1 DATABASE
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;

  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "No key provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const image = await db.prepare(`
    SELECT * FROM images WHERE key = ?
  `).bind(key).first();

  if (!image) {
    return new Response(JSON.stringify({ error: "Image not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ image }), {
    headers: { "Content-Type": "application/json" },
  });
};

