-- Fix consultation_requests table security issues
-- Remove the problematic blocking policy and implement proper access controls

-- First, drop the existing problematic policies
DROP POLICY IF EXISTS "Allow consultation request submissions" ON public.consultation_requests;
DROP POLICY IF EXISTS "Block anonymous access to consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Users can update own basic info or staff can update status" ON public.consultation_requests;
DROP POLICY IF EXISTS "Users can view own requests or staff can view all" ON public.consultation_requests;

-- Create new secure policies
-- 1. Allow public submission of consultation requests (needed for the form)
CREATE POLICY "Allow public consultation submissions"
ON public.consultation_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Only authenticated users can view their own requests (matched by email)
CREATE POLICY "Users can view their own consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (
  email = (
    SELECT au.email 
    FROM auth.users au 
    WHERE au.id = auth.uid()
  )
);

-- 3. Only admin/staff can view all consultation requests
CREATE POLICY "Admin and staff can view all consultation requests"
ON public.consultation_requests
FOR SELECT
TO authenticated
USING (is_admin_or_staff(auth.uid()));

-- 4. Only admin/staff can update consultation requests (e.g., status changes)
CREATE POLICY "Admin and staff can update consultation requests"
ON public.consultation_requests
FOR UPDATE
TO authenticated
USING (is_admin_or_staff(auth.uid()));

-- 5. Only admin/staff can delete consultation requests if needed
CREATE POLICY "Admin and staff can delete consultation requests"
ON public.consultation_requests
FOR DELETE
TO authenticated
USING (is_admin_or_staff(auth.uid()));

-- Add additional input validation constraints for security
ALTER TABLE public.consultation_requests 
ADD CONSTRAINT consultation_requests_email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.consultation_requests 
ADD CONSTRAINT consultation_requests_phone_length_check 
CHECK (char_length(phone) >= 7 AND char_length(phone) <= 20);

ALTER TABLE public.consultation_requests 
ADD CONSTRAINT consultation_requests_name_length_check 
CHECK (char_length(full_name) >= 2 AND char_length(full_name) <= 100);

-- Add an index for email lookups (performance)
CREATE INDEX IF NOT EXISTS idx_consultation_requests_email 
ON public.consultation_requests (email);

-- Add an index for status filtering (performance for admin views)
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status 
ON public.consultation_requests (status);

-- Ensure the table has proper row level security enabled
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;