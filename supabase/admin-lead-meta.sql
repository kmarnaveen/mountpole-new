-- Admin-only metadata for lead workflow state.
-- Run this in the Supabase SQL editor.

create table if not exists public.admin_contact_submission_meta (
  submission_id bigint primary key references public.contact_submissions(id) on delete cascade,
  status text not null default 'new',
  follow_up_stage text not null default 'new-inquiry',
  internal_notes text,
  updated_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  updated_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_contact_submission_meta_status_check check (
    status in ('new', 'working', 'qualified', 'won', 'lost')
  ),
  constraint admin_contact_submission_meta_follow_up_stage_check check (
    follow_up_stage in (
      'new-inquiry',
      'first-reachout',
      'awaiting-reply',
      'quote-sent',
      'scheduled-follow-up',
      'decision-pending'
    )
  )
);

alter table public.admin_contact_submission_meta
  add column if not exists status text not null default 'new',
  add column if not exists follow_up_stage text not null default 'new-inquiry',
  add column if not exists internal_notes text,
  add column if not exists updated_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  add column if not exists updated_by_email text,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

alter table public.admin_contact_submission_meta
  drop constraint if exists admin_contact_submission_meta_status_check,
  drop constraint if exists admin_contact_submission_meta_follow_up_stage_check;

alter table public.admin_contact_submission_meta
  add constraint admin_contact_submission_meta_status_check check (
    status in ('new', 'working', 'qualified', 'won', 'lost')
  ),
  add constraint admin_contact_submission_meta_follow_up_stage_check check (
    follow_up_stage in (
      'new-inquiry',
      'first-reachout',
      'awaiting-reply',
      'quote-sent',
      'scheduled-follow-up',
      'decision-pending'
    )
  );

create table if not exists public.admin_contact_submission_activity (
  id bigserial primary key,
  submission_id bigint not null references public.contact_submissions(id) on delete cascade,
  status text not null default 'new',
  follow_up_stage text not null default 'new-inquiry',
  internal_note text,
  created_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  created_by_email text,
  created_at timestamptz not null default now(),
  constraint admin_contact_submission_activity_status_check check (
    status in ('new', 'working', 'qualified', 'won', 'lost')
  ),
  constraint admin_contact_submission_activity_follow_up_stage_check check (
    follow_up_stage in (
      'new-inquiry',
      'first-reachout',
      'awaiting-reply',
      'quote-sent',
      'scheduled-follow-up',
      'decision-pending'
    )
  )
);

alter table public.admin_contact_submission_activity
  add column if not exists status text not null default 'new',
  add column if not exists follow_up_stage text not null default 'new-inquiry',
  add column if not exists internal_note text,
  add column if not exists created_by_admin_user_id bigint references public.admin_users(id) on delete set null,
  add column if not exists created_by_email text,
  add column if not exists created_at timestamptz not null default now();

alter table public.admin_contact_submission_activity
  drop constraint if exists admin_contact_submission_activity_status_check,
  drop constraint if exists admin_contact_submission_activity_follow_up_stage_check;

alter table public.admin_contact_submission_activity
  add constraint admin_contact_submission_activity_status_check check (
    status in ('new', 'working', 'qualified', 'won', 'lost')
  ),
  add constraint admin_contact_submission_activity_follow_up_stage_check check (
    follow_up_stage in (
      'new-inquiry',
      'first-reachout',
      'awaiting-reply',
      'quote-sent',
      'scheduled-follow-up',
      'decision-pending'
    )
  );

create index if not exists admin_contact_submission_meta_status_idx
  on public.admin_contact_submission_meta (status);

create index if not exists admin_contact_submission_meta_updated_at_idx
  on public.admin_contact_submission_meta (updated_at desc);

create index if not exists admin_contact_submission_activity_submission_id_idx
  on public.admin_contact_submission_activity (submission_id);

create index if not exists admin_contact_submission_activity_created_at_idx
  on public.admin_contact_submission_activity (submission_id, created_at desc);

alter table public.admin_contact_submission_meta enable row level security;
alter table public.admin_contact_submission_activity enable row level security;

revoke all on public.admin_contact_submission_meta from anon, authenticated;
revoke all on public.admin_contact_submission_activity from anon, authenticated;