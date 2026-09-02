import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/supabase'
import Link from 'next/link'
import { CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing & Packages | Haven Productions',
  description: 'Clear, upfront pricing. No hidden fees, no scope creep.',
}

const packages = [
  {
    vertical: 'Music Production',
    starter: { price: '₹45,000', features: ['Single Track Production', 'Basic Mix/Master', '2 Revisions'] },
    growth: { price: '₹1,20,000', features: ['3-Track EP', 'Full Studio Access', 'Release Strategy', 'Unlimited Revisions'] },
    signature: { price: 'Custom', features: ['Full Album', 'A&R Support', 'Music Video Production', 'Priority Booking'] },
  },
  {
    vertical: 'Film & Commercials',
    starter: { price: '₹2,50,000', features: ['1-Day Shoot', 'Small Crew', '1 Deliverable'] },
    growth: { price: '₹8,000,000', features: ['3-Day Shoot', 'Full Cinema Package (ARRI/RED)', '3 Deliverables + Socials'] },
    signature: { price: 'Custom', features: ['Multi-Location', 'VFX / CGI', 'National Broadcast Rights'] },
  },
  {
    vertical: 'Live Events',
    starter: { price: '₹5,00,000', features: ['Up to 500 Pax', 'Basic Stage/AV', 'Day-of Coordination'] },
    growth: { price: '₹15,00,000', features: ['Up to 3000 Pax', 'Custom Stage Design', 'Full Permit Handling'] },
    signature: { price: 'Custom', features: ['Festival Scale (5000+)', 'Multi-Stage', 'Sponsor Activations'] },
  },
  {
    vertical: 'Audio Launches',
    starter: { price: '₹75,000', features: ['Digital EPK', 'Basic PR Pitching', 'Asset Design'] },
    growth: { price: '₹3,00,000', features: ['Listening Party for 50', 'Full PR Campaign', 'Ad Management'] },
    signature: { price: 'Custom', features: ['Multi-City Tour', 'Billboard Placements', 'Influencer Seeding'] },
  }
]

export default async function PricingPage() {
  const settings = await getSiteSettings()
  if (!settings) return null

  return (
    <div className="bg-[#0B0B0C] min-h-screen">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight hero-headline">
            Transparent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">
              Investment
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-xl mb-12">
            No scope creep. No hidden "equipment rental" fees. Our Grand Slam Offers are priced to deliver a specific outcome.
          </p>
        </section>

        {/* PRICING GRIDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32">
          {packages.map((pkg) => (
            <div key={pkg.vertical}>
              <div className="flex items-center gap-4 mb-12">
                <h2 className="text-3xl font-bold text-white">{pkg.vertical}</h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Starter */}
                <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                  <div className="text-4xl font-black text-white mb-6 pb-6 border-b border-white/10">{pkg.starter.price}</div>
                  <ul className="space-y-4 mb-8 min-h-[160px]">
                    {pkg.starter.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-[#3cc2b4] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?interest=${pkg.vertical}&tier=starter`} className="block text-center py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-colors">
                    Book Starter
                  </Link>
                </div>

                {/* Growth (Popular) */}
                <div className="bg-[#111] border border-[#E52521] shadow-[0_0_30px_rgba(229, 37, 33,0.15)] rounded-3xl p-8 relative scale-100 md:scale-105 z-10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E52521] text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Most Popular
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
                  <div className="text-4xl font-black text-white mb-6 pb-6 border-b border-white/10">{pkg.growth.price}</div>
                  <ul className="space-y-4 mb-8 min-h-[160px]">
                    {pkg.growth.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-[#E52521] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?interest=${pkg.vertical}&tier=growth`} className="block text-center py-4 rounded-xl font-bold bg-[#E52521] text-white hover:bg-[#cc1c18] transition-colors">
                    Book Growth
                  </Link>
                </div>

                {/* Signature */}
                <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
                  <h3 className="text-xl font-bold text-white mb-2">Signature</h3>
                  <div className="text-4xl font-black text-white mb-6 pb-6 border-b border-white/10">{pkg.signature.price}</div>
                  <ul className="space-y-4 mb-8 min-h-[160px]">
                    {pkg.signature.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-[#3cc2b4] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?interest=${pkg.vertical}&tier=signature`} className="block text-center py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-colors">
                    Inquire Custom
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* GUARANTEE & FAQ */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="bg-gradient-to-r from-[#1A1A1A] to-[#222222] border border-[#3cc2b4]/20 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <ShieldCheck className="w-20 h-20 text-[#3cc2b4] shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">The Haven Guarantee</h2>
              <p className="text-white/80 text-lg">
                We tie a specific guarantee to every single Vertical. Whether it's a mix revision promise, a technical uptime guarantee, or an impression target. We don't just deliver files; we deliver outcomes.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Payment Terms & FAQs</h2>
            
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#E52521]" /> How are payments structured?
              </h4>
              <p className="text-white/60">Standard terms are 50% upfront to lock the dates and begin pre-production, and 50% upon final delivery. Event production may require different staging based on vendor deposits.</p>
            </div>
            
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#E52521]" /> What about equipment rental fees?
              </h4>
              <p className="text-white/60">The packages above are all-inclusive. You will not see a surprise line item for "lighting rental" or "hard drives." If it's required to deliver the outcome, it's in the package price.</p>
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
