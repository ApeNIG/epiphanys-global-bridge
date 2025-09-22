-- Remove any existing check constraints on category
ALTER TABLE public.opportunities DROP CONSTRAINT IF EXISTS opportunities_category_check;

-- Update the opportunities table to allow the categories we're using in the form
-- No check constraint needed since we're controlling input through the form