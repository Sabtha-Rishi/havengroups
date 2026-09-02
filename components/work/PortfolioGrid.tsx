'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import type { Database } from '@/lib/database.types'

type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] = useState('All')
  
  const filters = ['All', 'Music', 'Film', 'Events', 'Audio']

  const filteredItems = items.filter(item => {
    if (activeFilter === 'All') return true
    return item.vertical.toLowerCase() === activeFilter.toLowerCase()
  })

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-black mb-4">The Archive</h2>
          <p className="text-gray-600 text-lg max-w-2xl font-medium">Browse our historical log of delivered promises.</p>
        </div>
        
        {/* FILTER BAR */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                activeFilter === filter
                  ? 'bg-black text-white' 
                  : 'bg-gray-100 text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* MASONRY GRID (CSS Columns) */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
        {filteredItems.map((item) => (
          <Link href={`/services/${item.vertical === 'audio' ? 'audio-launches' : item.vertical}`} key={item.id} className="group block break-inside-avoid">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden hover:border-gray-400 hover:shadow-xl transition-all relative">
              
              {/* Thumbnail */}
              <div className="relative w-full">
                {item.thumbnail_url ? (
                  <Image
                    src={item.thumbnail_url}
                    alt={item.title}
                    width={600}
                    height={item.vertical === 'events' ? 800 : item.vertical === 'music' ? 600 : 400}
                    className="w-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gray-200" />
                )}
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                    <Play className="w-6 h-6 text-[#E52521] ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-[#E52521] uppercase tracking-wider">{item.vertical}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-xs font-bold text-gray-400">{item.year}</span>
                </div>
                
                <h3 className="text-2xl font-black text-black mb-2 leading-tight group-hover:text-[#E52521] transition-colors">{item.title}</h3>
                <div className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">{item.client}</div>
                
                <p className="text-gray-600 mb-6 text-base font-medium line-clamp-3">
                  {item.description}
                </p>

                {item.metrics && (
                  <div className="bg-white rounded-xl p-4 border border-gray-200 mb-4 shadow-sm">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Result</div>
                    <div className="text-black font-bold text-sm">{item.metrics}</div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-medium">
          No works found for this category.
        </div>
      )}
    </>
  )
}
