// lib/supabase.ts

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Creates – or returns – a cached Supabase client.
 * If your environment variables are missing, we fall back to
 * placeholders so the app keeps working during preview/development.
 * Network requests will fail gracefully instead of crashing.
 *
 * Required Environment Variables:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - SUPABASE_SERVICE_ROLE_KEY (server only)
 */

// === CLIENT SIDE ===
export const getBrowserClient = (() => {
  let client: SupabaseClient | null = null

  return () => {
    if (client) return client

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://YOUR_SUPABASE_URL.supabase.co"
    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "PUBLIC_ANON_KEY_MISSING"

    client = createClient(supabaseUrl, supabaseAnonKey)
    return client
  }
})()

/**
 * Exporting default browser client
 * Usage:
 *   import { supabase } from "@/lib/supabase"
 */
export const supabase = getBrowserClient()

// === SERVER SIDE ===
export const createServerClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://YOUR_SUPABASE_URL.supabase.co"
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "SERVICE_ROLE_KEY_MISSING"

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
