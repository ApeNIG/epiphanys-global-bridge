import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Users, MessageSquare, UserPlus, CheckCircle, XCircle, ArrowLeft, Network as NetworkIcon, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { DirectMessage } from '@/components/DirectMessage';
import { MessageButton } from '@/components/MessageButton';

interface Profile {
  id: string;
  full_name: string;
  bio: string;
  location: string;
  business_name: string;
  business_sector: string;
  user_category: string;
  profile_image_url: string;
  avatar_url: string;
  interests: string[];
  isCompanyProfile?: boolean;
  company_id?: string;
  website?: string;
  year_founded?: number;
  legal_structure?: string;
  stage?: string;
}

interface ConnectionRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: string;
  message: string;
  created_at: string;
  sender_profile?: Profile;
}

interface Connection {
  id: string;
  user_id_1: string;
  user_id_2: string;
  connected_at: string;
  connected_user?: Profile;
}

export const Network = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'discover' | 'requests' | 'network'>('discover');
  const [selectedRecipient, setSelectedRecipient] = useState<Profile | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfiles();
      fetchConnectionRequests();
      fetchConnections();
    }
  }, [user]);

  // Set up real-time listeners for connections
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('connections-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'connections',
          filter: `user_id_1=eq.${user.id},user_id_2=eq.${user.id}`
        },
        () => {
          console.log('New connection detected, refreshing...');
          fetchConnections();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'connection_requests',
          filter: `receiver_id=eq.${user.id}`
        },
        () => {
          console.log('Connection request updated, refreshing...');
          fetchConnectionRequests();
          fetchConnections();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Listen for connection accepted events from other components
  useEffect(() => {
    const handleConnectionAccepted = () => {
      fetchConnections();
    };

    window.addEventListener('connectionAccepted', handleConnectionAccepted);
    return () => window.removeEventListener('connectionAccepted', handleConnectionAccepted);
  }, [user]);

  const fetchProfiles = async () => {
    try {
      // Fetch user profiles
      const { data: userProfiles, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user?.id);

      if (userError) throw userError;

      // Fetch company profiles from businesses listed in investment section
      const { data: companies, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .neq('user_id', user?.id);

      if (companyError) throw companyError;

      // Get user profiles for company owners
      let companyProfiles: any[] = [];
      if (companies && companies.length > 0) {
        const companyOwnerIds = companies.map(company => company.user_id);
        const { data: ownerProfiles, error: ownerError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', companyOwnerIds);

        if (ownerError) throw ownerError;

        // Transform companies into profile format
        companyProfiles = companies.map(company => {
          const ownerProfile = ownerProfiles?.find(profile => profile.id === company.user_id);
          return {
            id: company.user_id,
            full_name: ownerProfile?.full_name || 'Company Owner',
            bio: `${company.stage || 'Company'} in ${company.sector || 'Various sectors'}`,
            location: company.location || ownerProfile?.location || '',
            business_name: company.name,
            business_sector: company.sector || '',
            user_category: 'Business',
            profile_image_url: ownerProfile?.profile_image_url || ownerProfile?.avatar_url || '',
            avatar_url: ownerProfile?.avatar_url || '',
            interests: [company.sector].filter(Boolean),
            isCompanyProfile: true,
            company_id: company.id,
            website: company.website,
            year_founded: company.year_founded,
            legal_structure: company.legal_structure,
            stage: company.stage
          };
        });
      }

      // Combine user profiles and company profiles
      const allProfiles = [...(userProfiles || []), ...companyProfiles];
      setProfiles(allProfiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load profiles.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConnectionRequests = async () => {
    try {
      // First get the connection requests
      const { data: requests, error: requestsError } = await supabase
        .from('connection_requests')
        .select('*')
        .eq('receiver_id', user?.id);

      if (requestsError) throw requestsError;

      // Then get the sender profiles for each request
      if (requests && requests.length > 0) {
        const senderIds = requests.map(req => req.sender_id);
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', senderIds);

        if (profilesError) throw profilesError;

        // Combine the data
        const requestsWithProfiles = requests.map(request => ({
          ...request,
          sender_profile: profiles?.find(profile => profile.id === request.sender_id)
        }));

        setConnectionRequests(requestsWithProfiles);
      } else {
        setConnectionRequests([]);
      }
    } catch (error) {
      console.error('Error fetching connection requests:', error);
    }
  };

  const fetchConnections = async () => {
    try {
      // Fetch connections where user is either user_id_1 or user_id_2
      const { data: connectionsData, error: connectionsError } = await supabase
        .from('connections')
        .select('*')
        .or(`user_id_1.eq.${user?.id},user_id_2.eq.${user?.id}`)
        .order('connected_at', { ascending: false });

      if (connectionsError) throw connectionsError;

      if (connectionsData && connectionsData.length > 0) {
        // Get the profiles of connected users
        const connectedUserIds = connectionsData.map(conn => 
          conn.user_id_1 === user?.id ? conn.user_id_2 : conn.user_id_1
        );

        const { data: connectedProfiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', connectedUserIds);

        if (profilesError) throw profilesError;

        // Combine connection data with user profiles
        const connectionsWithProfiles = connectionsData.map(connection => ({
          ...connection,
          connected_user: connectedProfiles?.find(profile => 
            profile.id === (connection.user_id_1 === user?.id ? connection.user_id_2 : connection.user_id_1)
          )
        }));

        setConnections(connectionsWithProfiles);
      } else {
        setConnections([]);
      }
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const sendConnectionRequest = async (receiverId: string, message: string) => {
    try {
      // Check if connection request already exists
      const { data: existingRequest } = await supabase
        .from('connection_requests')
        .select('id, status')
        .eq('sender_id', user?.id)
        .eq('receiver_id', receiverId)
        .single();

      if (existingRequest) {
        toast({
          title: "Already Connected",
          description: existingRequest.status === 'pending' 
            ? "You have already sent a connection request to this person."
            : `You have already ${existingRequest.status} a connection with this person.`,
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('connection_requests')
        .insert({
          sender_id: user?.id,
          receiver_id: receiverId,
          message: message || 'Hi! I would like to connect with you on the platform.'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Connection request sent successfully.",
      });

      // Refresh profiles to show updated connection status
      fetchProfiles();
    } catch (error) {
      console.error('Error sending connection request:', error);
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
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

      // Refresh both connection requests and connections
      fetchConnectionRequests();
      if (status === 'accepted') {
        // Add a small delay to ensure the trigger has time to create the connection
        setTimeout(() => {
          fetchConnections();
        }, 100);
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('connectionAccepted'));
      }
    } catch (error) {
      console.error('Error updating connection request:', error);
      toast({
        title: "Error",
        description: "Failed to update connection request.",
        variant: "destructive",
      });
    }
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.business_sector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ConnectionRequestModal = ({ profile }: { profile: Profile }) => {
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = async () => {
      await sendConnectionRequest(profile.id, message);
      setMessage('');
      setIsOpen(false);
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Connection Request</DialogTitle>
            <DialogDescription>
              Send a connection request to {profile.full_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Add a personal message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
            <div className="flex gap-2">
              <Button onClick={handleSend} className="flex-1">
                Send Request
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="text-center py-8">
            <p>Please log in to access the network.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show direct message interface if a recipient is selected
  if (selectedRecipient) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DirectMessage 
          recipient={selectedRecipient} 
          onBack={() => setSelectedRecipient(null)} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">Network & Connect</h1>
        <p className="text-muted-foreground">
          Discover and connect with professionals, entrepreneurs, and organisations in your network.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === 'discover' ? 'default' : 'outline'}
          onClick={() => setActiveTab('discover')}
        >
          <Users className="h-4 w-4 mr-2" />
          Discover People
        </Button>
        <Button
          variant={activeTab === 'requests' ? 'default' : 'outline'}
          onClick={() => setActiveTab('requests')}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Connection Requests ({connectionRequests.filter(req => req.status === 'pending').length})
        </Button>
        <Button
          variant={activeTab === 'network' ? 'default' : 'outline'}
          onClick={() => setActiveTab('network')}
        >
          <NetworkIcon className="h-4 w-4 mr-2" />
          My Network ({connections.length})
        </Button>
      </div>

      {activeTab === 'discover' && (
        <>
          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search by name, company, sector, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Profiles Grid */}
          {isLoading ? (
            <div className="text-center py-8">Loading profiles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfiles.map((profile) => (
                <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={profile.profile_image_url || profile.avatar_url} />
                      <AvatarFallback>
                        {profile.full_name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{profile.full_name || 'Anonymous'}</CardTitle>
                    {profile.business_name && (
                      <p className="text-sm text-muted-foreground">{profile.business_name}</p>
                    )}
                  </CardHeader>
                   <CardContent className="space-y-3">
                     <div className="flex gap-2 flex-wrap">
                       {profile.user_category && (
                         <Badge variant="secondary">{profile.user_category}</Badge>
                       )}
                       {profile.isCompanyProfile && profile.stage && (
                         <Badge variant="outline">{profile.stage}</Badge>
                       )}
                     </div>
                     {profile.business_sector && (
                       <p className="text-sm"><strong>Sector:</strong> {profile.business_sector}</p>
                     )}
                     {profile.location && (
                       <p className="text-sm"><strong>Location:</strong> {profile.location}</p>
                     )}
                     {profile.isCompanyProfile && profile.year_founded && (
                       <p className="text-sm"><strong>Founded:</strong> {profile.year_founded}</p>
                     )}
                     {profile.isCompanyProfile && profile.website && (
                       <p className="text-sm">
                         <strong>Website:</strong> 
                         <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                           {profile.website}
                         </a>
                       </p>
                     )}
                     {profile.bio && (
                       <p className="text-sm text-muted-foreground line-clamp-3">{profile.bio}</p>
                     )}
                     {profile.interests && profile.interests.length > 0 && (
                       <div className="flex flex-wrap gap-1">
                         {profile.interests.slice(0, 3).map((interest, index) => (
                           <Badge key={index} variant="outline" className="text-xs">
                             {interest}
                           </Badge>
                         ))}
                         {profile.interests.length > 3 && (
                           <Badge variant="outline" className="text-xs">
                             +{profile.interests.length - 3} more
                           </Badge>
                         )}
                       </div>
                     )}
                     <ConnectionRequestModal profile={profile} />
                   </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredProfiles.length === 0 && !isLoading && (
            <Card>
              <CardContent className="text-center py-8">
                <p>No profiles found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {activeTab === 'network' && (
        <div className="space-y-6">
          {connections.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <NetworkIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No connections yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start connecting with people to build your network
                </p>
                <Button onClick={() => setActiveTab('discover')}>
                  Discover People
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {connections.map((connection) => (
                <Card key={connection.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-3">
                      <AvatarImage src={connection.connected_user?.profile_image_url || connection.connected_user?.avatar_url} />
                      <AvatarFallback>
                        {connection.connected_user?.full_name?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">
                      {connection.connected_user?.full_name || 'Anonymous'}
                    </CardTitle>
                    {connection.connected_user?.business_name && (
                      <p className="text-sm text-muted-foreground">
                        {connection.connected_user.business_name}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {connection.connected_user?.user_category && (
                        <Badge variant="secondary">
                          {connection.connected_user.user_category}
                        </Badge>
                      )}
                    </div>
                    {connection.connected_user?.business_sector && (
                      <p className="text-sm">
                        <strong>Sector:</strong> {connection.connected_user.business_sector}
                      </p>
                    )}
                    {connection.connected_user?.location && (
                      <p className="text-sm">
                        <strong>Location:</strong> {connection.connected_user.location}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Connected {new Date(connection.connected_at).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <MessageButton
                        userId={connection.connected_user!.id}
                        onClick={() => setSelectedRecipient(connection.connected_user!)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {connectionRequests.filter(req => req.status === 'pending').length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p>No pending connection requests.</p>
              </CardContent>
            </Card>
          ) : (
            connectionRequests
              .filter(req => req.status === 'pending')
              .map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Avatar>
                          <AvatarImage src={request.sender_profile?.profile_image_url || request.sender_profile?.avatar_url} />
                          <AvatarFallback>
                            {request.sender_profile?.full_name?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {request.sender_profile?.full_name || 'Anonymous'}
                          </h3>
                          {request.sender_profile?.business_name && (
                            <p className="text-sm text-muted-foreground">
                              {request.sender_profile.business_name}
                            </p>
                          )}
                          {request.message && (
                            <p className="text-sm mt-2 p-3 bg-muted rounded">
                              "{request.message}"
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2">
                            Sent {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateConnectionRequest(request.id, 'accepted')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateConnectionRequest(request.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      )}
    </div>
  );
};