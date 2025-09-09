-- Create consultation_requests table for storing consultation booking requests
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  organization_type TEXT NOT NULL,
  industry_focus TEXT NOT NULL,
  consultation_goals TEXT NOT NULL,
  current_challenges TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  hear_about_us TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for consultation requests
-- Allow anyone to insert consultation requests (public form)
CREATE POLICY "Anyone can submit consultation requests" 
ON public.consultation_requests 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can view their own requests
CREATE POLICY "Users can view their own consultation requests" 
ON public.consultation_requests 
FOR SELECT 
USING (email = (SELECT auth.email() FROM auth.users WHERE auth.users.id = auth.uid()));

-- Only authenticated users can update their own requests  
CREATE POLICY "Users can update their own consultation requests" 
ON public.consultation_requests 
FOR UPDATE 
USING (email = (SELECT auth.email() FROM auth.users WHERE auth.users.id = auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_consultation_requests_updated_at
BEFORE UPDATE ON public.consultation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance on email lookups
CREATE INDEX idx_consultation_requests_email ON public.consultation_requests(email);
CREATE INDEX idx_consultation_requests_status ON public.consultation_requests(status);
CREATE INDEX idx_consultation_requests_created_at ON public.consultation_requests(created_at);