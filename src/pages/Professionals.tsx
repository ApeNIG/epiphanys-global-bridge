import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2,
  Calendar,
  ExternalLink,
  Filter
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProfessionalOpportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  sector: string;
  location: string;
  company_name: string;
  contact_email?: string;
  website_url?: string;
  salary_range?: string;
  deadline?: string;
  is_featured?: boolean;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

const Professionals = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<ProfessionalOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSector, setSector] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [experienceLevel, setExperienceLevel] = useState<string>("");

  const categories = [
    "Career",
    "Business",
    "Investment", 
    "Partnership",
    "Internship",
    "Contract",
    "Freelance"
  ];

  const sectors = [
    "Technology/IT",
    "Financial Services", 
    "Healthcare",
    "Education",
    "Retail/E-commerce",
    "Manufacturing",
    "Real Estate",
    "Energy & Utilities",
    "Media & Entertainment",
    "Non-profit",
    "Government",
    "Consulting"
  ];

  const locations = [
    "London",
    "Manchester", 
    "Birmingham",
    "Glasgow",
    "Leeds",
    "Liverpool",
    "Remote",
    "Hybrid"
  ];

  const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level", 
    "Executive Level",
    "Graduate",
    "Internship"
  ];

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunities. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || opportunity.category === selectedCategory;
    const matchesSector = !selectedSector || opportunity.sector === selectedSector;
    const matchesLocation = !selectedLocation || opportunity.location?.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesSector && matchesLocation;
  });

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isDeadlineSoon = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff <= 7 && daysDiff > 0;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSector("");
    setSelectedLocation("");
    setExperienceLevel("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading professional opportunities...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Professional Opportunities
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover career opportunities, partnerships, and professional development programs 
            tailored for diaspora professionals and global talent.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-2 mb-6">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Filter Opportunities</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sector">Sector</Label>
              <Select value={selectedSector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="All sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sectors</SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All levels</SelectItem>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredOpportunities.length} of {opportunities.length} opportunities
            </p>
            <Button variant="outline" onClick={clearFilters} size="sm">
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No opportunities found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search criteria to find opportunities.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 line-clamp-2">
                          {opportunity.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Building2 className="w-4 h-4 mr-1" />
                          {opportunity.company_name}
                        </div>
                      </div>
                      {opportunity.is_featured && (
                        <Badge variant="secondary" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{opportunity.category}</Badge>
                      <Badge variant="outline">{opportunity.sector}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-3 mb-4">
                      {opportunity.description}
                    </CardDescription>
                    
                    <div className="space-y-2 mb-4">
                      {opportunity.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {opportunity.location}
                        </div>
                      )}
                      
                      {opportunity.salary_range && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <DollarSign className="w-4 h-4 mr-2" />
                          {opportunity.salary_range}
                        </div>
                      )}
                      
                      {opportunity.deadline && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Deadline: {formatDeadline(opportunity.deadline)}</span>
                          {isDeadlineSoon(opportunity.deadline) && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              Soon
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {opportunity.website_url && (
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <a 
                            href={opportunity.website_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                          </a>
                        </Button>
                      )}
                      
                      <Button asChild size="sm" className="flex-1">
                        <a 
                          href={`mailto:${opportunity.contact_email || 'contact@example.com'}?subject=Application for ${opportunity.title}`}
                          className="flex items-center gap-2"
                        >
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Professionals;