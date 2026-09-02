-- Haven Productions: Supabase Schema & Seed Data
-- Run this in your Supabase SQL Editor

-- 1. Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Tables
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name TEXT NOT NULL,
    tagline TEXT,
    logo_url TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT,
    instagram_url TEXT,
    facebook_url TEXT,
    youtube_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    whatsapp_number TEXT,
    theme TEXT DEFAULT 'modern',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    venue TEXT,
    city TEXT,
    vertical TEXT NOT NULL,
    status TEXT CHECK (status IN ('upcoming', 'past')),
    hero_image_url TEXT,
    description TEXT,
    expected_attendance INTEGER,
    sponsorship_open BOOLEAN DEFAULT FALSE,
    collab_open BOOLEAN DEFAULT FALSE,
    sponsorship_spots_remaining INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    vertical TEXT NOT NULL,
    client TEXT,
    media_url TEXT,
    thumbnail_url TEXT,
    description TEXT,
    metrics TEXT,
    year INTEGER,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    persona TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    photo_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT,
    thumbnail_url TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE sponsorship_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    production_title TEXT NOT NULL,
    vertical TEXT NOT NULL,
    tier TEXT NOT NULL,
    price NUMERIC,
    reach TEXT,
    spots_total INTEGER,
    spots_remaining INTEGER,
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    photo_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create Policies (Public Read, Authenticated Write)
CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read access" ON sponsorship_inventory FOR SELECT USING (active = true);
CREATE POLICY "Allow public read access" ON team_members FOR SELECT USING (true);

-- 4. Seed Data

INSERT INTO site_settings (id, brand_name, tagline, logo_url, email, phone, address, city, country, instagram_url, facebook_url, youtube_url, twitter_url, linkedin_url, whatsapp_number, theme)
VALUES (
    'd8a9e0f1-4321-4f9a-8d32-23c31e9c56fa',
    'Haven Productions',
    'From Studio to Stage',
    '/logo.png',
    'hello@havenproductions.com',
    '+91 98765 43210',
    '12 Studio Lane, Bandra West',
    'Mumbai',
    'India',
    'https://instagram.com/havenproductions',
    'https://facebook.com/havenproductions',
    'https://youtube.com/@havenproductions',
    'https://twitter.com/havenprodn',
    'https://linkedin.com/company/havenproductions',
    '+919876543210',
    'modern'
);

INSERT INTO events (id, title, slug, date, venue, city, vertical, status, hero_image_url, description, expected_attendance, sponsorship_open, collab_open, sponsorship_spots_remaining, featured)
VALUES
    ('c4e3b1a2-5f6d-7e8c-9d0b-1a2b3c4d5e6f', 'Neon Nights — Mumbai', 'neon-nights-mumbai-2025', '2025-02-15 19:00:00+00', 'Dome NSCI', 'Mumbai', 'events', 'upcoming', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80', 'An electric night of indie music and brand activations, drawing 5,000+ music lovers.', 5000, true, true, 3, true),
    ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Rhythm & Roots Festival', 'rhythm-roots-festival-2025', '2025-03-22 16:00:00+00', 'Phoenix Palladium Grounds', 'Bangalore', 'music', 'upcoming', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80', 'A roots and world music celebration bringing together artists across genres.', 8000, true, false, 5, false),
    ('f9e8d7c6-b5a4-9e8d-7c6b-5a4b3c2d1e0f', 'Haven Presents: Deep Focus', 'deep-focus-audio-launch-2024', '2024-11-10 18:00:00+00', 'Blue Frog', 'Mumbai', 'audio', 'past', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80', 'A sold-out album launch event that garnered 2M+ streams in its first week.', 600, false, false, 0, false);

INSERT INTO portfolio_items (title, vertical, client, thumbnail_url, description, metrics, year, featured)
VALUES
    ('Breakout EP — Arjun Mehta', 'music', 'Arjun Mehta', 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&q=80', 'End-to-end EP production — writing, recording, mixing, mastering, and distribution.', '4.2M streams in 60 days, charted on Spotify India Viral 50', 2024, true),
    ('ReLaunch Ad Campaign — NovaBev', 'film', 'NovaBev Beverages', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', '3-spot ad campaign produced in 12 days for a national product relaunch.', '120M impressions, 38% brand-recall lift', 2024, true),
    ('Starfield Corporate Summit', 'events', 'Starfield Corp', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', 'Full-stack event production for a 1,200-delegate global leadership summit.', 'Zero incidents, 98% delegate satisfaction', 2024, true),
    ('The Midnight Verse — Podcast', 'audio', 'Self-produced', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80', 'Full production and global launch of a 12-episode storytelling podcast.', '#1 on Spotify India Podcasts', 2023, false),
    ('Apex Brand Activation', 'sponsorship', 'Apex Sports', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', 'Title sponsorship placement across 4 major concert events.', '12M+ reach, 3.2x ROI, 47K brand interactions', 2024, false);

INSERT INTO testimonials (name, role, company, persona, quote, rating, photo_url, featured)
VALUES
    ('Arjun Mehta', 'Independent Artist', NULL, 'artist', 'Haven took my raw demos and turned them into something I am genuinely proud to release. 4M+ streams later, I can say they didn''t just produce my music — they launched my career.', 5, 'https://randomuser.me/api/portraits/men/32.jpg', true),
    ('Priya Nair', 'Brand Marketing Lead', 'NovaBev Beverages', 'brand', 'We needed a production partner who understood brand ROI, not just creative flair. Haven delivered our entire 3-spot campaign in 12 days and it pulled a 38% brand-recall lift.', 5, 'https://randomuser.me/api/portraits/women/44.jpg', true),
    ('Rajan Verma', 'CMO', 'Apex Sports', 'sponsor', 'The sponsorship placement was seamless. Category exclusivity, real audience data, and a partnerships team that actually follows up with results. 3.2x ROI on our first activation.', 5, 'https://randomuser.me/api/portraits/men/55.jpg', true),
    ('Sunita Krishnan', 'Events Head', 'Starfield Corp', 'events', 'A 1,200-delegate summit with zero incidents. Haven handled permits, AV, catering coordination, and contingency — we just walked in as the host. Will never use another vendor.', 5, 'https://randomuser.me/api/portraits/women/28.jpg', true);

INSERT INTO blog_posts (title, slug, excerpt, content, category, thumbnail_url, published)
VALUES
    ('How to Take an Unsigned Artist from Studio to Streaming Charts in 45 Days', 'unsigned-artist-studio-to-streaming-45-days', 'The exact production sprint we run to guarantee release schedules.', 'Full content goes here...', 'music', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80', true),
    ('The Sponsorship Deck That Actually Converts: A Brand Marketer''s Checklist', 'sponsorship-deck-that-converts-brand-checklist', 'Most sponsorship pitches fail before a brand even reads them.', 'Full content goes here...', 'sponsorship', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', true);

INSERT INTO sponsorship_inventory (production_title, vertical, tier, price, reach, spots_total, spots_remaining, event_id)
VALUES
    ('Neon Nights — Mumbai', 'events', 'title', 500000, '5,000 in-venue + 500K social reach', 1, 1, 'c4e3b1a2-5f6d-7e8c-9d0b-1a2b3c4d5e6f'),
    ('Neon Nights — Mumbai', 'events', 'co-sponsor', 200000, '5,000 in-venue + 200K social reach', 3, 2, 'c4e3b1a2-5f6d-7e8c-9d0b-1a2b3c4d5e6f'),
    ('Rhythm & Roots Festival', 'music', 'title', 750000, '8,000 in-venue + 800K social reach', 1, 1, 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d');
