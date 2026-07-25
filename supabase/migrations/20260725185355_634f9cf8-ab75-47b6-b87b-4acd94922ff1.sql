ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS batch smallint NOT NULL DEFAULT 2;
UPDATE public.registrations SET batch = 1 WHERE created_at < now();
ALTER TABLE public.registrations ADD CONSTRAINT registrations_batch_check CHECK (batch IN (1,2));