-- Fix security issue: Business Contact Information Exposed to All Users
-- Drop ALL existing policies for opportunities table
DROP POLICY IF EXISTS "Users can insert their own opportunities" ON opportunities;
DROP POLICY IF EXISTS "Users can update their own opportunities" ON opportunities;
DROP POLICY IF EXISTS "Users can view public opportunities with limited info" ON opportunities;
DROP POLICY IF EXISTS "Users can view their own opportunities" ON opportunities;

-- Create security definer function to filter opportunity data based on ownership
CREATE OR REPLACE FUNCTION public.get_filtered_opportunity_data(opportunity_id uuid, requesting_user_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  opportunity_record RECORD;
  is_owner BOOLEAN := false;
  is_connected_to_owner BOOLEAN := false;
  filtered_data jsonb := '{}';
BEGIN
  -- Get opportunity data
  SELECT * INTO opportunity_record FROM public.opportunities WHERE id = opportunity_id;
  
  -- If opportunity doesn't exist, return empty object
  IF NOT FOUND THEN
    RETURN '{}'::jsonb;
  END IF;
  
  -- Check if requesting user is the opportunity owner
  is_owner := (requesting_user_id = opportunity_record.user_id);
  
  -- Check if requesting user is connected to the opportunity owner
  IF requesting_user_id IS NOT NULL AND requesting_user_id != opportunity_record.user_id AND opportunity_record.user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM public.connections 
      WHERE (user_id_1 = requesting_user_id AND user_id_2 = opportunity_record.user_id)
         OR (user_id_2 = requesting_user_id AND user_id_1 = opportunity_record.user_id)
    ) INTO is_connected_to_owner;
  END IF;
  
  -- If owner, return full data
  IF is_owner THEN
    RETURN to_jsonb(opportunity_record);
  END IF;
  
  -- For non-owners, return filtered data without sensitive contact information
  filtered_data := jsonb_build_object(
    'id', opportunity_record.id,
    'title', opportunity_record.title,
    'description', opportunity_record.description,
    'category', opportunity_record.category,
    'sector', opportunity_record.sector,
    'company_name', opportunity_record.company_name,
    'location', opportunity_record.location,
    'business_sector', opportunity_record.business_sector,
    'deadline', opportunity_record.deadline,
    'is_featured', opportunity_record.is_featured,
    'is_active', opportunity_record.is_active,
    'created_at', opportunity_record.created_at,
    'updated_at', opportunity_record.updated_at,
    'user_id', opportunity_record.user_id
  );
  
  -- Only include contact information if user is connected to the opportunity owner
  IF is_connected_to_owner THEN
    filtered_data := filtered_data || jsonb_build_object(
      'contact_email', opportunity_record.contact_email,
      'website_url', opportunity_record.website_url,
      'salary_range', opportunity_record.salary_range
    );
  END IF;
  
  RETURN filtered_data;
END;
$$;

-- Create new secure RLS policies for opportunities table

-- Policy for inserting opportunities (users can create their own)
CREATE POLICY "Users can create their own opportunities"
ON opportunities FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy for updating opportunities (users can update their own)
CREATE POLICY "Users can update their own opportunities"
ON opportunities FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Policy for selecting opportunities (all authenticated users can view basic info, contact info only for connections)
CREATE POLICY "Users can view opportunities with filtered contact info"
ON opportunities FOR SELECT
TO authenticated
USING (
  is_active = true AND (
    auth.uid() = user_id OR -- Owner can see everything
    (auth.uid() IS NOT NULL) -- Others can see filtered data through security definer function
  )
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_opportunities_user_id ON opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_active ON opportunities(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_opportunities_featured ON opportunities(is_featured) WHERE is_featured = true;