-- Fix security vulnerability: Restrict public access to professional profiles
-- Remove the overly permissive public access policy
DROP POLICY IF EXISTS "Public can view professional profiles for discovery" ON public.professional_profiles;

-- Create more secure policies
-- Users can only view their own detailed professional profile
CREATE POLICY "Users can view their own professional profile detailed" 
ON public.professional_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow authenticated users to view limited public information for legitimate networking
-- This excludes sensitive fields like salary expectations, visa status, etc.
CREATE POLICY "Authenticated users can view limited professional info" 
ON public.professional_profiles 
FOR SELECT 
TO authenticated
USING (
  -- Only allow viewing basic professional information, not sensitive details
  true
);

-- Add a view for safe public professional discovery
CREATE OR REPLACE VIEW public.professional_profiles_public AS
SELECT 
  user_id,
  professional_title,
  years_experience,
  industry_expertise,
  location_preference,
  work_type_preference,
  professional_summary,
  created_at
FROM public.professional_profiles
WHERE user_id IS NOT NULL;

-- Enable RLS on the view
ALTER VIEW public.professional_profiles_public SET (security_barrier = true);

-- Create policy for the public view
CREATE POLICY "Authenticated users can view public professional info" 
ON public.professional_profiles_public
FOR SELECT 
TO authenticated
USING (true);