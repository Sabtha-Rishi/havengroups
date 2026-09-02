'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Zap, ArrowRight, Shield } from 'lucide-react'

function CountdownToMonthEnd() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      const diff = end.getTime() - now.getTime()
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex gap-3 justify-center lg:justify-start">
      {[
        { v: timeLeft.days, l: 'Days' },
        { v: timeLeft.hours, l: 'Hrs' },
        { v: timeLeft.minutes, l: 'Min' },
        { v: timeLeft.seconds, l: 'Sec' },
      ].map(({ v, l }) => (
        <div key={l} className="text-center bg-white/10 rounded-xl px-3 py-2 min-w-[52px]">
          <div className="text-2xl font-black text-white tabular-nums">
            {String(v).padStart(2, '0')}
          </div>
          <div className="text-white/40 text-xs uppercase tracking-wider">{l}</div>
        </div>
      ))}
    </div>
  )
}

export function OfferSpotlight() {
  const month = new Date().toLocaleString('default', { month: 'long' })

  return (
    <section className="section-padding bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-[#E52521]/20 bg-gradient-to-br from-[#E52521]/10 via-[#0B0B0C] to-[#D62828]/5 p-8 sm:p-12"
        >
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E52521]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Left */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1.5 bg-[#D62828] text-white text-xs font-bold px-3 py-1 rounded-full">
                  <Zap className="w-3 h-3" /> Only 3 Slots Left
                </span>
                <span className="text-white/30 text-xs">{month} production window</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                The Breakout Package™
              </h2>
              <p className="text-[#E52521] font-semibold mb-4">
                Chart-ready EP, fully produced in 45 days.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-lg">
                Core production (recording, mixing, mastering) + distribution push + press kit + BTS content pack + sponsor intro. Unlimited revisions until you love every track.
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#E52521]" /> 45-day delivery</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#E52521]" /> Unlimited revisions</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-[#E52521]" /> Distribution included</span>
              </div>

              <Link
                href="/contact?package=breakout"
                className="btn-primary inline-flex items-center gap-2 group"
              >
                Claim Your Slot
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: countdown */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              <p className="text-white/40 text-xs uppercase tracking-widest">Offer closes in</p>
              <CountdownToMonthEnd />
              <p className="text-white/30 text-xs">
                Slots are genuinely limited — we cap production to maintain quality.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
