;/>
\
1. **Replace the entire file
with the content
below**

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Creates – or returns – a cached Supabase client.
 * If your environment variables are missing we fall back to
 * obvious placeholders so the preview keeps running (network
 * requests will simply fail instead of crashing the build).
 *
 * In production you MUST set:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   SUPABASE_SERVICE_ROLE_KEY  (server only)
 */
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
 * Convenience export so existing imports keep working:
 *   import { supabase } from "@/lib/supabase"
 */
export const supabase = getBrowserClient()

/**
 * Server-side client – only initialised when called, so it
 * won’t explode during a client-side bundle.
 */
export const createServerClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://YOUR_SUPABASE_URL.supabase.co"
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "SERVICE_ROLE_KEY_MISSING"

  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
