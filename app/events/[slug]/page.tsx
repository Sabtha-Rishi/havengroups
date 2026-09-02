import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getEventBySlug } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return { title: 'Event Not Found | Haven Productions' }
  return {
    title: `${event.title} | Haven Productions`,
    description: event.description || '',
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const settings = await getSiteSettings()
  const event = await getEventBySlug(slug)

  if (!settings || !event) return notFound()

  const isUpcoming = event.status === 'upcoming'

  return (
    <div className="bg-[#0B0B0C] min-h-screen">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24">
        {/* HERO SECTION - Adapts based on status */}
        <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden">
          {event.hero_image_url && (
            <Image
              src={event.hero_image_url}
              alt={event.title}
              fill
              className="object-cover opacity-40"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/60 to-transparent" />
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-md">
                {event.vertical}
              </span>
              {!isUpcoming && (
                <span className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/20">
                  As It Happened
                </span>
              )}
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight drop-shadow-2xl hero-headline">
              {event.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-lg md:text-xl font-medium">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-[#3cc2b4]" />
                <span>{new Date(event.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-[#3cc2b4]" />
                <span>{event.venue}, {event.city}</span>
              </div>
            </div>

            {isUpcoming && (
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                  Get Tickets / RSVP
                </button>
                {event.sponsorship_open && (
                  <Link href="#sponsor" className="bg-[#111] hover:bg-[#222] text-white border border-white/20 transition-colors px-8 py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 w-full sm:w-auto">
                    <Zap className="w-5 h-5 text-[#D62828]" fill="currentColor" />
                    Sponsor This Event
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="prose prose-invert prose-lg mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {isUpcoming ? 'About the Event' : 'The Recap'}
            </h2>
            <p className="text-white/70 leading-relaxed text-xl">
              {event.description}
            </p>
          </div>
        </section>

        {/* PAST EVENT: BY THE NUMBERS */}
        {!isUpcoming && event.expected_attendance && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row justify-around items-center gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{event.expected_attendance.toLocaleString()}</div>
                <div className="text-sm text-white/50 uppercase tracking-widest font-bold">Total Attendance</div>
              </div>
              <div className="hidden md:block w-px h-16 bg-white/10" />
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">Sold Out</div>
                <div className="text-sm text-white/50 uppercase tracking-widest font-bold">Status</div>
              </div>
            </div>
          </section>
        )}

        {/* UPCOMING EVENT: SPONSOR CTA BLOCK */}
        {isUpcoming && event.sponsorship_open && (
          <section id="sponsor" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-[#111111] border border-[#3cc2b4]/20 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3cc2b4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-[#D62828]/10 text-[#D62828] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-[#D62828]/20">
                  <Zap className="w-4 h-4" fill="currentColor" />
                  Sponsorship Inventory Open
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Put your brand on this stage.
                </h3>
                
                <p className="text-white/60 text-lg mb-8">
                  Get direct access to {event.expected_attendance?.toLocaleString() || 'thousands of'} highly engaged attendees. Category exclusivity and custom integrations available.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex-1">
                    <div className="text-white/40 text-xs uppercase tracking-wider font-bold mb-1">Target Demo</div>
                    <div className="text-white font-medium">{event.target_demo || 'All Demographics'}</div>
                  </div>
                  <div className="bg-black/50 border border-white/10 rounded-xl p-4 flex-1">
                    <div className="text-white/40 text-xs uppercase tracking-wider font-bold mb-1">Availability</div>
                    <div className="text-white font-medium">{event.sponsorship_spots_remaining} Spots Remaining</div>
                  </div>
                </div>
                
                <Link href="/sponsorships" className="btn-primary inline-flex">
                  Download Sponsorship Deck
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* UPCOMING EVENT: COLLAB CTA BLOCK */}
        {isUpcoming && event.collab_open && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="border border-white/10 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-b from-transparent to-[#111111]/50">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">Want to collaborate?</h3>
                <p className="text-white/60">
                  We are looking for local artists, food vendors, and media partners for this edition.
                </p>
              </div>
              <Link href="/contact" className="bg-white text-black hover:bg-gray-200 transition-colors px-8 py-4 rounded-xl font-bold whitespace-nowrap">
                Pitch a Collab
              </Link>
            </div>
          </section>
        )}

        {/* SHARED: GALLERY SECTION */}
        {event.media_gallery && Array.isArray(event.media_gallery) && event.media_gallery.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              {isUpcoming ? 'The Vibe' : 'Highlight Reel'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.media_gallery.map((media: any, i: number) => {
                const url = media.url || media
                if (!url || typeof url !== 'string') return null
                
                const isVideo = url.match(/\.(mp4|webm|ogg)$/i)
                
                return (
                  <div key={i} className="aspect-square bg-[#111] rounded-2xl border border-white/5 overflow-hidden relative group">
                    {isVideo ? (
                      <video 
                        src={url} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Image 
                        src={url} 
                        alt={`${event.title} media ${i + 1}`} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

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
