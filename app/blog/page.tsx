import { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getBlogPosts } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Insights & Strategy | Haven Productions',
  description: 'Production strategies, sponsorship trends, and industry insights.',
}

export default async function BlogPage() {
  const settings = await getSiteSettings()
  const posts = await getBlogPosts() // fetch all

  if (!settings) return null

  const featuredPost = posts.find(p => p.published) || posts[0]
  const recentPosts = posts.filter(p => p.id !== featuredPost?.id && p.published)

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
            Industry <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3cc2b4] to-[#FF4D4D]">
              Insights
            </span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-xl mb-12">
            No fluff. Just the exact playbooks we use to take artists to the charts and brands to the main stage.
          </p>
          
          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Music Industry', 'Film', 'Events', 'Sponsorship Trends'].map((filter, i) => (
              <button
                key={filter}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                  i === 0 
                    ? 'bg-white text-black' 
                    : 'bg-[#111] text-white/50 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED POST */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row hover:border-[#3cc2b4]/50 transition-colors">
                <div className="w-full md:w-3/5 relative aspect-video md:aspect-auto h-[300px] md:h-auto">
                  {featuredPost.thumbnail_url ? (
                    <Image 
                      src={featuredPost.thumbnail_url} 
                      alt={featuredPost.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1A]" />
                  )}
                </div>
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#E52521] text-xs font-bold uppercase tracking-wider">{featuredPost.category}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-white/40 text-xs font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(featuredPost.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight group-hover:text-[#3cc2b4] transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/60 text-lg mb-8 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-white font-bold text-sm uppercase tracking-wider group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="w-4 h-4 ml-1 text-[#E52521]" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* RECENT POSTS GRID */}
        {recentPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-[#111] border border-white/5 hover:border-white/20 rounded-3xl overflow-hidden transition-colors h-full flex flex-col">
                    <div className="relative aspect-video w-full">
                      {post.thumbnail_url ? (
                        <Image 
                          src={post.thumbnail_url} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1A1A1A]" />
                      )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#E52521] text-xs font-bold uppercase tracking-wider">{post.category}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-white/40 text-xs font-medium">
                          {new Date(post.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#3cc2b4] transition-colors line-clamp-3">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm mb-6 line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-white/50 text-sm font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                        Read <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* NEWSLETTER SIGNUP */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center border-t border-white/10 mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">Get the playbooks in your inbox.</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
            Join 4,000+ industry professionals who read our monthly teardowns of successful production and marketing campaigns.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#E52521] transition-colors"
              required
            />
            <button type="submit" className="btn-primary px-8 py-4 whitespace-nowrap">
              Subscribe
            </button>
          </form>
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
