import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import type { Database } from '@/lib/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

const categoryColors: Record<string, string> = {
  music: 'bg-purple-100 text-purple-700',
  film: 'bg-blue-100 text-blue-700',
  events: 'bg-slate-100 text-slate-800',
  sponsorship: 'bg-slate-100 text-slate-800',
  industry: 'bg-gray-100 text-gray-700',
}

interface BlogPreviewProps {
  posts: BlogPost[]
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="section-padding bg-[#F7F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#E52521] text-sm font-medium uppercase tracking-widest mb-3">Insights</p>
            <h2 className="section-title text-[#0B0B0C]">From the Haven blog</h2>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#E52521] hover:underline">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {post.thumbnail_url && (
                <div className="relative aspect-[16/9] overflow-hidden bg-black/5">
                  <Image
                    src={post.thumbnail_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-black/35">
                    <Clock className="w-3 h-3" />
                    5 min read
                  </span>
                </div>
                <h3 className="font-bold text-[#0B0B0C] text-base leading-snug mb-3 group-hover:text-[#E52521] transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-black/50 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link href="/blog" className="text-sm font-medium text-[#E52521] hover:underline">
            All Articles →
          </Link>
        </div>
      </div>
    </section>
  )
}
