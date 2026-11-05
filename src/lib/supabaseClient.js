import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// null when unconfigured or misconfigured, so the app still loads without Supabase
function createSupabaseClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null

  try {
    return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  } catch (error) {
    // createClient throws on a malformed URL; log it so the cause is findable
    console.error('Supabase client not created:', error.message)
    return null
  }
}

export const supabase = createSupabaseClient()
