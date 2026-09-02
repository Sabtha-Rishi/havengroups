'use client'

import { motion } from 'framer-motion'
import { Search, Lightbulb, Clapperboard, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Discover',
    body: 'We learn your vision, audience, timeline, and budget in a 30-minute call. No sales pitch — just clarity.',
  },
  {
    icon: Lightbulb,
    step: '02',
    title: 'Design',
    body: 'A tailored production blueprint lands in your inbox within 48 hours — offer, timeline, crew, and deliverables.',
  },
  {
    icon: Clapperboard,
    step: '03',
    title: 'Produce',
    body: 'Our in-house team executes. You get weekly check-ins and a live project dashboard — never left in the dark.',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Amplify',
    body: 'We don\'t just deliver — we help you distribute, pitch to press, and connect you with our sponsor network.',
  },
]

export function ProcessSnapshot() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#3cc2b4] text-sm font-medium uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="section-title text-[#0B0B0C]">From "let's talk" to</h2>
          <h2 className="section-title text-[#0B0B0C]">live in the world.</h2>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-[#F7F6F4] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      <Icon className="w-8 h-8 text-[#3cc2b4]" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#3cc2b4] text-white text-xs font-black rounded-full flex items-center justify-center">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#0B0B0C] text-lg mb-3">{s.title}</h3>
                  <p className="text-black/50 text-sm leading-relaxed max-w-xs">{s.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
