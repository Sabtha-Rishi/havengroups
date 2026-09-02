import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getPortfolioItems, getTestimonials } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, ShieldCheck, Play, ArrowDownToLine, Flame } from 'lucide-react'

// Static copy dictionary for the 4 verticals
const verticalData = {
  music: {
    title: 'Music Production',
    headline: 'From studio session to streaming charts in 45 days.',
    persona: 'Independent artists, bands, and indie labels.',
    offerStack: [
      'Full-track production & arrangement (Value: ₹75,000)',
      'Studio recording - Vocals & Instruments (Value: ₹30,000)',
      'Professional mixing & mastering (Value: ₹40,000)',
      'Bonus: Release strategy & DSP pitching guide (Value: ₹25,000)',
    ],
    totalValue: '₹1,70,000',
    timeline: ['Discover (Day 1-3)', 'Produce (Day 4-20)', 'Mix/Master (Day 21-30)', 'Deliver & Plan (Day 31-45)'],
    guarantee: 'If it doesn\'t sound radio-ready, we mix it until it does.',
    pricing: [
      { name: 'Starter', price: '₹45,000', features: ['Single Track Production', 'Basic Mix/Master', '2 Revisions'] },
      { name: 'Growth', price: '₹1,20,000', features: ['3-Track EP', 'Full Studio Access', 'Release Strategy', 'Unlimited Revisions'], popular: true },
      { name: 'Signature', price: 'Custom', features: ['Full Album', 'A&R Support', 'Music Video Production', 'Priority Booking'] },
    ],
  },
  film: {
    title: 'Film & Commercials',
    headline: 'Broadcast-grade production, on-budget, every single time.',
    persona: 'Brands, agencies, and independent filmmakers.',
    offerStack: [
      'Concept development & storyboarding (Value: ₹1,50,000)',
      'Full crew & equipment hire - RED/ARRI (Value: ₹5,00,000)',
      'Location scouting & permits (Value: ₹1,00,000)',
      'Bonus: 15s social media cutdowns (Value: ₹75,000)',
    ],
    totalValue: '₹8,25,000',
    timeline: ['Pre-Production (Weeks 1-2)', 'Principal Photography (Week 3)', 'Post-Production (Weeks 4-6)', 'Delivery (Week 7)'],
    guarantee: 'Delivered on the exact date in the contract, or we refund the post-production fee.',
    pricing: [
      { name: 'Starter', price: '₹2,50,000', features: ['1-Day Shoot', 'Small Crew', '1 Deliverable'] },
      { name: 'Growth', price: '₹8,00,000', features: ['3-Day Shoot', 'Full Cinema Package', '3 Deliverables + Socials'], popular: true },
      { name: 'Signature', price: 'Custom', features: ['Multi-Location', 'VFX / CGI', 'National Broadcast Rights'] },
    ],
  },
  events: {
    title: 'Live Events',
    headline: 'Flawless execution — from concept to curtain call.',
    persona: 'Promoters, corporate brands, and festival organizers.',
    offerStack: [
      'Venue sourcing & layout planning (Value: ₹2,00,000)',
      'Stage design & AV rigging (Value: ₹8,00,000)',
      'Artist advancing & hospitality (Value: ₹1,50,000)',
      'Bonus: Post-event highlight reel (Value: ₹1,00,000)',
    ],
    totalValue: '₹12,50,000',
    timeline: ['Concept (Month 1)', 'Logistics & Permitting (Month 2)', 'Build (Week Of)', 'Show Day'],
    guarantee: 'Zero technical downtime during your headliner\'s set, guaranteed.',
    pricing: [
      { name: 'Starter', price: '₹5,00,000', features: ['Up to 500 Pax', 'Basic Stage/AV', 'Day-of Coordination'] },
      { name: 'Growth', price: '₹15,00,000', features: ['Up to 3000 Pax', 'Custom Stage Design', 'Full Permit Handling'], popular: true },
      { name: 'Signature', price: 'Custom', features: ['Festival Scale (5000+)', 'Multi-Stage', 'Sponsor Activations'] },
    ],
  },
  'audio-launches': {
    title: 'Audio Launches',
    headline: 'Your podcast or album launched globally in weeks.',
    persona: 'Podcasters, thought leaders, and recording artists.',
    offerStack: [
      'Press kit & EPK creation (Value: ₹50,000)',
      'Listening party event production (Value: ₹1,50,000)',
      'Digital ad campaign management (Value: ₹1,00,000)',
      'Bonus: Media training session (Value: ₹25,000)',
    ],
    totalValue: '₹3,25,000',
    timeline: ['Strategy (Week 1)', 'Asset Creation (Weeks 2-3)', 'Launch Event (Week 4)', 'Amplify (Weeks 5-6)'],
    guarantee: 'We hit the agreed-upon impression targets, or we run the ads on our dime until we do.',
    pricing: [
      { name: 'Starter', price: '₹75,000', features: ['Digital EPK', 'Basic PR Pitching', 'Asset Design'] },
      { name: 'Growth', price: '₹3,00,000', features: ['Listening Party for 50', 'Full PR Campaign', 'Ad Management'], popular: true },
      { name: 'Signature', price: 'Custom', features: ['Multi-City Tour', 'Billboard Placements', 'Influencer Seeding'] },
    ],
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = verticalData[slug as keyof typeof verticalData]
  if (!data) return { title: 'Service Not Found' }
  return { title: `${data.title} | Haven Productions` }
}

export default async function VerticalServicePage({ params }: Props) {
  const { slug } = await params
  const data = verticalData[slug as keyof typeof verticalData]
  if (!data) return notFound()

  const settings = await getSiteSettings()
  // Ensure the vertical matches the Supabase enum
  const dbVertical = slug === 'audio-launches' ? 'audio' : slug
  const portfolio = await getPortfolioItems(dbVertical)

  if (!settings) return null

  return (
    <div className="bg-[#0B0B0C] min-h-screen selection:bg-[#3cc2b4] selection:text-white">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24">
        {/* SECTION 1: HERO (Dark) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center border-b border-white/10">
          <div className="inline-flex items-center gap-2 bg-[#3cc2b4]/10 text-[#3cc2b4] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
            The Complete {data.title} Stack
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-8 leading-tight max-w-5xl mx-auto hero-headline">
            {data.headline.split(',').map((part, i) => (
              <span key={i}>
                {i === 0 ? part : <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">,{part}</span>}
              </span>
            ))}
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10">
            <strong>Who this is for:</strong> {data.persona}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#pricing" className="btn-primary px-8 py-4 text-lg">
              View Investment Tiers
            </Link>
            <Link href="#portfolio" className="px-8 py-4 text-lg font-bold text-white border border-white/20 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              <Play className="w-5 h-5" /> See the Work
            </Link>
          </div>
        </section>

        {/* SECTION 2: OFFER STACK & TIMELINE (Light) */}
        <section className="bg-white py-24 md:py-32 border-t-4 border-[#3cc2b4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              
              {/* Left: Offer Stack */}
              <div>
                <h2 className="text-3xl sm:text-5xl font-black text-black mb-6">The Offer Stack</h2>
                <p className="text-gray-600 text-lg mb-8 font-medium">
                  If you bought these services separately from specialized freelancers, you would pay significantly more, and you'd have to manage them yourself. Here is everything we handle in-house.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm">
                  <ul className="space-y-6 mb-8">
                    {data.offerStack.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-lg text-black font-medium">
                        <CheckCircle2 className="w-6 h-6 text-[#3cc2b4] shrink-0 mt-0.5" />
                        <span className={item.startsWith('Bonus:') ? 'font-black text-[#3cc2b4]' : ''}>
                          {item.split(' (Value:').map((part, idx) => (
                            <span key={idx}>
                              {idx === 0 ? part : <span className="text-gray-400 block text-sm mt-1">Value: {part}</span>}
                            </span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Total Real World Value</span>
                      <span className="text-2xl font-black text-black line-through decoration-[#D62828] decoration-4">{data.totalValue}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[#3cc2b4] font-bold text-sm uppercase tracking-wider">
                      <ArrowDownToLine className="w-4 h-4" /> Scroll down for your actual investment
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Timeline */}
              <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3cc2b4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <h3 className="text-2xl font-black text-white mb-8">The Execution Timeline</h3>
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#3cc2b4] before:via-[#3cc2b4]/50 before:to-transparent">
                  {data.timeline.map((step, i) => (
                    <div key={i} className="relative flex items-center group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#111] bg-[#3cc2b4] text-white font-black shrink-0 z-10 shadow-lg">
                        {i + 1}
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 ml-6 w-full">
                        <div className="font-bold text-white text-lg">{step}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: GUARANTEE BLOCK (Dark) */}
        <section className="bg-[#0B0B0C] py-24 border-y border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-[#3cc2b4]/30 rounded-3xl p-10 md:p-16 text-center shadow-[0_0_50px_rgba(229, 37, 33,0.1)] relative overflow-hidden">
              <ShieldCheck className="w-20 h-20 text-[#3cc2b4] mx-auto mb-8" />
              <div className="text-[#3cc2b4] text-sm font-bold uppercase tracking-widest mb-4">Risk Reversal</div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">The Haven Guarantee</h2>
              <p className="text-2xl text-white/80 font-medium leading-relaxed italic">
                "{data.guarantee}"
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: PORTFOLIO GRID (Light) */}
        {portfolio.length > 0 && (
          <section id="portfolio" className="bg-gray-50 py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-black mb-4">Proven Results</h2>
                <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">Don't take our word for it. Look at the ROI we've generated for {data.title} clients.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolio.slice(0, 4).map((item) => (
                  <div key={item.id} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all">
                    <div className="relative aspect-[16/9] w-full bg-gray-200">
                      {item.thumbnail_url && (
                        <Image
                          src={item.thumbnail_url}
                          alt={item.title}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      )}
                    </div>
                    <div className="p-8">
                      <div className="text-sm font-bold text-[#3cc2b4] uppercase tracking-wider mb-2">{item.client}</div>
                      <h3 className="text-2xl font-black text-black mb-4">{item.title}</h3>
                      <p className="text-gray-600 font-medium mb-6">{item.description}</p>
                      
                      {item.metrics && (
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <div className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Result Metrics</div>
                          <div className="text-black font-black">{item.metrics}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5: PRICING (Hormozi Style - Dark) */}
        <section id="pricing" className="bg-[#0B0B0C] py-24 md:py-32 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Investment Tiers</h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-4">
                Total Value: <span className="line-through text-white/40">{data.totalValue}</span>
              </p>
              <div className="inline-flex items-center gap-2 bg-[#D62828]/10 border border-[#D62828]/20 text-[#D62828] px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4" /> Capacity Limited: 3 spots remaining this quarter
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {data.pricing.map((tier, i) => (
                <div key={i} className={`bg-[#111] rounded-3xl p-8 border transition-all ${tier.popular ? 'border-[#3cc2b4] shadow-[0_0_40px_rgba(229, 37, 33,0.15)] relative scale-100 md:scale-105 z-10' : 'border-white/10 hover:border-white/20'}`}>
                  {tier.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3cc2b4] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-6 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                  <div className="text-4xl md:text-5xl font-black text-white mb-6 pb-6 border-b border-white/10">{tier.price}</div>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/80 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-[#3cc2b4] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/contact?service=${slug}&tier=${tier.name.toLowerCase()}`} className={`block text-center py-5 rounded-xl font-bold text-lg transition-all ${tier.popular ? 'bg-[#3cc2b4] text-white hover:bg-[#cc1c18] shadow-xl hover:shadow-[#3cc2b4]/20 hover:-translate-y-1' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    Book {tier.name}
                  </Link>
                  {tier.popular && (
                    <p className="text-center text-[#D62828] text-xs font-bold uppercase mt-4">
                      Fast action bonus applies
                    </p>
                  )}
                </div>
              ))}
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
