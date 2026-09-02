-- 1. ADD TARGET DEMO COLUMN TO EVENTS
ALTER TABLE events ADD COLUMN IF NOT EXISTS target_demo TEXT;

-- 2. CLEAR EXISTING DATA FOR A FRESH START (Optional, but ensures clean state)
TRUNCATE TABLE site_settings, team_members, events, portfolio_items, testimonials, blog_posts, sponsorship_inventory RESTART IDENTITY;

-- 3. SEED SITE SETTINGS
INSERT INTO site_settings (
  brand_name, tagline, email, phone, whatsapp_number, 
  address, city, country, theme,
  instagram_url, facebook_url, youtube_url, twitter_url, linkedin_url
) VALUES (
  'Haven Productions', 'Where Sound Meets Vision', 'hello@havenproductions.com', '+91 98765 43210', '+919876543210',
  '12 Studio Lane, Alwarpet', 'Chennai', 'India', 'modern',
  'https://instagram.com/havenproductions', 'https://facebook.com/havenproductions', 'https://youtube.com/@havenproductions', 'https://twitter.com/havenprodn', 'https://linkedin.com/company/havenproductions'
);

-- 4. MASSIVE EVENTS SEED (Tamil Nadu Focused)
INSERT INTO events (
  title, slug, date, venue, city, vertical, status, hero_image_url, 
  description, expected_attendance, sponsorship_open, collab_open, sponsorship_spots_remaining, featured, target_demo, media_gallery
) VALUES 
(
  'Ilaiyaraaja Live in Chennai — 80s Magic', 'ilaiyaraaja-live-chennai-2025', '2025-10-12 18:00:00', 'Nehru Stadium', 'Chennai', 'music', 'upcoming', 
  'https://images.unsplash.com/photo-1540039155732-d68b54b007d4?w=1200&q=80',
  'The Maestro returns to Chennai for an unforgettable 4-hour live concert featuring 80 original orchestra members and legendary playback singers.',
  25000, true, true, 2, true, 'Mass Audience, Families, Tamil Diaspora', '[]'::jsonb
),
(
  'Anirudh — Hukum World Tour Kickoff', 'anirudh-hukum-tour-chennai', '2025-11-20 19:30:00', 'YMCA Grounds', 'Chennai', 'music', 'upcoming', 
  'https://images.unsplash.com/photo-1470229722913-7c092bb4ace4?w=1200&q=80',
  'The Rockstar kicks off his massive Hukum World Tour right here in Namma Chennai. High-octane EDM meets Kuthu.',
  40000, true, false, 1, true, 'Gen-Z, Millennials, College Students', '[]'::jsonb
),
(
  'Margazhi Echoes — Chennai', 'margazhi-echoes-chennai-2025', '2025-12-15 18:30:00', 'Music Academy', 'Chennai', 'music', 'upcoming', 
  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80',
  'A modern fusion twist to the traditional Margazhi festival. Bridging classical roots with contemporary electronic beats.',
  2000, true, true, 3, false, 'Urban Elite, Carnatic Enthusiasts', '[]'::jsonb
),
(
  'Coimbatore Tech & Media Summit', 'cbe-tech-media-summit-2025', '2025-06-10 09:00:00', 'Codissia Trade Fair Complex', 'Coimbatore', 'events', 'upcoming',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80',
  'The largest gathering of media professionals, tech innovators, and filmmakers in Kongu Nadu.',
  5000, true, false, 5, false, 'Tech Professionals, Entrepreneurs, B2B', '[]'::jsonb
),
(
  'Madurai Indie Film Fest', 'madurai-indie-film-fest-2024', '2024-09-20 17:00:00', 'Gandhi Museum Grounds', 'Madurai', 'film', 'past',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80',
  'Celebrating independent Tamil cinema. Over 40 short films screened over a 3-day cultural extravaganza.',
  3500, false, false, 0, false, 'Film Enthusiasts, Local Youth', '[]'::jsonb
),
(
  'Kollywood Audio Launch — "Thirai"', 'kollywood-audio-launch-thirai', '2024-11-05 19:00:00', 'Nehru Indoor Stadium', 'Chennai', 'audio', 'past',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80',
  'A massive star-studded audio launch for the blockbuster film "Thirai", broadcast live to 2M+ viewers.',
  8000, false, false, 0, false, 'Mass Audience, Tamil Cinema Fans', '[]'::jsonb
),
(
  'Trichy Food & Culture Fiesta', 'trichy-food-fest-2024', '2024-10-10 16:00:00', 'National College Grounds', 'Trichy', 'events', 'past',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
  'A celebration of Cauvery delta cuisine, featuring 100+ stalls, live parotta flipping contests, and folk music.',
  15000, false, false, 0, false, 'Families, Foodies', '[]'::jsonb
);

-- 5. MASSIVE PORTFOLIO SEED
INSERT INTO portfolio_items (
  title, vertical, client, thumbnail_url, description, metrics, year, featured
) VALUES 
(
  'Aavin "Namma Ooru" Ad Campaign', 'film', 'Aavin Tamil Nadu', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  'A heart-warming 2-minute ad campaign capturing the essence of Tamil mornings.',
  '15M+ views on YouTube, 45% increase in youth brand recall', 2024, true
),
(
  'Ramraj Cotton — Pongal Anthem', 'audio', 'Ramraj Cotton', 'https://images.unsplash.com/photo-1493225457224-eda49102c892?w=600&q=80',
  'Audio mixing, mastering, and launch strategy for the viral Pongal promotional anthem.',
  '#1 Trending on Instagram Reels TN for 14 days', 2024, true
),
(
  'Chennai Super Kings Fan Anthem', 'music', 'CSK Management', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80',
  'Audio mixing, mastering, and launch strategy for the official fan anthem.',
  '20M+ streams on Spotify, Played at Chepauk', 2023, true
),
(
  'Global Investors Meet Gala', 'events', 'Govt of Tamil Nadu', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  'Produced the cultural gala night for international delegates at the GIM.',
  'Zero incidents, praised by CM''s office, 3000+ VVIP delegates', 2024, true
),
(
  'Oru Kural — Indie Album', 'music', 'Independent', 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600&q=80',
  'End-to-end production of a Tamil indie album featuring 6 independent artists from across TN.',
  '2.5M streams on Spotify, Top 10 Indie India', 2024, false
),
(
  'TVS Motor Corporate Launch', 'events', 'TVS Motor Company', 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&q=80',
  'A high-tech holographic product launch for their new electric two-wheeler.',
  'Live broadcast to 50+ countries', 2023, false
),
(
  'Sun TV Awards Set Design', 'film', 'Sun TV Network', 'https://images.unsplash.com/photo-1518991206689-0be01da421fc?w=600&q=80',
  'End-to-end set design and LED mapping for the annual Sun Kudumbam Viruthugal.',
  '45% higher broadcast ratings YoY', 2023, false
);

-- 6. MASSIVE TESTIMONIALS SEED
INSERT INTO testimonials (
  name, role, company, persona, quote, rating, photo_url, featured
) VALUES 
(
  'Karthik Sivakumar', 'Director', 'Kollywood', 'film',
  'Haven didn''t just manage the audio launch; they turned it into a spectacle. The crowd control, AV setup, and live broadcasting were flawless. Best team in Chennai.',
  5, 'https://randomuser.me/api/portraits/men/32.jpg', true
),
(
  'Anitha Ram', 'CMO', 'Ramraj Cotton', 'brand',
  'We sponsored their Coimbatore tech summit and the ROI was incredible. Direct access to our target B2B demographic in the Kongu belt. Highly professional.',
  5, 'https://randomuser.me/api/portraits/women/44.jpg', true
),
(
  'Siddharth', 'Indie Artist', null, 'artist',
  'They took my Tamil indie track and gave it an international sound. The production quality at Haven is unmatched down south.',
  5, 'https://randomuser.me/api/portraits/men/55.jpg', true
),
(
  'Pradeep R', 'Marketing Head', 'Aavin', 'sponsor',
  'When we needed to reach Gen-Z without looking like a "boomer" brand, Haven integrated us flawlessly into the Anirudh tour. The brand lift was insane.',
  5, 'https://randomuser.me/api/portraits/men/22.jpg', true
),
(
  'Lakshmi Narayan', 'Event Coordinator', 'TVS Motor', 'events',
  'The holographic launch in Hosur was executed perfectly. Haven handles the stress so we don''t have to.',
  5, 'https://randomuser.me/api/portraits/women/62.jpg', true
),
(
  'Gautham V', 'Film Producer', 'Madras Studios', 'film',
  'For our last three blockbusters, Haven has handled the post-production audio mixing. They are fast, reliable, and have the best ears in the business.',
  5, 'https://randomuser.me/api/portraits/men/41.jpg', false
),
(
  'Shalini M', 'CEO', 'TechKongu', 'sponsor',
  'The brand integration was seamless. We didn''t feel like just a logo on a banner; we were part of the event narrative.',
  5, 'https://randomuser.me/api/portraits/women/33.jpg', false
);

-- 7. SEED BLOG POSTS
INSERT INTO blog_posts (
  title, slug, excerpt, content, category, thumbnail_url, published
) VALUES 
(
  'The Rise of Tamil Indie: Why Brands Need to Pay Attention', 'rise-of-tamil-indie-brands',
  'Independent Tamil music is no longer niche. With millions of streams, here is why your next brand campaign needs an indie soundtrack.',
  '<h2>The Shift in Audience Attention</h2><p>For decades, film music dominated the airwaves in Tamil Nadu. But over the last five years, a quiet revolution has taken over streaming platforms. Independent Tamil artists—producing tracks from their bedroom studios in Coimbatore, Madurai, and Chennai—are racking up millions of views without the backing of massive film studios.</p><h3>Why Does This Matter to Marketers?</h3><p>Gen-Z and young millennials are craving authenticity. When an independent artist releases a track, the engagement rate is often <strong>3x to 5x higher</strong> than a standard promotional film song. The community is tight-knit, fiercely loyal, and highly engaged.</p><blockquote>"Brands that integrate into the indie scene aren''t just buying impressions; they are buying cultural cachet."</blockquote><h3>The ROI of Indie Integration</h3><ul><li><strong>Cost-Effective:</strong> Licensing or sponsoring indie music is often a fraction of the cost of Kollywood audio rights.</li><li><strong>Targeted Reach:</strong> Indie music demographics skew heavily towards urban, educated youth with disposable income.</li><li><strong>Agility:</strong> Independent artists can turn around brand-integrated music videos in weeks, not months.</li></ul><p>At Haven Productions, we''ve brokered over a dozen brand-artist partnerships in the indie space. The results? Double-digit increases in brand recall and organic social shares. If your brand isn''t looking at the Tamil indie scene, you''re leaving attention on the table.</p>', 
  'music', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80', true
),
(
  'Executing Mega Events in Chennai: Navigating Permits and Logistics', 'mega-events-chennai-logistics',
  'A behind-the-scenes look at how we pulled off a 10,000 capacity outdoor concert on ECR without a single logistical hitch.',
  '<h2>The ECR Challenge</h2><p>Executing a 10,000-person live concert on the East Coast Road (ECR) in Chennai is every event manager''s dream—and logistical nightmare. From traffic management to sound ordinances and coastal regulatory zone (CRZ) clearances, the red tape can be overwhelming.</p><h3>Phase 1: The Paperwork</h3><p>We started the permit process 90 days out. In Chennai, a mega event requires clearances from:</p><ul><li>The Greater Chennai Police (Traffic & Law and Order)</li><li>The Fire Department</li><li>The PWD (for structural stability of the stage)</li><li>Local Panchayat/Corporation (for waste management)</li></ul><p>Our secret? A dedicated liaison team that speaks the language of the authorities and submits CAD-drawn site maps that leave zero room for ambiguity.</p><h3>Phase 2: Crowd Flow & Traffic</h3><p>ECR is notoriously a two-lane highway. To prevent a multi-kilometer traffic jam, we implemented a <strong>remote parking strategy</strong>. Attendees parked at a massive ground 3 kilometers away, and we ran a fleet of 50 AC buses shuttling them to the venue every 2 minutes. This completely removed private vehicles from the choke points.</p><h3>Phase 3: The Show</h3><p>When the first chord struck at 6:30 PM, the venue was packed, the VIPs were seated, and the ECR traffic was flowing smoothly. Event management isn''t about having a plan A; it''s about having a plan B through Z. And that''s what Haven delivers.</p>', 
  'events', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80', true
);

-- 8. PREMIUM SPONSORSHIP INVENTORY SEED
INSERT INTO sponsorship_inventory (
  production_title, vertical, tier, price, reach, spots_total, spots_remaining, event_id, active
) VALUES 
(
  'Ilaiyaraaja Live in Chennai', 'events', 'title', 5000000, '25,000 In-Venue + 10M Broadcast Reach', 1, 1, 
  (SELECT id FROM events WHERE slug = 'ilaiyaraaja-live-chennai-2025'), true
),
(
  'Ilaiyaraaja Live in Chennai', 'events', 'co-sponsor', 1500000, '25,000 In-Venue + 5M Broadcast Reach', 4, 1, 
  (SELECT id FROM events WHERE slug = 'ilaiyaraaja-live-chennai-2025'), true
),
(
  'Anirudh — Hukum World Tour Kickoff', 'events', 'title', 8000000, '40,000 In-Venue + 20M Social Reach', 1, 0, 
  (SELECT id FROM events WHERE slug = 'anirudh-hukum-tour-chennai'), true
),
(
  'Anirudh — Hukum World Tour Kickoff', 'events', 'integration', 2000000, 'On-ground Experiential Booth + Stage Mentions', 3, 1, 
  (SELECT id FROM events WHERE slug = 'anirudh-hukum-tour-chennai'), true
),
(
  'Margazhi Echoes — Chennai', 'events', 'title', 800000, '2,000 Elite In-Venue + 1M Social Reach', 1, 1, 
  (SELECT id FROM events WHERE slug = 'margazhi-echoes-chennai-2025'), true
),
(
  'Coimbatore Tech & Media Summit', 'events', 'title', 1200000, '5,000 B2B Professionals + Regional PR', 1, 1, 
  (SELECT id FROM events WHERE slug = 'cbe-tech-media-summit-2025'), true
);
