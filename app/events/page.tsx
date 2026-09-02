import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getEvents } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Calendar, Users, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Upcoming Events | Haven Productions',
  description: 'Concerts, audio launches, and brand activations coming up at Haven.',
}

export default async function UpcomingEventsPage() {
  const settings = await getSiteSettings()
  const events = await getEvents('upcoming')

  const featuredEvent = events.find(e => e.featured) || events[0]
  const upcomingEvents = events.filter(e => e.id !== featuredEvent?.id)

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
            What's Coming Up <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E52521] to-[#FF4D4D]">
              at Haven
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Concerts, audio launches, and brand activations. Find your next experience or place your brand on our stage.
          </p>
        </section>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <Link href={`/events/${featuredEvent.slug}`} className="block group">
              <div className="relative rounded-3xl overflow-hidden bg-[#111111] border border-white/10 flex flex-col md:flex-row">
                {/* Image side */}
                <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto h-[400px] md:h-auto">
                  {featuredEvent.hero_image_url && (
                    <Image
                      src={featuredEvent.hero_image_url}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
                </div>
                
                {/* Content side */}
                <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#111111] z-10 relative">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white">
                      {featuredEvent.vertical}
                    </span>
                    {featuredEvent.sponsorship_open && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#D62828] text-white flex items-center gap-1.5">
                        <Zap className="w-3 h-3" fill="currentColor" />
                        Sponsorship Open
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-[#E52521] transition-colors">
                    {featuredEvent.title}
                  </h2>
                  
                  <p className="text-white/60 mb-8 line-clamp-2 text-lg">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 mb-8 text-white/80">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#3cc2b4]" />
                      <span>{new Date(featuredEvent.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-[#3cc2b4]" />
                      <span>{featuredEvent.venue}, {featuredEvent.city}</span>
                    </div>
                  </div>
                  
                  <div className="btn-primary inline-flex self-start px-8 py-4 text-base">
                    Get Details
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Grid of Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-bold text-white">More Upcoming</h3>
              {/* Filter placeholders */}
              <div className="hidden sm:flex gap-4">
                <button className="text-white/50 hover:text-white text-sm font-medium">All</button>
                <button className="text-white/50 hover:text-white text-sm font-medium">Music</button>
                <button className="text-white/50 hover:text-white text-sm font-medium">Film</button>
                <button className="text-white/50 hover:text-white text-sm font-medium">Events</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all h-full flex flex-col">
                    <div className="relative aspect-[16/9] w-full">
                      {event.hero_image_url ? (
                        <Image
                          src={event.hero_image_url}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1A1A1A]" />
                      )}
                      
                      <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
                        {event.sponsorship_open && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D62828] text-white shadow-lg">
                            Sponsorship Open
                          </span>
                        )}
                        {event.sponsorship_spots_remaining && event.sponsorship_spots_remaining > 0 && event.sponsorship_spots_remaining <= 3 && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-sm shadow-lg border border-white/10">
                            {event.sponsorship_spots_remaining} Spots Left
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#3cc2b4] text-xs font-bold uppercase tracking-wider">{event.vertical}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-white/50 text-xs font-medium">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#E52521] transition-colors line-clamp-2">
                        {event.title}
                      </h4>
                      
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-white/50 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{event.city}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#E52521] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA Strip */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0B0C] mb-2">
                Don't see your city or date?
              </h3>
              <p className="text-[#0B0B0C]/70 font-medium">
                We're always looking for new collaborators. Pitch us your event idea.
              </p>
            </div>
            <Link href="/contact" className="bg-[#0B0B0C] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-colors whitespace-nowrap">
              Pitch a Collab
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
