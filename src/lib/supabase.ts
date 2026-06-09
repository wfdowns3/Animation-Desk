import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Public client — safe to use on the client side
// Lazily initialized so the build does not fail when env vars are absent
let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error(
        'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
      )
    }
    _supabase = createClient(url, key)
  }
  return _supabase
}

// Admin client — server-side only, uses service role key (bypasses RLS)
let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error(
        'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
      )
    }
    _supabaseAdmin = createClient(url, key)
  }
  return _supabaseAdmin
}

// Convenience named exports that match existing import patterns.
// These use Proxy objects so that the client is only created on first property access,
// not at module evaluation time (which would fail at build without env vars).
function makeProxy(getter: () => SupabaseClient): SupabaseClient {
  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      const client = getter()
      const value = (client as unknown as Record<string | symbol, unknown>)[prop]
      if (typeof value === 'function') return value.bind(client)
      return value
    },
  })
}

export const supabase: SupabaseClient = makeProxy(getSupabase)
export const supabaseAdmin: SupabaseClient = makeProxy(getSupabaseAdmin)
