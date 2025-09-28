-- Add business_sector column to opportunities table
ALTER TABLE public.opportunities 
ADD COLUMN business_sector text;