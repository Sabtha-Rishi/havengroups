-- ================================================================
-- Haven Productions — Supabase Schema
-- Run this entire file in your Supabase SQL Editor
-- ================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- SITE SETTINGS (single-row config table)
-- ================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL DEFAULT 'Haven Productions',
  tagline TEXT NOT NULL DEFAULT 'Where Sound Meets Vision',
  logo_url TEXT,
  email TEXT NOT NULL DEFAULT 'hello@havenproductions.com',
  phone TEXT NOT NULL DEFAULT '+91 98765 43210',
  address TEXT NOT NULL DEFAULT '12 Studio Lane, Bandra West',
  city TEXT NOT NULL DEFAULT 'Mumbai',
  country TEXT NOT NULL DEFAULT 'India',
  instagram_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  whatsapp_number TEXT,
  theme TEXT NOT NULL DEFAULT 'modern' CHECK (theme IN ('premium', 'professional', 'classic', 'modern')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure only one settings row exists
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_singleton ON site_settings ((true));

-- ================================================================
-- EVENTS
-- ================================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  vertical TEXT NOT NULL CHECK (vertical IN ('music', 'film', 'events', 'audio', 'sponsorship')),
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'past')),
  hero_image_url TEXT,
  description TEXT,
  expected_attendance INTEGER,
  sponsorship_open BOOLEAN NOT NULL DEFAULT FALSE,
  collab_open BOOLEAN NOT NULL DEFAULT FALSE,
  sponsorship_spots_remaining INTEGER DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS events_status_idx ON events (status);
CREATE INDEX IF NOT EXISTS events_date_idx ON events (date);
CREATE INDEX IF NOT EXISTS events_vertical_idx ON events (vertical);

-- ================================================================
-- PORTFOLIO ITEMS
-- ================================================================
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  vertical TEXT NOT NULL CHECK (vertical IN ('music', 'film', 'events', 'audio', 'sponsorship')),
  client TEXT,
  media_url TEXT,
  thumbnail_url TEXT,
  description TEXT,
  metrics TEXT,
  year INTEGER,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS portfolio_vertical_idx ON portfolio_items (vertical);
CREATE INDEX IF NOT EXISTS portfolio_featured_idx ON portfolio_items (featured);

-- ================================================================
-- TESTIMONIALS
-- ================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  persona TEXT NOT NULL CHECK (persona IN ('artist', 'brand', 'film', 'events', 'sponsor')),
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  photo_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS testimonials_persona_idx ON testimonials (persona);
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON testimonials (featured);

-- ================================================================
-- BLOG POSTS
-- ================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT NOT NULL CHECK (category IN ('music', 'film', 'events', 'sponsorship', 'industry')),
  thumbnail_url TEXT,
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS blog_published_idx ON blog_posts (published);
CREATE INDEX IF NOT EXISTS blog_category_idx ON blog_posts (category);

-- ================================================================
-- SPONSORSHIP INVENTORY
-- ================================================================
CREATE TABLE IF NOT EXISTS sponsorship_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  production_title TEXT NOT NULL,
  vertical TEXT NOT NULL CHECK (vertical IN ('music', 'film', 'events', 'audio')),
  tier TEXT NOT NULL CHECK (tier IN ('title', 'co-sponsor', 'integration')),
  price DECIMAL(12,2),
  reach TEXT,
  spots_total INTEGER NOT NULL DEFAULT 1,
  spots_remaining INTEGER NOT NULL DEFAULT 1,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS sponsorship_active_idx ON sponsorship_inventory (active);
CREATE INDEX IF NOT EXISTS sponsorship_event_idx ON sponsorship_inventory (event_id);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorship_inventory ENABLE ROW LEVEL SECURITY;

-- Public read access (anon key)
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read portfolio" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read sponsorship_inventory" ON sponsorship_inventory FOR SELECT USING (active = true);

-- Authenticated write access (service_role key / admin dashboard)
CREATE POLICY "Auth write site_settings" ON site_settings FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Auth write events" ON events FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Auth write portfolio" ON portfolio_items FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Auth write testimonials" ON testimonials FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Auth write blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
CREATE POLICY "Auth write sponsorship" ON sponsorship_inventory FOR ALL USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- ================================================================
-- SEED DATA
-- ================================================================

-- Site Settings (one row)
INSERT INTO site_settings (brand_name, tagline, email, phone, address, city, country, instagram_url, youtube_url, whatsapp_number, theme)
VALUES (
  'Haven Productions',
  'Where Sound Meets Vision',
  'hello@havenproductions.com',
  '+91 98765 43210',
  '12 Studio Lane, Bandra West',
  'Mumbai',
  'India',
  'https://instagram.com/havenproductions',
  'https://youtube.com/@havenproductions',
  '+919876543210',
  'modern'
) ON CONFLICT DO NOTHING;

-- Events
INSERT INTO events (title, slug, date, venue, city, vertical, status, hero_image_url, description, expected_attendance, sponsorship_open, collab_open, sponsorship_spots_remaining, featured)
VALUES
  ('Neon Nights — Mumbai', 'neon-nights-mumbai-2025', '2025-02-15 19:00:00+05:30', 'Dome NSCI', 'Mumbai', 'events', 'upcoming', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80', 'An electric night of indie music and brand activations drawing 5,000+ music lovers.', 5000, true, true, 3, true),
  ('Rhythm & Roots Festival', 'rhythm-roots-festival-2025', '2025-03-22 16:00:00+05:30', 'Phoenix Palladium Grounds', 'Bangalore', 'music', 'upcoming', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80', 'A roots and world music celebration bringing together artists across genres.', 8000, true, false, 5, false),
  ('Haven Presents: Deep Focus', 'deep-focus-audio-launch-2024', '2024-11-10 18:00:00+05:30', 'Blue Frog', 'Mumbai', 'audio', 'past', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80', 'A sold-out album launch event that garnered 2M+ streams in its first week.', 600, false, false, 0, false);

-- Portfolio Items
INSERT INTO portfolio_items (title, vertical, client, thumbnail_url, description, metrics, year, featured)
VALUES
  ('Breakout EP — Arjun Mehta', 'music', 'Arjun Mehta', 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&q=80', 'End-to-end EP production — writing, recording, mixing, mastering, and distribution.', '4.2M streams in 60 days, charted on Spotify India Viral 50', 2024, true),
  ('ReLaunch Ad Campaign — NovaBev', 'film', 'NovaBev Beverages', 'https://images.unsplash.com/photo-1536240478700-b869ad10e2f9?w=600&q=80', '3-spot ad campaign produced in 12 days for a national product relaunch.', '120M impressions, 38% brand-recall lift in post-campaign survey', 2024, true),
  ('Starfield Corporate Summit', 'events', 'Starfield Corp', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80', 'Full-stack event production for a 1,200-delegate global leadership summit.', 'Zero incidents, 98% delegate satisfaction, delivered 2 days ahead of schedule', 2024, true),
  ('The Midnight Verse — Podcast', 'audio', 'Self-produced', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80', 'Full production and global launch of a 12-episode storytelling podcast.', '#1 on Spotify India Podcasts, 800K downloads Season 1', 2023, false),
  ('Apex Brand Activation — IPL Season', 'sponsorship', 'Apex Sports', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', 'Title sponsorship placement across 4 major concert events during IPL season.', '12M+ reach, 3.2x ROI, 47K in-venue brand interactions', 2024, false),
  ('Echoes Short Film', 'film', 'Independent', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80', 'Award-winning 22-minute short film, festival circuit distribution.', 'Selected at 8 international festivals, Best Cinematography — CineAsia 2024', 2024, false),
  ('Rise — Debut Album', 'music', 'Priya & the Collective', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80', 'Full 10-track debut album production from scratch to streaming release.', '6.8M streams, featured on Apple Music New Music Daily', 2023, false),
  ('GlowFest Music Weekend', 'events', 'GlowFest Promoters', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80', '2-day outdoor music festival, 18,000 total attendance.', '18K attendees, ₹4.2Cr gate revenue, 7 brand sponsors activated', 2023, false);

-- Testimonials
INSERT INTO testimonials (name, role, company, persona, quote, rating, photo_url, featured)
VALUES
  ('Arjun Mehta', 'Independent Artist', null, 'artist', 'Haven took my raw demos and turned them into something I''m genuinely proud to release. 4M+ streams later, I can say they didn''t just produce my music — they launched my career.', 5, 'https://randomuser.me/api/portraits/men/32.jpg', true),
  ('Priya Nair', 'Brand Marketing Lead', 'NovaBev Beverages', 'brand', 'We needed a production partner who understood brand ROI, not just creative flair. Haven delivered our entire 3-spot campaign in 12 days and it pulled a 38% brand-recall lift.', 5, 'https://randomuser.me/api/portraits/women/44.jpg', true),
  ('Rajan Verma', 'CMO', 'Apex Sports', 'sponsor', 'The sponsorship placement was seamless. Category exclusivity, real audience data, and a partnerships team that actually follows up with results. 3.2x ROI on our first activation.', 5, 'https://randomuser.me/api/portraits/men/55.jpg', true),
  ('Sunita Krishnan', 'Events Head', 'Starfield Corp', 'events', 'A 1,200-delegate summit with zero incidents. Haven handled permits, AV, catering coordination, and contingency — we just walked in as the host. Will never use another vendor.', 5, 'https://randomuser.me/api/portraits/women/28.jpg', true),
  ('Karan Singh', 'Line Producer', 'PixelBay Studios', 'film', 'End-to-end delivery on the ad campaign without a single call from me asking for status updates. That''s the dream. Broadcast-grade output, on-budget, on-schedule.', 5, 'https://randomuser.me/api/portraits/men/67.jpg', false),
  ('Meera Joshi', 'A&R Manager', 'Echo Records', 'artist', 'We sent three emerging artists to Haven this year. All three released on schedule, all three charted. That consistency is rare and it''s why they''re our default production house.', 5, 'https://randomuser.me/api/portraits/women/72.jpg', false),
  ('Devraj Kumar', 'Event Promoter', 'GlowFest', 'events', '18,000 people over two days and we had more compliments on production quality than on the lineup itself. Haven made us look elite.', 5, 'https://randomuser.me/api/portraits/men/81.jpg', false),
  ('Aisha Patel', 'Director', 'Independent', 'film', 'My short film got into 8 festivals. Haven''s crew understood the creative vision and never compromised on it even when the schedule got tight.', 5, 'https://randomuser.me/api/portraits/women/19.jpg', false),
  ('Vikram Narayan', 'VP Marketing', 'ZenFit India', 'sponsor', 'The Neon Nights sponsorship gave us direct access to 5,000 of our exact target demographic. The ROI dashboard Haven sent post-event was detailed enough to justify a 3x bigger budget next season.', 5, 'https://randomuser.me/api/portraits/men/43.jpg', false),
  ('Lakshmi Rao', 'Podcast Host', 'The Midnight Verse', 'artist', 'I came to Haven with a voice memo and a concept. They gave me a #1 podcast. The production quality, the launch strategy, the distribution setup — I couldn''t have done it without them.', 5, 'https://randomuser.me/api/portraits/women/56.jpg', false);

-- Blog Posts
INSERT INTO blog_posts (title, slug, excerpt, category, thumbnail_url, published)
VALUES
  ('How to Take an Unsigned Artist from Studio to Streaming Charts in 45 Days', 'unsigned-artist-studio-to-streaming-45-days', 'The exact production sprint we''ve run 23 times — and why timeline discipline is the biggest differentiator between a song that charts and one that disappears.', 'music', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80', true),
  ('The Sponsorship Deck That Actually Converts: A Brand Marketer''s Checklist', 'sponsorship-deck-that-converts-brand-checklist', 'Most sponsorship pitches fail before a brand even reads them. Here''s what every marketing lead actually wants to see — and what you should cut.', 'sponsorship', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80', true),
  ('5 Things Every Event Production Contract Must Include (That Most Don''t)', 'event-production-contract-must-haves', 'We''ve produced 200+ events. These five clauses have saved clients from disaster — and most standard contracts simply don''t have them.', 'events', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', true);

-- Sponsorship Inventory
INSERT INTO sponsorship_inventory (production_title, vertical, tier, price, reach, spots_total, spots_remaining, active)
VALUES
  ('Neon Nights — Mumbai', 'events', 'title', 500000, '5,000 in-venue + 500K social reach', 1, 1, true),
  ('Neon Nights — Mumbai', 'events', 'co-sponsor', 200000, '5,000 in-venue + 200K social reach', 3, 2, true),
  ('Rhythm & Roots Festival — Bangalore', 'music', 'title', 750000, '8,000 in-venue + 800K social reach', 1, 1, true);

-- ================================================================
-- AUTO-FLIP EVENT STATUS (run this as a cron or Supabase Edge Function)
-- ================================================================
-- Supabase doesn't support cron natively in free tier.
-- Add this as a pg_cron job if you're on Pro, or call it from a Vercel cron:
--
-- UPDATE events SET status = 'past'
-- WHERE status = 'upcoming' AND date < NOW();
