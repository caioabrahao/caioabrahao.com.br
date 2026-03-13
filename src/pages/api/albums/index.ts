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

//list ALL albums
export const GET: APIRoute = async ({ locals, request }) => {
    const db = locals.runtime.env.DB;

    const url = new URL(request.url);
    // const slug = url.searchParams.get("slug");
    // const isPublic = url.searchParams.get("isPublic");


	try{
        const query = await db.prepare(`
        SELECT * FROM albums ORDER BY created_at DESC
        `).run()

        if(query.results.length === 0){
            console.warn("The Request went fine, but theres no albums! in the database!")
            return new Response(JSON.stringify({ albums: "No Albums Found!" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ albums: query.results }), {
        headers: { "Content-Type": "application/json" },
        });
    } catch(err){
        console.error("Fetch failed:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch album list!" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }


}