-- Create comprehensive professional profile tables

-- Professional Profiles Table
CREATE TABLE public.professional_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Professional Identity
  professional_title TEXT,
  years_experience TEXT,
  current_employment_status TEXT,
  availability TEXT,
  
  -- Skills & Expertise
  core_skills TEXT[],
  industry_expertise TEXT[],
  certifications TEXT,
  languages_spoken TEXT[],
  
  -- Work Preferences
  work_type_preference TEXT,
  location_preference TEXT,
  salary_expectation TEXT,
  willing_to_relocate BOOLEAN,
  notice_period TEXT,
  
  -- Background & Education
  highest_qualification TEXT,
  university_institution TEXT,
  professional_summary TEXT,
  key_achievements TEXT,
  
  -- Availability & Logistics
  start_date_availability TEXT,
  interview_availability TEXT,
  visa_status TEXT,
  security_clearance TEXT,
  
  -- References & Portfolio
  references_available BOOLEAN,
  portfolio_website TEXT,
  linkedin_profile TEXT,
  
  -- Additional Information
  diversity_background TEXT,
  accessibility_requirements TEXT,
  professional_memberships TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own professional profile" 
ON public.professional_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own professional profile" 
ON public.professional_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own professional profile" 
ON public.professional_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Allow public viewing of professional profiles for employers
CREATE POLICY "Public can view professional profiles for discovery" 
ON public.professional_profiles 
FOR SELECT 
USING (true);

-- Create trigger for updated_at column
CREATE TRIGGER update_professional_profiles_updated_at
BEFORE UPDATE ON public.professional_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();