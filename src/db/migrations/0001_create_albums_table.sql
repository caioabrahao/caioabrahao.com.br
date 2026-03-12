-- Migration number: 0001 	 2026-03-12T16:46:18.813Z
CREATE TABLE IF NOT EXISTS albums (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  description TEXT,
  cover_key   TEXT,
  is_public   INTEGER DEFAULT 0,
  created_at  TEXT
);
