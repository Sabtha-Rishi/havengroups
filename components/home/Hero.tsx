'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const headlines = [
  {
    persona: 'produce an event',
    top: 'Flawless event execution —',
    highlight: 'from concept',
    bottom: 'to curtain call.',
    sub: 'For promoters & corporates',
  },
  {
    persona: 'produce a song',
    top: 'From studio session to',
    highlight: 'streaming charts',
    bottom: 'in 45 days.',
    sub: 'For artists & labels',
  },
  {
    persona: 'sponsor',
    top: 'Your brand on the',
    highlight: 'next big stage',
    bottom: 'with measurable ROI.',
    sub: 'For marketing leads',
  },
  {
    persona: 'produce a film',
    top: 'Broadcast-grade production',
    highlight: 'on-budget',
    bottom: 'every single time.',
    sub: 'For studios & brands',
  },
  {
    persona: 'produce a launch',
    top: 'Your podcast or album',
    highlight: 'launched globally',
    bottom: 'in weeks, not months.',
    sub: 'For podcasters & artists',
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startInterval = () => {
    if (selected !== null) return
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % headlines.length)
    }, 6000)
  }

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [selected])

  const active = selected !== null ? selected : current

  const handleSelect = (i: number) => {
    setSelected(i)
    setCurrent(i)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const h = headlines[active]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0C]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0C] via-[#1a0a00] to-[#0B0B0C]" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 100%, #3cc2b4 0%, transparent 100%)',
        }}
      />
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Persona pill */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`pill-${active}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="mb-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5"
            >
              <span className="w-2 h-2 bg-[#3cc2b4] rounded-full animate-pulse" />
              <span className="text-white/70 text-sm font-medium">{h.sub}</span>
            </motion.div>
          </AnimatePresence>

          {/* Main headline */}
          <div className="relative overflow-hidden mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${active}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight max-w-4xl hero-headline"
              >
                {h.top}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#3cc2b4]">
                  {h.highlight}
                </span>{' '}
                {h.bottom}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* CTAs */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${active}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            >
              <Link href="/contact" className="btn-primary flex items-center gap-2 text-base px-7 py-4 group">
                Book a Free Production Call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/work"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-base font-medium"
              >
                <span className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-[#E52521]/50 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </span>
                See Our Work
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Persona selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {headlines.map((h, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  active === i
                    ? 'bg-white border-white text-[#0B0B0C]'
                    : 'border-white/15 text-white/50 hover:text-white hover:border-white/30'
                }`}
              >
                {h.persona}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  )
}
