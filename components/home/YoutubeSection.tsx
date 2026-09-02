'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
)

interface YoutubeSectionProps {
  youtubeUrl?: string | null
}

export function YoutubeSection({ youtubeUrl }: YoutubeSectionProps) {
  return (
    <section className="py-16 bg-[#F7F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-black/5 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            <div className="w-16 h-16 bg-[#E52521]/10 rounded-2xl flex items-center justify-center shrink-0">
              <Youtube className="w-8 h-8 text-[#E52521]" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0B0B0C] mb-3">
                Check out our YouTube Channel
              </h3>
              <p className="text-black/60 text-sm max-w-xl leading-relaxed">
                Dive into our latest productions, behind-the-scenes, and tutorials. 
                Want to start your own channel? <span className="text-[#0B0B0C] font-semibold">We also help produce YouTube content</span> from ideation to final cut. Let us help you grow.
              </p>
            </div>
          </div>
          
          <a
            href={youtubeUrl || '#'}
            target={youtubeUrl ? '_blank' : undefined}
            rel={youtubeUrl ? 'noopener noreferrer' : undefined}
            className="btn-primary shrink-0 flex items-center gap-2 group whitespace-nowrap"
          >
            Watch & Subscribe
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
