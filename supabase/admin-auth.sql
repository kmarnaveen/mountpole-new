-- Backend-only admin auth schema.
-- Run this in the Supabase SQL editor.

create table if not exists public.admin_users (
  id bigserial primary key,
  email text not null unique,
  password_hash text not null,
  role text not null default 'admin',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  constraint admin_users_email_lowercase check (email = lower(email))
);

alter table public.admin_users
  add column if not exists role text not null default 'admin',
  add column if not exists is_active boolean not null default true,
  add column if not exists last_login_at timestamptz,
  add column if not exists created_at timestamptz not null default now();

update public.admin_users
   set email = lower(email);

do $$
begin
  if exists (
    select 1
      from information_schema.columns
     where table_schema = 'public'
       and table_name = 'admin_sessions'
       and column_name = 'token'
  ) then
    drop table public.admin_sessions;
  end if;
end $$;

create table if not exists public.admin_sessions (
  id bigserial primary key,
  admin_user_id bigint not null references public.admin_users(id) on delete cascade,
  session_hash text not null unique,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create index if not exists admin_sessions_admin_user_id_idx
  on public.admin_sessions (admin_user_id);

create index if not exists admin_sessions_active_idx
  on public.admin_sessions (expires_at)
  where revoked_at is null;

alter table public.admin_users enable row level security;
alter table public.admin_sessions enable row level security;

insert into public.admin_users (email, password_hash, role, is_active)
values (
  'gauravdev@mountpole.com',
  'scrypt$16384$8$1$kVxeAAJUZKdjgNC4Uw_Ucw$XShPquoyqJn1OvpTe-biTQKcmje0wCYaan-7ediJw40FiiYTVvX6p574t0LnBitLnioOM63z5ZZdvSxsBLhzgA',
  'admin',
  true
)
on conflict (email) do update
  set password_hash = excluded.password_hash,
      role = excluded.role,
      is_active = true;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.admin_sessions from anon, authenticated;