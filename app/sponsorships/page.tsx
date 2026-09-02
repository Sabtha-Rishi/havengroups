import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getSponsorshipInventory, getTestimonials } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight, BarChart3, Target, ShieldCheck, Zap, Lock, Users, Activity } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Brand Sponsorships | Haven Productions',
  description: 'Place your brand on the next big stage. Real audience data, measurable ROI, and seamless integrations.',
}

export default async function SponsorshipsPage() {
  const settings = await getSiteSettings()
  const inventory = await getSponsorshipInventory()
  const allTestimonials = await getTestimonials()
  const sponsorTestimonials = allTestimonials.filter(t => t.persona === 'sponsor' || t.persona === 'brand')

  if (!settings) return null

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white selection:bg-[#3cc2b4] selection:text-white">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24 overflow-hidden">
        
        {/* HORMOZI HERO: The Hook & The Promise */}
        <section className="relative w-full min-h-[85vh] flex items-center pt-16 pb-20">
          {/* Stark, high-contrast background elements */}
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#3cc2b4]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-[#3cc2b4]/10 text-[#3cc2b4] px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8 border border-[#3cc2b4]/20">
                <Target className="w-4 h-4" /> B2B Brand Partnerships
              </div>
              
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-8 leading-[0.95] text-white">
                BUY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-red-500">ATTENTION.</span><br />
                NOT BILLBOARDS.
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl leading-relaxed font-medium">
                Traditional ads are dead. We give you direct, exclusive access to 
                <span className="text-white font-bold"> 100,000+ highly engaged fans</span> across Tamil Nadu's biggest live events. Measurable ROI. Zero guesswork.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <Link href="#inventory" className="bg-[#3cc2b4] hover:bg-[#e55c10] text-white transition-colors px-10 py-5 text-xl font-black rounded-xl text-center flex items-center justify-center gap-3 group">
                  Claim Your Spot 
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-xl border border-white/10">
                  <Lock className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-bold text-white/80 uppercase tracking-widest">Category Exclusivity Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE PROBLEM / THE SOLUTION */}
        <section className="py-24 bg-[#111111] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-[#0B0B0C] border border-white/5 rounded-3xl p-10 hover:border-[#3cc2b4]/30 transition-colors">
                <div className="w-14 h-14 bg-[#3cc2b4]/10 rounded-2xl flex items-center justify-center mb-8">
                  <Users className="w-7 h-7 text-[#3cc2b4]" />
                </div>
                <h3 className="text-2xl font-black mb-4">Captive Audiences</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  They can't scroll past a live concert. Your brand becomes part of the memory, integrated seamlessly into the cultural moment they paid to experience.
                </p>
              </div>

              <div className="bg-[#0B0B0C] border border-white/5 rounded-3xl p-10 hover:border-[#3cc2b4]/30 transition-colors">
                <div className="w-14 h-14 bg-[#3cc2b4]/10 rounded-2xl flex items-center justify-center mb-8">
                  <Activity className="w-7 h-7 text-[#3cc2b4]" />
                </div>
                <h3 className="text-2xl font-black mb-4">Unmatched ROI</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  Stop buying vanity impressions. We provide rigorous post-event analytics: actual footfall data, verified QR code scans, and direct digital reach metrics.
                </p>
              </div>

              <div className="bg-[#0B0B0C] border border-white/5 rounded-3xl p-10 hover:border-[#3cc2b4]/30 transition-colors">
                <div className="w-14 h-14 bg-[#3cc2b4]/10 rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck className="w-7 h-7 text-[#3cc2b4]" />
                </div>
                <h3 className="text-2xl font-black mb-4">Total Brand Safety</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  We own the production end-to-end. Your brand is never placed next to unvetted content. Complete control over the environment and messaging.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* THE MARKETPLACE (SCARCITY) */}
        <section id="inventory" className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Live Inventory</h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                First come, first served. When a category is sold, it's locked. We do not over-saturate our events.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {inventory.map((item) => {
                const isSoldOut = item.spots_remaining === 0;
                return (
                  <div key={item.id} className={`relative p-8 md:p-10 rounded-3xl border transition-all ${
                    isSoldOut 
                      ? 'bg-black/40 border-white/5 opacity-60 grayscale' 
                      : 'bg-[#111] border-white/10 hover:border-[#3cc2b4]/50 hover:bg-[#151515]'
                  }`}>
                    {isSoldOut && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 -rotate-12 border-4 border-red-500/80 text-red-500/80 font-black text-6xl uppercase tracking-tighter px-6 py-2 rounded-xl backdrop-blur-sm">
                        SOLD OUT
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3cc2b4]/10 text-[#3cc2b4] text-sm font-black uppercase tracking-widest border border-[#3cc2b4]/20">
                        {item.tier === 'title' && <Zap className="w-4 h-4" fill="currentColor" />}
                        {item.tier} Sponsor
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black">{item.spots_remaining} / {item.spots_total}</div>
                        <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Spots Left</div>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-black mb-4 pr-12">{item.production_title}</h3>
                    
                    <div className="space-y-4 mb-10">
                      <div>
                        <div className="text-xs text-white/40 uppercase font-bold tracking-widest mb-1">Guaranteed Reach</div>
                        <div className="font-medium text-lg">{item.reach}</div>
                      </div>
                    </div>

                    {!isSoldOut && settings?.whatsapp_number && (
                      <a 
                        href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in locking the ${item.tier} Sponsorship spot for ${item.production_title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block bg-white text-black hover:bg-gray-200 transition-colors py-4 rounded-xl text-center font-bold text-lg"
                      >
                        Lock This Spot
                      </a>
                    )}
                    {!isSoldOut && !settings?.whatsapp_number && (
                      <Link href="/contact" className="w-full block bg-white text-black hover:bg-gray-200 transition-colors py-4 rounded-xl text-center font-bold text-lg">
                        Lock This Spot
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        {sponsorTestimonials.length > 0 && (
          <section className="py-24 bg-[#3cc2b4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-16 text-center uppercase tracking-tighter">Don't Take Our Word For It.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsorTestimonials.slice(0, 3).map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded-3xl p-8 text-black shadow-2xl">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-black" />
                      ))}
                    </div>
                    <p className="text-xl font-medium leading-snug mb-8">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      {testimonial.photo_url ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                          <Image src={testimonial.photo_url} alt={testimonial.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-black shrink-0">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-black text-lg">{testimonial.name}</div>
                        <div className="text-sm font-bold text-black/60 uppercase tracking-widest">{testimonial.role}, {testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LEAD GEN FORM */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Get The Numbers.</h2>
            <p className="text-2xl text-white/60 mb-12 font-medium">
              Download our 2025 Sponsorship Deck for detailed audience demographics, past case study breakdowns, and comprehensive rate cards.
            </p>
            <form className="max-w-xl mx-auto flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your work email address" 
                className="w-full px-6 py-6 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-[#3cc2b4] outline-none text-xl font-medium placeholder:text-white/30 transition-colors text-center"
                required
              />
              <button type="submit" className="bg-[#3cc2b4] hover:bg-[#e55c10] text-white transition-colors w-full py-6 text-2xl font-black rounded-2xl">
                SEND ME THE DECK
              </button>
              <p className="text-sm font-bold text-white/30 uppercase tracking-widest mt-4">We respect your inbox. No spam, ever.</p>
            </form>
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

function StarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
