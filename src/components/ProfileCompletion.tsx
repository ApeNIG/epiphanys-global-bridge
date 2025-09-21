import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, User, Target, Globe } from "lucide-react";

interface ProfileData {
  business_name?: string;
  investment_stage?: string;
  business_sector?: string;
  interests?: string[];
  user_category?: string;
  location?: string;
  bio?: string;
  years_of_experience?: number;
  company_size?: string;
  funding_raised?: string;
}

const ProfileCompletion = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({});

  const investmentStages = [
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B", 
    "Series C+",
    "Growth Stage",
    "IPO Ready",
    "Not Applicable"
  ];

  const businessSectors = [
    "Technology",
    "Healthcare",
    "Finance", 
    "Education",
    "Retail",
    "Manufacturing",
    "Real Estate",
    "Energy",
    "Agriculture",
    "Creative Industries",
    "Professional Services",
    "Other"
  ];

  const userCategories = [
    "Start-up",
    "Investor", 
    "Scale-up",
    "SME",
    "Enterprise",
    "Professional",
    "Professional Services"
  ];

  const companySizes = [
    "Solo (1)",
    "Small (2-10)",
    "Medium (11-50)", 
    "Large (51-200)",
    "Enterprise (200+)"
  ];

  const interestOptions = [
    "Angel Investment",
    "Venture Capital",
    "Business Partnerships",
    "Career Opportunities",
    "Mentorship",
    "Networking",
    "Market Expansion",
    "Technology Innovation",
    "Sustainability",
    "Social Impact"
  ];

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (data) {
      setProfileData({
        business_name: data.business_name || '',
        investment_stage: data.investment_stage || '',
        business_sector: data.business_sector || '',
        interests: data.interests || [],
        user_category: data.user_category || '',
        location: data.location || '',
        bio: data.bio || '',
        years_of_experience: data.years_of_experience || 0,
        company_size: data.company_size || '',
        funding_raised: data.funding_raised || ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...profileData,
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
      console.error('Error updating profile:', error);
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
        variant: "default"
      });
    }
    
    setLoading(false);
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = profileData.interests || [];
    if (checked) {
      setProfileData({
        ...profileData,
        interests: [...currentInterests, interest]
      });
    } else {
      setProfileData({
        ...profileData,
        interests: currentInterests.filter(i => i !== interest)
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Complete Your Profile
        </CardTitle>
        <CardDescription>
          Help us personalize your experience by providing more details about your business and interests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Business Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">Business Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_name">Business/Organization Name</Label>
                <Input
                  id="business_name"
                  value={profileData.business_name || ''}
                  onChange={(e) => setProfileData({...profileData, business_name: e.target.value})}
                  placeholder="Enter your business name"
                />
              </div>
              
              <div>
                <Label htmlFor="user_category">Organization Type</Label>
                <Select 
                  value={profileData.user_category || ''} 
                  onValueChange={(value) => setProfileData({...profileData, user_category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {userCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="business_sector">Business Sector</Label>
                <Select 
                  value={profileData.business_sector || ''} 
                  onValueChange={(value) => setProfileData({...profileData, business_sector: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessSectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="investment_stage">Investment Stage</Label>
                <Select 
                  value={profileData.investment_stage || ''} 
                  onValueChange={(value) => setProfileData({...profileData, investment_stage: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="company_size">Company Size</Label>
                <Select 
                  value={profileData.company_size || ''} 
                  onValueChange={(value) => setProfileData({...profileData, company_size: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="years_of_experience">Years of Experience</Label>
                <Input
                  id="years_of_experience"
                  type="number"
                  value={profileData.years_of_experience || ''}
                  onChange={(e) => setProfileData({...profileData, years_of_experience: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location || ''}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">Areas of Interest</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={profileData.interests?.includes(interest) || false}
                    onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                  />
                  <Label htmlFor={interest} className="text-sm">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold">About You</h3>
            </div>
            
            <div>
              <Label htmlFor="bio">Bio/Description</Label>
              <Textarea
                id="bio"
                value={profileData.bio || ''}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                placeholder="Tell us about yourself, your business, and your goals..."
                rows={4}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletion;