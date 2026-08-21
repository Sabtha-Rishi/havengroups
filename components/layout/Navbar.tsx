'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Work', href: '/work' },
  { label: 'For Sponsors', href: '/sponsors' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
]

interface NavbarProps {
  brandName?: string
  logoUrl?: string | null
  whatsappNumber?: string | null
}

export function Navbar({ brandName = 'Haven Productions', logoUrl, whatsappNumber }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={brandName}
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-[#0B0B0C]' : 'text-white'}`}>
              {brandName}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#FF6A1A] ${
                scrolled ? 'text-[#0B0B0C]/70' : 'text-white/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                scrolled ? 'text-[#0B0B0C]/70 hover:text-[#FF6A1A]' : 'text-white/70 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">WhatsApp</span>
            </a>
          )}
          <Link
            href="/contact"
            className="btn-primary text-sm px-5 py-2.5"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-[#0B0B0C]' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-black/10 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-[#0B0B0C] font-medium text-base hover:text-[#FF6A1A] hover:bg-[#FF6A1A]/5 rounded-xl transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-black/10 mt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center text-sm py-3 block"
              >
                Book a Free Call
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky CTA bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 py-3 z-50 flex gap-3">
        {whatsappNumber && (
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-[#0B0B0C] text-[#0B0B0C] font-semibold rounded-xl py-3 text-sm"
          >
            <Phone className="w-4 h-4" />
            WhatsApp
          </a>
        )}
        <Link
          href="/contact"
          className="flex-1 btn-primary text-sm py-3 text-center"
        >
          Book a Call
        </Link>
      </div>
    </header>
  )
}
