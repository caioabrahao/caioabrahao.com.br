import type { APIRoute } from "astro";
import { slugify } from "../../../lib/slugify"



export const POST: APIRoute = async ({ request, locals }) => {
    const db = locals.runtime.env.DB;
    const { title, description, visibility } = await request.json();

    if (!title) {
    return new Response(JSON.stringify({ error: "Title is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
    }

    try{
        const query = await db.prepare(`
        INSERT INTO albums (slug, title, description, cover_key, is_public, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        `)
        .bind(
            slugify(title),
            title,
            description,
            null, //you can add this one later
            visibility ? 1 : 0,
            new Date().toISOString()
        ).run()

        return new Response(JSON.stringify({query, slug: slugify(title)}), {
            status: 201,
            headers: { "Content-Type": "application/json" }
        });
    }catch(err){
        return new Response(JSON.stringify({ error: "Something went wrong...", err }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
}