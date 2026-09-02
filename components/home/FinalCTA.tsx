'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Send } from 'lucide-react'

const personas = [
  { value: 'artist', label: 'Artist / Musician / Label A&R' },
  { value: 'brand', label: 'Brand / Marketing Lead / CMO' },
  { value: 'film', label: 'Film Producer / Studio / Ad Agency' },
  { value: 'events', label: 'Event Promoter / Corporate Planner' },
  { value: 'sponsor', label: 'Sponsor / Brand Partner' },
  { value: 'other', label: 'Something else' },
]

export function FinalCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Simulate API call — replace with server action or form service
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-[#E52521] text-sm font-medium uppercase tracking-widest mb-4">Ready to Start?</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B0B0C] leading-tight mb-6">
              Let's build something<br />
              <span className="text-[#E52521]">worth remembering.</span>
            </h2>
            <p className="text-black/50 leading-relaxed mb-8">
              Book a free 30-minute discovery call. No pitch, no pressure — just a clear plan for your project, delivered within 48 hours.
            </p>
            <div className="flex flex-col gap-4 text-sm">
              {[
                '30-minute call, zero obligation',
                'Production blueprint in 48 hours',
                'Clear pricing, no hidden fees',
                'Direct line to your production lead',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E52521] flex-shrink-0" />
                  <span className="text-black/70">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F7F6F4] rounded-3xl p-8 border border-black/5"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 bg-[#E52521]/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-[#E52521]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B0B0C] mb-2">We've got your message!</h3>
                <p className="text-black/50 text-sm">Expect a reply within a few hours. We'll review what you need and reach out to schedule your discovery call.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fname" className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">First Name</label>
                    <input id="fname" name="fname" type="text" required placeholder="Arjun" className="input-field" />
                  </div>
                  <div>
                    <label htmlFor="lname" className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">Last Name</label>
                    <input id="lname" name="lname" type="text" required placeholder="Mehta" className="input-field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">Email</label>
                  <input id="email" name="email" type="email" required placeholder="you@studio.com" className="input-field" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">Phone / WhatsApp</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" className="input-field" />
                </div>

                <div>
                  <label htmlFor="persona" className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">I am a…</label>
                  <select id="persona" name="persona" required className="input-field">
                    <option value="">Select your role</option>
                    {personas.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="A 5-track EP, a product launch event, a podcast series…"
                    className="input-field resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2 py-4 mt-1"
                >
                  {loading ? 'Sending…' : 'Book My Free Call'}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
