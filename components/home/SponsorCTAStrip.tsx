import Link from 'next/link'
import { ArrowRight, BarChart3, Users, Zap } from 'lucide-react'

const sponsorPoints = [
  { icon: BarChart3, text: 'Live ROI dashboard per activation' },
  { icon: Users, text: 'Reach 50K–500K per production' },
  { icon: Zap, text: 'Category exclusivity available' },
]

export function SponsorCTAStrip() {
  return (
    <section className="section-padding bg-white border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left */}
          <div className="max-w-xl">
            <span className="inline-block bg-[#D62828]/10 text-[#D62828] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              For Brands & Sponsors
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B0B0C] leading-tight mb-4">
              Want your brand on<br />
              <span className="text-[#3cc2b4]">the next big stage?</span>
            </h2>
            <p className="text-black/50 leading-relaxed mb-6">
              We don't sell ad slots — we sell cultural moments. Every production, concert, and audio launch is an opportunity for your brand to live inside something people actually care about.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/sponsors" className="btn-primary flex items-center gap-2 group">
                See Sponsorship Opportunities
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/sponsors#deck" className="btn-secondary flex items-center gap-2">
                Download Sponsor Deck
              </Link>
            </div>
          </div>

          {/* Right: points */}
          <div className="flex flex-col gap-4 min-w-[280px]">
            {sponsorPoints.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 p-4 bg-[#F7F6F4] rounded-2xl border border-black/5">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#3cc2b4]" />
                </div>
                <span className="text-[#0B0B0C] font-medium text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
