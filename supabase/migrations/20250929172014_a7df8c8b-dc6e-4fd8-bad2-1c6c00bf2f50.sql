-- Fix security vulnerability: Customer Contact Information Could Be Stolen
-- Properly clean up and recreate policies for consultation_requests table

-- First, drop ALL existing policies on consultation_requests to start fresh
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Get all policies for consultation_requests table
    FOR policy_record IN 
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE tablename = 'consultation_requests' AND schemaname = 'public'
    LOOP
        -- Drop each policy
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
            policy_record.policyname, 
            policy_record.schemaname, 
            policy_record.tablename);
    END LOOP;
END $$;

-- Create a highly secure public insert policy with comprehensive validation
CREATE POLICY "Validated public consultation submissions"
ON consultation_requests FOR INSERT
TO public
WITH CHECK (
  -- Ensure all required fields are present and not empty
  full_name IS NOT NULL AND trim(full_name) != '' AND
  email IS NOT NULL AND trim(email) != '' AND
  phone IS NOT NULL AND trim(phone) != '' AND
  company IS NOT NULL AND trim(company) != '' AND
  position IS NOT NULL AND trim(position) != '' AND
  organization_type IS NOT NULL AND trim(organization_type) != '' AND
  industry_focus IS NOT NULL AND trim(industry_focus) != '' AND
  consultation_goals IS NOT NULL AND trim(consultation_goals) != '' AND
  current_challenges IS NOT NULL AND trim(current_challenges) != '' AND
  budget_range IS NOT NULL AND trim(budget_range) != '' AND
  timeframe IS NOT NULL AND trim(timeframe) != '' AND
  
  -- Email format validation (RFC 5322 compliant pattern)
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  
  -- Reasonable length limits to prevent abuse and ensure data integrity
  length(full_name) <= 100 AND
  length(email) <= 255 AND
  length(phone) <= 50 AND
  length(company) <= 200 AND
  length(position) <= 100 AND
  length(organization_type) <= 100 AND
  length(industry_focus) <= 200 AND
  length(consultation_goals) <= 2000 AND
  length(current_challenges) <= 2000 AND
  length(budget_range) <= 50 AND
  length(timeframe) <= 100 AND
  (hear_about_us IS NULL OR length(hear_about_us) <= 500) AND
  
  -- Force status to be 'pending' for new submissions (security measure)
  status = 'pending'
);

-- Secure SELECT policy - only authenticated admins/staff and request owners can view
CREATE POLICY "Restricted consultation requests access"
ON consultation_requests FOR SELECT
TO authenticated
USING (can_view_consultation_request(email, auth.uid()));

-- Secure UPDATE policy - only admins/staff can update status and internal fields
CREATE POLICY "Admin only consultation updates"
ON consultation_requests FOR UPDATE
TO authenticated
USING (is_admin_or_staff(auth.uid()));

-- Secure DELETE policy - only admins/staff can delete consultation requests
CREATE POLICY "Admin only consultation deletion"
ON consultation_requests FOR DELETE
TO authenticated  
USING (is_admin_or_staff(auth.uid()));

-- Additional security: Revoke and re-grant minimal permissions
REVOKE ALL ON public.consultation_requests FROM public, anon, authenticated;

-- Grant only necessary permissions with RLS enforcement
GRANT INSERT ON public.consultation_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultation_requests TO authenticated;

-- Ensure RLS is enabled (critical security measure)
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;