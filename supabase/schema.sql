-- ════════════════════════════════════════════════════════════════════
-- Aviant database schema
-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement is idempotent.
-- Every table uses Row Level Security so students only see their own rows.
-- ════════════════════════════════════════════════════════════════════

-- ── Profiles: one row per student, created automatically at sign-up ──
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null default '',
  rating      text not null default 'ppl' check (rating in ('ppl', 'ir')),
  voice_cfi   text,          -- chosen Teach-mode voice id
  voice_dpe   text,          -- chosen Examine-mode voice id
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Create the profile from the sign-up form (or Google/Apple) name and rating.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, rating)
  values (
    new.id,
    -- email sign-up sends "name"; Google sends "full_name"/"name"; Apple may send neither
    coalesce(nullif(new.raw_user_meta_data ->> 'name', ''), nullif(new.raw_user_meta_data ->> 'full_name', ''), split_part(new.email, '@', 1), ''),
    case when new.raw_user_meta_data ->> 'rating' = 'ir' then 'ir' else 'ppl' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep updated_at current.
create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ── Quiz attempts: one row per finished practice test ──
create table if not exists public.quiz_attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  quiz_id       text not null,
  quiz_title    text not null,
  rating        text not null,
  score         int  not null,          -- correct answers
  total         int  not null,
  duration_sec  int,
  -- [{ "questionId": "...", "topic": "...", "correct": true, "chosen": "choice text" | null }]
  answers       jsonb not null default '[]'::jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists quiz_attempts_user_created on public.quiz_attempts (user_id, created_at desc);
alter table public.quiz_attempts enable row level security;

drop policy if exists "quiz_attempts: read own" on public.quiz_attempts;
create policy "quiz_attempts: read own" on public.quiz_attempts
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "quiz_attempts: insert own" on public.quiz_attempts;
create policy "quiz_attempts: insert own" on public.quiz_attempts
  for insert to authenticated with check ((select auth.uid()) = user_id);

-- ── Oral sessions: the voice DPE/CFI conversations ──
create table if not exists public.oral_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mode        text not null check (mode in ('teach', 'examine')),
  rating      text not null,
  transcript  jsonb not null default '[]'::jsonb,   -- [{ "role": "user"|"assistant", "content": "..." }]
  grades      jsonb not null default '[]'::jsonb,   -- examiner grades per question
  avg_score   numeric,                               -- 0–1, examine mode only
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists oral_sessions_user_updated on public.oral_sessions (user_id, updated_at desc);
alter table public.oral_sessions enable row level security;

drop policy if exists "oral_sessions: read own" on public.oral_sessions;
create policy "oral_sessions: read own" on public.oral_sessions
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "oral_sessions: insert own" on public.oral_sessions;
create policy "oral_sessions: insert own" on public.oral_sessions
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "oral_sessions: update own" on public.oral_sessions;
create policy "oral_sessions: update own" on public.oral_sessions
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop trigger if exists oral_sessions_touch on public.oral_sessions;
create trigger oral_sessions_touch before update on public.oral_sessions
  for each row execute function public.touch_updated_at();

-- ── Lesson progress: last time each study guide was opened ──
create table if not exists public.lesson_progress (
  user_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  slug            text not null,
  last_viewed_at  timestamptz not null default now(),
  primary key (user_id, slug)
);

alter table public.lesson_progress enable row level security;

drop policy if exists "lesson_progress: read own" on public.lesson_progress;
create policy "lesson_progress: read own" on public.lesson_progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "lesson_progress: insert own" on public.lesson_progress;
create policy "lesson_progress: insert own" on public.lesson_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "lesson_progress: update own" on public.lesson_progress;
create policy "lesson_progress: update own" on public.lesson_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
