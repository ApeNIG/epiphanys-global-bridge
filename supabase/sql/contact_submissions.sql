-- Contact enquiries from the website's "Contact us" form.
--
-- Robert Croll, 2026-09-22: "Please can it be an information box detailing the
-- below and have it linked to a database where we store their details."
--
-- WHY THIS IS A LOOSE .sql FILE AND NOT A MIGRATION. On this project, tables
-- are created by hand in the Supabase SQL editor, not through the migration
-- folder: `site_feedback` appears in none of the 64 files in
-- supabase/migrations/ and in no entry in src/integrations/supabase/types.ts.
-- Adding a migration here would look authoritative and would never run. Paste
-- this into the SQL editor of whichever project ends up serving the site.
--
-- IT HAS NOT BEEN RUN. Verified 2026-09-23: the project this repo points at,
-- wtrqojsqscnloymlwwpw, no longer resolves (NXDOMAIN from 1.1.1.1, while
-- supabase.co itself resolves), so there is currently nothing to run it
-- against. Once it has been run, set VITE_ENQUIRY_ENDPOINT and the form in
-- src/lib/submitEnquiry.ts will post instead of falling back to a mail client.

create table if not exists public.contact_submissions (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  first_name    text not null,
  last_name     text not null,
  company       text,
  email         text not null,
  question      text not null,
  -- Provenance, so a submission can be traced to where it came from without
  -- storing anything that identifies a person beyond what they typed.
  page_url      text,
  user_agent    text,
  handled_at    timestamptz,
  handled_note  text
);

comment on table public.contact_submissions is
  'Website contact form enquiries. Personal data: name, company, email, and free text. Covered by the published privacy policy at /privacy under "What we collect".';

alter table public.contact_submissions enable row level security;

-- INSERT ONLY, and only for anonymous visitors. The anon key ships inside the
-- public JS bundle, so anyone can read it; the table must therefore be
-- write-only from the client. Without this policy the anon key could list every
-- enquiry ever submitted, which is a personal-data breach, not a bug.
-- Mirrors the intended shape of site_feedback.
create policy "anon can submit an enquiry"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Deliberately NO select/update/delete policy for anon or authenticated. Read
-- them with the service role, from the Supabase dashboard or a server-side job.

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_unhandled_idx
  on public.contact_submissions (created_at desc)
  where handled_at is null;

-- AFTER RUNNING THIS, CHECK THE LOCKDOWN RATHER THAN ASSUMING IT. With the
-- anon key, this must return an empty list or a permission error, NEVER rows:
--
--   curl "https://<ref>.supabase.co/rest/v1/contact_submissions?select=*" \
--        -H "apikey: <anon key>"
--
-- and an insert must succeed. A table that accepts writes but also serves
-- reads is the failure that matters here.
