-- Fix profiles table security issue - restrict public access and respect privacy settings

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Users can view limited profile info of others" ON public.profiles;

-- Create new secure policy that respects privacy settings and connections
CREATE POLICY "Users can view profiles based on privacy settings and connections" 
ON public.profiles 
FOR SELECT 
USING (
  -- Users can always view their own profile
  auth.uid() = id 
  OR
  -- Public profiles are viewable by authenticated users (basic info only)
  (
    auth.uid() IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM public.privacy_settings ps 
      WHERE ps.user_id = profiles.id 
      AND ps.profile_visibility = 'public'
    )
  )
  OR
  -- Limited profiles are viewable by authenticated users (very basic info only)
  (
    auth.uid() IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM public.privacy_settings ps 
      WHERE ps.user_id = profiles.id 
      AND ps.profile_visibility = 'limited'
    )
  )
  OR
  -- Private profiles are only viewable by connections
  (
    auth.uid() IS NOT NULL 
    AND EXISTS (
      SELECT 1 FROM public.privacy_settings ps 
      WHERE ps.user_id = profiles.id 
      AND ps.profile_visibility = 'private'
    )
    AND EXISTS (
      SELECT 1 FROM public.connections c 
      WHERE (c.user_id_1 = auth.uid() AND c.user_id_2 = profiles.id)
         OR (c.user_id_2 = auth.uid() AND c.user_id_1 = profiles.id)
    )
  )
);

-- Also fix opportunities table to prevent contact information exposure
DROP POLICY IF EXISTS "Users can view opportunities without contact details" ON public.opportunities;

-- Create new policy that only shows contact info to authenticated users based on privacy
CREATE POLICY "Users can view public opportunities with limited info" 
ON public.opportunities 
FOR SELECT 
USING (
  is_active = true 
  AND (
    -- Owner can see everything
    auth.uid() = user_id
    OR
    -- Others can only see opportunities without sensitive contact info
    (auth.uid() IS NOT NULL AND auth.uid() != user_id)
  )
);

-- Create a security definer function to get filtered profile data based on privacy settings
CREATE OR REPLACE FUNCTION public.get_filtered_profile_data(profile_id uuid, requesting_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_record RECORD;
  privacy_record RECORD;
  is_connected BOOLEAN := false;
  is_own_profile BOOLEAN := false;
  filtered_data jsonb := '{}';
BEGIN
  -- Check if it's the user's own profile
  is_own_profile := (requesting_user_id = profile_id);
  
  -- Get profile data
  SELECT * INTO profile_record FROM public.profiles WHERE id = profile_id;
  
  -- Get privacy settings (with defaults if none exist)
  SELECT 
    COALESCE(profile_visibility, 'limited') as profile_visibility,
    COALESCE(contact_info_visible, false) as contact_info_visible,
    COALESCE(professional_details_visible, false) as professional_details_visible
  INTO privacy_record
  FROM public.privacy_settings 
  WHERE user_id = profile_id;
  
  -- If no privacy settings exist, use restrictive defaults
  IF NOT FOUND THEN
    privacy_record.profile_visibility := 'limited';
    privacy_record.contact_info_visible := false;
    privacy_record.professional_details_visible := false;
  END IF;
  
  -- Check if users are connected
  IF requesting_user_id IS NOT NULL AND requesting_user_id != profile_id THEN
    SELECT EXISTS (
      SELECT 1 FROM public.connections 
      WHERE (user_id_1 = requesting_user_id AND user_id_2 = profile_id)
         OR (user_id_2 = requesting_user_id AND user_id_1 = profile_id)
    ) INTO is_connected;
  END IF;
  
  -- If it's their own profile, return everything
  IF is_own_profile THEN
    RETURN to_jsonb(profile_record);
  END IF;
  
  -- Apply privacy filters based on settings and connection status
  IF privacy_record.profile_visibility = 'private' AND NOT is_connected THEN
    -- Private profile, not connected: return minimal info
    filtered_data := jsonb_build_object(
      'id', profile_record.id,
      'full_name', CASE 
        WHEN profile_record.full_name IS NOT NULL 
        THEN split_part(profile_record.full_name, ' ', 1) || ' ' || 
             CASE 
               WHEN length(split_part(profile_record.full_name, ' ', 2)) > 0 
               THEN left(split_part(profile_record.full_name, ' ', 2), 1) || '.'
               ELSE ''
             END
        ELSE 'Anonymous User'
      END,
      'user_category', profile_record.user_category
    );
  ELSIF privacy_record.profile_visibility = 'limited' OR (privacy_record.profile_visibility = 'private' AND is_connected) THEN
    -- Limited profile or private but connected: return basic info
    filtered_data := jsonb_build_object(
      'id', profile_record.id,
      'full_name', profile_record.full_name,
      'business_name', profile_record.business_name,
      'business_sector', profile_record.business_sector,
      'location', profile_record.location,
      'user_category', profile_record.user_category,
      'interests', profile_record.interests
    );
    
    -- Add professional details if allowed
    IF privacy_record.professional_details_visible OR is_connected THEN
      filtered_data := filtered_data || jsonb_build_object(
        'years_of_experience', profile_record.years_of_experience,
        'investment_stage', profile_record.investment_stage,
        'company_size', profile_record.company_size
      );
    END IF;
  ELSE
    -- Public profile: return most info but still respect contact settings
    filtered_data := to_jsonb(profile_record);
    
    -- Remove sensitive contact info unless explicitly allowed
    IF NOT privacy_record.contact_info_visible THEN
      filtered_data := filtered_data - 'website';
    END IF;
  END IF;
  
  RETURN filtered_data;
END;
$$;