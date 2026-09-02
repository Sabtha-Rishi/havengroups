'use client'

import { useState } from 'react'
import { Plus, Trash2, Pencil, Save, CheckCircle } from 'lucide-react'
import { placeholderSponsorshipInventory } from '@/lib/data'
import type { Database } from '@/lib/database.types'

type SponsItem = Database['public']['Tables']['sponsorship_inventory']['Row']

const verticals = ['music', 'film', 'events', 'audio']
const tiers = ['title', 'co-sponsor', 'integration']
const verticalColors: Record<string, string> = {
  music: 'badge-music', film: 'badge-film', events: 'badge-events', audio: 'badge-audio',
}
const tierColors: Record<string, string> = {
  title: 'bg-yellow-100 text-yellow-800',
  'co-sponsor': 'bg-blue-100 text-blue-800',
  integration: 'bg-gray-100 text-gray-700',
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
    production_title: '', vertical: 'events', tier: 'title',
    price: '', reach: '', spots_total: 1, spots_remaining: 1, active: true,
  })
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 600))
    setSaved(true)
    setTimeout(onCancel, 1000)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E52521]/30 p-6 space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#0B0B0C]">New Sponsorship Slot</h3>
        <button type="button" onClick={onCancel} className="text-black/30 hover:text-black text-sm">Cancel</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Production Title"><input value={form.production_title} onChange={(e) => set('production_title', e.target.value)} required placeholder="Neon Nights — Mumbai" className={inputCls} /></Field>
          </div>
          <Field label="Vertical">
            <select value={form.vertical} onChange={(e) => set('vertical', e.target.value)} className={inputCls}>
              {verticals.map((v) => <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="Tier">
            <select value={form.tier} onChange={(e) => set('tier', e.target.value)} className={inputCls}>
              {tiers.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </Field>
          <Field label="Price (₹)"><input type="number" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="500000" className={inputCls} /></Field>
          <Field label="Reach"><input value={form.reach} onChange={(e) => set('reach', e.target.value)} placeholder="5,000 in-venue + 500K social" className={inputCls} /></Field>
          <Field label="Total Spots"><input type="number" value={form.spots_total} onChange={(e) => set('spots_total', Number(e.target.value))} min={1} className={inputCls} /></Field>
          <Field label="Spots Remaining"><input type="number" value={form.spots_remaining} onChange={(e) => set('spots_remaining', Number(e.target.value))} min={0} className={inputCls} /></Field>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="w-4 h-4 accent-[#E52521]" />
            <span className="text-sm text-[#0B0B0C]">Active (visible to sponsors)</span>
          </label>
          <button type="submit" className="flex items-center gap-2 bg-[#E52521] text-white font-bold px-5 py-2 rounded-xl text-sm">
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Add Slot</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function SponsorshipsAdminPage() {
  const [items, setItems] = useState<SponsItem[]>(placeholderSponsorshipInventory)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: string) => {
    if (confirm('Delete this sponsorship slot?')) setItems((prev) => prev.filter((s) => s.id !== id))
  }

  const toggleActive = (id: string) => {
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s))
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Sponsorship Inventory</h1>
          <p className="text-white/40 text-sm mt-1">{items.filter((s) => s.active).length} active · {items.reduce((acc, s) => acc + s.spots_remaining, 0)} spots remaining</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Slot
        </button>
      </div>

      {showForm && <AddForm onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
        <table className="w-full admin-table min-w-[700px]">
          <thead>
            <tr>
              <th>Production</th>
              <th>Vertical</th>
              <th>Tier</th>
              <th>Price</th>
              <th>Spots</th>
              <th>Reach</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="group">
                <td className="admin-table-td font-medium text-[#0B0B0C] text-sm">{item.production_title}</td>
                <td className="admin-table-td">
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${verticalColors[item.vertical]}`}>{item.vertical}</span>
                </td>
                <td className="admin-table-td">
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${tierColors[item.tier]}`}>{item.tier}</span>
                </td>
                <td className="admin-table-td text-sm text-black/60">
                  {item.price ? `₹${item.price.toLocaleString('en-IN')}` : '—'}
                </td>
                <td className="admin-table-td text-sm">
                  <span className={`font-bold ${item.spots_remaining === 0 ? 'text-red-500' : 'text-green-600'}`}>{item.spots_remaining}</span>
                  <span className="text-black/30"> / {item.spots_total}</span>
                </td>
                <td className="admin-table-td text-xs text-black/50">{item.reach ?? '—'}</td>
                <td className="admin-table-td">
                  <button
                    onClick={() => toggleActive(item.id)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${item.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {item.active ? 'Active' : 'Paused'}
                  </button>
                </td>
                <td className="admin-table-td">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-black/5 rounded-lg"><Pencil className="w-3.5 h-3.5 text-black/40" /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
