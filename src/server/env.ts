/**
 * It has to be a `.js`-file to be imported there.
 */

import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  NEXT_PUBLIC_SITE_URL: z.string(),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_COPILOT_PUBLIC_API_KEY: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  throw new Error(
    "❌ Invalid environment variables: " +
      JSON.stringify(parsedEnv.error.format(), null, 4)
  )
}
export const env = parsedEnv.data
