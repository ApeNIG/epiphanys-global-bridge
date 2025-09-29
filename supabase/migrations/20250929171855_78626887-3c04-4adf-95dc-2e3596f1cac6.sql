-- Fix the Security Definer View issue by removing the problematic view
-- The existing RLS policies provide sufficient security without needing the view

-- Drop the security definer view that's causing the security warning
DROP VIEW IF EXISTS public.admin_consultation_requests;

-- The existing RLS policies are sufficient:
-- 1. "Secure consultation requests access" policy ensures only admins/staff can view all requests
-- 2. Regular users can only view requests that match their email
-- 3. "Secure public consultation submissions" policy validates all insertions

-- Remove the unused logging function as well since it's not needed
DROP FUNCTION IF EXISTS public.log_consultation_access(uuid, uuid);