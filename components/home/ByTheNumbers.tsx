'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface StatItem {
  value: number
  suffix: string
  label: string
  prefix?: string
}

interface ByTheNumbersProps {
  stats: {
    songsProduced: number
    eventsExecuted: number
    sponsorsMatched: number
    totalReachMillions: number
  }
}

function AnimatedCounter({ value, suffix, prefix = '', duration = 2 }: { value: number; suffix: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 4) // ease-out quart
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

export function ByTheNumbers({ stats }: ByTheNumbersProps) {
  const items: StatItem[] = [
    { value: stats.songsProduced, suffix: '+', label: 'Songs & albums produced' },
    { value: stats.eventsExecuted, suffix: '+', label: 'Events executed flawlessly' },
    { value: stats.sponsorsMatched, suffix: '+', label: 'Brands placed & activated' },
    { value: stats.totalReachMillions, suffix: 'B+', prefix: '', label: 'Total audience reach' },
  ]

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section className="py-20 bg-[#0B0B0C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#E52521] text-sm font-medium uppercase tracking-widest mb-3">By The Numbers</p>
          <h2 className="section-title text-white">Results that speak</h2>
          <h2 className="section-title text-white">for themselves.</h2>
        </div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {items.map((s, i) => (
            <motion.div
              key={s.label}
              variants={item}
              className="bg-[#111111] px-8 py-12 flex flex-col items-center justify-center text-center"
            >
              <div className="text-5xl sm:text-6xl font-black text-white mb-2 tabular-nums">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                  prefix={s.prefix}
                />
              </div>
              <p className="text-white/40 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
