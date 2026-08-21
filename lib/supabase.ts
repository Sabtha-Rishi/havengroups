import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper to get site settings (single-row config)
export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()
  if (error) return null
  return data
}

// Helper to get events
export async function getEvents(status?: 'upcoming' | 'past') {
  let query = supabase.from('events').select('*').order('date', { ascending: true })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) return []
  return data ?? []
}

// Helper to get portfolio items
export async function getPortfolioItems(vertical?: string) {
  let query = supabase.from('portfolio_items').select('*').order('created_at', { ascending: false })
  if (vertical) query = query.eq('vertical', vertical)
  const { data, error } = await query
  if (error) return []
  return data ?? []
}

// Helper to get testimonials
export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data ?? []
}

// Helper to get blog posts
export async function getBlogPosts(limit?: number) {
  let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error) return []
  return data ?? []
}

// Helper to get sponsorship inventory
export async function getSponsorshipInventory() {
  const { data, error } = await supabase
    .from('sponsorship_inventory')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data ?? []
}
