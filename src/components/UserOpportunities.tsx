import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, Calendar, MapPin, Building, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  sector: string;
  location: string;
  company_name: string;
  contact_email: string;
  website_url: string;
  salary_range: string;
  deadline: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

interface UserOpportunitiesProps {
  onOpportunityChange?: () => void;
}

export const UserOpportunities = ({ onOpportunityChange }: UserOpportunitiesProps) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchUserOpportunities = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load your opportunities.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOpportunity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('opportunities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOpportunities(prev => prev.filter(opp => opp.id !== id));
      toast({
        title: "Success",
        description: "Opportunity deleted successfully.",
      });
      
      // Trigger refresh of public opportunities
      if (onOpportunityChange) {
        onOpportunityChange();
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to delete opportunity.",
        variant: "destructive",
      });
    }
  };

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('opportunities')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      setOpportunities(prev => 
        prev.map(opp => 
          opp.id === id ? { ...opp, is_active: !currentStatus } : opp
        )
      );

      toast({
        title: "Success",
        description: `Opportunity ${!currentStatus ? 'activated' : 'deactivated'} successfully.`,
      });
      
      // Trigger refresh of public opportunities
      if (onOpportunityChange) {
        onOpportunityChange();
      }
    } catch (error) {
      console.error('Error updating opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to update opportunity status.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUserOpportunities();
  }, []);

  const formatDeadline = (deadline: string) => {
    if (!deadline) return 'No deadline';
    return format(new Date(deadline), 'dd MMM yyyy');
  };

  const isDeadlineSoon = (deadline: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Opportunities</CardTitle>
        <CardDescription>
          Manage the opportunities you've uploaded to the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {opportunities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't uploaded any opportunities yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="relative">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4" />
                        {opportunity.company_name}
                        {opportunity.location && (
                          <>
                            <MapPin className="h-4 w-4 ml-2" />
                            {opportunity.location}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {opportunity.is_featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                      <Badge variant={opportunity.is_active ? "default" : "outline"}>
                        {opportunity.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {isDeadlineSoon(opportunity.deadline) && (
                        <Badge variant="destructive">Deadline Soon</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {opportunity.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline">{opportunity.category}</Badge>
                      <Badge variant="outline">{opportunity.sector}</Badge>
                      {opportunity.deadline && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDeadline(opportunity.deadline)}
                        </div>
                      )}
                      {opportunity.salary_range && (
                        <span className="font-medium">{opportunity.salary_range}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActiveStatus(opportunity.id, opportunity.is_active)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {opportunity.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      
                      {opportunity.website_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={opportunity.website_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View
                          </a>
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteOpportunity(opportunity.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};