-- Consultation Templates (reusable question sets)
create table if not exists ms_consultation_templates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz default now()
);

-- Questions within templates
create table if not exists ms_consultation_questions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references ms_consultation_templates(id) on delete cascade,
  section text,
  question text not null,
  type text default 'textarea', -- 'text' | 'textarea' | 'select' | 'radio' | 'scale'
  options jsonb,                 -- ["Option A", "Option B"] for select/radio
  order_index integer default 0,
  required boolean default false,
  created_at timestamptz default now()
);

-- Consultation Sessions (one per artist meeting)
create table if not exists ms_consultation_sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist_name text not null,
  email text,
  phone text,
  notes text,
  status text default 'active', -- 'active' | 'completed' | 'archived'
  template_id uuid references ms_consultation_templates(id) on delete set null,
  created_at timestamptz default now()
);

-- Responses per session per question
create table if not exists ms_consultation_responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references ms_consultation_sessions(id) on delete cascade,
  question_id uuid not null references ms_consultation_questions(id) on delete cascade,
  answer text,
  updated_at timestamptz default now(),
  unique(session_id, question_id)
);

-- ─── Default Template: Artist Development Consultation ───────────────────────

insert into ms_consultation_templates (id, title, description)
values (
  'a0000000-0000-0000-0000-000000000001',
  'Artist Development Consultation',
  'Foundation questionnaire for new artist development clients. Covers identity, situation, audience, content, monetization, vision, and blockers.'
);

-- Section 1: Identity & Positioning
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'What is your artist name and why did you choose it?', 'textarea', 1),
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'How would you describe your sound in 1–2 sentences?', 'textarea', 2),
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'Which artists do you feel closest to stylistically? (include actual peers, not just big names)', 'textarea', 3),
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'What makes you different from other artists in your lane?', 'textarea', 4),
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'If someone listens to you once, what should they remember?', 'textarea', 5),
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'What emotion do you want people to feel when they hear your music?', 'textarea', 6),
('a0000000-0000-0000-0000-000000000001', 'Identity & Positioning', 'Does your current branding reflect who you really are? Why or why not?', 'textarea', 7);

-- Section 2: Current Situation
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'How many songs have you released?', 'text', 8),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'What are your top 3 songs right now?', 'textarea', 9),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'What platforms are you most active on?', 'textarea', 10),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'How often do you release music?', 'text', 11),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'How often do you post content?', 'text', 12),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'What has performed best for you so far?', 'textarea', 13),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'Where are most of your listeners located? (city-level if possible)', 'textarea', 14),
('a0000000-0000-0000-0000-000000000001', 'Current Situation', 'Do you currently collect any fan data (emails, phone numbers, etc.)?', 'textarea', 15);

-- Section 3: Audience & Local Strategy
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'Where do most of your fans physically live?', 'textarea', 16),
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'Have you ever performed live? Where and how often?', 'textarea', 17),
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'Do you know any of your fans personally?', 'textarea', 18),
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'Have you ever tried to gather fan contact info directly?', 'textarea', 19),
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'If you had 100 true fans in one city, what would you do with them?', 'textarea', 20),
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'Are you collaborating with artists in your local scene?', 'textarea', 21),
('a0000000-0000-0000-0000-000000000001', 'Audience & Local Strategy', 'Who are 3 artists in your city you should be working with but aren''t?', 'textarea', 22);

-- Section 4: Content & Growth
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Content & Growth', 'What type of content do you currently post? (music, lifestyle, performance, etc.)', 'textarea', 23),
('a0000000-0000-0000-0000-000000000001', 'Content & Growth', 'Do you have a content strategy or do you post randomly?', 'textarea', 24),
('a0000000-0000-0000-0000-000000000001', 'Content & Growth', 'What kind of content has gotten the most engagement?', 'textarea', 25),
('a0000000-0000-0000-0000-000000000001', 'Content & Growth', 'Do you feel comfortable on camera?', 'text', 26),
('a0000000-0000-0000-0000-000000000001', 'Content & Growth', 'How many pieces of content do you post per week?', 'text', 27),
('a0000000-0000-0000-0000-000000000001', 'Content & Growth', 'Do you document your process or only finished results?', 'textarea', 28);

-- Section 5: Monetization & Infrastructure
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Monetization & Infrastructure', 'Are you currently making money from your music?', 'text', 29),
('a0000000-0000-0000-0000-000000000001', 'Monetization & Infrastructure', 'If yes, where does it come from? (streams, shows, merch, etc.)', 'textarea', 30),
('a0000000-0000-0000-0000-000000000001', 'Monetization & Infrastructure', 'Do you have any system to sell directly to fans?', 'textarea', 31),
('a0000000-0000-0000-0000-000000000001', 'Monetization & Infrastructure', 'Do you have a website or landing page?', 'text', 32),
('a0000000-0000-0000-0000-000000000001', 'Monetization & Infrastructure', 'Do you have a way to contact your fans without social media?', 'textarea', 33);

-- Section 6: Vision & Goals
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Vision & Goals', 'Where do you want to be in 6 months?', 'textarea', 34),
('a0000000-0000-0000-0000-000000000001', 'Vision & Goals', 'Where do you want to be in 1 year?', 'textarea', 35),
('a0000000-0000-0000-0000-000000000001', 'Vision & Goals', 'What does success actually look like for you?', 'textarea', 36),
('a0000000-0000-0000-0000-000000000001', 'Vision & Goals', 'Do you want fame, money, creative freedom, or something else?', 'textarea', 37),
('a0000000-0000-0000-0000-000000000001', 'Vision & Goals', 'What are you currently struggling with the most?', 'textarea', 38);

-- Section 7: Constraints & Blockers
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Constraints & Blockers', 'What is currently stopping you from growing faster?', 'textarea', 39),
('a0000000-0000-0000-0000-000000000001', 'Constraints & Blockers', 'Do you have budget to invest in your career?', 'textarea', 40),
('a0000000-0000-0000-0000-000000000001', 'Constraints & Blockers', 'How much time do you dedicate weekly to music?', 'text', 41),
('a0000000-0000-0000-0000-000000000001', 'Constraints & Blockers', 'Do you work alone or with a team?', 'text', 42),
('a0000000-0000-0000-0000-000000000001', 'Constraints & Blockers', 'What have you tried that didn''t work?', 'textarea', 43);

-- Section 8: Strategist Questions
insert into ms_consultation_questions (template_id, section, question, type, order_index) values
('a0000000-0000-0000-0000-000000000001', 'Strategist Questions', 'If I gave you 1,000 real fans in your city, what would break in your current system?', 'textarea', 44),
('a0000000-0000-0000-0000-000000000001', 'Strategist Questions', 'What do you think is your biggest missed opportunity right now?', 'textarea', 45),
('a0000000-0000-0000-0000-000000000001', 'Strategist Questions', 'Why do you think you haven''t grown as fast as you expected?', 'textarea', 46),
('a0000000-0000-0000-0000-000000000001', 'Strategist Questions', 'If we worked together, what would success look like to you?', 'textarea', 47);
