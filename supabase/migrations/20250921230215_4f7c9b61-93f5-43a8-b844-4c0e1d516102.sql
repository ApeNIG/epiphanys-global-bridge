-- Create comprehensive business profile tables for AI matching

-- Company Table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  website TEXT,
  location TEXT,
  year_founded INTEGER,
  legal_structure TEXT,
  stage TEXT,
  sector TEXT,
  business_model TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Market Table
CREATE TABLE public.company_market (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  problem_statement TEXT,
  target_customers TEXT,
  usp TEXT,
  current_markets TEXT[],
  desired_markets TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Traction Table
CREATE TABLE public.company_traction (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  revenue_range TEXT,
  revenue_model TEXT,
  key_metrics JSONB,
  customers INTEGER,
  awards TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Funding Table
CREATE TABLE public.company_funding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  previous_funding TEXT,
  current_funding_goal TEXT,
  funding_type TEXT,
  use_of_funds TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Team Table
CREATE TABLE public.company_team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  founder_name TEXT,
  role TEXT,
  team_size INTEGER,
  advisors TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Strategic Fit Table
CREATE TABLE public.company_strategic_fit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  investor_type TEXT[],
  preferred_investor_location TEXT[],
  partnership_interest TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Impact Table
CREATE TABLE public.company_impact (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  esg_alignment TEXT,
  sdg_alignment TEXT[],
  diversity_inclusion TEXT,
  mission_driven BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(company_id)
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_market ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_traction ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_funding ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_strategic_fit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_impact ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies table
CREATE POLICY "Users can view their own company" 
ON public.companies 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own company" 
ON public.companies 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own company" 
ON public.companies 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for company_market table
CREATE POLICY "Users can view their company market data" 
ON public.company_market 
FOR SELECT 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their company market data" 
ON public.company_market 
FOR INSERT 
WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their company market data" 
ON public.company_market 
FOR UPDATE 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- RLS Policies for company_traction table
CREATE POLICY "Users can view their company traction data" 
ON public.company_traction 
FOR SELECT 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their company traction data" 
ON public.company_traction 
FOR INSERT 
WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their company traction data" 
ON public.company_traction 
FOR UPDATE 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- RLS Policies for company_funding table
CREATE POLICY "Users can view their company funding data" 
ON public.company_funding 
FOR SELECT 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their company funding data" 
ON public.company_funding 
FOR INSERT 
WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their company funding data" 
ON public.company_funding 
FOR UPDATE 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- RLS Policies for company_team table
CREATE POLICY "Users can view their company team data" 
ON public.company_team 
FOR SELECT 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their company team data" 
ON public.company_team 
FOR INSERT 
WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their company team data" 
ON public.company_team 
FOR UPDATE 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- RLS Policies for company_strategic_fit table
CREATE POLICY "Users can view their company strategic fit data" 
ON public.company_strategic_fit 
FOR SELECT 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their company strategic fit data" 
ON public.company_strategic_fit 
FOR INSERT 
WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their company strategic fit data" 
ON public.company_strategic_fit 
FOR UPDATE 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- RLS Policies for company_impact table
CREATE POLICY "Users can view their company impact data" 
ON public.company_impact 
FOR SELECT 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their company impact data" 
ON public.company_impact 
FOR INSERT 
WITH CHECK (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their company impact data" 
ON public.company_impact 
FOR UPDATE 
USING (company_id IN (SELECT id FROM public.companies WHERE user_id = auth.uid()));

-- Create triggers for updated_at columns
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_market_updated_at
BEFORE UPDATE ON public.company_market
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_traction_updated_at
BEFORE UPDATE ON public.company_traction
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_funding_updated_at
BEFORE UPDATE ON public.company_funding
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_team_updated_at
BEFORE UPDATE ON public.company_team
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_strategic_fit_updated_at
BEFORE UPDATE ON public.company_strategic_fit
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_company_impact_updated_at
BEFORE UPDATE ON public.company_impact
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();