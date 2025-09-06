-- Fix security issues by adding proper RLS policies to tables that need them

-- Remove unnecessary tables that appear to be created by mistake
DROP TABLE IF EXISTS public."Opportunity Hub";
DROP TABLE IF EXISTS public."Sign in";

-- Ensure profiles table has the created_at column with proper default
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now();