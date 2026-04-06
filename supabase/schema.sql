-- =============================================================
-- A-Level Business Consultants Inc — Client Portal Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================================

-- ---------------------------------------------------------------
-- 1. PROFILES  (extends auth.users)
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id             uuid references auth.users(id) on delete cascade primary key,
  email          text        not null,
  full_name      text        not null,
  role           text        not null default 'client' check (role in ('admin', 'client')),
  phone          text,
  company        text,
  service_category text,
  last_login     timestamptz,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- Auto-create profile on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------
-- 2. DOCUMENTS
-- ---------------------------------------------------------------
create table if not exists public.documents (
  id                  uuid        default gen_random_uuid() primary key,
  client_id           uuid        references public.profiles(id) on delete cascade not null,
  uploaded_by         uuid        references public.profiles(id) not null,
  name                text        not null,
  file_path           text        not null,
  file_type           text        not null,
  file_size           bigint      not null,
  category            text        not null check (category in (
                        'Bank Statement', 'Invoice', 'Tax Certificate',
                        'ID Document', 'AFS', 'Management Accounts',
                        'SARS Returns', 'Payroll', 'Other'
                      )),
  year                integer     not null,
  status              text        not null default 'Received' check (status in (
                        'Received', 'Under Review', 'Processed', 'Requires Action'
                      )),
  is_resubmission     boolean     default false,
  original_doc_id     uuid        references public.documents(id),
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- ---------------------------------------------------------------
-- 3. DOCUMENT COMMENTS
-- ---------------------------------------------------------------
create table if not exists public.document_comments (
  id          uuid        default gen_random_uuid() primary key,
  document_id uuid        references public.documents(id) on delete cascade not null,
  author_id   uuid        references public.profiles(id) not null,
  content     text        not null,
  created_at  timestamptz default now()
);

-- ---------------------------------------------------------------
-- 4. NOTIFICATIONS
-- ---------------------------------------------------------------
create table if not exists public.notifications (
  id         uuid        default gen_random_uuid() primary key,
  user_id    uuid        references public.profiles(id) on delete cascade not null,
  type       text        not null,
  title      text        not null,
  body       text        not null,
  read       boolean     default false,
  link       text,
  metadata   jsonb,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------
-- 5. AUDIT LOG  (immutable — no deletes, no updates)
-- ---------------------------------------------------------------
create table if not exists public.audit_log (
  id            uuid        default gen_random_uuid() primary key,
  actor_id      uuid        references public.profiles(id),
  actor_email   text,
  action        text        not null,
  resource_type text        not null,
  resource_id   text,
  metadata      jsonb,
  created_at    timestamptz default now()
);

-- ---------------------------------------------------------------
-- 6. CLIENT NOTES  (admin-only, invisible to clients)
-- ---------------------------------------------------------------
create table if not exists public.client_notes (
  id          uuid        default gen_random_uuid() primary key,
  client_id   uuid        references public.profiles(id) on delete cascade not null,
  created_by  uuid        references public.profiles(id) not null,
  content     text        not null,
  created_at  timestamptz default now()
);

-- ---------------------------------------------------------------
-- STORAGE BUCKET
-- ---------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

-- Storage policies (service-role key bypasses these, but anon/signed URLs need them)
create policy "Authenticated users can upload their own documents"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'documents' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can read their own documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'documents' and
    (
      (storage.foldername(name))[1] = auth.uid()::text
      or exists (
        select 1 from public.profiles
        where id = auth.uid() and role = 'admin'
      )
    )
  );

create policy "Admin can delete documents"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'documents' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ---------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------

alter table public.profiles          enable row level security;
alter table public.documents         enable row level security;
alter table public.document_comments enable row level security;
alter table public.notifications     enable row level security;
alter table public.audit_log         enable row level security;
alter table public.client_notes      enable row level security;

-- Helper: is the calling user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles
create policy "Users can view own profile"
  on public.profiles for select using (id = auth.uid() or public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update using (id = auth.uid());

create policy "Admin can insert profiles"
  on public.profiles for insert with check (public.is_admin() or id = auth.uid());

create policy "Admin can delete profiles"
  on public.profiles for delete using (public.is_admin());

-- documents
create policy "Clients see own documents, admin sees all"
  on public.documents for select
  using (client_id = auth.uid() or public.is_admin());

create policy "Clients can insert own documents"
  on public.documents for insert
  with check (client_id = auth.uid() or public.is_admin());

create policy "Admin can update documents"
  on public.documents for update using (public.is_admin());

create policy "Admin can delete documents"
  on public.documents for delete using (public.is_admin());

-- document_comments
create policy "Users can see comments on their documents"
  on public.document_comments for select
  using (
    public.is_admin() or
    exists (select 1 from public.documents d where d.id = document_id and d.client_id = auth.uid())
  );

create policy "Admin can insert comments"
  on public.document_comments for insert
  with check (public.is_admin() or author_id = auth.uid());

-- notifications
create policy "Users see own notifications"
  on public.notifications for select using (user_id = auth.uid());

create policy "System can insert notifications"
  on public.notifications for insert with check (true);

create policy "Users can mark own notifications read"
  on public.notifications for update using (user_id = auth.uid());

-- audit_log
create policy "Admin can read audit log"
  on public.audit_log for select using (public.is_admin());

create policy "System can write audit log"
  on public.audit_log for insert with check (true);

-- client_notes
create policy "Admin can manage notes"
  on public.client_notes for all using (public.is_admin());

-- ---------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------
create index if not exists idx_documents_client_id   on public.documents(client_id);
create index if not exists idx_documents_status       on public.documents(status);
create index if not exists idx_documents_category     on public.documents(category);
create index if not exists idx_documents_year         on public.documents(year);
create index if not exists idx_notifications_user     on public.notifications(user_id, read);
create index if not exists idx_audit_log_created      on public.audit_log(created_at desc);
create index if not exists idx_comments_document      on public.document_comments(document_id);
