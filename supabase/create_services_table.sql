CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  outcome TEXT,
  image_url TEXT,
  stat_text TEXT,
  icon_name TEXT,
  href TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the initial 5 services
INSERT INTO services (slug, title, tagline, outcome, image_url, stat_text, icon_name, href, order_index) VALUES 
(
  'music', 
  'Music Production', 
  'Chart-ready sound, A&R-grade delivery.', 
  'From studio session to streaming charts in 45 days.', 
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', 
  '340+ songs produced', 
  'Music', 
  '/services/music', 
  1
),
(
  'film', 
  'Film & Video', 
  'Broadcast-grade. On-budget. On-time.', 
  'Broadcast-grade production, on-budget, every single time.', 
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', 
  '85+ productions delivered', 
  'Film', 
  '/services/film', 
  2
),
(
  'events', 
  'Events & Concerts', 
  'Flawless execution, zero-risk logistics.', 
  'Flawless execution — from concept to curtain call.', 
  'https://images.unsplash.com/photo-1540039155732-d68b54b007d4?w=800&q=80', 
  '218 events executed', 
  'Calendar', 
  '/services/events', 
  3
),
(
  'audio', 
  'Audio Launches', 
  'Podcasts, albums & jingles that break through.', 
  'Your podcast or album launched globally in weeks.', 
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80', 
  '60+ audio launches', 
  'Mic2', 
  '/services/audio', 
  4
),
(
  'sponsorships', 
  'Brand Sponsorships', 
  'ROI-first brand placements with real reach.', 
  'Your brand on the next big stage with measurable ROI.', 
  'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=800&q=80', 
  '127 sponsors matched', 
  'Zap', 
  '/sponsorships', 
  5
) ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  outcome = EXCLUDED.outcome,
  image_url = EXCLUDED.image_url,
  stat_text = EXCLUDED.stat_text,
  icon_name = EXCLUDED.icon_name,
  href = EXCLUDED.href,
  order_index = EXCLUDED.order_index;
