-- Phase 3: Alter site_settings to support light/dark logos
ALTER TABLE site_settings RENAME COLUMN logo_url TO light_logo_url;
ALTER TABLE site_settings ADD COLUMN dark_logo_url TEXT;

UPDATE site_settings SET light_logo_url = '/logo.png', dark_logo_url = '/logo-dark.png';

-- Create Supabase Storage Bucket for Media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('media', 'media', true) 
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'media');

CREATE POLICY "Authenticated Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated Updates" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'media');

CREATE POLICY "Authenticated Deletes" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'media');
