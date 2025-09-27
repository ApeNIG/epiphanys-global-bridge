-- First, let's fix the trigger function to ensure it creates connections properly
DROP TRIGGER IF EXISTS on_connection_request_accepted ON connection_requests;

-- Update the function to handle the connection creation more reliably
CREATE OR REPLACE FUNCTION public.handle_connection_request_acceptance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only proceed if status changed to 'accepted'
  IF NEW.status = 'accepted' AND (OLD.status IS NULL OR OLD.status != 'accepted') THEN
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

-- Recreate the trigger
CREATE TRIGGER on_connection_request_accepted
  AFTER UPDATE ON connection_requests
  FOR EACH ROW
  EXECUTE FUNCTION handle_connection_request_acceptance();

-- Now create the missing connection for the existing accepted request
INSERT INTO public.connections (user_id_1, user_id_2, connection_request_id)
SELECT 
  LEAST(sender_id, receiver_id),
  GREATEST(sender_id, receiver_id),
  id
FROM connection_requests 
WHERE status = 'accepted' 
  AND id NOT IN (SELECT connection_request_id FROM connections WHERE connection_request_id IS NOT NULL)
ON CONFLICT (user_id_1, user_id_2) DO NOTHING;