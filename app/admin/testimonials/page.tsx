'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Star, Save, CheckCircle } from 'lucide-react'
import { FileUpload } from '@/components/admin/FileUpload'
import { placeholderTestimonials } from '@/lib/data'
import type { Database } from '@/lib/database.types'

import { supabase } from '@/lib/supabase'

type Testimonial = Database['public']['Tables']['testimonials']['Row']

const personas = ['artist', 'brand', 'film', 'events', 'sponsor']
const personaLabel: Record<string, string> = {
  artist: 'Artist / Label', brand: 'Brand / Marketing', film: 'Film / Studio', events: 'Events / Corporate', sponsor: 'Sponsor',
}

const inputCls = "w-full bg-white border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#0B0B0C] outline-none focus:border-[#E52521] focus:ring-2 focus:ring-[#E52521]/10 transition-all placeholder-black/30"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

function AddForm({ onCancel }: { onCancel: () => void }) {
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: '', role: '', company: '', persona: 'artist', quote: '',
    rating: 5, photo_url: '', featured: false,
  })
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      name: form.name,
      role: form.role,
      company: form.company || null,
      persona: form.persona as any,
      quote: form.quote,
      rating: form.rating,
      photo_url: form.photo_url || null,
      featured: form.featured
    }

    const { error } = await (supabase.from('testimonials').insert as any)([payload])
    if (error) {
      console.error(error)
      alert("Error adding testimonial: " + error.message)
      return
    }

    setSaved(true)
    setTimeout(() => {
      onCancel()
      window.location.reload()
    }, 1000)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E52521]/30 p-6 space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#0B0B0C]">New Testimonial</h3>
        <button type="button" onClick={onCancel} className="text-black/30 hover:text-black text-sm">Cancel</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Name"><input value={form.name} onChange={(e) => set('name', e.target.value)} required placeholder="Arjun Mehta" className={inputCls} /></Field>
          <Field label="Role / Title"><input value={form.role} onChange={(e) => set('role', e.target.value)} required placeholder="Independent Artist" className={inputCls} /></Field>
          <Field label="Company (optional)"><input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Echo Records" className={inputCls} /></Field>
          <Field label="Persona">
            <select value={form.persona} onChange={(e) => set('persona', e.target.value)} className={inputCls}>
              {personas.map((p) => <option key={p} value={p}>{personaLabel[p]}</option>)}
            </select>
          </Field>
          <FileUpload label="Photo URL" value={form.photo_url} onChange={(url) => set('photo_url', url)} />
          <Field label="Rating">
            <div className="flex gap-2 mt-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <button key={s} type="button" onClick={() => set('rating', s)}>
                  <Star className={`w-5 h-5 transition-colors ${s <= form.rating ? 'fill-[#E52521] text-[#E52521]' : 'text-black/20'}`} />
                </button>
              ))}
            </div>
          </Field>
        </div>
        <Field label="Quote">
          <textarea value={form.quote} onChange={(e) => set('quote', e.target.value)} required rows={3} placeholder="What they said about Haven…" className={`${inputCls} resize-none`} />
        </Field>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-[#E52521]" />
            <span className="text-sm text-[#0B0B0C]">Featured (shown on Home)</span>
          </label>
          <button type="submit" className="flex items-center gap-2 bg-[#E52521] text-white font-bold px-5 py-2 rounded-xl text-sm">
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Add Testimonial</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (data) setTestimonials(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this testimonial?')) {
      await supabase.from('testimonials').delete().eq('id', id)
      setTestimonials((prev) => prev.filter((t) => t.id !== id))
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="text-white/40 text-sm mt-1">{testimonials.length} testimonials</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {showForm && <AddForm onCancel={() => setShowForm(false)} />}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#E52521] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="group bg-white rounded-2xl border border-black/8 p-5 hover:shadow-md transition-all relative">
              {t.featured && (
                <span className="absolute top-4 right-4 flex items-center gap-1 text-xs text-[#E52521] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#E52521]" /> Featured
                </span>
              )}
              <p className="text-[#0B0B0C] text-sm leading-relaxed mb-4 line-clamp-3">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                {t.photo_url && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-black/10">
                    <Image src={t.photo_url} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0B0B0C] text-sm">{t.name}</p>
                  <p className="text-black/40 text-xs truncate">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E52521] text-[#E52521]" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-black/30 capitalize">{personaLabel[t.persona]}</span>
                <div className="ml-auto flex gap-1.5">
                  <button className="p-1.5 hover:bg-black/5 rounded-lg"><Pencil className="w-3.5 h-3.5 text-black/40" /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
