-- Brad's Brigade waitlist table.
-- Run once: Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists public.waitlist (
  id             uuid        primary key default gen_random_uuid(),
  -- Stored lowercased and trimmed by app/api/waitlist/route.ts.
  email          text        not null unique,
  chapter        text,
  owns_apparatus boolean,
  created_at     timestamptz not null default now()
);

-- Row Level Security on, with no policies: the publishable/anon key cannot read
-- or write this table. The API route uses the secret (service_role) key, which
-- bypasses RLS, so it is unaffected.
alter table public.waitlist enable row level security;

-- Also remove table privileges from the public API roles, so the table stays
-- closed even if a permissive policy is added later by mistake.
revoke all on table public.waitlist from anon, authenticated;
