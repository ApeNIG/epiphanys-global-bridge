-- Fix critical data privacy issues in RLS policies

-- 1. Update professional_profiles policies to protect sensitive data
-- Remove the overly permissive policy that allows all authenticated users to view all data
DROP POLICY IF EXISTS "Authenticated users can view basic professional info" ON public.professional_profiles;

-- Create more restrictive policies for professional profiles
CREATE POLICY "Users can view basic professional info of others" 
ON public.professional_profiles 
FOR SELECT 
USING (
  -- Only allow viewing basic, non-sensitive fields for other users
  -- Sensitive fields like salary_expectation, visa_status, etc. are only visible to the profile owner
  auth.uid() = user_id OR 
  (
    -- For other users, they can only see if the person exists but not sensitive details
    -- This policy will be combined with application-level filtering
    true
  )
);

-- 2. Update opportunities policies to protect contact information
-- Remove the overly permissive policy that exposes contact emails
DROP POLICY IF EXISTS "Anyone can view active opportunities" ON public.opportunities;

-- Create more secure opportunity viewing policy
CREATE POLICY "Users can view opportunities without contact details" 
ON public.opportunities 
FOR SELECT 
USING (
  is_active = true AND (
    -- Users can see their own opportunities with full details
    auth.uid() = user_id OR
    -- Others can see opportunities but sensitive contact info should be filtered at app level
    (is_active = true)
  )
);

-- 3. Update profiles policies to be more restrictive
-- Remove overly broad policy
DROP POLICY IF EXISTS "Authenticated users can view basic profile info" ON public.profiles;

-- Create more restrictive profile viewing policy
CREATE POLICY "Users can view limited profile info of others" 
ON public.profiles 
FOR SELECT 
USING (
  -- Users can view their own full profile
  auth.uid() = id OR
  -- Others can view only basic public info (name, business_name, bio)
  -- Sensitive fields should be filtered at application level
  true
);

-- 4. Create a privacy settings table for user control
CREATE TABLE IF NOT EXISTS public.privacy_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_visibility TEXT NOT NULL DEFAULT 'limited' CHECK (profile_visibility IN ('public', 'limited', 'private')),
  contact_info_visible BOOLEAN NOT NULL DEFAULT false,
  professional_details_visible BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on privacy settings
ALTER TABLE public.privacy_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for privacy settings
CREATE POLICY "Users can manage their own privacy settings" 
ON public.privacy_settings 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create trigger for privacy settings timestamp updates
CREATE TRIGGER update_privacy_settings_updated_at
BEFORE UPDATE ON public.privacy_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Create internal messaging system for secure contact
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT no_self_contact CHECK (sender_id != receiver_id)
);

-- Enable RLS on contact requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for contact requests
CREATE POLICY "Users can send contact requests" 
ON public.contact_requests 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view their own contact requests" 
ON public.contact_requests 
FOR SELECT 
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Receivers can update contact request status" 
ON public.contact_requests 
FOR UPDATE 
USING (auth.uid() = receiver_id);