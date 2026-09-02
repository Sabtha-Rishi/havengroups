'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminServicesPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    const { data } = await supabase.from('services').select('*').order('order_index', { ascending: true })
    if (data) setItems(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    await supabase.from('services').delete().eq('id', id)
    fetchData()
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Services & Offers</h1>
          <p className="text-white/40 text-sm">Manage the production stacks shown on your home and services pages.</p>
        </div>
        <Link 
          href="/admin/services/new" 
          className="bg-[#E52521] hover:bg-[#e55c10] text-white font-bold text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-black/40">Loading services...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/5 text-xs font-semibold text-black/50 uppercase tracking-wider border-b border-black/8">
                <th className="p-4 pl-6 font-medium">Service</th>
                <th className="p-4 font-medium">Tagline</th>
                <th className="p-4 font-medium">Stat</th>
                <th className="p-4 pr-6 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/8">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-black/2 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      {item.image_url ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/5 relative shrink-0">
                          <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-black/5 flex items-center justify-center shrink-0">
                          <span className="text-black/30 text-xs font-bold">No Img</span>
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-[#0B0B0C] text-sm">{item.title}</div>
                        <div className="text-xs text-black/40 font-mono mt-0.5">{item.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-[#0B0B0C] max-w-[200px] truncate">
                    {item.tagline}
                  </td>
                  <td className="p-4 text-sm text-[#0B0B0C]">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#E52521]/10 text-[#E52521] font-bold text-xs">
                      {item.stat_text}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-black/40 hover:text-[#0B0B0C] hover:bg-black/5 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-black/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-sm text-black/40">
                    No services found. Click 'Add Service' to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
