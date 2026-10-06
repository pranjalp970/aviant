-- Run once in Supabase → SQL Editor (after schema.sql).
-- Fills in profile names for people who sign in with Google or Apple.
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
