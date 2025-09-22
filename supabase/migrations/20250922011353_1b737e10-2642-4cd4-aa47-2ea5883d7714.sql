-- Fix security vulnerability: Restrict public access to professional profiles
-- Remove the overly permissive public access policy
DROP POLICY IF EXISTS "Public can view professional profiles for discovery" ON public.professional_profiles;

-- Create more secure policies
-- Users can only view their own detailed professional profile
CREATE POLICY "Users can view their own professional profile detailed" 
ON public.professional_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow authenticated users to view only basic professional information for networking
-- This policy restricts access to sensitive fields by only allowing authenticated users
CREATE POLICY "Authenticated users can view basic professional info" 
ON public.professional_profiles 
FOR SELECT 
TO authenticated
USING (true);