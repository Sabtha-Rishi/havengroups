'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { Save, Sparkles, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { FileUpload } from '@/components/admin/FileUpload'

type Theme = 'modern' | 'premium' | 'professional' | 'classic'

const themes: { id: Theme; label: string; desc: string; font: string }[] = [
  { id: 'modern', label: 'Modern', desc: 'Bold geometric type, energetic micro-interactions, bento-style cards', font: 'Outfit' },
  { id: 'premium', label: 'Premium', desc: 'Editorial serif, generous whitespace, cinematic reveals — luxury positioning', font: 'Playfair Display' },
  { id: 'professional', label: 'Professional', desc: 'Clean sans-serif, structured grid, data-forward — B2B confidence', font: 'Inter' },
  { id: 'classic', label: 'Classic', desc: 'Timeless serif, minimal motion, symmetric layout — legacy and trust', font: 'DM Serif Display' },
]

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('site_settings').select('*').single()
      const d = data as any
      if (d) {
        setForm(d)
        if (d.theme) setTheme(d.theme as Theme)
      }
      setLoading(false)
    }
    loadSettings()
  }, [setTheme])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogoChange = (field: 'light_logo_url' | 'dark_logo_url', url: string) => {
    setForm({ ...form, [field]: url })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.id) return

    const { error } = await supabase
      .from('site_settings')
      // @ts-ignore - Bypass never type resolution in supabase-js for this component
      .update({
        brand_name: form.brand_name,
        tagline: form.tagline,
        light_logo_url: form.light_logo_url,
        dark_logo_url: form.dark_logo_url,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        country: form.country,
        whatsapp_number: form.whatsapp_number,
        instagram_url: form.instagram_url,
        facebook_url: form.facebook_url,
        youtube_url: form.youtube_url,
        twitter_url: form.twitter_url,
        linkedin_url: form.linkedin_url,
        theme: theme,
        updated_at: new Date().toISOString()
      } as any)
      .eq('id', form.id)

    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      console.error(error)
      alert('Error saving settings: ' + error.message)
    }
  }

  if (loading) return <div className="p-8 text-white/50">Loading settings...</div>

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Brand & Theme Settings</h1>
        <p className="text-white/40 text-sm mt-1">Changes here reflect across the entire website automatically.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Theme Selector */}
        <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#E52521]" />
            <h2 className="text-white font-bold">Site Theme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  theme === t.id
                    ? 'border-[#E52521] bg-[#E52521]/10'
                    : 'border-white/8 hover:border-white/20 bg-white/3'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-bold text-sm ${theme === t.id ? 'text-[#E52521]' : 'text-white'}`}>
                    {t.label}
                  </span>
                  {theme === t.id && <CheckCircle className="w-4 h-4 text-[#E52521]" />}
                </div>
                <p className="text-white/40 text-xs leading-relaxed">{t.desc}</p>
                <p className="text-white/25 text-xs mt-1">Font: {t.font}</p>
              </button>
            ))}
          </div>
          <p className="text-white/25 text-xs mt-4">
            The theme switcher in the bottom-left of the frontend is a preview tool only — this setting controls the live theme for all visitors.
          </p>
        </div>

        {/* Brand Identity */}
        <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-bold mb-5">Brand Identity</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FileUpload 
              label="Light Logo (For Dark Backgrounds)" 
              value={form.light_logo_url} 
              onChange={(url) => handleLogoChange('light_logo_url', url)} 
            />
            <FileUpload 
              label="Dark Logo (For Light Backgrounds)" 
              value={form.dark_logo_url} 
              onChange={(url) => handleLogoChange('dark_logo_url', url)} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Brand Name</label>
              <input name="brand_name" value={form.brand_name || ''} onChange={handleChange} className="admin-input" placeholder="Haven Productions" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Tagline</label>
              <input name="tagline" value={form.tagline || ''} onChange={handleChange} className="admin-input" placeholder="Where Sound Meets Vision" />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-bold mb-5">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Email</label>
              <input name="email" type="email" value={form.email || ''} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Phone</label>
              <input name="phone" value={form.phone || ''} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">WhatsApp Number</label>
              <input name="whatsapp_number" value={form.whatsapp_number || ''} onChange={handleChange} className="admin-input" placeholder="+919876543210" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Address</label>
              <input name="address" value={form.address || ''} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">City</label>
              <input name="city" value={form.city || ''} onChange={handleChange} className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Country</label>
              <input name="country" value={form.country || ''} onChange={handleChange} className="admin-input" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
          <h2 className="text-white font-bold mb-5">Social Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'instagram_url', label: 'Instagram' },
              { name: 'youtube_url', label: 'YouTube' },
              { name: 'facebook_url', label: 'Facebook' },
              { name: 'twitter_url', label: 'X / Twitter' },
              { name: 'linkedin_url', label: 'LinkedIn' },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">{field.label}</label>
                <input
                  name={field.name}
                  value={form[field.name] || ''}
                  onChange={handleChange}
                  className="admin-input"
                  placeholder="https://"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-4">
          {saved && (
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" /> Saved successfully
            </span>
          )}
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#E52521] hover:bg-[#e55c10] text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}
