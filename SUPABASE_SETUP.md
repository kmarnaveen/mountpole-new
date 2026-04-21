# Supabase setup

The client-side contact form flow writes to the `contact_submissions` table by default.

Set these public environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_CONTACT_TABLE` (optional, defaults to `contact_submissions`)

Server-side variable:

- `SUPABASE_SERVICE_ROLE_KEY` (required for backend-only admin auth and private contact reads)

Run this SQL in Supabase if the table does not exist yet:

```sql
create table if not exists public.contact_submissions (
  id bigserial primary key,
  submitted_at timestamptz not null default now(),
  source text not null,
  name text not null,
  email text not null,
  company text,
  phone text,
  message text not null,
  product text,
  sku text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.contact_submissions to anon, authenticated;
grant usage, select on sequence public.contact_submissions_id_seq to anon, authenticated;

drop policy if exists "Allow public insert contact submissions" on public.contact_submissions;
create policy "Allow public insert contact submissions"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow public read contact submissions" on public.contact_submissions;
revoke select on table public.contact_submissions from anon, authenticated;
```

The public POST flow only needs insert access. The admin area reads through the server using `SUPABASE_SERVICE_ROLE_KEY`, so public select access should stay disabled.

## Backend-only admin auth

Admin auth now runs entirely through Next.js route handlers and server-only Supabase queries.
The browser never talks to Supabase directly for admin login or session checks.

Run `supabase/admin-auth.sql` in the Supabase SQL editor. It creates:

- `public.admin_users`
- `public.admin_sessions`
- the initial admin user `gauravdev@mountpole.com`

The seeded password is `mountpole@123`, stored as a server-verified scrypt hash.

To generate a hash for a future admin password, run:

```bash
npm run admin:hash-password -- 'your-password-here'
```

Then insert the returned hash into `public.admin_users.password_hash`.

Admin routes:

- `GET /admin/login`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /admin`
- `GET /api/contact?limit=25` after admin sign-in

If your Supabase project already has the old public read grant and policy, remove them so submitted contacts are no longer publicly readable outside the admin session.
