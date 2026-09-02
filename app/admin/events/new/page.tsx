'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, CheckCircle } from 'lucide-react'
import { FileUpload } from '@/components/admin/FileUpload'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

const verticals = ['music', 'film', 'events', 'audio', 'sponsorship']
const statuses = ['upcoming', 'past']

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-white border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#0B0B0C] outline-none focus:border-[#E52521] focus:ring-2 focus:ring-[#E52521]/10 transition-all placeholder-black/30"
const checkCls = "w-4 h-4 accent-[#E52521] cursor-pointer"

export default function NewEventPage() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: '',
    venue: '',
    city: '',
    vertical: 'events',
    status: 'upcoming',
    hero_image_url: '',
    description: '',
    expected_attendance: '',
    sponsorship_open: false,
    collab_open: false,
    sponsorship_spots_remaining: '',
    featured: false,
    target_demo: '',
  })
  
  const [mediaGallery, setMediaGallery] = useState<{ url: string }[]>([])

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set('title', e.target.value)
    if (!form.slug) set('slug', autoSlug(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Clean up mediaGallery by removing empty ones
    const finalGallery = mediaGallery.filter(m => m.url.trim() !== '')

    const payload = {
      title: form.title,
      slug: form.slug,
      date: new Date(form.date).toISOString(),
      venue: form.venue,
      city: form.city,
      vertical: form.vertical as any,
      status: form.status as any,
      hero_image_url: form.hero_image_url || null,
      description: form.description || null,
      expected_attendance: form.expected_attendance ? parseInt(form.expected_attendance) : null,
      sponsorship_open: form.sponsorship_open,
      collab_open: form.collab_open,
      sponsorship_spots_remaining: form.sponsorship_spots_remaining ? parseInt(form.sponsorship_spots_remaining) : 0,
      featured: form.featured,
      target_demo: form.target_demo || null,
      media_gallery: finalGallery
    }

    const { error } = await (supabase.from('events').insert as any)([payload])
    
    if (error) {
      console.error(error)
      alert("Error saving event: " + error.message)
      setIsSubmitting(false)
      return
    }

    setSaved(true)
    setTimeout(() => router.push('/admin/events'), 1200)
  }

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/events" className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Event</h1>
          <p className="text-white/40 text-sm">Creates a new event listing on the frontend.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">Basic Information</h2>
          <Field label="Event Title">
            <input value={form.title} onChange={handleTitleChange} required placeholder="Neon Nights — Mumbai" className={inputCls} />
          </Field>
          <Field label="URL Slug">
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required placeholder="neon-nights-mumbai-2025" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date & Time">
              <input type="datetime-local" value={form.date} onChange={(e) => set('date', e.target.value)} required className={inputCls} />
            </Field>
            <Field label="Vertical">
              <select value={form.vertical} onChange={(e) => set('vertical', e.target.value)} className={inputCls}>
                {verticals.map((v) => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
              </select>
            </Field>
            <Field label="Venue">
              <input value={form.venue} onChange={(e) => set('venue', e.target.value)} required placeholder="Dome NSCI" className={inputCls} />
            </Field>
            <Field label="City">
              <input value={form.city} onChange={(e) => set('city', e.target.value)} required placeholder="Mumbai" className={inputCls} />
            </Field>
          </div>
          <Field label="Status">
            <div className="flex gap-4">
              {statuses.map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => set('status', s)} className={checkCls} />
                  <span className="text-sm text-[#0B0B0C] capitalize">{s}</span>
                </label>
              ))}
            </div>
          </Field>
        </div>

        {/* Media & Content */}
        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">Media & Content</h2>
          <FileUpload label="Hero Image URL" value={form.hero_image_url} onChange={(url) => set('hero_image_url', url)} />
          <Field label="Description">
            <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} placeholder="What makes this event special…" className={`${inputCls} resize-none`} />
          </Field>
          <Field label="Expected Attendance">
            <input type="number" value={form.expected_attendance} onChange={(e) => set('expected_attendance', e.target.value)} placeholder="5000" className={inputCls} />
          </Field>
        </div>
        
        {/* Vibe Media Gallery */}
        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">The Vibe (Media Gallery)</h2>
          <p className="text-sm text-black/50">Upload images or videos to showcase the vibe of this event.</p>
          
          <div className="space-y-4">
            {mediaGallery.map((media, i) => (
              <div key={i} className="flex gap-4 items-start bg-black/5 p-4 rounded-xl">
                <div className="flex-1">
                  <FileUpload 
                    label={`Media Item ${i + 1}`} 
                    value={media.url} 
                    accept="image/*,video/*"
                    onChange={(url) => {
                      const newGallery = [...mediaGallery]
                      newGallery[i].url = url
                      setMediaGallery(newGallery)
                    }} 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    const newGallery = [...mediaGallery]
                    newGallery.splice(i, 1)
                    setMediaGallery(newGallery)
                  }}
                  className="mt-8 text-red-500 hover:text-red-700 text-sm font-bold"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={() => setMediaGallery([...mediaGallery, { url: '' }])}
              className="text-[#E52521] font-bold text-sm border-2 border-[#E52521]/20 hover:bg-[#E52521]/5 rounded-xl px-4 py-2 w-full transition-colors"
            >
              + Add Media Item
            </button>
          </div>
        </div>

        {/* Sponsorship & Collab */}
        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">Sponsorship & Collaboration</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.sponsorship_open} onChange={(e) => set('sponsorship_open', e.target.checked)} className={checkCls} />
              <div>
                <span className="text-sm font-medium text-[#0B0B0C]">Sponsorship Open</span>
                <p className="text-xs text-black/40">Shows red "Sponsorship Open" badge</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.collab_open} onChange={(e) => set('collab_open', e.target.checked)} className={checkCls} />
              <div>
                <span className="text-sm font-medium text-[#0B0B0C]">Collab Open</span>
                <p className="text-xs text-black/40">Shows Collab CTA block on event page</p>
              </div>
            </label>
          </div>
          {form.sponsorship_open && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Sponsorship Spots Remaining">
                <input type="number" value={form.sponsorship_spots_remaining} onChange={(e) => set('sponsorship_spots_remaining', e.target.value)} placeholder="3" className={inputCls} />
              </Field>
              <Field label="Target Demographic">
                <input value={form.target_demo} onChange={(e) => set('target_demo', e.target.value)} placeholder="Gen-Z / Millennials, Urban" className={inputCls} />
              </Field>
            </div>
          )}
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className={checkCls} />
            <div>
              <span className="text-sm font-medium text-[#0B0B0C]">Featured Event</span>
              <p className="text-xs text-black/40">Shows as the hero "next event" on the Events hub</p>
            </div>
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          {saved && (
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" /> Saved! Redirecting…
            </span>
          )}
          <Link href="/admin/events" className="px-5 py-2.5 border border-white/15 text-white/60 hover:text-white text-sm rounded-xl transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || saved}
            className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  )
}
