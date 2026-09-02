'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, CheckCircle } from 'lucide-react'
import { FileUpload } from '@/components/admin/FileUpload'
import { supabase } from '@/lib/supabase'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full bg-white border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#0B0B0C] outline-none focus:border-[#E52521] focus:ring-2 focus:ring-[#E52521]/10 transition-all placeholder-black/30"

export default function NewServicePage() {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    outcome: '',
    stat_text: '',
    icon_name: 'Zap',
    href: '',
    image_url: '',
    order_index: 0,
  })

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set('title', e.target.value)
    if (!form.slug) {
      const newSlug = autoSlug(e.target.value)
      set('slug', newSlug)
      if (!form.href) set('href', `/services/${newSlug}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const { error } = await (supabase as any).from('services').insert([{ ...form }])
    
    if (error) {
      console.error(error)
      alert("Error saving service: " + error.message)
      setIsSubmitting(false)
      return
    }

    setSaved(true)
    setTimeout(() => router.push('/admin/services'), 1200)
  }

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/services" className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New Service</h1>
          <p className="text-white/40 text-sm">Creates a new production pipeline offering.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">Basic Information</h2>
          <Field label="Service Title">
            <input value={form.title} onChange={handleTitleChange} required placeholder="Virtual Production" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="URL Slug (Internal ID)">
              <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required placeholder="virtual-production" className={inputCls} />
            </Field>
            <Field label="Target Link (Href)">
              <input value={form.href} onChange={(e) => set('href', e.target.value)} required placeholder="/services/virtual-production" className={inputCls} />
            </Field>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">Marketing Copy</h2>
          <Field label="Tagline (Short)">
            <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} placeholder="Next-gen virtual sets." className={inputCls} />
          </Field>
          <Field label="Outcome Guarantee (Long)">
            <input value={form.outcome} onChange={(e) => set('outcome', e.target.value)} placeholder="Shoot anywhere in the world without leaving Chennai." className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Stat Text (Proof)">
              <input value={form.stat_text} onChange={(e) => set('stat_text', e.target.value)} placeholder="12 virtual sets built" className={inputCls} />
            </Field>
            <Field label="Icon Name (Lucide)">
              <input value={form.icon_name} onChange={(e) => set('icon_name', e.target.value)} placeholder="Video" className={inputCls} />
            </Field>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-black/8 p-6 space-y-4">
          <h2 className="font-bold text-[#0B0B0C] text-sm uppercase tracking-wider">Visuals</h2>
          <FileUpload label="Service Image URL" value={form.image_url} onChange={(url) => set('image_url', url)} />
          <Field label="Order Index">
            <input type="number" value={form.order_index} onChange={(e) => set('order_index', parseInt(e.target.value))} className={inputCls} />
          </Field>
        </div>

        <div className="flex items-center justify-end gap-4">
          {saved && (
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" /> Saved! Redirecting…
            </span>
          )}
          <Link href="/admin/services" className="px-5 py-2.5 border border-white/15 text-white/60 hover:text-white text-sm rounded-xl transition-colors">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || saved}
            className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  )
}
