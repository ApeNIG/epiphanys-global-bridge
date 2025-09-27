import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import { useUnreadMessages } from '@/hooks/useUnreadMessages';

interface MessageButtonProps {
  userId: string;
  onClick: () => void;
}

export const MessageButton: React.FC<MessageButtonProps> = ({ userId, onClick }) => {
  const unreadCount = useUnreadMessages(userId);

  return (
    <Button 
      size="sm" 
      className="flex-1 relative"
      onClick={onClick}
    >
      <Mail className="h-4 w-4 mr-2" />
      Message
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};