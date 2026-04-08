-- MuzikSociety tables (ms_ prefix to avoid collision with THEKINGDOM)

create table if not exists ms_instrumentals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  genre text,
  bpm integer,
  key text,
  cover_url text,
  preview_url text,
  external_url text not null,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists ms_sample_packs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_url text,
  preview_url text,
  external_url text not null,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists ms_tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  cover_url text,
  live_url text,
  repo_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists ms_portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text,
  year integer,
  role text check (role in ('producer', 'engineer', 'developer')),
  description text,
  cover_url text,
  published boolean default true,
  created_at timestamptz default now()
);

create table if not exists ms_blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  body text not null,
  excerpt text,
  tags text[],
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists ms_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text check (subject in ('booking', 'collab', 'general')),
  message text not null,
  created_at timestamptz default now()
);

-- RLS: only allow public read on published content
alter table ms_instrumentals enable row level security;
alter table ms_sample_packs enable row level security;
alter table ms_tools enable row level security;
alter table ms_portfolio enable row level security;
alter table ms_blog_posts enable row level security;
alter table ms_inquiries enable row level security;

create policy "Public read published instrumentals"
  on ms_instrumentals for select using (published = true);

create policy "Public read published sample_packs"
  on ms_sample_packs for select using (published = true);

create policy "Public read published tools"
  on ms_tools for select using (published = true);

create policy "Public read published portfolio"
  on ms_portfolio for select using (published = true);

create policy "Public read published blog posts"
  on ms_blog_posts for select using (published = true);

create policy "Allow inquiry inserts"
  on ms_inquiries for insert with check (true);

-- Service role bypasses RLS for admin operations
