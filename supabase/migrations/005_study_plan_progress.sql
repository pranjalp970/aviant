-- Run once in Supabase → SQL Editor. Safe to re-run.
-- Adds: onboarding answers for the personalized study plan, Instrument waitlist,
-- a daily study log (streaks, daily goal, XP), and achievements (badges, challenges).

-- ── Study-plan inputs on the profile ──
alter table public.profiles add column if not exists written_status text not null default 'not_taken';
alter table public.profiles add column if not exists written_date date;
alter table public.profiles add column if not exists written_score int;
alter table public.profiles add column if not exists missed_acs_codes text[] not null default '{}';
alter table public.profiles add column if not exists study_days_per_week int not null default 5;
alter table public.profiles add column if not exists study_minutes_per_day int not null default 30;
alter table public.profiles add column if not exists topic_confidence jsonb not null default '{}'::jsonb;
alter table public.profiles add column if not exists timezone text;
alter table public.profiles add column if not exists onboarded_at timestamptz;
alter table public.profiles add column if not exists ir_waitlist boolean not null default false;

do $$ begin
  alter table public.profiles add constraint profiles_written_status_check check (written_status in ('not_taken', 'passed'));
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.profiles add constraint profiles_study_days_check check (study_days_per_week between 1 and 7);
exception when duplicate_object then null; end $$;
do $$ begin
  alter table public.profiles add constraint profiles_study_minutes_check check (study_minutes_per_day between 5 and 240);
exception when duplicate_object then null; end $$;

-- Instrument is "coming soon": move anyone on it to Private Pilot and keep them on the waitlist.
update public.profiles set rating = 'ppl', ir_waitlist = true where rating = 'ir';

-- ── Daily study log: one row per student per (local) day ──
create table if not exists public.study_log (
  user_id    uuid not null references auth.users (id) on delete cascade,
  day        date not null,
  minutes    numeric not null default 0,
  questions  int not null default 0,
  correct    int not null default 0,
  sessions   int not null default 0,
  xp         int not null default 0,
  primary key (user_id, day)
);

alter table public.study_log enable row level security;

drop policy if exists "study_log: read own" on public.study_log;
create policy "study_log: read own" on public.study_log
  for select to authenticated using ((select auth.uid()) = user_id);
-- (no insert/update policies: rows only change through log_study())

-- Adds activity to the student's row for `p_day` (their local date, which the app
-- computes from their timezone). Only accepts today ±1 day, and caps each call,
-- so the log can't be back-filled or inflated from the browser.
create or replace function public.log_study(p_day date, p_minutes numeric, p_questions int, p_correct int, p_sessions int, p_xp int)
returns void
language plpgsql
security definer set search_path = ''
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then return; end if;
  if p_day < (now() at time zone 'utc')::date - 1 or p_day > (now() at time zone 'utc')::date + 1 then return; end if;
  insert into public.study_log (user_id, day, minutes, questions, correct, sessions, xp)
  values (
    uid, p_day,
    least(greatest(p_minutes, 0), 180),
    least(greatest(p_questions, 0), 100),
    least(greatest(p_correct, 0), 100),
    least(greatest(p_sessions, 0), 5),
    least(greatest(p_xp, 0), 1500)
  )
  on conflict (user_id, day) do update set
    minutes   = public.study_log.minutes   + excluded.minutes,
    questions = public.study_log.questions + excluded.questions,
    correct   = public.study_log.correct   + excluded.correct,
    sessions  = public.study_log.sessions  + excluded.sessions,
    xp        = public.study_log.xp        + excluded.xp;
end;
$$;

revoke all on function public.log_study(date, numeric, int, int, int, int) from public, anon;
grant execute on function public.log_study(date, numeric, int, int, int, int) to authenticated;

-- ── Achievements: badges and completed weekly challenges (each recorded once) ──
create table if not exists public.achievements (
  user_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id         text not null,
  xp         int not null default 0,
  earned_at  timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.achievements enable row level security;

drop policy if exists "achievements: read own" on public.achievements;
create policy "achievements: read own" on public.achievements
  for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "achievements: insert own" on public.achievements;
create policy "achievements: insert own" on public.achievements
  for insert to authenticated with check ((select auth.uid()) = user_id and xp between 0 and 500);
