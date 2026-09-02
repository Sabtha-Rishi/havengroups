'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const logos = [
  'Sony Music', 'Zee Entertainment', 'Star Sports', 'PepsiCo India',
  'Spotify India', 'BookMyShow', 'Myntra', 'Apple Music',
  'T-Series', 'Reliance Jio', 'Amazon Prime Music', 'MTV India',
]

export function TrustBar() {
  return (
    <section className="py-12 bg-[#F7F6F4] border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-sm text-black/40 uppercase tracking-widest font-medium">
          Trusted by artists, brands & studios across India
        </p>
      </div>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F7F6F4] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7F6F4] to-transparent z-10 pointer-events-none" />
        {/* Marquee track */}
        <div className="flex gap-12 marquee-track">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-6 py-3 bg-white rounded-xl border border-black/8 shadow-sm"
            >
              <span className="text-black/40 font-semibold text-sm whitespace-nowrap">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
