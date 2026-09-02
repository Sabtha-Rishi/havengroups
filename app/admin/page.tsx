import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Music, Film, Calendar, Mic2, TrendingUp, MessageSquare, FileText } from 'lucide-react'
import {
  placeholderPortfolio,
  placeholderTestimonials,
  placeholderBlogPosts,
  placeholderEvents,
  placeholderSponsorshipInventory,
  stats,
} from '@/lib/data'

export const metadata: Metadata = { title: 'Dashboard' }

const quickLinks = [
  { label: 'Add Event', href: '/admin/events/new', icon: Calendar },
  { label: 'Add Portfolio Item', href: '/admin/portfolio/new', icon: Film },
  { label: 'Add Testimonial', href: '/admin/testimonials/new', icon: MessageSquare },
  { label: 'Add Blog Post', href: '/admin/blog/new', icon: FileText },
  { label: 'Update Brand', href: '/admin/settings', icon: TrendingUp },
]

export default function AdminDashboard() {
  const summaryCards = [
    { label: 'Portfolio Items', value: placeholderPortfolio.length, icon: Film, href: '/admin/portfolio', color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Testimonials', value: placeholderTestimonials.length, icon: MessageSquare, href: '/admin/testimonials', color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Blog Posts', value: placeholderBlogPosts.length, icon: FileText, href: '/admin/blog', color: 'bg-green-500/10 text-green-600' },
    { label: 'Events', value: placeholderEvents.length, icon: Calendar, href: '/admin/events', color: 'bg-red-500/10 text-red-600' },
    { label: 'Sponsorships', value: placeholderSponsorshipInventory.length, icon: TrendingUp, href: '/admin/sponsorships', color: 'bg-red-500/10 text-red-600' },
  ]

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Manage all Haven Productions content from here.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {summaryCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group bg-[#1a1a1a] border border-white/8 rounded-2xl p-4 hover:border-[#3cc2b4]/30 transition-all"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${card.color}`}>
                <Icon className="w-4.5 h-4.5" size={18} />
              </div>
              <p className="text-2xl font-black text-white">{card.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{card.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Live Stats */}
      <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 mb-8">
        <h2 className="text-white font-bold mb-4">Live Site Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Songs Produced', value: stats.songsProduced + '+' },
            { label: 'Events Executed', value: stats.eventsExecuted + '+' },
            { label: 'Sponsors Matched', value: stats.sponsorsMatched + '+' },
            { label: 'Total Reach', value: stats.totalReachMillions + 'B+' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-black text-[#E52521]">{s.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="text-white/25 text-xs mt-4">These values are displayed on the frontend By the Numbers section. Edit them in site settings.</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-3.5 bg-white/4 border border-white/8 rounded-xl hover:border-[#3cc2b4]/40 hover:bg-[#3cc2b4]/5 transition-all group"
            >
              <div className="w-8 h-8 bg-[#3cc2b4]/10 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#3cc2b4]" />
              </div>
              <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-[#3cc2b4] ml-auto transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
