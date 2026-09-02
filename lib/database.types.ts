export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          brand_name: string
          tagline: string
          light_logo_url: string | null
          dark_logo_url: string | null
          email: string
          phone: string
          address: string
          city: string
          country: string
          instagram_url: string | null
          facebook_url: string | null
          youtube_url: string | null
          twitter_url: string | null
          linkedin_url: string | null
          whatsapp_number: string | null
          theme: 'premium' | 'professional' | 'classic' | 'modern'
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          date: string
          venue: string
          city: string
          vertical: 'music' | 'film' | 'events' | 'audio' | 'sponsorship'
          status: 'upcoming' | 'past'
          hero_image_url: string | null
          description: string | null
          expected_attendance: number | null
          sponsorship_open: boolean
          collab_open: boolean
          sponsorship_spots_remaining: number | null
          featured: boolean
          target_demo: string | null
          media_gallery: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'> & { target_demo?: string | null }
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      portfolio_items: {
        Row: {
          id: string
          title: string
          vertical: 'music' | 'film' | 'events' | 'audio' | 'sponsorship'
          client: string | null
          media_url: string | null
          thumbnail_url: string | null
          description: string | null
          metrics: string | null
          year: number | null
          featured: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['portfolio_items']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['portfolio_items']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string | null
          persona: 'artist' | 'brand' | 'film' | 'events' | 'sponsor'
          quote: string
          rating: number
          photo_url: string | null
          featured: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          category: 'music' | 'film' | 'events' | 'sponsorship' | 'industry'
          thumbnail_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      sponsorship_inventory: {
        Row: {
          id: string
          production_title: string
          vertical: 'music' | 'film' | 'events' | 'audio'
          tier: 'title' | 'co-sponsor' | 'integration'
          price: number | null
          reach: string | null
          spots_total: number
          spots_remaining: number
          event_id: string | null
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['sponsorship_inventory']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sponsorship_inventory']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          photo_url: string | null
          order_index: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
      services: {
        Row: {
          id: string
          slug: string
          title: string
          tagline: string | null
          outcome: string | null
          image_url: string | null
          stat_text: string | null
          icon_name: string | null
          href: string
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
    }
  }
}
