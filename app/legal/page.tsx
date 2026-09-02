import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Legal | Haven Productions',
  description: 'Terms of Service, Privacy Policy, and Cookie Policy.',
}

export default async function LegalPage() {
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
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-12 tracking-tight">Legal & Policies</h1>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">Terms of Service</h2>
            <p className="text-white/60 mb-8">
              By engaging with Haven Productions for any project, you agree to our standard Master Services Agreement (MSA). Specific terms regarding payment schedules, deliverables, and kill fees will be outlined in your individual Statement of Work (SOW). 
            </p>
            
            <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
            <p className="text-white/60 mb-8">
              We collect information you provide directly to us when you fill out a form or request a production call. This information is used strictly for internal communication and project scoping. We do not sell your data to third parties.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Cookie Policy</h2>
            <p className="text-white/60 mb-8">
              We use strictly necessary cookies to ensure the site functions properly. We also use analytics cookies (e.g., Google Analytics) to understand how visitors interact with our site so we can improve the experience.
            </p>
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
