CREATE TYPE public.app_role AS ENUM ('admin', 'professional', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- every new account gets the basic user role
CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created_role AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.assign_default_role();
INSERT INTO public.user_roles (user_id, role) SELECT id, 'user' FROM auth.users ON CONFLICT DO NOTHING;

-- audit log
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  action text NOT NULL,
  target text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read audit" ON public.audit_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.write_audit(_action text, _target text, _details jsonb)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  INSERT INTO public.audit_logs (actor_id, action, target, details) VALUES (auth.uid(), _action, _target, coalesce(_details, '{}'::jsonb));
$$;
REVOKE EXECUTE ON FUNCTION public.write_audit(text, text, jsonb) FROM PUBLIC, anon, authenticated;

-- Ease Library content
CREATE TABLE public.library_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  kind text NOT NULL DEFAULT 'Article',
  summary text,
  body text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.library_articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.library_articles TO authenticated;
GRANT ALL ON public.library_articles TO service_role;
ALTER TABLE public.library_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "published articles public" ON public.library_articles FOR SELECT TO anon, authenticated USING (published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins insert articles" ON public.library_articles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update articles" ON public.library_articles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete articles" ON public.library_articles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER library_touch BEFORE UPDATE ON public.library_articles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- healthcare facility directory
CREATE TABLE public.health_facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  facility_type text NOT NULL DEFAULT 'Health centre',
  province text,
  district text,
  town text,
  address text,
  phone text,
  services text[] NOT NULL DEFAULT '{}',
  verified boolean NOT NULL DEFAULT false,
  verified_by uuid,
  verified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.health_facilities TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.health_facilities TO authenticated;
GRANT ALL ON public.health_facilities TO service_role;
ALTER TABLE public.health_facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "verified facilities public" ON public.health_facilities FOR SELECT TO anon, authenticated USING (verified OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins insert facilities" ON public.health_facilities FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update facilities" ON public.health_facilities FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete facilities" ON public.health_facilities FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER facilities_touch BEFORE UPDATE ON public.health_facilities FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- professional profiles
CREATE TABLE public.professional_profiles (
  user_id uuid PRIMARY KEY,
  full_name text NOT NULL,
  profession text NOT NULL,
  license_number text NOT NULL,
  licensing_body text,
  facility text,
  province text,
  district text,
  services text[] NOT NULL DEFAULT '{}',
  bio text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  review_note text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.professional_profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.professional_profiles TO authenticated;
GRANT ALL ON public.professional_profiles TO service_role;
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "approved pros public" ON public.professional_profiles FOR SELECT TO anon, authenticated USING (status = 'approved' OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "own pro insert" ON public.professional_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own pro update" ON public.professional_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own pro delete" ON public.professional_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- applicants can never approve themselves; credential edits send them back for review
CREATE OR REPLACE FUNCTION public.guard_professional_status()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF current_setting('app.pro_review', true) = 'on' THEN
    NEW.updated_at := now();
    RETURN NEW;
  END IF;
  IF TG_OP = 'INSERT' THEN
    NEW.status := 'pending'; NEW.review_note := NULL; NEW.reviewed_by := NULL; NEW.reviewed_at := NULL;
  ELSE
    NEW.status := OLD.status; NEW.review_note := OLD.review_note; NEW.reviewed_by := OLD.reviewed_by; NEW.reviewed_at := OLD.reviewed_at;
    IF NEW.license_number IS DISTINCT FROM OLD.license_number OR NEW.profession IS DISTINCT FROM OLD.profession
       OR NEW.licensing_body IS DISTINCT FROM OLD.licensing_body OR NEW.full_name IS DISTINCT FROM OLD.full_name THEN
      NEW.status := 'pending'; NEW.reviewed_by := NULL; NEW.reviewed_at := NULL;
      DELETE FROM public.user_roles WHERE user_id = NEW.user_id AND role = 'professional';
    END IF;
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER professional_status_guard BEFORE INSERT OR UPDATE ON public.professional_profiles FOR EACH ROW EXECUTE FUNCTION public.guard_professional_status();

CREATE OR REPLACE FUNCTION public.admin_review_professional(_user_id uuid, _approve boolean, _note text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  PERFORM set_config('app.pro_review', 'on', true);
  UPDATE public.professional_profiles
     SET status = CASE WHEN _approve THEN 'approved' ELSE 'rejected' END,
         review_note = _note, reviewed_by = auth.uid(), reviewed_at = now()
   WHERE user_id = _user_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'No application found'; END IF;
  PERFORM set_config('app.pro_review', 'off', true);
  IF _approve THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, 'professional') ON CONFLICT DO NOTHING;
  ELSE
    DELETE FROM public.user_roles WHERE user_id = _user_id AND role = 'professional';
  END IF;
  PERFORM public.write_audit(CASE WHEN _approve THEN 'professional.approved' ELSE 'professional.rejected' END, _user_id::text, jsonb_build_object('note', _note));
END $$;

CREATE OR REPLACE FUNCTION public.admin_set_role(_user_id uuid, _role public.app_role, _grant boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  IF _role = 'professional' THEN RAISE EXCEPTION 'Professional access is granted by approving an application'; END IF;
  IF NOT _grant AND _role = 'admin' AND _user_id = auth.uid() THEN RAISE EXCEPTION 'You cannot remove your own admin access'; END IF;
  IF _grant THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (_user_id, _role) ON CONFLICT DO NOTHING;
  ELSE
    DELETE FROM public.user_roles WHERE user_id = _user_id AND role = _role;
  END IF;
  PERFORM public.write_audit(CASE WHEN _grant THEN 'role.granted' ELSE 'role.removed' END, _user_id::text, jsonb_build_object('role', _role));
END $$;

CREATE OR REPLACE FUNCTION public.admin_list_users()
RETURNS TABLE (id uuid, email text, full_name text, created_at timestamptz, last_sign_in_at timestamptz, roles text[], entry_count bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  RETURN QUERY
  SELECT u.id, u.email::text, p.full_name, u.created_at, u.last_sign_in_at,
         coalesce((SELECT array_agg(r.role::text ORDER BY r.role) FROM public.user_roles r WHERE r.user_id = u.id), '{}'),
         (SELECT count(*) FROM public.pain_entries e WHERE e.user_id = u.id)
    FROM auth.users u LEFT JOIN public.profiles p ON p.id = u.id
   ORDER BY u.created_at DESC;
END $$;

CREATE OR REPLACE FUNCTION public.admin_stats()
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
  RETURN jsonb_build_object(
    'users', (SELECT count(*) FROM auth.users),
    'users_7d', (SELECT count(*) FROM auth.users WHERE created_at > now() - interval '7 days'),
    'active_7d', (SELECT count(*) FROM auth.users WHERE last_sign_in_at > now() - interval '7 days'),
    'admins', (SELECT count(*) FROM public.user_roles WHERE role = 'admin'),
    'professionals_approved', (SELECT count(*) FROM public.professional_profiles WHERE status = 'approved'),
    'professionals_pending', (SELECT count(*) FROM public.professional_profiles WHERE status = 'pending'),
    'entries', (SELECT count(*) FROM public.pain_entries),
    'entries_7d', (SELECT count(*) FROM public.pain_entries WHERE created_at > now() - interval '7 days'),
    'guide_messages', (SELECT count(*) FROM public.guide_messages),
    'guide_messages_7d', (SELECT count(*) FROM public.guide_messages WHERE created_at > now() - interval '7 days'),
    'articles_published', (SELECT count(*) FROM public.library_articles WHERE published),
    'articles_draft', (SELECT count(*) FROM public.library_articles WHERE NOT published),
    'facilities_verified', (SELECT count(*) FROM public.health_facilities WHERE verified),
    'facilities_unverified', (SELECT count(*) FROM public.health_facilities WHERE NOT verified)
  );
END $$;

-- audit content changes made by admins
CREATE OR REPLACE FUNCTION public.audit_content_change()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE rec jsonb;
BEGIN
  rec := to_jsonb(coalesce(NEW, OLD));
  PERFORM public.write_audit(TG_TABLE_NAME || '.' || lower(TG_OP), rec->>'id', jsonb_build_object('name', coalesce(rec->>'title', rec->>'name'), 'published', rec->'published', 'verified', rec->'verified'));
  RETURN coalesce(NEW, OLD);
END $$;
CREATE TRIGGER library_audit AFTER INSERT OR UPDATE OR DELETE ON public.library_articles FOR EACH ROW EXECUTE FUNCTION public.audit_content_change();
CREATE TRIGGER facilities_audit AFTER INSERT OR UPDATE OR DELETE ON public.health_facilities FOR EACH ROW EXECUTE FUNCTION public.audit_content_change();

REVOKE EXECUTE ON FUNCTION public.admin_review_professional(uuid, boolean, text), public.admin_set_role(uuid, public.app_role, boolean), public.admin_list_users(), public.admin_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_review_professional(uuid, boolean, text), public.admin_set_role(uuid, public.app_role, boolean), public.admin_list_users(), public.admin_stats(), public.has_role(uuid, public.app_role) TO authenticated;