ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS course text NOT NULL DEFAULT 'prompt_engineering';
UPDATE public.registrations SET course = 'prompt_engineering' WHERE course IS NULL;