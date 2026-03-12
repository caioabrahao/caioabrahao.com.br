-- Migration number: 0002 	 2026-03-12T16:46:57.981Z
CREATE TABLE IF NOT EXISTS album_images (
  album_id  INTEGER NOT NULL,
  image_key TEXT NOT NULL,
  position  INTEGER DEFAULT 0,
  PRIMARY KEY (album_id, image_key)
);
