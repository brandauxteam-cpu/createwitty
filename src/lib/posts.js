import { supabase, isSupabaseConfigured } from './supabaseClient.js'

// A published post is visible to the public; drafts are only visible in the CMS.
const PUBLIC_COLUMNS =
  'id, type, title, slug, excerpt, cover_image, cover_alt, meta_title, meta_description, canonical_url, body, author, status, published_at, created_at'

export function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function readingTime(html) {
  const text = (html || '').replace(/<[^>]+>/g, ' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// ---------- Public reads ----------
export async function listPublished(type, limit = 100) {
  if (!isSupabaseConfigured) return []
  let q = supabase
    .from('posts')
    .select(PUBLIC_COLUMNS)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
  if (type) q = q.eq('type', type)
  const { data, error } = await q
  if (error) { console.error(error); return [] }
  return data || []
}

export async function getBySlug(type, slug) {
  if (!isSupabaseConfigured) return null
  const { data, error } = await supabase
    .from('posts')
    .select(PUBLIC_COLUMNS)
    .eq('type', type)
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()
  if (error) { console.error(error); return null }
  return data
}

// ---------- CMS reads/writes (require auth via RLS) ----------
export async function listAll() {
  if (!isSupabaseConfigured) return []
  const { data, error } = await supabase
    .from('posts')
    .select(PUBLIC_COLUMNS)
    .order('created_at', { ascending: false })
  if (error) { console.error(error); throw error }
  return data || []
}

export async function getById(id) {
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data
}

export async function createPost(payload) {
  const { data, error } = await supabase.from('posts').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updatePost(id, payload) {
  const { data, error } = await supabase.from('posts').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deletePost(id) {
  const { error } = await supabase.from('posts').delete().eq('id', id)
  if (error) throw error
}

// Upload an image to the public storage bucket and return its public URL.
export async function uploadImage(file) {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured.')
  const ext = file.name.split('.').pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('blog-images').upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
  return data.publicUrl
}
