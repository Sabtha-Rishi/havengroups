import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers | Haven Productions',
  description: 'Join our in-house crew of producers, directors, and event specialists.',
}

const openRoles = [
  { id: 1, title: 'Senior Mix Engineer', department: 'Audio', type: 'Full-time', location: 'Mumbai HQ' },
  { id: 2, title: 'Event Production Coordinator', department: 'Live Events', type: 'Full-time', location: 'Mumbai HQ' },
  { id: 3, title: 'Partnerships Manager (Brands)', department: 'Sponsorships', type: 'Full-time', location: 'Remote / Mumbai' },
  { id: 4, title: 'Freelance Videographer', department: 'Film', type: 'Contract', location: 'Pan-India Roster' },
]

export default async function CareersPage() {
  const settings = await getSiteSettings()
  if (!settings) return null

  return (
    <div className="bg-[#0B0B0C] min-h-screen">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight hero-headline">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">Crew.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            We're always looking for obsessive specialists who care more about the final product than their ego. If that's you, we have a spot.
          </p>
        </section>

        {/* OPEN ROLES */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Open Roles</h2>
          
          <div className="space-y-4">
            {openRoles.map((role) => (
              <div key={role.id} className="bg-[#111] border border-white/5 hover:border-[#E52521]/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors group cursor-pointer">
                <div>
                  <div className="text-[#3cc2b4] text-xs font-bold uppercase tracking-wider mb-2">{role.department}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3cc2b4] transition-colors">{role.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {role.location}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {role.type}</span>
                  </div>
                </div>
                <Link href={`mailto:${settings.email}?subject=Application for ${role.title}`} className="bg-white/5 hover:bg-[#E52521] text-white px-6 py-3 rounded-xl font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        email={settings.email}
        phone={settings.phone}
        address={settings.address}
        city={settings.city}
        country={settings.country}
        instagramUrl={settings.instagram_url}
        facebookUrl={settings.facebook_url}
        youtubeUrl={settings.youtube_url}
        twitterUrl={settings.twitter_url}
        linkedinUrl={settings.linkedin_url}
      />
    </div>
  )
}
