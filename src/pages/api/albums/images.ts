import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
    const db = locals.runtime.env.DB;
    const { album_id, image_key } = await request.json();

    if(!album_id || !image_key){
        return new Response(JSON.stringify({ error: "Either album_id or image_key were not properly received!"}), {
        status: 400,
        headers: { "Content-Type": "application/json" },
        });
    }

    try{
        const nextPos = await db.prepare(`
        SELECT COALESCE(MAX(position) + 1, 0) as next_position FROM album_images WHERE album_id = ?
        `)
        .bind(album_id).first()
        const position = nextPos?.next_position ?? 0;

        const insertQuery = await db.prepare(`
        INSERT INTO album_images (album_id, image_key, position)
        VALUES (?, ?, ?)
        `)
        .bind(album_id, image_key, position).run()
        
        
        return new Response(JSON.stringify({ album_id, image_key, position }), {
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