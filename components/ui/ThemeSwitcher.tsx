'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'

const themes = [
  { id: 'modern', label: 'Modern', color: '#E52521' },
  { id: 'premium', label: 'Premium', color: '#0B0B0C' },
  { id: 'professional', label: 'Pro', color: '#1a56ff' },
  { id: 'classic', label: 'Classic', color: '#7c5c3a' },
] as const

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {open && (
        <div className="flex flex-col gap-1.5 bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl mb-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTheme(t.id); setOpen(false) }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                theme === t.id
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: t.color }}
              />
              {t.label}
              {theme === t.id && (
                <span className="ml-auto text-xs text-[#E52521]">●</span>
              )}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full shadow-2xl border border-white/20 hover:border-[#E52521]/50 transition-all text-sm font-medium"
        aria-label="Switch theme"
      >
        <Sparkles className="w-4 h-4 text-[#E52521]" />
        <span>Theme</span>
      </button>
    </div>
  )
}
