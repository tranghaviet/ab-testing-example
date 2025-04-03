'use client'

import { env } from '@/server/env'
import { createBrowserClient } from '@supabase/ssr'

export default function supabaseClientForBrowser() {
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
