'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  TrendingUp,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/settings', label: 'Brand & Theme', icon: Settings, exact: false },
  { href: '/admin/events', label: 'Events', icon: Calendar, exact: false },
  { href: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon, exact: false },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare, exact: false },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText, exact: false },
  { href: '/admin/sponsorships', label: 'Sponsorships', icon: TrendingUp, exact: false },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <aside className="admin-sidebar w-60 min-h-screen flex flex-col sticky top-0 shrink-0">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#E52521] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">H</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Haven Admin</p>
            <p className="text-white/30 text-xs">Content Management</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`admin-sidebar-link ${isActive(href, exact) ? 'active' : ''}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {isActive(href, exact) && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 border-t border-white/6 pt-4 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-sidebar-link"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <span>View Live Site</span>
        </a>
      </div>
    </aside>
  )
}
