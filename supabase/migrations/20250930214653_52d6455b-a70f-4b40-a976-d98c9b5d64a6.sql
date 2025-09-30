-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can view opportunities with filtered contact info" ON public.opportunities;

-- Create new policy allowing public viewing of active opportunities
CREATE POLICY "Public can view active opportunities"
ON public.opportunities
FOR SELECT
USING (is_active = true);

-- Add policy for owners to see their own opportunities (including inactive ones)
CREATE POLICY "Users can view their own opportunities"
ON public.opportunities
FOR SELECT
USING (auth.uid() = user_id);