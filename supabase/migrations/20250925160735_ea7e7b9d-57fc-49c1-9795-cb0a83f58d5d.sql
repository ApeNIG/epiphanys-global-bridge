-- Create connections table for accepted connection requests
CREATE TABLE public.connections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id_1 UUID NOT NULL,
  user_id_2 UUID NOT NULL,
  connection_request_id UUID,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id_1, user_id_2),
  -- Ensure user_id_1 is always smaller than user_id_2 to avoid duplicates
  CONSTRAINT connections_user_order CHECK (user_id_1 < user_id_2)
);

-- Enable Row Level Security
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Create policies for connections
CREATE POLICY "Users can view their own connections" 
ON public.connections 
FOR SELECT 
USING (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

CREATE POLICY "Users can create connections from accepted requests" 
ON public.connections 
FOR INSERT 
WITH CHECK (auth.uid() = user_id_1 OR auth.uid() = user_id_2);

-- Create index for performance
CREATE INDEX idx_connections_user_1 ON public.connections(user_id_1);
CREATE INDEX idx_connections_user_2 ON public.connections(user_id_2);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_connections_updated_at
BEFORE UPDATE ON public.connections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle accepted connection requests
CREATE OR REPLACE FUNCTION public.handle_connection_request_acceptance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only proceed if status changed to 'accepted'
  IF NEW.status = 'accepted' AND OLD.status != 'accepted' THEN
    -- Create connection entry with proper ordering
    INSERT INTO public.connections (user_id_1, user_id_2, connection_request_id)
    VALUES (
      LEAST(NEW.sender_id, NEW.receiver_id),
      GREATEST(NEW.sender_id, NEW.receiver_id),
      NEW.id
    )
    ON CONFLICT (user_id_1, user_id_2) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on connection_requests table
CREATE TRIGGER on_connection_request_accepted
  AFTER UPDATE ON public.connection_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_connection_request_acceptance();