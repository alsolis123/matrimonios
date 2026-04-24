create extension if not exists pgcrypto;

create type public.gender as enum ('man', 'woman');
create type public.submission_status as enum ('in_progress', 'completed');

create table public.categories (
  id text primary key,
  title text not null unique,
  description text not null,
  sort_order integer not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.question_sets (
  id uuid primary key default gen_random_uuid(),
  key public.gender not null unique,
  title text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  question_set_id uuid not null references public.question_sets(id) on delete cascade,
  category_id text not null references public.categories(id) on delete restrict,
  prompt text not null,
  order_in_survey integer not null,
  order_in_category integer not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  unique (question_set_id, order_in_survey),
  unique (question_set_id, category_id, order_in_category)
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null default gen_random_uuid() unique,
  audience public.gender not null,
  status public.submission_status not null default 'completed',
  started_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz not null default timezone('utc', now()),
  user_agent text,
  ip_hash text
);

create table public.answers (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete restrict,
  score integer not null check (score between 1 and 5),
  created_at timestamptz not null default timezone('utc', now()),
  unique (submission_id, question_id)
);

create index questions_question_set_order_idx
  on public.questions (question_set_id, order_in_survey);

create index questions_category_idx
  on public.questions (category_id);

create index submissions_audience_idx
  on public.submissions (audience);

create index submissions_completed_at_idx
  on public.submissions (completed_at desc);

create index answers_submission_idx
  on public.answers (submission_id);

create index answers_question_idx
  on public.answers (question_id);

alter table public.categories enable row level security;
alter table public.question_sets enable row level security;
alter table public.questions enable row level security;
alter table public.submissions enable row level security;
alter table public.answers enable row level security;

create policy "public can read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);

create policy "public can read question sets"
  on public.question_sets
  for select
  to anon, authenticated
  using (is_active = true);

create policy "public can read active questions"
  on public.questions
  for select
  to anon, authenticated
  using (is_active = true);

create policy "public can create submissions"
  on public.submissions
  for insert
  to anon, authenticated
  with check (status in ('in_progress', 'completed'));

create policy "public can create answers"
  on public.answers
  for insert
  to anon, authenticated
  with check (score between 1 and 5);

comment on table public.categories is 'Survey result categories shared across the men and women question sets.';
comment on table public.question_sets is 'Active survey variants. Phase 1 uses one set for men and one set for women.';
comment on table public.questions is 'Question catalog tied to a question set and category.';
comment on table public.submissions is 'Anonymous participant submissions. No names or visible identifiers are stored.';
comment on table public.answers is 'Answers submitted per question with a 1-to-5 score.';
