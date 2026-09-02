'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Database } from '@/lib/database.types'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

const personaLabel: Record<string, string> = {
  artist: 'Artist / Label',
  brand: 'Brand / Marketing',
  film: 'Film / Studio',
  events: 'Event / Corporate',
  sponsor: 'Sponsor / Partner',
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!autoPlay) return
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [autoPlay, testimonials.length])

  const prev = () => {
    setAutoPlay(false)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setAutoPlay(false)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const t = testimonials[current]
  if (!t) return null

  return (
    <section className="section-padding bg-[#F7F6F4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#3cc2b4] text-sm font-medium uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="section-title text-[#0B0B0C]">What our clients say</h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-black/5 shadow-sm"
            >
              <Quote className="w-10 h-10 text-[#3cc2b4]/20 mb-6" />
              <p className="text-[#0B0B0C] text-xl sm:text-2xl font-medium leading-relaxed mb-8">
                "{t.quote}"
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {t.photo_url && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#3cc2b4]/20 flex-shrink-0">
                      <Image src={t.photo_url} alt={t.name} fill sizes="56px" className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-[#0B0B0C]">{t.name}</p>
                    <p className="text-black/50 text-sm">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                    <span className="inline-block mt-1 text-xs bg-[#3cc2b4]/10 text-[#3cc2b4] font-medium px-2 py-0.5 rounded-full">
                      {personaLabel[t.persona]}
                    </span>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#3cc2b4] text-[#3cc2b4]" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-11 h-11 border border-black/15 rounded-full flex items-center justify-center hover:border-[#3cc2b4] hover:text-[#3cc2b4] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoPlay(false); setCurrent(i) }}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-2 bg-[#3cc2b4]' : 'w-2 h-2 bg-black/20 hover:bg-black/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 border border-black/15 rounded-full flex items-center justify-center hover:border-[#3cc2b4] hover:text-[#3cc2b4] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
