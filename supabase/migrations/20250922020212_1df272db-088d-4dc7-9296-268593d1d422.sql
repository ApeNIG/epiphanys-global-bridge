-- Create user roles enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for role management
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'staff')
  )
$$;

-- Add RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Update consultation_requests policies for proper staff access
DROP POLICY IF EXISTS "Users can view their own consultation requests" ON public.consultation_requests;

-- Allow users to view their own requests OR allow admin/staff to view all requests
CREATE POLICY "Users can view own requests or staff can view all" 
ON public.consultation_requests 
FOR SELECT 
TO authenticated
USING (
  email = (SELECT auth.email() FROM auth.users WHERE id = auth.uid()) 
  OR public.is_admin_or_staff(auth.uid())
);

-- Allow only admin/staff to update consultation request status
DROP POLICY IF EXISTS "Users can update their own consultation requests" ON public.consultation_requests;

CREATE POLICY "Users can update own basic info or staff can update status" 
ON public.consultation_requests 
FOR UPDATE 
TO authenticated
USING (
  email = (SELECT auth.email() FROM auth.users WHERE id = auth.uid()) 
  OR public.is_admin_or_staff(auth.uid())
);

-- Add policy to prevent unauthorized access
CREATE POLICY "Block anonymous access to consultation requests" 
ON public.consultation_requests 
FOR ALL 
TO anon 
USING (false)
WITH CHECK (false);

-- Update the insert policy to be more explicit about anonymous access
DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON public.consultation_requests;

CREATE POLICY "Allow consultation request submissions" 
ON public.consultation_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);