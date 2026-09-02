'use client'

import { motion } from 'framer-motion'
import { Zap, ShieldCheck, Users, BarChart3 } from 'lucide-react'

const props = [
  {
    icon: Zap,
    title: 'Speed is the product.',
    body: 'Your song mixed & mastered in 21 days. Your event fully staffed in 10. We don\'t move slow — and neither do your deadlines.',
    accent: '#3cc2b4',
  },
  {
    icon: ShieldCheck,
    title: 'Guaranteed or it\'s on us.',
    body: 'Unlimited revisions until you\'re proud to release. On-time delivery or we cover overage costs. No fine print.',
    accent: '#3cc2b4',
  },
  {
    icon: Users,
    title: 'In-house everything.',
    body: 'Producers, directors, sound engineers, event ops, and crew — all under one roof. You just show up.',
    accent: '#3cc2b4',
  },
  {
    icon: BarChart3,
    title: 'A sponsor network you can\'t access alone.',
    body: '127 brand partners matched to productions. We don\'t just produce your work — we fund it.',
    accent: '#3cc2b4',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any } },
}

export function HavenDifference() {
  return (
    <section className="section-padding bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#3cc2b4] text-sm font-medium uppercase tracking-widest mb-3">The Haven Difference</p>
          <h2 className="section-title text-white">Why producers and brands</h2>
          <h2 className="section-title text-white">come back, every time.</h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {props.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                variants={item}
                className="group p-7 rounded-2xl border border-white/8 hover:border-[#3cc2b4]/30 bg-white/3 hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#3cc2b4]/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#3cc2b4]" />
                </div>
                <h3 className="font-bold text-white text-base mb-3 leading-snug">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
