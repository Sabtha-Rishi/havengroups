import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/supabase'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | Haven Productions',
  description: 'Book a production call, pitch a collaboration, or just say hello.',
}

export default async function ContactPage() {
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight hero-headline">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">Build.</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Ready to execute? Book a production call, pitch a collaboration, or just say hello.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* LEFT COLUMN: Booking & Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-[#111] border border-[#E52521]/20 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E52521]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
                <h3 className="text-2xl font-bold text-white mb-2">High Intent?</h3>
                <p className="text-white/60 mb-6">Skip the form. Chat directly with our production leads on WhatsApp.</p>
                <Link href={`https://wa.me/${settings.whatsapp_number?.replace(/\D/g, '')}`} target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white font-bold py-4 rounded-xl transition-colors w-full">
                  <MessageCircle className="w-5 h-5" fill="currentColor" />
                  WhatsApp Us Now
                </Link>
              </div>

              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">The Studio</h3>
                
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-[#3cc2b4] shrink-0" />
                  <div>
                    <div className="font-bold text-white">{settings.brand_name} HQ</div>
                    <div className="text-white/60">{settings.address}</div>
                    <div className="text-white/60">{settings.city}, {settings.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-[#3cc2b4] shrink-0" />
                  <a href={`tel:${settings.phone}`} className="text-white font-medium hover:text-[#3cc2b4] transition-colors">{settings.phone}</a>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-[#3cc2b4] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-white font-medium hover:text-[#3cc2b4] transition-colors">{settings.email}</a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: The Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-white mb-2">Project Inquiry</h2>
                <p className="text-white/50 mb-8">Tell us what you're trying to achieve.</p>
                
                <ContactForm />
              </div>
            </div>

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
