-- Ensure new users have default privacy settings for profile visibility
-- This ensures new user profiles are discoverable in the network section

-- Create a trigger to automatically create default privacy settings for new users
CREATE OR REPLACE FUNCTION public.create_default_privacy_settings()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create default privacy settings for new users
  INSERT INTO public.privacy_settings (user_id, profile_visibility, contact_info_visible, professional_details_visible)
  VALUES (
    NEW.id,
    'limited',  -- Make profiles discoverable by default but with limited info
    false,      -- Keep contact info private initially
    false       -- Keep professional details private initially
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;

-- Create trigger to automatically set privacy settings when a profile is created
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.create_default_privacy_settings();

-- Update existing profiles without privacy settings to have default 'limited' visibility
INSERT INTO public.privacy_settings (user_id, profile_visibility, contact_info_visible, professional_details_visible)
SELECT 
  p.id,
  'limited' as profile_visibility,
  false as contact_info_visible,
  false as professional_details_visible
FROM public.profiles p
LEFT JOIN public.privacy_settings ps ON p.id = ps.user_id
WHERE ps.user_id IS NULL
ON CONFLICT (user_id) DO NOTHING;