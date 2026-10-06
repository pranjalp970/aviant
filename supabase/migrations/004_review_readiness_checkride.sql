-- Run once in Supabase → SQL Editor. Safe to re-run.
-- Adds: account deletion, spaced-repetition review state, checkride date,
-- mock-checkride sessions, and private storage for uploaded flight plans / POHs.

-- ── Checkride date (study plan + countdown) ──
alter table public.profiles add column if not exists checkride_date date;

-- ── Delete my account ──
-- Removes the auth user; every app table cascades from auth.users.
-- (Uploaded files are removed by the app before this runs.)
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;

-- ── Spaced repetition: one row per (student, question) they've answered ──
-- box 1–5 (Leitner): wrong → box 1, due now; right → next box, due later.
create table if not exists public.question_reviews (
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  question_id  text not null,
  topic        text,
  box          int  not null default 1 check (box between 1 and 5),
  due_at       timestamptz not null default now(),
  last_correct boolean not null default false,
  times_seen   int  not null default 0,
  times_wrong  int  not null default 0,
  updated_at   timestamptz not null default now(),
  primary key (user_id, question_id)
);

create index if not exists question_reviews_due on public.question_reviews (user_id, due_at);
alter table public.question_reviews enable row level security;

drop policy if exists "question_reviews: read own" on public.question_reviews;
create policy "question_reviews: read own" on public.question_reviews
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "question_reviews: insert own" on public.question_reviews;
create policy "question_reviews: insert own" on public.question_reviews
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "question_reviews: update own" on public.question_reviews;
create policy "question_reviews: update own" on public.question_reviews
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- ── Mock checkride sessions ──
create table if not exists public.checkride_sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  rating       text not null,
  aircraft     text not null default '',
  departure    text not null default '',
  destination  text not null default '',
  notes        text not null default '',
  -- [{ "fileId": "file_…", "kind": "plan"|"poh"|"other", "name": "…", "mime": "…", "path": "<storage path>" }]
  documents    jsonb not null default '[]'::jsonb,
  created_at   timestamptz not null default now()
);

create index if not exists checkride_sessions_user on public.checkride_sessions (user_id, created_at desc);
alter table public.checkride_sessions enable row level security;

drop policy if exists "checkride_sessions: read own" on public.checkride_sessions;
create policy "checkride_sessions: read own" on public.checkride_sessions
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "checkride_sessions: insert own" on public.checkride_sessions;
create policy "checkride_sessions: insert own" on public.checkride_sessions
  for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "checkride_sessions: delete own" on public.checkride_sessions;
create policy "checkride_sessions: delete own" on public.checkride_sessions
  for delete to authenticated using ((select auth.uid()) = user_id);

alter table public.oral_sessions add column if not exists checkride_id uuid references public.checkride_sessions (id) on delete set null;

-- ── Private storage for uploaded flight plans / POHs ──
-- Files live under <user id>/… and only their owner can read, add or remove them.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('checkride-docs', 'checkride-docs', false, 52428800,
        array['application/pdf', 'image/png', 'image/jpeg', 'image/webp', 'text/plain'])
on conflict (id) do nothing;

drop policy if exists "checkride-docs: read own" on storage.objects;
create policy "checkride-docs: read own" on storage.objects
  for select to authenticated
  using (bucket_id = 'checkride-docs' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "checkride-docs: upload own" on storage.objects;
create policy "checkride-docs: upload own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'checkride-docs' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "checkride-docs: delete own" on storage.objects;
create policy "checkride-docs: delete own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'checkride-docs' and (storage.foldername(name))[1] = (select auth.uid())::text);
