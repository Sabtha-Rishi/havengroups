import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getTestimonials } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Quote, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Testimonials & Proof | Haven Productions',
  description: 'Hear from the artists, brands, and promoters who trust Haven Productions.',
}

export default async function TestimonialsPage() {
  const settings = await getSiteSettings()
  const testimonials = await getTestimonials()

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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight hero-headline">
            Don't Take <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E52521] to-[#FF4D4D]">
              Our Word For It
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-xl mb-12">
            The results speak for themselves. Hear from the partners who trusted us with their biggest moments.
          </p>
          
          {/* FILTER BAR */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Artists', 'Brands', 'Sponsors', 'Promoters'].map((filter, i) => (
              <button
                key={filter}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                  i === 0 
                    ? 'bg-[#E52521] text-white border border-[#E52521]' 
                    : 'bg-[#111] text-white/50 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED VIDEO TESTIMONIALS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-white mb-8">Video Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="group relative aspect-video bg-[#111] rounded-3xl overflow-hidden border border-white/10 cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity grayscale group-hover:grayscale-0 duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#E52521] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(229, 37, 33,0.3)] text-white">
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md overflow-hidden">
                      <Image src={`https://randomuser.me/api/portraits/${i === 1 ? 'men/32' : 'women/44'}.jpg`} alt="Avatar" width={48} height={48} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{i === 1 ? 'Arjun Mehta' : 'Priya Nair'}</h3>
                      <p className="text-white/60 text-sm">{i === 1 ? 'Independent Artist' : 'Brand Marketing Lead, NovaBev'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL MASONRY GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-white mb-8">Written Proof</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-[#111] border border-white/5 rounded-3xl p-8 break-inside-avoid relative overflow-hidden group hover:border-[#E52521]/30 transition-colors">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 group-hover:text-[#E52521]/10 transition-colors" />
                
                <div className="flex items-center gap-1 mb-6 text-[#E52521]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-lg text-white/80 leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  {testimonial.photo_url ? (
                    <Image src={testimonial.photo_url} alt={testimonial.name} width={48} height={48} className="rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-white/50">
                      {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Become our next success story.</h2>
            <Link href="/contact" className="btn-primary inline-flex">
              Book a Call
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
