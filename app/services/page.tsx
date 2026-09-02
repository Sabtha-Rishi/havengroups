import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getServices } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Divide, Plus, Scale, Music, Film, Calendar, Mic2, TrendingUp, Zap, Video, Camera, HelpCircle, LucideIcon } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Production Services & Offers | Haven Productions',
  description: 'End-to-end production for music, film, events, and audio launches.',
}

// Map icon names from DB to actual lucide-react icons
const iconMap: Record<string, LucideIcon> = {
  Music, Film, Calendar, Mic2, TrendingUp, Zap, Video, Camera
}

export default async function ServicesHubPage() {
  const settings = await getSiteSettings()
  const services = await getServices()
  
  if (!settings) return null

  return (
    <div className="bg-[#0B0B0C] min-h-screen selection:bg-[#3cc2b4] selection:text-white">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24">
        {/* SECTION 1: HERO (Dark) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
            The Haven Offers
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            Stop Buying Services. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E52521] to-[#FF4D4D]">
              Start Buying Outcomes.
            </span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed">
            Hiring a separate producer, director, and marketing team is a recipe for missed deadlines and blown budgets. We offer full-stack pipelines designed to guarantee a specific result.
          </p>
          <p className="text-white/40 text-sm font-bold uppercase tracking-widest">
            Select your vertical below
          </p>
        </section>

        {/* SECTION 2: SERVICES GRID (Light) */}
        <section className="bg-white py-24 border-t-4 border-[#3cc2b4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">The Production Stacks</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Click on a pipeline below to see the exact deliverables, timelines, and upfront pricing.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service) => {
                const Icon = iconMap[service.icon_name || ''] || HelpCircle
                return (
                  <Link key={service.id} href={service.href} className="group block h-full">
                    <div className="bg-white border border-gray-200 rounded-3xl p-2 h-full flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl hover:border-[#3cc2b4]/30">
                      
                      {/* Image Header */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-gray-100 mb-6 group-hover:shadow-md transition-shadow">
                        {service.image_url ? (
                          <Image 
                            src={service.image_url} 
                            alt={service.title} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                          <Icon className="w-6 h-6 text-[#3cc2b4]" />
                        </div>
                      </div>

                      <div className="px-6 pb-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-black mb-3 text-black">{service.title}</h3>
                        <p className="text-gray-600 text-lg flex-1 font-medium leading-snug mb-8">
                          {service.outcome}
                        </p>
                        <div className="flex items-center text-[#E52521] font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                          <span>Explore Pipeline</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>

                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: THE GRAND SLAM GUARANTEE (Dark) */}
        <section className="bg-[#0B0B0C] py-24 border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#3cc2b4]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ShieldCheck className="w-20 h-20 text-[#3cc2b4] mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">The Grand Slam Guarantee</h2>
            <div className="prose prose-invert prose-lg md:prose-xl mx-auto">
              <p className="text-white/80 leading-relaxed mb-6">
                Most agencies charge you for their time. Which means they are financially incentivized to take as long as possible.
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                We believe in <strong>Risk Reversal</strong>. We charge for the outcome. If we miss the deadline, we eat the cost. If the tech fails, we refund the fee. If the mix isn't radio-ready, we do unlimited revisions until it is.
              </p>
              <p className="text-[#E52521] font-bold text-2xl mt-8">
                You carry zero execution risk.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: THE VALUE EQUATION (Light) */}
        <section className="bg-gray-50 py-24 md:py-32 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-black mb-6">How We Maximize ROI</h2>
              <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                We engineered our entire company around the Value Equation. Here is exactly why our clients refuse to go anywhere else.
              </p>
            </div>

            {/* Visualizer */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                {/* Top Half (Maximize) */}
                <div className="w-full bg-white border border-gray-200 rounded-t-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-around gap-8 text-center relative z-10">
                  <div className="flex-1">
                    <div className="text-sm font-bold uppercase tracking-widest text-[#3cc2b4] mb-2">Dream Outcome</div>
                    <div className="text-xl md:text-2xl font-black text-black">Broadcast-Quality Assets & Live Events</div>
                  </div>
                  <div className="hidden md:flex text-gray-300">
                    <Plus className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold uppercase tracking-widest text-[#3cc2b4] mb-2">Perceived Likelihood</div>
                    <div className="text-xl md:text-2xl font-black text-black">In-House Crew + Explicit Guarantees</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-[110%] h-4 bg-[#3cc2b4] rounded-full my-[-2px] relative z-20 shadow-lg flex items-center justify-center">
                   <div className="bg-white rounded-full p-2 border-4 border-[#3cc2b4] absolute">
                     <Divide className="w-6 h-6 text-[#3cc2b4]" />
                   </div>
                </div>

                {/* Bottom Half (Minimize) */}
                <div className="w-full bg-gray-100 border border-gray-200 rounded-b-3xl p-8 md:p-12 shadow-inner flex flex-col md:flex-row items-center justify-around gap-8 text-center relative z-10">
                  <div className="flex-1">
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Time Delay</div>
                    <div className="text-xl md:text-2xl font-black text-gray-800 line-through decoration-[#D62828] decoration-4">Months of pre-pro</div>
                    <div className="text-lg font-bold text-green-600 mt-2">Delivered in weeks</div>
                  </div>
                  <div className="hidden md:flex text-gray-300">
                    <Plus className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Effort & Sacrifice</div>
                    <div className="text-xl md:text-2xl font-black text-gray-800 line-through decoration-[#D62828] decoration-4">Managing 5 vendors</div>
                    <div className="text-lg font-bold text-green-600 mt-2">Zero management required</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: NOT SURE QUIZ CTA (Dark) */}
        <section className="bg-[#0B0B0C] py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-[#3cc2b4]/30 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-[0_0_50px_rgba(229, 37, 33,0.1)] relative overflow-hidden">
              
              <div className="w-20 h-20 rounded-full bg-[#3cc2b4]/10 flex items-center justify-center shrink-0 border border-[#3cc2b4]/20">
                <Scale className="w-10 h-10 text-[#3cc2b4]" />
              </div>
              
              <div className="flex-1 text-center md:text-left relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Not sure which offer fits your goal?</h3>
                <p className="text-white/60 text-lg md:text-xl font-medium">
                  We don't expect you to know the exact technical requirements. Tell us your ultimate business or creative goal, and we'll prescribe the exact production stack you need (and what it costs).
                </p>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <Link href="/contact" className="btn-primary w-full md:w-auto whitespace-nowrap text-lg px-8 py-5 flex items-center justify-center gap-2">
                  Take the Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-center text-white/30 text-xs font-bold uppercase mt-3 tracking-widest">Takes 2 minutes</p>
              </div>
            </div>
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
