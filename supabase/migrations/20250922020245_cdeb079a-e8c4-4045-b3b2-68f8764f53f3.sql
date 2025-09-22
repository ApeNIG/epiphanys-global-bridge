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

-- Create security definer function to check if user is admin or staff
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

-- Drop and recreate policies for user_roles table
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage user roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage user roles" 
ON public.user_roles 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur 
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Update consultation_requests policies for proper staff access
DROP POLICY IF EXISTS "Users can view their own consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Users can update their own consultation requests" ON public.consultation_requests;
DROP POLICY IF EXISTS "Anyone can submit consultation requests" ON public.consultation_requests;

-- Secure policy: Only authenticated users can view their own requests OR admin/staff can view all
CREATE POLICY "Secure consultation requests viewing" 
ON public.consultation_requests 
FOR SELECT 
TO authenticated
USING (
  email = (SELECT auth.email() FROM auth.users WHERE id = auth.uid()) 
  OR public.is_admin_or_staff(auth.uid())
);

-- Allow updates only by request owner or admin/staff
CREATE POLICY "Secure consultation requests updating" 
ON public.consultation_requests 
FOR UPDATE 
TO authenticated
USING (
  email = (SELECT auth.email() FROM auth.users WHERE id = auth.uid()) 
  OR public.is_admin_or_staff(auth.uid())
);

-- Allow consultation request submissions from anyone (public forms)
CREATE POLICY "Allow consultation request submissions" 
ON public.consultation_requests 
FOR INSERT 
WITH CHECK (true);

-- Explicitly block all other access for anonymous users
CREATE POLICY "Block anonymous read/update access" 
ON public.consultation_requests 
FOR SELECT 
TO anon 
USING (false);

CREATE POLICY "Block anonymous update access" 
ON public.consultation_requests 
FOR UPDATE 
TO anon 
USING (false);