-- Deactivate all opportunities with deadlines that have passed
UPDATE public.opportunities 
SET is_active = false, updated_at = now()
WHERE deadline < CURRENT_DATE AND is_active = true;