import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, TrendingDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How Haven Works | Our Process',
  description: 'The proven end-to-end production pipeline from discovery to amplification.',
}

const timeline = [
  {
    phase: '01',
    title: 'Discover & Blueprint',
    duration: 'Week 1',
    description: 'We don\'t touch a camera or microphone until the ROI is mapped out. We analyze your brand, your audience, and reverse-engineer the exact creative asset needed to hit your specific goal.',
    client: 'You bring the vision and budget.',
    haven: 'We deliver a bulletproof production timeline and creative strategy.',
  },
  {
    phase: '02',
    title: 'Design & Pre-Production',
    duration: 'Weeks 2-3',
    description: 'Where the magic is actually made. Storyboards, location scouting, artist advancing, and technical rigging plans. We remove all the guesswork before shoot day or show day.',
    client: 'You approve the creative direction.',
    haven: 'We hire the crew, secure the permits, and build the infrastructure.',
  },
  {
    phase: '03',
    title: 'Produce & Execute',
    duration: 'Week 4',
    description: 'The main event. Whether it\'s a 3-day film shoot, a live festival, or a studio lock-in. Our in-house crew executes exactly to the blueprint, on time, with zero technical compromises.',
    client: 'You show up and perform (or watch us work).',
    haven: 'We direct, record, build, and capture every moment in broadcast quality.',
  },
  {
    phase: '04',
    title: 'Post & Deliver',
    duration: 'Weeks 5-6',
    description: 'Editing, mixing, color grading, and final asset delivery. We don\'t just hand over a hard drive; we deliver assets formatted natively for every platform you need.',
    client: 'You provide one round of consolidated feedback.',
    haven: 'We deliver the final polished masters, ready for distribution.',
  },
  {
    phase: '05',
    title: 'Amplify',
    duration: 'Week 7+',
    description: 'Production is useless without distribution. We hook your new assets into our network of media partners, sponsors, and ad buyers to guarantee it reaches the intended audience.',
    client: 'You watch the numbers go up.',
    haven: 'We run the ad campaigns, PR pitching, and DSP placement strategies.',
  }
]

export default async function ProcessPage() {
  const settings = await getSiteSettings()
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
            How Haven Works
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight hero-headline">
            Effortless Production. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E52521] to-[#FF4D4D]">
              Guaranteed Outcomes.
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed">
            We built Haven because the traditional agency model is broken. You shouldn't have to hire a strategist, a production house, and a marketing team separately. We do it all, in-house, on a single timeline.
          </p>
        </section>

        {/* SECTION 2: RISK REVERSAL (Light) */}
        <section className="bg-white py-24 border-t-4 border-[#3cc2b4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12 shadow-sm">
              <div className="shrink-0 w-32 h-32 bg-[#3cc2b4]/10 rounded-full flex items-center justify-center border-4 border-[#3cc2b4]/20">
                <ShieldCheck className="w-16 h-16 text-[#3cc2b4]" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Total Risk Reversal</h2>
                <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed mb-6">
                  In a normal agency relationship, if the permits get denied, the gear breaks, or the mix sounds muddy—the client eats the cost of fixing it.
                </p>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  We consider that unacceptable. At Haven, you buy an outcome. If something breaks on our watch, we cover the overtime. If the outcome isn't hit, we refund the margin. You carry absolutely zero execution risk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CLIENT EFFORT SCORE (Dark) */}
        <section className="bg-[#0B0B0C] py-24 md:py-32 border-t border-white/10 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-16 h-16 bg-[#E52521] rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-[0_0_30px_rgba(229, 37, 33,0.3)]">
              <TrendingDown className="w-8 h-8 text-white -rotate-3" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Minimizing the Client Effort Score</h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">
              You hired us to buy back your time. So we designed our process to require exactly two things from you: approving the blueprint, and showing up. We handle everything in between.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3cc2b4]" />
                <span className="text-white font-medium">No wrangling freelancers</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3cc2b4]" />
                <span className="text-white font-medium">No managing equipment rentals</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3cc2b4]" />
                <span className="text-white font-medium">No pulling city permits</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3cc2b4]" />
                <span className="text-white font-medium">No begging for deliverables</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: TIMELINE (Light) */}
        <section className="bg-gray-50 py-24 md:py-32 border-y border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-black mb-4">The Exact Process</h2>
              <p className="text-gray-600 text-lg md:text-xl font-medium">How we move from discovery to global launch in 7 weeks.</p>
            </div>

            <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-[#3cc2b4]/20 space-y-12 md:space-y-16">
              
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Number Circle */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-gray-50 bg-[#3cc2b4] text-white font-black text-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-lg">
                    {item.phase}
                  </div>
                  
                  {/* Content Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white border border-gray-200 hover:border-[#3cc2b4]/50 transition-colors rounded-3xl p-6 md:p-8 ml-6 md:ml-0 shadow-sm hover:shadow-xl">
                    <div className="text-[#3cc2b4] text-sm font-bold uppercase tracking-wider mb-2">{item.duration}</div>
                    <h3 className="text-2xl md:text-3xl font-black text-black mb-4">{item.title}</h3>
                    <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed font-medium">
                      {item.description}
                    </p>
                    
                    <div className="space-y-4 border-t border-gray-100 pt-6">
                      <div className="flex flex-col gap-1 bg-gray-50 rounded-xl p-4">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">What You Do</span>
                        <span className="text-black font-bold">{item.client}</span>
                      </div>
                      <div className="flex flex-col gap-1 bg-[#E52521]/5 rounded-xl p-4">
                        <span className="text-[10px] text-[#E52521] uppercase tracking-widest font-bold">What Haven Does</span>
                        <span className="text-[#E52521] font-bold">{item.haven}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        </section>

        {/* SECTION 5: TECH & TOOLS GRID (Dark) */}
        <section className="bg-[#0B0B0C] py-24 md:py-32 text-center border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-12 uppercase tracking-widest text-white/50">Industry-Standard Gear & Tech</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-2xl tracking-widest shadow-inner">ARRI</div>
              <div className="h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-2xl tracking-widest shadow-inner">RED</div>
              <div className="h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-2xl tracking-widest shadow-inner">PRO TOOLS</div>
              <div className="h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-2xl tracking-widest shadow-inner">L-ACOUSTICS</div>
              <div className="h-16 md:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-2xl tracking-widest shadow-inner">DAVINCI</div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA (Light) */}
        <section className="bg-white py-24 md:py-32 border-t-4 border-[#3cc2b4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-black mb-6">Ready to skip the headaches?</h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">Stop managing 5 different vendors. Hire the one crew that handles the entire pipeline.</p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-10 py-5 text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Book Your Project Call <ArrowRight className="w-5 h-5" />
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
