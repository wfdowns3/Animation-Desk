-- Animation Desk — Supabase Schema
-- Run this in the Supabase SQL editor to set up your tables.

-- ============================================================
-- waitlist table
-- ============================================================
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text,
  created_at timestamptz default now(),
  survey_completed boolean default false
);

-- Index for quick lookups by email
create index if not exists waitlist_email_idx on waitlist (email);

-- ============================================================
-- survey_responses table
-- ============================================================
create table if not exists survey_responses (
  id uuid primary key default gen_random_uuid(),
  email text references waitlist(email) on delete set null,
  desk_interest text,
  budget_range text,
  buyer_type text,
  deposit_willing text,
  interview_willing boolean,
  open_text text,
  created_at timestamptz default now()
);

create index if not exists survey_email_idx on survey_responses (email);

-- ============================================================
-- deposits table
-- ============================================================
create table if not exists deposits (
  id uuid primary key default gen_random_uuid(),
  email text,
  name text,
  desk_number int,
  amount int,                          -- amount in cents (e.g. 100000 = $1,000)
  stripe_session_id text,
  stripe_payment_intent text,
  status text default 'pending',       -- pending | authorized | captured | cancelled
  created_at timestamptz default now()
);

create index if not exists deposits_email_idx on deposits (email);
create index if not exists deposits_stripe_session_idx on deposits (stripe_session_id);

-- ============================================================
-- quote_requests table
-- ============================================================
create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  institution text,
  contact_name text,
  email text,
  units int,
  timeline text,
  notes text,
  created_at timestamptz default now()
);

create index if not exists quote_email_idx on quote_requests (email);

-- ============================================================
-- Row Level Security (enable for production)
-- ============================================================
-- Enable RLS on all tables and add appropriate policies.
-- The service role key bypasses RLS, so API routes using
-- supabaseAdmin will always work. The anon key is used
-- client-side only for read-only queries (e.g. deposit counter).

alter table waitlist enable row level security;
alter table survey_responses enable row level security;
alter table deposits enable row level security;
alter table quote_requests enable row level security;

-- Allow anonymous inserts to waitlist (handled via API route but safe to permit)
create policy "Allow anon insert to waitlist"
  on waitlist for insert
  to anon
  with check (true);

-- Allow anonymous read of deposit count (for the Founder's Edition counter)
create policy "Allow anon read deposits count"
  on deposits for select
  to anon
  using (true);
