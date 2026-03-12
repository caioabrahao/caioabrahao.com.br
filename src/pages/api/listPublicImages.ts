//API TO LIST ALL IS_PUBLIC = 1 IMAGES IN THE DATABASE
import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ locals }) => {
    const db = locals.runtime.env.DB;

	try{
        const query = await db.prepare(`
        SELECT key, url, uploaded_at FROM images WHERE is_public = 1 ORDER BY uploaded_at DESC
        `).run()

        if(query.results.length === 0){
            console.warn("The Request went fine, but theres no public images in the database!")
        }

        return new Response(JSON.stringify({ images: query.results }), {
        headers: { "Content-Type": "application/json" },
        });
    } catch(err){
        console.error("Fetch failed:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch a public image" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }


}
	