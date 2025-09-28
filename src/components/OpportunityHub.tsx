import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, ExternalLink, Building, Users, Briefcase, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: 'business' | 'career' | 'investment' | 'collaboration';
  sector: 'public' | 'private';
  business_sector: string | null;
  location: string | null;
  company_name: string;
  contact_email: string | null;
  website_url: string | null;
  salary_range: string | null;
  deadline: string | null;
  is_featured: boolean;
  created_at: string;
}

const categoryColors = {
  business: "from-primary to-blue-600",
  career: "from-purple-500 to-purple-700",
  investment: "from-accent to-orange-500",
  collaboration: "from-green-500 to-emerald-600"
};

const categoryIcons = {
  business: Building,
  career: Users,
  investment: Briefcase,
  collaboration: Users
};

const OpportunityHub = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchOpportunities();
    
    // Listen for opportunity updates from other components
    const handleOpportunityUpdate = () => {
      fetchOpportunities();
    };
    
    window.addEventListener('opportunitiesUpdated', handleOpportunityUpdate);
    
    return () => {
      window.removeEventListener('opportunitiesUpdated', handleOpportunityUpdate);
    };
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching opportunities",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setOpportunities(data as Opportunity[] || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load opportunities",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || opportunity.category === selectedCategory;
    const matchesSector = selectedSector === "all" || opportunity.sector === selectedSector;
    
    return matchesSearch && matchesCategory && matchesSector;
  });

  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return null;
    return new Date(deadline).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isDeadlineSoon = (deadline: string | null) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading opportunities...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="opportunity-hub" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Opportunity Hub
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover real opportunities curated for diaspora communities and global collaboration
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search opportunities, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="investment">Investment</SelectItem>
              <SelectItem value="collaboration">Collaboration</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="public">Public Sector</SelectItem>
              <SelectItem value="private">Private Sector</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredOpportunities.length} of {opportunities.length} opportunities
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => {
            const IconComponent = categoryIcons[opportunity.category as keyof typeof categoryIcons] || Star;
            return (
              <Card 
                key={opportunity.id}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 relative overflow-hidden"
              >
                {opportunity.is_featured && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-accent text-accent-foreground rounded-none rounded-bl-lg">
                      Featured
                    </Badge>
                  </div>
                )}
                
                {opportunity.deadline && isDeadlineSoon(opportunity.deadline) && (
                  <div className="absolute top-0 left-0">
                    <Badge variant="destructive" className="rounded-none rounded-br-lg">
                      Deadline Soon
                    </Badge>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryColors[opportunity.category]} p-2.5 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-full h-full text-white" />
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {opportunity.sector}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {opportunity.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3 font-medium">
                    {opportunity.company_name}
                    {opportunity.business_sector && (
                      <span className="text-xs ml-2 text-muted-foreground/80">
                        • {opportunity.business_sector}
                      </span>
                    )}
                  </p>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                    {opportunity.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {opportunity.location && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {opportunity.location}
                      </div>
                    )}
                    
                    {opportunity.salary_range && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="w-4 h-4 mr-2 text-center">£</span>
                        {opportunity.salary_range}
                      </div>
                    )}
                    
                    {opportunity.deadline && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        Deadline: {formatDeadline(opportunity.deadline)}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {opportunity.website_url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(opportunity.website_url!, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Visit
                      </Button>
                    )}
                    {opportunity.contact_email && (
                      <Button 
                        size="sm"
                        className="flex-1"
                        onClick={() => window.open(`mailto:${opportunity.contact_email}`, '_blank')}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Badge variant="secondary" className="capitalize text-xs">
                      {opportunity.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No opportunities found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedSector("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OpportunityHub;