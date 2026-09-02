'use client'

import { useEffect, ReactNode, useState } from 'react'
import { usePathname } from 'next/navigation'

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [lenisInstance, setLenisInstance] = useState<any>(null)

  useEffect(() => {
    let lenis: any = null

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
        })
        
        setLenisInstance(lenis)

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {
        // Lenis not available, skip smooth scroll
      }
    }

    initLenis()

    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenisInstance])

  return <>{children}</>
}
