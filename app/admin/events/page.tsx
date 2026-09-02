'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Calendar, MapPin, Eye, EyeOff, Loader2 } from 'lucide-react'
import { supabase, getEvents } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'

type Event = Database['public']['Tables']['events']['Row']

function EventRow({ event, onDelete }: { event: Event; onDelete: (id: string) => void }) {
  return (
    <tr className="group">
      <td className="admin-table-td">
        <div className="font-medium text-[#0B0B0C]">{event.title}</div>
        <div className="text-xs text-black/40 mt-0.5">{event.slug}</div>
      </td>
      <td className="admin-table-td">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full capitalize badge-${event.vertical}`}>
          {event.vertical}
        </span>
      </td>
      <td className="admin-table-td">
        <div className="flex items-center gap-1.5 text-sm text-black/60">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </td>
      <td className="admin-table-td">
        <div className="flex items-center gap-1.5 text-sm text-black/60">
          <MapPin className="w-3.5 h-3.5" />
          {event.city}
        </div>
      </td>
      <td className="admin-table-td">
        <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${
          event.status === 'upcoming' ? 'badge-upcoming' : 'badge-past'
        }`}>
          {event.status}
        </span>
      </td>
      <td className="admin-table-td">
        <div className="flex gap-2 items-center">
          {event.sponsorship_open && (
            <span className="inline-flex text-xs font-semibold px-2 py-0.5 rounded-full badge-open">Sponsorship Open</span>
          )}
        </div>
      </td>
      <td className="admin-table-td">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/admin/events/${event.id}/edit`}
            className="p-1.5 hover:bg-black/5 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5 text-black/50" />
          </Link>
          <button
            onClick={() => onDelete(event.id)}
            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const data = await getEvents()
    setEvents(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Delete this event? This cannot be undone.')) {
      await supabase.from('events').delete().eq('id', id)
      setEvents((prev) => prev.filter((e) => e.id !== id))
    }
  }

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Events</h1>
          <p className="text-white/40 text-sm mt-1">{events.length} event{events.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#E52521] animate-spin" />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full admin-table min-w-[700px]">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Vertical</th>
                  <th>Date</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Sponsorship</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <EventRow key={event.id} event={event} onDelete={handleDelete} />
                ))}
                {events.length === 0 && (
                  <tr>
                    <td colSpan={7} className="admin-table-td text-center text-black/30 py-12">
                      No events yet. <Link href="/admin/events/new" className="text-[#E52521] underline">Add your first event</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
