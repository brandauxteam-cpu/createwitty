-- ============================================================
--  CreateWitty CMS — Supabase schema
--  Run this ONCE in your Supabase project:
--  Supabase Dashboard -> SQL Editor -> New query -> paste -> Run
-- ============================================================

-- 1) POSTS TABLE ---------------------------------------------
create table if not exists public.posts (
  id             uuid primary key default gen_random_uuid(),
  type           text not null default 'blog' check (type in ('blog','news')),
  title          text not null,
  slug           text not null,
  excerpt        text default '',
  body           text default '',
  cover_image    text,
  cover_alt      text default '',
  meta_title     text default '',
  meta_description text default '',
  canonical_url  text,
  author         text default 'CreateWitty',
  status         text not null default 'draft' check (status in ('draft','published')),
  published_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- A slug must be unique within its type (blog vs news)
create unique index if not exists posts_type_slug_idx on public.posts (type, slug);
create index if not exists posts_status_idx on public.posts (status, published_at desc);

-- Auto-update updated_at on every change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_posts_updated on public.posts;
create trigger trg_posts_updated before update on public.posts
  for each row execute function public.set_updated_at();

-- 2) ROW LEVEL SECURITY --------------------------------------
alter table public.posts enable row level security;

-- Public (anonymous) visitors can READ only PUBLISHED posts
drop policy if exists "public read published" on public.posts;
create policy "public read published"
  on public.posts for select
  using (status = 'published');

-- Logged-in CMS users (your manager & SEO person) can do everything
drop policy if exists "authenticated full read" on public.posts;
create policy "authenticated full read"
  on public.posts for select to authenticated
  using (true);

drop policy if exists "authenticated insert" on public.posts;
create policy "authenticated insert"
  on public.posts for insert to authenticated
  with check (true);

drop policy if exists "authenticated update" on public.posts;
create policy "authenticated update"
  on public.posts for update to authenticated
  using (true) with check (true);

drop policy if exists "authenticated delete" on public.posts;
create policy "authenticated delete"
  on public.posts for delete to authenticated
  using (true);

-- 3) STORAGE BUCKET FOR IMAGES -------------------------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Anyone can view images (public bucket)
drop policy if exists "public read images" on storage.objects;
create policy "public read images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Only logged-in CMS users can upload / change / delete images
drop policy if exists "authenticated upload images" on storage.objects;
create policy "authenticated upload images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-images');

drop policy if exists "authenticated update images" on storage.objects;
create policy "authenticated update images"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "authenticated delete images" on storage.objects;
create policy "authenticated delete images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-images');

-- ============================================================
--  DONE.
--  Next: create login accounts for your team in
--  Authentication -> Users -> "Add user" (set email + password,
--  and tick "Auto Confirm User"). Share those logins with your
--  manager and SEO person. They sign in at  /admin/login
-- ============================================================
