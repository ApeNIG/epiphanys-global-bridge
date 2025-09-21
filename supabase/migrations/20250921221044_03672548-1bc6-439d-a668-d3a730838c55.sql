-- Add new profile fields for business information and user categorization
ALTER TABLE public.profiles 
ADD COLUMN business_name TEXT,
ADD COLUMN investment_stage TEXT,
ADD COLUMN business_sector TEXT,
ADD COLUMN interests TEXT[],
ADD COLUMN user_category TEXT,
ADD COLUMN location TEXT,
ADD COLUMN bio TEXT,
ADD COLUMN years_of_experience INTEGER,
ADD COLUMN company_size TEXT,
ADD COLUMN funding_raised TEXT;