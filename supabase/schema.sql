-- ============================================================
-- Matraz Innova CRM — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Auto-update timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── PROFILES ────────────────────────────────────────────────

create table if not exists public.profiles (
  id             uuid references auth.users on delete cascade primary key,
  full_name      text,
  role           text default 'Partner',
  avatar_initials text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  _name text;
  _initials text;
begin
  _name := coalesce(
    new.raw_user_meta_data->>'full_name',
    split_part(new.email, '@', 1)
  );
  _initials := upper(left(_name, 1)) || upper(substring(_name from position(' ' in _name) + 1 for 1));
  insert into public.profiles (id, full_name, avatar_initials)
  values (new.id, _name, _initials)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── COMPANIES ───────────────────────────────────────────────

create table if not exists public.companies (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users on delete cascade not null,
  name       text not null,
  industry   text,
  website    text,
  city       text,
  country    text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.companies enable row level security;

create policy "companies_all" on public.companies
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger companies_updated_at
  before update on public.companies
  for each row execute function public.handle_updated_at();

-- ── CONTACTS ────────────────────────────────────────────────

create table if not exists public.contacts (
  id             uuid default gen_random_uuid() primary key,
  user_id        uuid references auth.users on delete cascade not null,
  company_id     uuid references public.companies on delete set null,
  name           text not null,
  role           text,
  email          text,
  phone          text,
  city           text,
  vertical       text check (vertical in ('business', 'healthcare', 'it')) not null default 'business',
  status         text check (status in ('lead', 'prospect', 'customer')) not null default 'lead',
  lead_score     integer default 0 check (lead_score >= 0 and lead_score <= 100),
  pipeline_value numeric(12,2) default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

alter table public.contacts enable row level security;

create policy "contacts_all" on public.contacts
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger contacts_updated_at
  before update on public.contacts
  for each row execute function public.handle_updated_at();

-- ── DEALS ───────────────────────────────────────────────────

create table if not exists public.deals (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  contact_id  uuid references public.contacts on delete set null,
  company_id  uuid references public.companies on delete set null,
  title       text not null,
  value       numeric(12,2) default 0,
  vertical    text check (vertical in ('business', 'healthcare', 'it')) not null default 'business',
  stage       text check (stage in ('lead','qualified','proposal','negotiation','closing','won','lost')) not null default 'lead',
  probability integer default 50 check (probability >= 0 and probability <= 100),
  close_date  date,
  description text,
  tags        text[] default '{}',
  owner_name  text,
  position    integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table public.deals enable row level security;

create policy "deals_all" on public.deals
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger deals_updated_at
  before update on public.deals
  for each row execute function public.handle_updated_at();

-- ── ACTIVITIES ──────────────────────────────────────────────

create table if not exists public.activities (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users on delete cascade not null,
  contact_id uuid references public.contacts on delete cascade,
  deal_id    uuid references public.deals on delete cascade,
  kind       text check (kind in ('call','email','meeting','note','task','doc','star')) not null default 'note',
  title      text not null,
  body       text,
  created_at timestamptz default now()
);

alter table public.activities enable row level security;

create policy "activities_all" on public.activities
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── REALTIME ────────────────────────────────────────────────
-- Enable realtime for these tables (run separately if needed)
-- alter publication supabase_realtime add table public.contacts;
-- alter publication supabase_realtime add table public.deals;
-- alter publication supabase_realtime add table public.activities;

-- ── SAMPLE DATA (optional — remove in production) ───────────
-- To seed sample data, replace '<your-user-id>' with your auth.users id
-- insert into public.companies (user_id, name, industry, city) values
--   ('<your-user-id>', 'Bioteca Labs', 'Pharma R&D', 'Barcelona'),
--   ('<your-user-id>', 'NovaCore Systems', 'Healthtech SaaS', 'Madrid');
