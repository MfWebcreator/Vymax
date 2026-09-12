-- VEYROMAX DATABASE SCHEMA & RLS POLICIES

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  objective TEXT,
  level INT DEFAULT 1 NOT NULL,
  xp INT DEFAULT 0 NOT NULL,
  streak INT DEFAULT 0 NOT NULL,
  best_streak INT DEFAULT 0 NOT NULL,
  last_active_date DATE,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES public.profiles(id),
  free_analyses_left INT DEFAULT 1 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. PLANS
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY, -- 'FREE', 'PRO', 'PRO_PLUS', 'ELITE'
  name TEXT NOT NULL,
  price_monthly NUMERIC(10, 2) NOT NULL,
  checkin_interval_days INT DEFAULT 14 NOT NULL,
  ai_chat_limit INT DEFAULT 5 NOT NULL,
  features JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Seed Plans
INSERT INTO public.plans (id, name, price_monthly, checkin_interval_days, ai_chat_limit, features)
VALUES
  ('FREE', 'Free', 0.00, 0, 5, '{"analysis_limit": 1, "checkins": false}'::jsonb),
  ('PRO', 'Pro', 19.90, 14, -1, '{"analysis_limit": -1, "checkins": true}'::jsonb),
  ('PRO_PLUS', 'Pro+', 39.90, 14, -1, '{"analysis_limit": -1, "checkins": true, "plans_90_days": true}'::jsonb),
  ('ELITE', 'Elite', 79.90, 14, -1, '{"analysis_limit": -1, "checkins": true, "plans_180_days": true, "coach_ai": true}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 3. SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES public.plans(id),
  asaas_customer_id TEXT,
  asaas_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'inactive', -- 'active', 'past_due', 'canceled', 'expired'
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. PHOTOS
CREATE TABLE IF NOT EXISTS public.photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  photo_type TEXT NOT NULL DEFAULT 'initial', -- 'initial', 'checkin'
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. ANALYSES
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  photo_id UUID REFERENCES public.photos(id),
  current_score NUMERIC(3, 1) NOT NULL,
  potential_score NUMERIC(3, 1) NOT NULL,
  categories JSONB NOT NULL,
  strengths TEXT[] DEFAULT '{}' NOT NULL,
  opportunities TEXT[] DEFAULT '{}' NOT NULL,
  main_goal TEXT NOT NULL,
  recommendations JSONB DEFAULT '[]'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. ROUTINES
CREATE TABLE IF NOT EXISTS public.routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. ROUTINE_TASKS
CREATE TABLE IF NOT EXISTS public.routine_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES public.routines(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  period TEXT NOT NULL, -- 'morning', 'afternoon', 'night'
  duration_minutes INT DEFAULT 5 NOT NULL,
  difficulty TEXT DEFAULT 'Fácil' NOT NULL,
  xp_reward INT DEFAULT 15 NOT NULL,
  category TEXT NOT NULL,
  instructions JSONB DEFAULT '[]'::jsonb NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. COMPLETED_TASKS
CREATE TABLE IF NOT EXISTS public.completed_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES public.routine_tasks(id) ON DELETE CASCADE,
  completed_date DATE DEFAULT CURRENT_DATE NOT NULL,
  xp_earned INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_task_per_day UNIQUE (user_id, task_id, completed_date)
);

-- 9. CHECKINS
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  photo_id UUID REFERENCES public.photos(id),
  day_number INT NOT NULL,
  score NUMERIC(3, 1) NOT NULL,
  user_perceived_evolution TEXT, -- 'yes', 'a_little', 'not_yet'
  ai_comparison JSONB DEFAULT '{}'::jsonb NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'first_steps', 'consistency', 'missions', 'evolution', 'challenges'
  xp_reward INT DEFAULT 50 NOT NULL,
  is_secret BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Seed Initial Achievements
INSERT INTO public.achievements (slug, title, description, category, xp_reward, is_secret)
VALUES
  ('first_step', 'Primeiro Passo', 'Concluiu a análise inicial de apresentação.', 'first_steps', 50, false),
  ('started', 'Começou', 'Completou a primeira tarefa da rotina diária.', 'first_steps', 30, false),
  ('first_upgrade', 'Primeiro Upgrade', 'Atingiu o Nível 2 de evolução.', 'first_steps', 100, false),
  ('streak_7', '7 Dias Implacáveis', 'Manteve uma sequência de 7 dias consecutivos.', 'consistency', 150, false),
  ('streak_30', '30 Dias de Consistência', 'Manteve 30 dias ininterruptos de hábitos.', 'consistency', 400, false),
  ('streak_100', 'Imparável', 'Manteve 100 dias consecutivos de rotina.', 'consistency', 1000, false),
  ('missions_10', 'Foco Inicial', 'Concluiu 10 missões diárias.', 'missions', 100, false),
  ('missions_50', 'Determinado', 'Concluiu 50 missões diárias.', 'missions', 300, false),
  ('missions_100', 'Mestre dos Hábitos', 'Concluiu 100 missões diárias.', 'missions', 600, false),
  ('first_checkin', 'Primeira Evolução', 'Realizou o primeiro check-in quinzenal.', 'evolution', 200, false),
  ('secret_night_owl', 'Coruja da Noite', 'Concluiu a rotina da noite exatamente às 23:59.', 'consistency', 150, true)
ON CONFLICT (slug) DO NOTHING;

-- 11. USER_ACHIEVEMENTS
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_achievement UNIQUE (user_id, achievement_id)
);

-- 12. CHALLENGES
CREATE TABLE IF NOT EXISTS public.challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_days INT NOT NULL,
  xp_reward INT NOT NULL,
  tasks JSONB DEFAULT '[]'::jsonb NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Seed Initial Challenges
INSERT INTO public.challenges (title, description, duration_days, xp_reward, tasks)
VALUES
  ('Desafio 7 Dias de Postura & Skincare', '7 dias seguidos cumprindo skincare matinal e alinhamento postural diário.', 7, 250, '["Limpeza facial", "Protetor solar", "Exercício postural 3min"]'::jsonb),
  ('Desafio 30 Dias de Grooming & Cabelo', '30 dias mantendo penteado, hidratação e barba alinhada.', 30, 800, '["Alinhamento de barba/rosto", "Penteado estruturado", "Hidratação"]'::jsonb)
ON CONFLICT DO NOTHING;

-- 13. USER_CHALLENGES
CREATE TABLE IF NOT EXISTS public.user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  progress_days INT DEFAULT 0 NOT NULL,
  status TEXT DEFAULT 'in_progress' NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- 14. REFERRALS & REWARDS
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_referee UNIQUE (referee_id)
);

-- 15. AI CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  description TEXT NOT NULL,
  price NUMERIC(10, 2),
  affiliate_url TEXT NOT NULL,
  partner_name TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routine_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completed_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update only their own profile
CREATE POLICY "Profiles self access" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Photos: Users can manage only their own photos
CREATE POLICY "Photos self access" ON public.photos
  FOR ALL USING (auth.uid() = user_id);

-- Analyses: Users can view their own analyses
CREATE POLICY "Analyses self access" ON public.analyses
  FOR ALL USING (auth.uid() = user_id);

-- Routines & Tasks: Users can manage their own
CREATE POLICY "Routines self access" ON public.routines
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Routine tasks self access" ON public.routine_tasks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Completed tasks self access" ON public.completed_tasks
  FOR ALL USING (auth.uid() = user_id);

-- Checkins: Self access
CREATE POLICY "Checkins self access" ON public.checkins
  FOR ALL USING (auth.uid() = user_id);

-- Achievements & User Achievements
CREATE POLICY "Achievements read all" ON public.achievements
  FOR SELECT USING (true);

CREATE POLICY "User achievements self access" ON public.user_achievements
  FOR ALL USING (auth.uid() = user_id);

-- Challenges
CREATE POLICY "Challenges read active" ON public.challenges
  FOR SELECT USING (is_active = true);

CREATE POLICY "User challenges self access" ON public.user_challenges
  FOR ALL USING (auth.uid() = user_id);

-- Referrals
CREATE POLICY "Referrals self access" ON public.referrals
  FOR ALL USING (auth.uid() = referrer_id OR auth.uid() = referee_id);

-- AI Conversations & Messages
CREATE POLICY "AI Conversations self access" ON public.ai_conversations
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "AI Messages self access" ON public.ai_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.ai_conversations
      WHERE id = ai_messages.conversation_id AND user_id = auth.uid()
    )
  );

-- Products read all active
CREATE POLICY "Products read active" ON public.products
  FOR SELECT USING (is_active = true);
