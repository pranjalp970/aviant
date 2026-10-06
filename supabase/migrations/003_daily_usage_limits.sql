-- Run once in Supabase → SQL Editor.
-- Per-student daily usage counters for the paid AI services (Claude replies,
-- ElevenLabs voice characters). Students can read their own counters but can
-- never write them directly: the only way to change a counter is consume_usage(),
-- which can only add to it, so the limit can't be reset from the browser.

create table if not exists public.usage_daily (
  user_id     uuid not null references auth.users (id) on delete cascade,
  day         date not null default (now() at time zone 'utc')::date,
  ai_replies  int  not null default 0,
  tts_chars   int  not null default 0,
  primary key (user_id, day)
);

alter table public.usage_daily enable row level security;

drop policy if exists "usage_daily: read own" on public.usage_daily;
create policy "usage_daily: read own" on public.usage_daily
  for select to authenticated using ((select auth.uid()) = user_id);
-- (no insert/update/delete policies on purpose)

-- Adds `amount` to today's counter if it stays within `cap`.
-- Returns true when allowed (and counted), false when the cap would be exceeded.
create or replace function public.consume_usage(kind text, amount int, cap int)
returns boolean
language plpgsql
security definer set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  today date := (now() at time zone 'utc')::date;
  used int;
begin
  if uid is null or amount < 0 or kind not in ('ai_replies', 'tts_chars') then
    return false;
  end if;

  insert into public.usage_daily (user_id, day) values (uid, today)
  on conflict (user_id, day) do nothing;

  -- lock the row so concurrent requests can't both slip under the cap
  if kind = 'ai_replies' then
    select ai_replies into used from public.usage_daily where user_id = uid and day = today for update;
    if used + amount > cap then return false; end if;
    update public.usage_daily set ai_replies = ai_replies + amount where user_id = uid and day = today;
  else
    select tts_chars into used from public.usage_daily where user_id = uid and day = today for update;
    if used + amount > cap then return false; end if;
    update public.usage_daily set tts_chars = tts_chars + amount where user_id = uid and day = today;
  end if;
  return true;
end;
$$;

revoke all on function public.consume_usage(text, int, int) from public, anon;
grant execute on function public.consume_usage(text, int, int) to authenticated;
