-- Enable real-time for messages table
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.messages;

-- Also enable for other network-related tables if not already enabled
ALTER TABLE public.connections REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.connections;

ALTER TABLE public.connection_requests REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.connection_requests;