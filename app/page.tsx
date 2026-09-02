import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/home/Hero'
import { QuoteSection } from '@/components/home/QuoteSection'
import { TrustBar } from '@/components/home/TrustBar'
import { VerticalCards } from '@/components/home/VerticalCards'
import { HavenDifference } from '@/components/home/HavenDifference'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { ByTheNumbers } from '@/components/home/ByTheNumbers'
import { ProcessSnapshot } from '@/components/home/ProcessSnapshot'
import { TestimonialSlider } from '@/components/home/TestimonialSlider'
import { OfferSpotlight } from '@/components/home/OfferSpotlight'
import { SponsorCTAStrip } from '@/components/home/SponsorCTAStrip'
import { BlogPreview } from '@/components/home/BlogPreview'
import { YoutubeSection } from '@/components/home/YoutubeSection'
import { FinalCTA } from '@/components/home/FinalCTA'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'
import { stats } from '@/lib/data'
import {
  getSiteSettings,
  getPortfolioItems,
  getTestimonials,
  getBlogPosts,
  getServices,
} from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Haven Productions — From Studio to Stage',
  description:
    'Music production, film, events, audio launches, and brand sponsorships — produced to perfection. Book a free discovery call today.',
}

export default async function HomePage() {
  const settings = await getSiteSettings()
  const portfolio = await getPortfolioItems()
  const testimonials = await getTestimonials()
  const posts = await getBlogPosts(3)
  const services = await getServices()

  if (!settings) return <div>Failed to load settings from Supabase. Did you run the schema.sql?</div>

  return (
    <>
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main>
        {/* Quote Section */}
        <QuoteSection />

        {/* 1. Hero */}
        <Hero />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. Vertical Selector Cards */}
        <VerticalCards services={services} />

        {/* 4. The Haven Difference */}
        <HavenDifference />

        {/* 5. Featured Work Carousel */}
        <FeaturedWork items={portfolio.filter((p) => p.featured)} />

        {/* 6. By the Numbers */}
        <ByTheNumbers stats={stats} />

        {/* 7. Process Snapshot */}
        <ProcessSnapshot />

        {/* 8. Testimonial Slider */}
        <TestimonialSlider testimonials={testimonials} />

        {/* 9. Offer Spotlight */}
        <OfferSpotlight />

        {/* 10. Sponsor CTA Strip */}
        <SponsorCTAStrip />

        {/* 11. Blog Preview */}
        <BlogPreview posts={posts} />

        {/* 12. Youtube Section */}
        <YoutubeSection youtubeUrl={settings.youtube_url} />

        {/* 13. Final CTA + Contact Form */}
        <FinalCTA />
      </main>

      <Footer
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        email={settings.email}
        phone={settings.phone}
        address={settings.address}
        city={settings.city}
        country={settings.country}
        instagramUrl={settings.instagram_url}
        facebookUrl={settings.facebook_url}
        youtubeUrl={settings.youtube_url}
        twitterUrl={settings.twitter_url}
        linkedinUrl={settings.linkedin_url}
      />

      {/* Floating theme switcher — preview tool (Hidden for production) */}
      {/* <ThemeSwitcher /> */}
    </>
  )
}
