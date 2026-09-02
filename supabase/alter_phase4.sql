-- Phase 4: Add media_gallery to events for the Vibe section
ALTER TABLE events ADD COLUMN media_gallery JSONB DEFAULT '[]'::jsonb;
