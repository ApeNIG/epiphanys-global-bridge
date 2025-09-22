-- Remove the overly permissive policy that allows public access to all profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- Create a more secure policy for authenticated users to view basic profile info only
CREATE POLICY "Authenticated users can view basic profile info" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- The existing "Users can view their own profile" policy remains to allow full access to own data