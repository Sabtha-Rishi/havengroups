import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getTeamMembers } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Crew | Haven Productions',
  description: 'Meet the producers, directors, and engineers behind Haven Productions.',
}

export default async function TeamPage() {
  const settings = await getSiteSettings()
  const team = await getTeamMembers()

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
          <div className="inline-flex items-center gap-2 bg-white/5 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 border border-white/10">
            The Crew
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight hero-headline">
            The talent behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">
              the curtain.
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            No freelancers. No outsourced B-teams. When you hire Haven, you get this exact crew of specialists locked into your project.
          </p>
        </section>

        {/* TEAM GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {team.length === 0 ? (
            <div className="text-center text-white/50 py-12 bg-[#111111] rounded-2xl border border-white/5">
              Team profiles are being updated. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="group bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-[#3cc2b4]/30 transition-colors">
                  <div className="relative aspect-square w-full bg-white/5">
                    {member.photo_url ? (
                      <Image 
                        src={member.photo_url} 
                        alt={member.name} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl text-white/10 font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                  </div>
                  <div className="p-8 relative z-10 -mt-12">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#3cc2b4] transition-colors">{member.name}</h3>
                    <p className="text-sm text-white/50 font-bold uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-white/70 leading-relaxed">
                      {member.bio || 'Core crew member.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Think you have what it takes?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              We're always looking for top-tier audio engineers, VFX artists, and production coordinators.
            </p>
            <Link href="/careers" className="btn-primary inline-block px-8 py-4 text-lg">
              View Open Roles
            </Link>
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
