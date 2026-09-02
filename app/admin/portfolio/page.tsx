'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Star } from 'lucide-react'
import { FileUpload } from '@/components/admin/FileUpload'
import { placeholderPortfolio } from '@/lib/data'
import type { Database } from '@/lib/database.types'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, CheckCircle } from 'lucide-react'

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']

const verticals = ['music', 'film', 'events', 'audio', 'sponsorship']
const inputCls = "w-full bg-white border border-black/12 rounded-xl px-3.5 py-2.5 text-sm text-[#0B0B0C] outline-none focus:border-[#E52521] focus:ring-2 focus:ring-[#E52521]/10 transition-all placeholder-black/30"
const verticalColors: Record<string, string> = {
  music: 'badge-music', film: 'badge-film', events: 'badge-events', audio: 'badge-audio', sponsorship: 'badge-sponsorship',
}

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
    title: '', vertical: 'music', client: '', thumbnail_url: '',
    description: '', metrics: '', year: new Date().getFullYear().toString(), featured: false,
  })
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      title: form.title,
      vertical: form.vertical,
      client: form.client || null,
      thumbnail_url: form.thumbnail_url || null,
      description: form.description || null,
      metrics: form.metrics || null,
      year: parseInt(form.year) || null,
      featured: form.featured
    }

    const { error } = await (supabase.from('portfolio_items').insert as any)([payload])
    if (error) {
      console.error(error)
      alert("Error adding portfolio item: " + error.message)
      return
    }

    setSaved(true)
    setTimeout(() => {
      onCancel()
      window.location.reload() // Refresh list
    }, 1000)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E52521]/30 p-6 space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#0B0B0C]">New Portfolio Item</h3>
        <button type="button" onClick={onCancel} className="text-black/30 hover:text-black text-sm">Cancel</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Title"><input value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="Breakout EP — Artist" className={inputCls} /></Field>
          <Field label="Vertical">
            <select value={form.vertical} onChange={(e) => set('vertical', e.target.value)} className={inputCls}>
              {verticals.map((v) => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="Client / Artist"><input value={form.client} onChange={(e) => set('client', e.target.value)} placeholder="Arjun Mehta" className={inputCls} /></Field>
          <Field label="Year"><input type="number" value={form.year} onChange={(e) => set('year', e.target.value)} className={inputCls} /></Field>
        </div>
        <FileUpload label="Thumbnail URL" value={form.thumbnail_url} onChange={(url) => set('thumbnail_url', url)} />
        <Field label="Description"><textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={2} className={`${inputCls} resize-none`} /></Field>
        <Field label="Key Metrics (shown on frontend)"><input value={form.metrics} onChange={(e) => set('metrics', e.target.value)} placeholder="4.2M streams, #1 Spotify India" className={inputCls} /></Field>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-[#E52521]" />
            <span className="text-sm text-[#0B0B0C]">Featured on Home page</span>
          </label>
          <button type="submit" className="flex items-center gap-2 bg-[#E52521] text-white font-bold px-5 py-2 rounded-xl text-sm">
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Add Item</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setItems(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this portfolio item?')) {
      await supabase.from('portfolio_items').delete().eq('id', id)
      setItems((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-white/40 text-sm mt-1">{items.length} project{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {showForm && <AddForm onCancel={() => setShowForm(false)} />}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#E52521] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full admin-table min-w-[600px]">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Vertical</th>
                  <th>Client</th>
                  <th>Year</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="group">
                    <td className="admin-table-td">
                      <div className="flex items-center gap-3">
                        {item.thumbnail_url && (
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                            <Image src={item.thumbnail_url} alt={item.title} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-[#0B0B0C] text-sm">{item.title}</div>
                          {item.metrics && <div className="text-xs text-[#E52521] mt-0.5 line-clamp-1">{item.metrics}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-td">
                      <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${verticalColors[item.vertical]}`}>{item.vertical}</span>
                    </td>
                    <td className="admin-table-td text-sm text-black/60">{item.client ?? '—'}</td>
                    <td className="admin-table-td text-sm text-black/60">{item.year ?? '—'}</td>
                    <td className="admin-table-td">
                      {item.featured && <Star className="w-4 h-4 fill-[#E52521] text-[#E52521]" />}
                    </td>
                    <td className="admin-table-td">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-black/5 rounded-lg"><Pencil className="w-3.5 h-3.5 text-black/50" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
