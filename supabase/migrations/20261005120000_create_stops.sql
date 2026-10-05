-- stops of the transit network
create table if not exists public.stops (
  id                    uuid primary key default gen_random_uuid(),
  name                  varchar(255) not null,
  image_url             varchar(255),
  is_transfer           boolean not null default false,
  x                     double precision not null,  -- horizontal position
  y                     double precision not null,  -- vertical position
  wheelchair_accessible boolean not null default false, -- step-free
  has_shelter           boolean not null default false,
  has_bench             boolean not null default false,
  has_ticket_machine    boolean not null default false,
  has_display           boolean not null default false  -- information display
);

-- anyone can read stops 
alter table public.stops enable row level security;

create policy "stops are readable by everyone"
  on public.stops for select
  using (true);
