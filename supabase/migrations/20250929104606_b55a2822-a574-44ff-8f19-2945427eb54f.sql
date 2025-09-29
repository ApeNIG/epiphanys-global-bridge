-- Fix professional_profiles table security issue
-- Remove overly permissive policies and implement privacy-aware access controls

-- First, drop ALL existing policies on professional_profiles table
DROP POLICY IF EXISTS "Users can view basic professional info of others" ON public.professional_profiles;
DROP POLICY IF EXISTS "Users can view their own professional profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Users can view their own professional profile detailed" ON public.professional_profiles;
DROP POLICY IF EXISTS "Users can insert their own professional profile" ON public.professional_profiles;
DROP POLICY IF EXISTS "Users can update their own professional profile" ON public.professional_profiles;

-- Create a security definer function to get filtered professional profile data
CREATE OR REPLACE FUNCTION public.get_filtered_professional_profile_data(
  profile_user_id uuid, 
  requesting_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  professional_record RECORD;
  privacy_record RECORD;
  is_connected BOOLEAN := false;
  is_own_profile BOOLEAN := false;
  filtered_data jsonb := '{}';
BEGIN
  -- Check if it's the user's own profile
  is_own_profile := (requesting_user_id = profile_user_id);
  
  -- Get professional profile data
  SELECT * INTO professional_record 
  FROM public.professional_profiles 
  WHERE user_id = profile_user_id;
  
  -- If no professional profile exists, return empty object
  IF NOT FOUND THEN
    RETURN '{}'::jsonb;
  END IF;
  
  -- Get privacy settings (with defaults if none exist)
  SELECT 
    COALESCE(profile_visibility, 'limited') as profile_visibility,
    COALESCE(professional_details_visible, false) as professional_details_visible
  INTO privacy_record
  FROM public.privacy_settings 
  WHERE user_id = profile_user_id;
  
  -- If no privacy settings exist, use restrictive defaults
  IF NOT FOUND THEN
    privacy_record.profile_visibility := 'limited';
    privacy_record.professional_details_visible := false;
  END IF;
  
  -- Check if users are connected
  IF requesting_user_id IS NOT NULL AND requesting_user_id != profile_user_id THEN
    SELECT EXISTS (
      SELECT 1 FROM public.connections 
      WHERE (user_id_1 = requesting_user_id AND user_id_2 = profile_user_id)
         OR (user_id_2 = requesting_user_id AND user_id_1 = profile_user_id)
    ) INTO is_connected;
  END IF;
  
  -- If it's their own profile, return everything
  IF is_own_profile THEN
    RETURN to_jsonb(professional_record);
  END IF;
  
  -- Apply privacy filters based on settings and connection status
  IF privacy_record.profile_visibility = 'private' AND NOT is_connected THEN
    -- Private profile, not connected: return very minimal info
    filtered_data := jsonb_build_object(
      'id', professional_record.id,
      'user_id', professional_record.user_id,
      'professional_title', professional_record.professional_title,
      'core_skills', CASE 
        WHEN professional_record.core_skills IS NOT NULL AND array_length(professional_record.core_skills, 1) > 0
        THEN array_to_json(professional_record.core_skills[1:3])::jsonb  -- First 3 skills only
        ELSE NULL
      END
    );
  ELSIF privacy_record.profile_visibility = 'limited' OR (privacy_record.profile_visibility = 'private' AND is_connected) THEN
    -- Limited profile or private but connected: return basic professional info
    filtered_data := jsonb_build_object(
      'id', professional_record.id,
      'user_id', professional_record.user_id,
      'professional_title', professional_record.professional_title,
      'years_experience', professional_record.years_experience,
      'current_employment_status', professional_record.current_employment_status,
      'core_skills', professional_record.core_skills,
      'industry_expertise', professional_record.industry_expertise,
      'work_type_preference', professional_record.work_type_preference,
      'location_preference', professional_record.location_preference,
      'highest_qualification', professional_record.highest_qualification,
      'university_institution', professional_record.university_institution,
      'professional_summary', professional_record.professional_summary
    );
    
    -- Add professional details if allowed or connected
    IF privacy_record.professional_details_visible OR is_connected THEN
      filtered_data := filtered_data || jsonb_build_object(
        'certifications', professional_record.certifications,
        'languages_spoken', professional_record.languages_spoken,
        'key_achievements', professional_record.key_achievements,
        'professional_memberships', professional_record.professional_memberships,
        'portfolio_website', professional_record.portfolio_website
      );
    END IF;
  ELSE
    -- Public profile: return most info but still protect sensitive data
    filtered_data := to_jsonb(professional_record);
    
    -- Always remove highly sensitive information for non-owners
    filtered_data := filtered_data - 'salary_expectation' - 'visa_status' - 'security_clearance' 
                    - 'diversity_background' - 'accessibility_requirements'
                    - 'linkedin_profile' - 'interview_availability' - 'start_date_availability'
                    - 'notice_period' - 'willing_to_relocate' - 'references_available';
  END IF;
  
  RETURN filtered_data;
END;
$$;

-- Create new secure RLS policies for professional_profiles

-- 1. Users can insert their own professional profile
CREATE POLICY "Users can create their own professional profile"
ON public.professional_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Users can update their own professional profile  
CREATE POLICY "Users can edit their own professional profile"
ON public.professional_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 3. Users can view professional profiles based on privacy settings and connections
CREATE POLICY "Users can view professional profiles with privacy protection"
ON public.professional_profiles
FOR SELECT
TO authenticated
USING (
  -- Own profile: full access
  auth.uid() = user_id
  OR
  -- Other profiles: check privacy settings
  (
    auth.uid() IS NOT NULL 
    AND
    (
      -- Public profiles are viewable by all authenticated users
      EXISTS (
        SELECT 1 FROM public.privacy_settings ps
        WHERE ps.user_id = professional_profiles.user_id 
        AND ps.profile_visibility = 'public'
      )
      OR
      -- Limited profiles are viewable by all authenticated users (with filtering)
      EXISTS (
        SELECT 1 FROM public.privacy_settings ps
        WHERE ps.user_id = professional_profiles.user_id 
        AND ps.profile_visibility = 'limited'
      )
      OR
      -- Private profiles are only viewable by connected users
      (
        EXISTS (
          SELECT 1 FROM public.privacy_settings ps
          WHERE ps.user_id = professional_profiles.user_id 
          AND ps.profile_visibility = 'private'
        )
        AND
        EXISTS (
          SELECT 1 FROM public.connections c
          WHERE (c.user_id_1 = auth.uid() AND c.user_id_2 = professional_profiles.user_id)
             OR (c.user_id_2 = auth.uid() AND c.user_id_1 = professional_profiles.user_id)
        )
      )
      OR
      -- Default for users without privacy settings: treat as limited
      NOT EXISTS (
        SELECT 1 FROM public.privacy_settings ps
        WHERE ps.user_id = professional_profiles.user_id
      )
    )
  )
);

-- Add helpful indexes for performance
CREATE INDEX IF NOT EXISTS idx_professional_profiles_user_id 
ON public.professional_profiles (user_id);

-- Ensure RLS is enabled
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;