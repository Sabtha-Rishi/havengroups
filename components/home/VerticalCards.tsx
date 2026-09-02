'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Music, Film, Calendar, Mic2, TrendingUp, Zap, Video, Camera, ArrowRight, HelpCircle, LucideIcon } from 'lucide-react'

// Map icon names from DB to actual lucide-react icons
const iconMap: Record<string, LucideIcon> = {
  Music, Film, Calendar, Mic2, TrendingUp, Zap, Video, Camera
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any } },
}

export function VerticalCards({ services }: { services: any[] }) {
  // If no services from DB, fallback to an empty array (or we could show the hardcoded ones)
  const itemsToRender = services || []

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title text-[#0B0B0C]">What We Produce</h2>
          <p className="section-subtitle text-black/50 max-w-xl mx-auto">
            Five verticals. One roof. Zero compromises.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {itemsToRender.map((v) => {
            const Icon = iconMap[v.icon_name] || HelpCircle
            return (
              <motion.div key={v.slug} variants={item}>
                <Link
                  href={v.href}
                  className="group block h-full rounded-3xl border border-black/8 bg-white p-2 hover:shadow-xl hover:border-[#E52521]/30 transition-all duration-300"
                >
                  {/* Image Header */}
                  <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-gray-100 mb-4 group-hover:shadow-md transition-shadow">
                    {v.image_url ? (
                      <Image 
                        src={v.image_url} 
                        alt={v.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4 text-[#E52521]" />
                    </div>
                  </div>

                  <div className="px-3 pb-3 flex flex-col h-[calc(100%-9rem)]">
                    <h3 className="font-bold text-[#0B0B0C] text-base mb-1.5 leading-tight group-hover:text-[#E52521] transition-colors">{v.title}</h3>
                    
                    <p className="text-black/50 text-xs leading-relaxed mb-4 flex-1">
                      {v.tagline}
                    </p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-black/5 mt-auto">
                      <span className="text-[10px] uppercase font-bold text-[#E52521] tracking-wider">{v.stat_text}</span>
                      <ArrowRight className="w-3 h-3 text-[#E52521] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <Link href="/services" className="text-sm font-bold text-[#E52521] hover:text-[#e55c10] uppercase tracking-wider transition-colors inline-flex items-center gap-2">
            Not sure which fits? Take our 60-second quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
