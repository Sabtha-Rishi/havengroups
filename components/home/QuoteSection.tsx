import Image from 'next/image'

export function QuoteSection() {
  return (
    <section className="relative w-full bg-[#0B0B0C] py-16 md:py-24 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0C] via-[#1a0a00] to-[#0B0B0C] opacity-50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end shrink-0">
             <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl overflow-hidden shadow-2xl shadow-[#3cc2b4]/20 border border-white/10 group">
                <Image 
                  src="/charlie.jpeg" 
                  alt="A journey towards the Haven"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
             </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center relative">
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 leading-tight md:leading-snug relative">
              <div className="absolute -top-10 -left-10 md:-top-14 md:-left-14 text-[#3cc2b4] text-8xl md:text-9xl font-serif opacity-20 select-none">
                "
              </div>
              <p className="relative z-10">
                Our experiences are not made for temporary happiness.
              </p>
              <p className="relative z-10 mt-6 md:mt-8 text-[#3cc2b4] font-medium text-2xl md:text-3xl lg:text-4xl">
                They are made to take you on a journey — a journey towards the Haven.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
