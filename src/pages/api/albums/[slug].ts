import type { APIContext, APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals, params }: APIContext) => {
  const slug = params.slug;
  const db = locals.runtime.env.DB;
  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  try{
    const albumQuery = await db.prepare(`
    SELECT * FROM albums WHERE slug = ?
    `).bind(slug).first()

    if(albumQuery === null){
      return new Response(JSON.stringify({ error: `The album ${slug} does not exist!` }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
      });
    }

    const imagesQuery = await db.prepare(`
      SELECT images.key, images.url, album_images.position
      FROM album_images
      JOIN images ON album_images.image_key = images.key
      JOIN albums ON album_images.album_id = albums.id
      WHERE albums.slug = ?
      ORDER BY album_images.position ASC
    `).bind(slug).run();

    return new Response(JSON.stringify({ 
      album: albumQuery,
      images: imagesQuery.results }), {
      headers: { "Content-Type": "application/json" },
    });

  }catch(err){
    console.error("Fetch failed:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch album information" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
    });
  }

}