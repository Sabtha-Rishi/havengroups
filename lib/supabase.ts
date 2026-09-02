import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

type SiteSettings = Database['public']['Tables']['site_settings']['Row']
type Event = Database['public']['Tables']['events']['Row']
type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']
type Testimonial = Database['public']['Tables']['testimonials']['Row']
type BlogPost = Database['public']['Tables']['blog_posts']['Row']
type SponsorshipInventory = Database['public']['Tables']['sponsorship_inventory']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row']

// Helper to get site settings (single-row config)
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()
  if (error) return null
  return data as any
}

// Helper to get events
export async function getEvents(status?: 'upcoming' | 'past'): Promise<Event[]> {
  let query = supabase.from('events').select('*').order('date', { ascending: true })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) return []
  return (data as any) ?? []
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as any
}

// Helper to get portfolio items
export async function getPortfolioItems(vertical?: string): Promise<PortfolioItem[]> {
  let query = supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })
  if (vertical) query = query.eq('vertical', vertical)
  const { data, error } = await query
  if (error) return []
  return (data as any) ?? []
}

// Helper to get testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return (data as any) ?? []
}

// Helper to get blog posts
export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error) return []
  return (data as any) ?? []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) return null
  return data as any
}

// Helper to get sponsorship inventory
export async function getSponsorshipInventory(): Promise<SponsorshipInventory[]> {
  const { data, error } = await supabase
    .from('sponsorship_inventory')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return (data as any) ?? []
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })
  if (error) return []
  return (data as any) ?? []
}

type Service = Database['public']['Tables']['services']['Row']

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true })
  if (error) return []
  
  const services = (data as any) ?? []
  return services.sort((a: any, b: any) => {
    const aIsEvent = a.title?.includes('Event') || a.slug === 'events'
    const bIsEvent = b.title?.includes('Event') || b.slug === 'events'
    if (aIsEvent && !bIsEvent) return -1
    if (!aIsEvent && bIsEvent) return 1
    return 0
  })
}
