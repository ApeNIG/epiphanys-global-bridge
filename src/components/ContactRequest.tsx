import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send } from 'lucide-react';

interface ContactRequestProps {
  receiverId: string;
  receiverName: string;
  opportunityId?: string;
  opportunityTitle?: string;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const ContactRequest: React.FC<ContactRequestProps> = ({
  receiverId,
  receiverName,
  opportunityId,
  opportunityTitle,
  variant = 'default',
  size = 'default',
  className
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendRequest = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to send contact requests',
        variant: 'destructive'
      });
      return;
    }

    if (!message.trim()) {
      toast({
        title: 'Message required',
        description: 'Please enter a message to send with your contact request',
        variant: 'destructive'
      });
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('contact_requests')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          opportunity_id: opportunityId || null,
          message: message.trim()
        });

      if (error) throw error;

      toast({
        title: 'Contact request sent',
        description: `Your request has been sent to ${receiverName}. They will be notified and can choose to share their contact information with you.`
      });

      setMessage('');
      setOpen(false);
    } catch (error: any) {
      console.error('Error sending contact request:', error);
      toast({
        title: 'Error',
        description: 'Failed to send contact request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  // Don't show contact button to the user themselves
  if (user?.id === receiverId) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact {receiverName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {receiverName}</DialogTitle>
          <DialogDescription>
            {opportunityTitle 
              ? `Send a message regarding "${opportunityTitle}"`
              : `Send a contact request to ${receiverName}`
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder={`Hi ${receiverName}, I'm interested in ${opportunityTitle ? 'this opportunity' : 'connecting with you'}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <p className="text-sm text-muted-foreground">
              {message.length}/500 characters
            </p>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Your contact request will be sent to {receiverName}. They can choose whether to share their contact information with you.
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendRequest} disabled={sending || !message.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {sending ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};