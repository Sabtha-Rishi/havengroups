import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { getSiteSettings, getBlogPostBySlug, getBlogPosts } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowLeft } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found | Haven Productions' }
  return {
    title: `${post.title} | Haven Productions Insights`,
    description: post.excerpt || '',
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const settings = await getSiteSettings()
  const post = await getBlogPostBySlug(slug)
  
  if (!settings || !post) return notFound()

  // Fetch recent posts for the "Read Next" section
  const allPosts = await getBlogPosts(4)
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <div className="bg-[#0B0B0C] min-h-screen">
      <Navbar
        brandName={settings.brand_name}
        lightLogoUrl={settings.light_logo_url} darkLogoUrl={settings.dark_logo_url}
        whatsappNumber={settings.whatsapp_number}
      />

      <main className="pt-24 pb-24">
        {/* HERO SECTION */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-[#E52521] transition-colors font-bold text-sm uppercase tracking-wider mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#E52521] text-sm font-bold uppercase tracking-wider bg-[#E52521]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-white/40 text-sm font-medium flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-white/70 leading-relaxed mb-12 border-l-2 border-[#E52521] pl-6 italic">
            {post.excerpt}
          </p>
          
          {post.thumbnail_url && (
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-[#111] border border-white/10 mb-16">
              <Image 
                src={post.thumbnail_url} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          )}
        </section>

        {/* CONTENT */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <article className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:text-white prose-a:text-[#E52521] prose-strong:text-white">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>Full content is currently being migrated from the old CMS.</p>
            )}
          </article>
        </section>

        {/* READ NEXT / RELATED */}
        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Read Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block">
                  <div className="bg-[#111] border border-white/5 hover:border-white/20 rounded-3xl overflow-hidden transition-colors h-full flex flex-col">
                    <div className="relative aspect-video w-full">
                      {relatedPost.thumbnail_url ? (
                        <Image 
                          src={relatedPost.thumbnail_url} 
                          alt={relatedPost.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full bg-[#1A1A1A]" />
                      )}
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="text-[#E52521] text-xs font-bold uppercase tracking-wider mb-3">
                        {relatedPost.category}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[#E52521] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
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
