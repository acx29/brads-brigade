import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Server-only Supabase client.
 *
 * Uses the project's secret key (also called the service_role key), which
 * bypasses Row Level Security. Never import this from a client component and
 * never expose the key with a NEXT_PUBLIC_ prefix.
 *
 * The client is created on first use rather than at module load, so a missing
 * env var produces a clear error at request time instead of breaking `next build`.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
