import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Check, X, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The Haven Story | About Us',
  description: 'Why we built Haven Productions and what we stand for.',
}

export default async function AboutPage() {
  const settings = await getSiteSettings()
  if (!settings) return null

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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            Where Sound <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">
              Meets Execution.
            </span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed">
            We are a collective of producers, directors, and event architects who believe that the best art shouldn't have to compromise on commerce. 
          </p>
        </section>

        {/* SECTION 2: FOUNDER'S MANIFESTO (Light) */}
        <section className="bg-white py-24 md:py-32 border-t-4 border-[#3cc2b4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-xl mx-auto md:mx-0">
                <Image 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&q=80" 
                  alt="Founder" 
                  fill 
                  className="object-cover grayscale"
                />
              </div>
              <div className="prose prose-lg text-gray-700">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-6">A letter from the team.</h2>
                <p>
                  Let's be honest about how this industry usually works.
                </p>
                <p>
                  You hire a creative agency because you have a vision. They sell you on a beautiful mood board, charge you a massive retainer, and then outsource the actual production to the cheapest freelancers they can find. 
                </p>
                <p>
                  By the time your track releases or your event goes live, you've spent 40 hours managing vendors, the budget has blown up by 30%, and the final product looks nothing like the mood board.
                </p>
                <p className="text-black font-bold text-xl border-l-4 border-[#3cc2b4] pl-6 my-8">
                  We built Haven to burn that model to the ground.
                </p>
                <p>
                  We are a full-stack execution engine. We don't outsource. We don't charge hourly. We map your exact goal, we assign an in-house crew to build it, and we don't stop until it hits the specific metrics we guaranteed.
                </p>
                <div className="mt-8">
                  <div className="font-black text-black text-xl">The Haven Partners</div>
                  <div className="text-[#3cc2b4] font-bold text-sm uppercase tracking-wider">Founding Team</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE OLD WAY VS HAVEN WAY (Dark) */}
        <section className="bg-[#0B0B0C] py-24 md:py-32 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">The Unfair Advantage</h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto">Why our clients scale faster, launch louder, and sleep better.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* The Old Way */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
                <h3 className="text-2xl font-bold text-white/50 mb-8 pb-4 border-b border-white/10 text-center">The "Industry Standard"</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white mb-1">Hourly Billing</strong>
                      <span className="text-white/50">Agencies are incentivized to drag their feet to bill more hours.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white mb-1">Vendor Chaos</strong>
                      <span className="text-white/50">You become a full-time project manager wrangling 5 different freelancers.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <X className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white mb-1">Zero Guarantees</strong>
                      <span className="text-white/50">If the launch flops, they still get paid and you take 100% of the risk.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* The Haven Way */}
              <div className="bg-[#111] border-2 border-[#E52521] rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(229, 37, 33,0.15)] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E52521] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-6 rounded-full shadow-lg">
                  The Haven Way
                </div>
                <h3 className="text-2xl font-black text-white mb-8 pb-4 border-b border-white/10 text-center">Outcome-Driven Execution</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-[#E52521] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white mb-1">Fixed "Grand Slam" Pricing</strong>
                      <span className="text-white/70">You pay one price for the final outcome. We eat the cost of delays.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-[#E52521] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white mb-1">In-House Production Stack</strong>
                      <span className="text-white/70">We handle the creative, the filming, the mixing, and the marketing natively.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-[#E52521] shrink-0 mt-1" />
                    <div>
                      <strong className="block text-white mb-1">Iron-Clad Risk Reversal</strong>
                      <span className="text-white/70">We tie our fees to exact delivery dates and quality metrics. You carry zero risk.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: STORY GRID (Light) */}
        <section className="bg-gray-50 py-24 md:py-32 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80" 
                  alt="Studio setup" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="md:pl-8">
                <div className="text-[#3cc2b4] text-sm font-bold uppercase tracking-wider mb-4">The Infrastructure</div>
                <h2 className="text-3xl sm:text-4xl font-black text-black mb-6">Built for speed and scale.</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                  We don't rent gear. We own our studios, our RED camera packages, and our PA systems. Why? Because relying on rental houses introduces friction, risk, and time delays.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  When you sign with Haven, our entire infrastructure is mobilized for your project within 24 hours. No waiting on vendor quotes. Just immediate execution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="order-1 md:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80" 
                  alt="Live event" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="order-2 md:order-1 md:pr-8">
                <div className="text-[#3cc2b4] text-sm font-bold uppercase tracking-wider mb-4">The Philosophy</div>
                <h2 className="text-3xl sm:text-4xl font-black text-black mb-6">Creative Freedom via Logistical Safety.</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">
                  Producing a major project is inherently stressful. Millions of dollars and brand reputations are on the line. Our job isn't just to make it look good—our job is to be your safe harbor.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  We handle the logistical nightmares so that you can stay exactly where you belong: in the creative flow state.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: VALUES SECTION (Dark) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center bg-[#0B0B0C]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-16">The Core Operating System</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <div className="text-6xl font-black text-[#111] [-webkit-text-stroke:2px_#E52521] mb-6">01</div>
              <h3 className="text-2xl font-bold text-white mb-4">Extreme Ownership</h3>
              <p className="text-white/60 text-lg">If it happens on our set or our stage, it's our responsibility. We never point fingers at vendors. We solve it.</p>
            </div>
            <div>
              <div className="text-6xl font-black text-[#111] [-webkit-text-stroke:2px_#E52521] mb-6">02</div>
              <h3 className="text-2xl font-bold text-white mb-4">ROI over Ego</h3>
              <p className="text-white/60 text-lg">We love beautiful art, but if it doesn't hit your business or audience objective, we consider it a failed project.</p>
            </div>
            <div>
              <div className="text-6xl font-black text-[#111] [-webkit-text-stroke:2px_#E52521] mb-6">03</div>
              <h3 className="text-2xl font-bold text-white mb-4">No 'A La Carte'</h3>
              <p className="text-white/60 text-lg">We sell guaranteed outcomes, not hours. If you just need a quick logo design, we aren't for you. We run the pipeline.</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA (Light) */}
        <section className="bg-white py-24 md:py-32 border-t-4 border-[#3cc2b4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-black mb-8">Meet the people who make it happen.</h2>
            <Link href="/team" className="btn-primary inline-flex items-center gap-2 px-10 py-5 text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              See the Crew <ArrowRight className="w-5 h-5" />
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
