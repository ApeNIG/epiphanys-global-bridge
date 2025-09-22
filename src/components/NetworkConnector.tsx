import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Users, UserPlus, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Profile {
  id: string;
  full_name: string;
  business_name: string;
  business_sector: string;
  location: string;
  profile_image_url: string;
  avatar_url: string;
  user_category: string;
}

interface ConnectionRequest {
  id: string;
  sender_id: string;
  status: string;
  message: string;
  created_at: string;
  sender_profile?: Profile;
}

export const NetworkConnector = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [pendingRequests, setPendingRequests] = useState<ConnectionRequest[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchPendingRequests();
    }
  }, [user]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      searchProfiles();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const searchProfiles = async () => {
    if (!user) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .or(`full_name.ilike.%${searchTerm}%,business_name.ilike.%${searchTerm}%,business_sector.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      setSearchResults(data || []);
    } catch (error) {
      console.error('Error searching profiles:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const fetchPendingRequests = async () => {
    if (!user) return;

    try {
      const { data: requests, error: requestsError } = await supabase
        .from('connection_requests')
        .select('*')
        .eq('receiver_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(3);

      if (requestsError) throw requestsError;

      if (requests && requests.length > 0) {
        const senderIds = requests.map(req => req.sender_id);
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', senderIds);

        if (profilesError) throw profilesError;

        const requestsWithProfiles = requests.map(request => ({
          ...request,
          sender_profile: profiles?.find(profile => profile.id === request.sender_id)
        }));

        setPendingRequests(requestsWithProfiles);
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

  const sendQuickConnect = async (receiverId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('connection_requests')
        .insert({
          sender_id: user.id,
          receiver_id: receiverId,
          message: 'Hi! I would like to connect with you on the platform.'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Connection request sent successfully.",
      });

      // Remove from search results
      setSearchResults(prev => prev.filter(profile => profile.id !== receiverId));
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: "Error",
        description: "Failed to send connection request.",
        variant: "destructive",
      });
    }
  };

  const updateConnectionRequest = async (requestId: string, status: 'accepted' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('connection_requests')
        .update({ status })
        .eq('id', requestId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Connection request ${status} successfully.`,
      });

      fetchPendingRequests();
    } catch (error) {
      console.error('Error updating connection request:', error);
      toast({
        title: "Error",
        description: "Failed to update connection request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Network Search
          </CardTitle>
          <CardDescription>
            Find and connect with professionals, entrepreneurs, and organizations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name, company, sector, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {isSearching && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-3">
              {searchResults.map((profile) => (
                <div key={profile.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={profile.profile_image_url || profile.avatar_url} />
                      <AvatarFallback>
                        {profile.full_name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{profile.full_name || 'Anonymous'}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {profile.business_name && <span>{profile.business_name}</span>}
                        {profile.business_sector && (
                          <>
                            {profile.business_name && <span>•</span>}
                            <span>{profile.business_sector}</span>
                          </>
                        )}
                      </div>
                      {profile.location && (
                        <p className="text-xs text-muted-foreground">{profile.location}</p>
                      )}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => sendQuickConnect(profile.id)}
                    className="gap-1"
                  >
                    <UserPlus className="h-3 w-3" />
                    Connect
                  </Button>
                </div>
              ))}
              <Link to="/network">
                <Button variant="outline" className="w-full">
                  View All Network Results
                </Button>
              </Link>
            </div>
          )}

          {searchTerm.length > 2 && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-4 text-muted-foreground">
              No profiles found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Connection Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Connection Requests
            {pendingRequests.length > 0 && (
              <Badge variant="secondary">{pendingRequests.length}</Badge>
            )}
          </CardTitle>
          <CardDescription>
            Manage your incoming connection requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No pending connection requests</p>
              <Link to="/network">
                <Button variant="outline" className="mt-3">
                  Discover People to Connect
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={request.sender_profile?.profile_image_url || request.sender_profile?.avatar_url} />
                      <AvatarFallback>
                        {request.sender_profile?.full_name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {request.sender_profile?.full_name || 'Anonymous'}
                      </p>
                      {request.sender_profile?.business_name && (
                        <p className="text-sm text-muted-foreground">
                          {request.sender_profile.business_name}
                        </p>
                      )}
                      {request.message && (
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                          "{request.message}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateConnectionRequest(request.id, 'accepted')}
                      className="gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateConnectionRequest(request.id, 'rejected')}
                      className="gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
              <Link to="/network">
                <Button variant="outline" className="w-full">
                  View All Requests
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};