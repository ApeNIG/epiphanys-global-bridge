-- Create opportunities table
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('business', 'career', 'investment', 'collaboration')),
  sector TEXT NOT NULL CHECK (sector IN ('public', 'private')),
  location TEXT,
  company_name TEXT NOT NULL,
  contact_email TEXT,
  website_url TEXT,
  salary_range TEXT,
  deadline DATE,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read opportunities (public data)
CREATE POLICY "Anyone can view active opportunities" 
ON public.opportunities 
FOR SELECT 
USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_opportunities_updated_at
BEFORE UPDATE ON public.opportunities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample opportunities
INSERT INTO public.opportunities (title, description, category, sector, location, company_name, contact_email, website_url, salary_range, deadline, is_featured) VALUES
('Senior Software Engineer', 'Join our innovative team building next-generation fintech solutions for diaspora communities. We value cultural diversity and global perspectives.', 'career', 'private', 'London, UK', 'TechFlow Solutions', 'careers@techflow.com', 'https://techflow.com', '£70,000 - £90,000', '2024-03-15', true),
('Government Digital Transformation Grant', 'Funding opportunity for SMEs developing digital solutions that serve diaspora communities. Up to £500K available.', 'business', 'public', 'UK Wide', 'UK Government Digital Service', 'grants@gov.uk', 'https://gov.uk/digital-grants', '£50,000 - £500,000', '2024-04-30', true),
('Diaspora Investment Fund', 'Early-stage investment fund specifically for diaspora-led startups. Focus on fintech, healthcare, and education.', 'investment', 'private', 'Manchester, UK', 'Global Diaspora Ventures', 'invest@globaldiaspora.com', 'https://globaldiaspora.com', '£100K - £2M', '2024-05-20', false),
('International Trade Partnership', 'Collaborate with African tech companies to expand UK digital services to emerging markets.', 'collaboration', 'public', 'Birmingham, UK', 'Department for International Trade', 'partnerships@trade.gov.uk', 'https://trade.gov.uk', 'Partnership based', '2024-03-30', true),
('Product Manager - EdTech', 'Lead product development for educational technology serving multicultural communities in the UK.', 'career', 'private', 'Remote/London', 'EduConnect Ltd', 'jobs@educonnect.co.uk', 'https://educonnect.co.uk', '£60,000 - £80,000', '2024-04-10', false),
('Small Business Development Scheme', 'Support program for diaspora entrepreneurs including mentorship, funding, and market access.', 'business', 'public', 'Leeds, UK', 'Business Development Council', 'support@bdc.gov.uk', 'https://bdc.gov.uk', 'Up to £50,000', '2024-06-01', true);