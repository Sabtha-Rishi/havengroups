import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Services: [
    { label: 'Music Production', href: '/services/music' },
    { label: 'Film & Video', href: '/services/film' },
    { label: 'Events & Concerts', href: '/services/events' },
    { label: 'Audio Launches', href: '/services/audio' },
    { label: 'Sponsorships', href: '/services/sponsorships' },
  ],
  Company: [
    { label: 'About Haven', href: '/about' },
    { label: 'Team & Crew', href: '/team' },
    { label: 'Process', href: '/process' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  Work: [
    { label: 'Portfolio', href: '/work' },
    { label: 'Case Studies', href: '/testimonials' },
    { label: 'Upcoming Events', href: '/events' },
    { label: 'For Sponsors', href: '/sponsors' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
  ],
}

interface FooterProps {
  brandName?: string
  logoUrl?: string | null
  email?: string
  phone?: string
  address?: string
  city?: string
  country?: string
  instagramUrl?: string | null
  facebookUrl?: string | null
  youtubeUrl?: string | null
  twitterUrl?: string | null
  linkedinUrl?: string | null
}

export function Footer({
  brandName = 'Haven Productions',
  logoUrl,
  email = 'hello@havenproductions.com',
  phone = '+91 98765 43210',
  address = '12 Studio Lane, Bandra West',
  city = 'Mumbai',
  country = 'India',
  instagramUrl,
  facebookUrl,
  youtubeUrl,
  twitterUrl,
  linkedinUrl,
}: FooterProps) {
  const socials = [
    { icon: Instagram, href: instagramUrl, label: 'Instagram' },
    { icon: Youtube, href: youtubeUrl, label: 'YouTube' },
    { icon: Facebook, href: facebookUrl, label: 'Facebook' },
    { icon: Twitter, href: twitterUrl, label: 'X / Twitter' },
    { icon: Linkedin, href: linkedinUrl, label: 'LinkedIn' },
  ].filter((s) => s.href)

  return (
    <footer className="bg-[#0B0B0C] text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold">Stay in the loop</h3>
            <p className="text-white/50 text-sm mt-1">New events, production slots, and industry insights — straight to your inbox.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-72 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF6A1A]/50 transition-colors"
            />
            <button type="submit" className="btn-primary text-sm px-5 py-3 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={brandName}
                  width={130}
                  height={44}
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <span className="font-bold text-xl text-white">{brandName}</span>
              )}
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              From studio session to streaming charts. From concept to stage. We produce what's next.
            </p>
            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-white/60 hover:bg-[#FF6A1A] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-white/50">
            <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[#FF6A1A] transition-colors">
              <Mail className="w-4 h-4" />
              {email}
            </a>
            <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-[#FF6A1A] transition-colors">
              <Phone className="w-4 h-4" />
              {phone}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              {address}, {city}, {country}
            </span>
          </div>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Admin link (subtle) */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-end">
          <Link href="/admin" className="text-xs text-white/20 hover:text-white/40 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
