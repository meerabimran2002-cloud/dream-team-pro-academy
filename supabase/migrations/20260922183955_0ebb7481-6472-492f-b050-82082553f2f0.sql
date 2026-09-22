ALTER TABLE public.feedback
ADD COLUMN is_approved boolean NOT NULL DEFAULT false;

UPDATE public.feedback
SET is_approved = true;

GRANT SELECT ON public.feedback TO anon;
GRANT UPDATE (is_approved) ON public.feedback TO authenticated;

CREATE POLICY "Anyone can view approved feedback"
ON public.feedback
FOR SELECT
TO anon
USING (is_approved = true);

CREATE POLICY "Admins can moderate feedback"
ON public.feedback
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));