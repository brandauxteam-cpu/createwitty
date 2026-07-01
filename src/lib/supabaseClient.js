import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The app still renders if Supabase isn't configured yet — public pages show
// empty states and the CMS shows a friendly "not configured" message.
export const isSupabaseConfigured = Boolean(
  url && anonKey && !url.includes('YOUR-PROJECT')
)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null
