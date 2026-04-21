-- Admin-only message templates for inbox outreach workflows.
-- Run this in the Supabase SQL editor.

create table if not exists public.admin_message_templates (
  id bigserial primary key,
  channel text not null,
  name text not null,
  subject text,
  body text not null,
  created_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  created_by_email text,
  updated_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  updated_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_message_templates_channel_check check (
    channel in ('email', 'whatsapp')
  ),
  constraint admin_message_templates_email_subject_check check (
    (
      channel = 'email'
      and coalesce(length(trim(subject)), 0) > 0
    )
    or channel = 'whatsapp'
  )
);

alter table public.admin_message_templates
  add column if not exists channel text not null default 'email',
  add column if not exists name text not null default 'Untitled template',
  add column if not exists subject text,
  add column if not exists body text not null default '',
  add column if not exists created_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  add column if not exists created_by_email text,
  add column if not exists updated_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  add column if not exists updated_by_email text,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.admin_message_templates
  drop constraint if exists admin_message_templates_channel_check,
  drop constraint if exists admin_message_templates_email_subject_check;

alter table public.admin_message_templates
  add constraint admin_message_templates_channel_check check (
    channel in ('email', 'whatsapp')
  ),
  add constraint admin_message_templates_email_subject_check check (
    (
      channel = 'email'
      and coalesce(length(trim(subject)), 0) > 0
    )
    or channel = 'whatsapp'
  );

create index if not exists admin_message_templates_channel_idx
  on public.admin_message_templates (channel);

create index if not exists admin_message_templates_updated_at_idx
  on public.admin_message_templates (updated_at desc);

alter table public.admin_message_templates enable row level security;

revoke all on public.admin_message_templates from anon, authenticated;