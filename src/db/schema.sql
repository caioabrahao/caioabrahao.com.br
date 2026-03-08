CREATE TABLE IF NOT EXISTS images (
    id  INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    size INTEGER,
    uploaded_at TEXT,
    is_public INTEGER default 0,

    -- EXIF
    exif_iso          TEXT,
    exif_shutter      TEXT,
    exif_aperture     TEXT,
    exif_width        INTEGER,
    exif_height       INTEGER,
    exif_taken_at     TEXT,
    exif_make         TEXT,
    exif_model        TEXT,
    exif_focal_length TEXT,
    exif_flash        TEXT,
    exif_exposure     TEXT,
    exif_metering     TEXT
);