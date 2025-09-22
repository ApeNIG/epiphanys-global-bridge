-- Add user_id column to opportunities table to track who created each opportunity
ALTER TABLE public.opportunities 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create RLS policy to allow users to insert their own opportunities
CREATE POLICY "Users can insert their own opportunities" 
ON public.opportunities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create RLS policy to allow users to update their own opportunities
CREATE POLICY "Users can update their own opportunities" 
ON public.opportunities 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policy to allow users to view their own opportunities
CREATE POLICY "Users can view their own opportunities" 
ON public.opportunities 
FOR SELECT 
USING (auth.uid() = user_id OR is_active = true);