'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Database } from '@/lib/database.types'

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']

const verticalColors: Record<string, string> = {
  music: 'bg-purple-100 text-purple-700',
  film: 'bg-blue-100 text-blue-700',
  events: 'bg-slate-100 text-slate-800',
  audio: 'bg-green-100 text-green-700',
  sponsorship: 'bg-slate-100 text-slate-800',
}

interface FeaturedWorkProps {
  items: PortfolioItem[]
}

export function FeaturedWork({ items }: FeaturedWorkProps) {
  const [start, setStart] = useState(0)
  const visible = 3
  const maxStart = Math.max(0, items.length - visible)

  const prev = () => setStart((s) => Math.max(0, s - 1))
  const next = () => setStart((s) => Math.min(maxStart, s + 1))

  const shown = items.slice(start, start + visible)

  return (
    <section className="section-padding bg-[#F7F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#E52521] text-sm font-medium uppercase tracking-widest mb-3">Our Work</p>
            <h2 className="section-title text-[#0B0B0C]">Featured Projects</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex gap-2">
              <button
                onClick={prev}
                disabled={start === 0}
                className="w-10 h-10 border border-black/15 rounded-full flex items-center justify-center hover:border-[#E52521] hover:text-[#E52521] transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={start >= maxStart}
                className="w-10 h-10 border border-black/15 rounded-full flex items-center justify-center hover:border-[#E52521] hover:text-[#E52521] transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <Link href="/work" className="flex items-center gap-1.5 text-sm font-medium text-[#E52521] hover:underline">
              See All Work <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                {item.thumbnail_url && (
                  <Image
                    src={item.thumbnail_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={i === 0}
                  />
                )}
                {/* Overlay */}
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {/* Vertical badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${verticalColors[item.vertical]}`}>
                    {item.vertical}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-[#0B0B0C] text-base mb-1 leading-tight">{item.title}</h3>
                {item.client && (
                  <p className="text-black/40 text-xs mb-3">{item.client} · {item.year}</p>
                )}
                {item.metrics && (
                  <p className="text-[#E52521] text-xs font-semibold leading-relaxed">{item.metrics}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile scroll CTAs */}
        <div className="sm:hidden flex gap-2 mt-6 justify-center">
          <button onClick={prev} disabled={start === 0} className="w-10 h-10 border border-black/15 rounded-full flex items-center justify-center disabled:opacity-30">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} disabled={start >= maxStart} className="w-10 h-10 border border-black/15 rounded-full flex items-center justify-center disabled:opacity-30">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
