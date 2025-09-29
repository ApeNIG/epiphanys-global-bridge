-- Improve security for consultation_requests table
-- Ensure only admins/staff and original submitters can view their data

-- Drop existing SELECT policies to recreate them more securely
DROP POLICY IF EXISTS "Admin and staff can view all consultation requests" ON consultation_requests;
DROP POLICY IF EXISTS "Users can view their own consultation requests" ON consultation_requests;

-- Create a security definer function to check if user can view a consultation request
CREATE OR REPLACE FUNCTION public.can_view_consultation_request(request_email text, requesting_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email text;
BEGIN
  -- Check if user is admin or staff first
  IF is_admin_or_staff(requesting_user_id) THEN
    RETURN true;
  END IF;
  
  -- Check if the requesting user's email matches the consultation request email
  SELECT au.email INTO user_email
  FROM auth.users au
  WHERE au.id = requesting_user_id;
  
  -- Return true if emails match (case insensitive)
  RETURN (LOWER(user_email) = LOWER(request_email));
END;
$$;

-- Create secure RLS policies for consultation_requests

-- Policy for SELECT: Only admins/staff can view all, users can view their own
CREATE POLICY "Secure consultation requests access"
ON consultation_requests FOR SELECT
TO authenticated
USING (can_view_consultation_request(email, auth.uid()));

-- Policy for anonymous users to view their own requests (by email verification)
CREATE POLICY "Anonymous users can view their own consultation requests"
ON consultation_requests FOR SELECT
TO anon
USING (false); -- Disable anonymous access for security

-- Ensure other policies remain secure
-- Keep the existing INSERT policy for public submissions
-- Keep existing admin/staff UPDATE and DELETE policies

-- Add index for better performance on email lookups
CREATE INDEX IF NOT EXISTS idx_consultation_requests_email ON consultation_requests(email);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);