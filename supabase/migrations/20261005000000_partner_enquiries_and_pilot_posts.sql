-- SolarFeed Hubs website: enquiry form storage and the pilot journal.
-- Run in the Supabase SQL editor, or with `supabase db push`.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- partner_enquiries: written by the public contact form, readable only by staff
-- ---------------------------------------------------------------------------
create table if not exists public.partner_enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text not null check (char_length(full_name) between 2 and 120),
  organisation  text not null check (char_length(organisation) between 2 and 160),
  role          text not null check (char_length(role) between 2 and 120),
  email         text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone         text check (phone is null or char_length(phone) <= 40),
  audience      text not null check (audience in ('funder','cooperative','government','supplier','farmer','researcher','media','other')),
  message       text not null check (char_length(message) between 20 and 4000),
  consent       boolean not null check (consent = true)
);

comment on table public.partner_enquiries is
  'Website enquiries. Personal data under the Nigeria Data Protection Act 2023: delete 24 months after last contact.';

alter table public.partner_enquiries enable row level security;

-- The public (anon) role may insert only. There is deliberately no select, update or delete policy,
-- so enquiries can be read only with the service role or from the Supabase dashboard.
revoke all on public.partner_enquiries from anon, authenticated;
grant insert (full_name, organisation, role, email, phone, audience, message, consent)
  on public.partner_enquiries to anon, authenticated;

drop policy if exists "Public can submit enquiries" on public.partner_enquiries;
create policy "Public can submit enquiries"
  on public.partner_enquiries
  for insert
  to anon, authenticated
  with check (consent = true);

-- ---------------------------------------------------------------------------
-- pilot_posts: the pilot journal. Staff write from the dashboard; the public reads published posts.
-- ---------------------------------------------------------------------------
create table if not exists public.pilot_posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  published_at  timestamptz not null default now(),
  title         text not null check (char_length(title) between 3 and 200),
  body          text not null,
  is_published  boolean not null default false
);

alter table public.pilot_posts enable row level security;

revoke all on public.pilot_posts from anon, authenticated;
grant select (id, published_at, title, body) on public.pilot_posts to anon, authenticated;

drop policy if exists "Public can read published posts" on public.pilot_posts;
create policy "Public can read published posts"
  on public.pilot_posts
  for select
  to anon, authenticated
  using (is_published = true);

create index if not exists pilot_posts_published_idx on public.pilot_posts (published_at desc) where is_published;
