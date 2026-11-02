-- users who can register and log in
create table if not exists public.users (
  id         uuid primary key default gen_random_uuid(),
  name       varchar(255) not null unique,  -- login name, unique so two users can't share it
  password   text not null,                 -- the argon2 hash, never the plain password
  created_at timestamptz not null default now()
);

-- rls on with no policies: the public key can't read or write users (password hashes!),
-- only the server can
alter table public.users enable row level security;
