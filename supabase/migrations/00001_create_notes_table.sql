create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  created_at timestamptz default now()
);

alter table notes enable row level security;

create policy "public insert notes" on notes for insert to public with check (length(content) <= 200);
create policy "public select notes" on notes for select to public using (true);