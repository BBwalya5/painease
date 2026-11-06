CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  date_of_birth date,
  province text,
  district text,
  town text,
  conditions text[] NOT NULL DEFAULT '{}',
  pain_locations text[] NOT NULL DEFAULT '{}',
  symptoms text[] NOT NULL DEFAULT '{}',
  goals text,
  therapy_preferences text[] NOT NULL DEFAULT '{}',
  notify_checkin boolean NOT NULL DEFAULT true,
  notify_weekly boolean NOT NULL DEFAULT true,
  theme text NOT NULL DEFAULT 'system',
  cycle_tracking boolean NOT NULL DEFAULT false,
  consent_ai_insights boolean NOT NULL DEFAULT false,
  consent_research boolean NOT NULL DEFAULT false,
  consent_share_providers boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile delete" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.pain_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  regions jsonb NOT NULL DEFAULT '[]',
  max_intensity smallint NOT NULL DEFAULT 0 CHECK (max_intensity BETWEEN 0 AND 10),
  mood text,
  sleep_hours numeric(3,1),
  notes text CHECK (char_length(notes) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pain_entries TO authenticated;
GRANT ALL ON public.pain_entries TO service_role;
ALTER TABLE public.pain_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own entries select" ON public.pain_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own entries insert" ON public.pain_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own entries update" ON public.pain_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own entries delete" ON public.pain_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX pain_entries_user_time ON public.pain_entries (user_id, recorded_at DESC);