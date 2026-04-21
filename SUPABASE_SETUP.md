# Supabase contact form setup

The client-side contact form flow writes to the `contact_submissions` table by default.

Set these public environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_CONTACT_TABLE` (optional, defaults to `contact_submissions`)

Optional server-side variable:

- `SUPABASE_SERVICE_ROLE_KEY` (lets the GET endpoint read without public select access later)

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
grant select on table public.contact_submissions to anon, authenticated;
grant usage, select on sequence public.contact_submissions_id_seq to anon, authenticated;

drop policy if exists "Allow public insert contact submissions" on public.contact_submissions;
create policy "Allow public insert contact submissions"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow public read contact submissions" on public.contact_submissions;
create policy "Allow public read contact submissions"
on public.contact_submissions
for select
to anon, authenticated
using (true);
```

The POST flow only needs insert access. The GET endpoint at `/api/contact` is intentionally open in the current setup, so the SQL above also enables public read access.

Examples:

- `GET /api/contact`
- `GET /api/contact?limit=25`
- `GET /api/contact?limit=25&offset=25`
- `GET /api/contact?source=lead-modal`

If you want to lock reads down later, set `SUPABASE_SERVICE_ROLE_KEY` on the server and remove the public `select` grant and policy.
