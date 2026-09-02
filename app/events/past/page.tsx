import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getEvents } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Eye, Zap } from 'lucide-react'
import { stats } from '@/lib/data' // We'll keep using lib/data for aggregate stats for now

export const metadata: Metadata = {
  title: 'The Haven Track Record | Past Events',
  description: 'Explore the track record of past concerts, brand activations, and audio launches.',
}

export default async function PastEventsPage() {
  const settings = await getSiteSettings()
  const events = await getEvents('past')

  if (!settings) return null

  return (
    <div className="bg-[#0B0B0C] min-h-screen">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            The Haven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">
              Track Record
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg mb-12">
            We don't just throw parties. We build cultural moments with measurable ROI. Here is our history of delivered promises.
          </p>

          {/* Aggregate Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">{stats.eventsExecuted}+</div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Events Executed</div>
            </div>
            <div className="text-center border-l border-white/5">
              <div className="text-3xl font-black text-white mb-1">140K</div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Total Attendance</div>
            </div>
            <div className="text-center border-l border-white/5 hidden md:block">
              <div className="text-3xl font-black text-white mb-1">{stats.sponsorsMatched}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Sponsors Served</div>
            </div>
            <div className="text-center border-l border-white/5 hidden md:block">
              <div className="text-3xl font-black text-white mb-1">{stats.totalReachMillions}M</div>
              <div className="text-xs text-white/50 uppercase tracking-widest font-bold">Media Reach</div>
            </div>
          </div>
        </section>

        {/* Grid of Past Events */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h3 className="text-2xl font-bold text-white">Archive</h3>
            <div className="hidden sm:flex gap-4">
              <button className="text-white/50 hover:text-white text-sm font-medium">All Years</button>
              <button className="text-white/50 hover:text-white text-sm font-medium">2024</button>
              <button className="text-white/50 hover:text-white text-sm font-medium">2023</button>
            </div>
          </div>
          
          {events.length === 0 ? (
            <div className="text-center text-white/50 py-12 bg-[#111111] rounded-2xl border border-white/5">
              More case studies are being digitized. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <div className="bg-[#111111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all h-full flex flex-col">
                    <div className="relative aspect-[16/9] w-full">
                      {event.hero_image_url ? (
                        <Image
                          src={event.hero_image_url}
                          alt={event.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1A1A1A]" />
                      )}
                      
                      {/* Top stat badge overlay */}
                      {event.expected_attendance && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-sm border border-white/10 flex items-center gap-1.5 shadow-lg">
                            <Users className="w-3.5 h-3.5 text-[#3cc2b4]" />
                            {event.expected_attendance.toLocaleString()} Attended
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[#3cc2b4] text-xs font-bold uppercase tracking-wider">{event.vertical}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-white/50 text-xs font-medium">{new Date(event.date).getFullYear()}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-white/50 text-xs font-medium">{event.city}</span>
                      </div>
                      
                      <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-[#3cc2b4] transition-colors">
                        {event.title}
                      </h4>
                      
                      <p className="text-white/60 mb-8 line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="mt-auto flex items-center text-[#3cc2b4] font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                        <span>Read Recap</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* CTA Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Want your brand at the next one?
              </h3>
              <p className="text-white/50 font-medium">
                Our upcoming events have limited sponsorship inventory available.
              </p>
            </div>
            <Link href="/sponsorships" className="btn-primary whitespace-nowrap px-8 py-4">
              Explore Sponsorships <ArrowRight className="w-4 h-4 inline-block ml-1" />
            </Link>
          </div>
        </section>
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
    </div>
  )
}
