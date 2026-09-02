import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getPortfolioItems } from '@/lib/supabase'
import { stats } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, TrendingUp, Users, Zap, ShieldCheck } from 'lucide-react'
import { PortfolioGrid } from '@/components/work/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Our Work & Proven ROI | Haven Productions',
  description: 'Explore our portfolio of music, film, events, and brand sponsorships.',
}

export default async function WorkPage() {
  const settings = await getSiteSettings()
  const portfolio = await getPortfolioItems()

  if (!settings) return null

  // For the featured spotlight, just pick the first featured item or a default
  const featuredItem = portfolio.find(p => p.featured) || portfolio[0]
  const gridItems = portfolio.filter(p => p.id !== featuredItem?.id)

  return (
    <div className="bg-[#0B0B0C] min-h-screen selection:bg-[#E52521] selection:text-white">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24">
        {/* SECTION 1: HERO (Dark) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
            The Track Record
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight hero-headline">
            Results <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E52521] to-[#FF4D4D]">Speak Louder</span> <br className="hidden sm:block" />
            Than Pitches.
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed">
            We don't ask you to trust our process. We ask you to trust our math. Here is a curated selection of our proudest moments across studio, screen, and stage.
          </p>
        </section>

        {/* SECTION 2: METRICS THAT MATTER (Light) */}
        <section className="bg-gray-50 py-24 border-t-4 border-[#E52521]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">The Aggregate Impact</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">Over the last 5 years, we haven't just created beautiful assets. We've moved the needle on culture and commerce.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-[#E52521]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-6 h-6 text-[#E52521]" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-black mb-2">{stats.totalReachMillions}M+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Media Reach</div>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-black mb-2">140K+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tickets Sold</div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-black mb-2">{stats.eventsExecuted}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Events Executed</div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center shadow-sm">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-black mb-2">{stats.sponsorsMatched}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Brands Scaled</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: FEATURED CASE STUDY (Dark) */}
        {featuredItem && (
          <section className="bg-[#0B0B0C] py-24 md:py-32 border-y border-white/10 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#E52521]/5 rounded-full blur-[120px]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Spotlight Study</h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">When the stakes are the highest, our execution is flawless.</p>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex flex-col lg:flex-row hover:border-[#E52521]/30 transition-colors shadow-2xl">
                <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-auto">
                  {featuredItem.thumbnail_url ? (
                    <Image 
                      src={featuredItem.thumbnail_url} 
                      alt={featuredItem.title} 
                      fill 
                      className="object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                      <Play className="w-12 h-12 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-[#E52521] flex items-center justify-center text-white shadow-[0_0_30px_rgba(229, 37, 33,0.5)]">
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="text-[#E52521] text-xs font-bold uppercase tracking-wider">{featuredItem.vertical}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-white/40 text-xs font-medium uppercase">{featuredItem.client}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                    {featuredItem.title}
                  </h3>
                  <p className="text-white/60 text-lg mb-8 leading-relaxed">
                    {featuredItem.description}
                  </p>
                  
                  {featuredItem.metrics && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                      <div className="text-xs font-bold uppercase tracking-widest text-[#E52521] mb-2">The ROI Delivered</div>
                      <div className="text-xl font-bold text-white">{featuredItem.metrics}</div>
                    </div>
                  )}
                  
                  <Link href={`/services/${featuredItem.vertical === 'audio' ? 'audio-launches' : featuredItem.vertical}`} className="btn-primary w-fit px-8 py-4">
                    Explore This Stack
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4: THE ARCHIVE GRID (Light) */}
        <section className="bg-white py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PortfolioGrid items={gridItems} />
          </div>
        </section>

        {/* SECTION 5: CTA (Dark) */}
        <section className="bg-[#0B0B0C] py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">You've seen the proof.</h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
              We only take on a limited number of productions per quarter to ensure we can guarantee the outcome. Check our availability.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-10 py-5 text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Book a Strategy Call <ArrowRight className="w-5 h-5" />
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
