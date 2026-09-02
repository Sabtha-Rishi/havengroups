'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, CheckCircle, ArrowLeft } from 'lucide-react'
import { FileUpload } from '@/components/admin/FileUpload'
import { placeholderBlogPosts } from '@/lib/data'
import type { Database } from '@/lib/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

const categories = ['music', 'film', 'events', 'sponsorship', 'industry']
const categoryColors: Record<string, string> = {
  music: 'badge-music', film: 'badge-film', events: 'badge-events', sponsorship: 'badge-sponsorship', industry: 'bg-gray-100 text-gray-700',
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
    title: '', slug: '', excerpt: '', category: 'music', thumbnail_url: '', published: false,
  })
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }))
  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 600))
    setSaved(true)
    setTimeout(onCancel, 1000)
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E52521]/30 p-6 space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#0B0B0C]">New Blog Post</h3>
        <button type="button" onClick={onCancel} className="text-black/30 hover:text-black text-sm">Cancel</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Title">
              <input value={form.title} onChange={(e) => { set('title', e.target.value); if (!form.slug) set('slug', autoSlug(e.target.value)) }} required placeholder="How to Take an Artist from Studio to Charts in 45 Days" className={inputCls} />
            </Field>
          </div>
          <Field label="URL Slug"><input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="artist-studio-to-charts" className={inputCls} /></Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls}>
              {categories.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </Field>
          <div className="col-span-2">
            <FileUpload label="Thumbnail URL" value={form.thumbnail_url} onChange={(url) => set('thumbnail_url', url)} />
          </div>
          <div className="col-span-2">
            <Field label="Excerpt"><textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} placeholder="A compelling 1–2 sentence summary for the blog preview card…" className={`${inputCls} resize-none`} /></Field>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} className="w-4 h-4 accent-[#E52521]" />
            <span className="text-sm text-[#0B0B0C]">Published (visible on site)</span>
          </label>
          <button type="submit" className="flex items-center gap-2 bg-[#E52521] text-white font-bold px-5 py-2 rounded-xl text-sm">
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Add Post</>}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>(placeholderBlogPosts)
  const [showForm, setShowForm] = useState(false)

  const togglePublished = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, published: !p.published } : p))
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this post?')) {
      setPosts((prev) => prev.filter((p) => p.id !== id))
    }
  }

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-white/40 text-sm mt-1">{posts.length} posts · {posts.filter((p) => p.published).length} published</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add Post
        </button>
      </div>

      {showForm && <AddForm onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
        <table className="w-full admin-table min-w-[600px]">
          <thead>
            <tr>
              <th>Post</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="group">
                <td className="admin-table-td">
                  <div className="flex items-center gap-3">
                    {post.thumbnail_url && (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                        <Image src={post.thumbnail_url} alt={post.title} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-[#0B0B0C] text-sm line-clamp-1">{post.title}</div>
                      <div className="text-xs text-black/30 mt-0.5">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="admin-table-td">
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${categoryColors[post.category]}`}>{post.category}</span>
                </td>
                <td className="admin-table-td">
                  <button
                    onClick={() => togglePublished(post.id)}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${post.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {post.published ? <><Eye className="w-3 h-3" /> Published</> : <><EyeOff className="w-3 h-3" /> Draft</>}
                  </button>
                </td>
                <td className="admin-table-td text-xs text-black/40">
                  {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="admin-table-td">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-black/5 rounded-lg"><Pencil className="w-3.5 h-3.5 text-black/40" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-1.5 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
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
