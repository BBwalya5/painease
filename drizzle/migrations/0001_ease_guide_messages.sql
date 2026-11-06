CREATE TABLE public.guide_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  message_id text NOT NULL,
  role text NOT NULL,
  message jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, message_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guide_messages TO authenticated;
GRANT ALL ON public.guide_messages TO service_role;
ALTER TABLE public.guide_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own guide select" ON public.guide_messages FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own guide insert" ON public.guide_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own guide update" ON public.guide_messages FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own guide delete" ON public.guide_messages FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX guide_messages_user_created ON public.guide_messages (user_id, created_at);