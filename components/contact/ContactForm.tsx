'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function ContactForm() {
  const [persona, setPersona] = useState('')
  const [vertical, setVertical] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-[#E52521]/10 border border-[#E52521]/20 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-[#E52521] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
          <ArrowRight className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
        <p className="text-white/60">Our production team will review your details and reach out within 24 hours to schedule a call.</p>
        <button onClick={() => setSubmitted(false)} className="mt-8 text-[#E52521] font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-white/50">I am a...</label>
          <select 
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E52521]"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            required
          >
            <option value="" disabled>Select Persona</option>
            <option value="artist">Artist / Musician</option>
            <option value="brand">Brand / Marketing Manager</option>
            <option value="promoter">Event Promoter</option>
            <option value="filmmaker">Filmmaker / Agency</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-white/50">Interested In...</label>
          <select 
            className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E52521]"
            value={vertical}
            onChange={(e) => setVertical(e.target.value)}
            required
          >
            <option value="" disabled>Select Vertical</option>
            <option value="music">Music Production</option>
            <option value="film">Film & Commercials</option>
            <option value="events">Event Production</option>
            <option value="sponsorship">Brand Sponsorships</option>
            <option value="audio">Audio / Podcast Launch</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-white/50">Name</label>
          <input type="text" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E52521]" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-white/50">Email</label>
          <input type="email" className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E52521]" required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-white/50">Project Details (Budget, Timeline, Goals)</label>
        <textarea rows={4} className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E52521]" required />
      </div>

      <button type="submit" className="btn-primary w-full py-4 text-lg">
        Submit Request
      </button>
    </form>
  )
}
