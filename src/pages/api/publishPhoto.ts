import type { APIRoute } from "astro";

export const PATCH: APIRoute = async ({ request, locals }) => {
  const db = locals.runtime.env.DB;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "No key provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // read the desired value from the request body
  const body = await request.json();
  const is_public = body.is_public ? 1 : 0; // normalize to 0 or 1 for SQLite

  try {
    await db.prepare(`UPDATE images SET is_public = ? WHERE key = ?`)
      .bind(is_public, key)
      .run();

    return new Response(JSON.stringify({ success: true, key, is_public }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error updating!", err);
    return new Response(JSON.stringify({ error: "Failed to update image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};