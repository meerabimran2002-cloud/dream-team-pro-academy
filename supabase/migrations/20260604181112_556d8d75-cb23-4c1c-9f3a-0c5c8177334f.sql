
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  education_level TEXT NOT NULL,
  profession TEXT,
  ai_experience BOOLEAN NOT NULL DEFAULT false,
  motivation TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can view registrations" ON public.registrations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can delete registrations" ON public.registrations FOR DELETE TO authenticated USING (true);

CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.feedback TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedback TO authenticated;
GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit feedback" ON public.feedback FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can view feedback" ON public.feedback FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can delete feedback" ON public.feedback FOR DELETE TO authenticated USING (true);
