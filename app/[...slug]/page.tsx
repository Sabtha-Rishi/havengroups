import Link from 'next/link'
import { ArrowLeft, Construction } from 'lucide-react'

export default async function CatchAllPlaceholder({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const path = `/${slug.join('/')}`
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center py-24">
      <div className="w-16 h-16 bg-[#3cc2b4]/10 text-[#3cc2b4] rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-8 h-8" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-[#0B0B0C] mb-4">
        We're building this.
      </h1>
      <p className="text-black/50 mb-8 max-w-md mx-auto">
        The page at <code className="bg-black/5 px-2 py-1 rounded text-[#3cc2b4]">{path}</code> is currently under construction. Check back soon as we roll out the rest of the Haven platform.
      </p>
      <Link href="/" className="btn-primary flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
    </div>
  )
}
