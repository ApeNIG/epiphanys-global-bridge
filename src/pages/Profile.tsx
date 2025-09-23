import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  User, 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  Calendar,
  Edit,
  Briefcase,
  Target,
  Award,
  Clock,
  Upload,
  Camera,
  X,
  ChevronDown,
  FileText,
  TrendingUp,
  DollarSign,
  Users,
  Handshake,
  Heart,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  website?: string;
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
  profile_image_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface BusinessProfile {
  company: any;
  market: any;
  traction: any;
  funding: any;
  team: any;
  strategic_fit: any;
  impact: any;
}

interface ProfessionalProfile {
  id: string;
  professional_title?: string;
  years_experience?: string;
  current_employment_status?: string;
  availability?: string;
  core_skills?: string[];
  industry_expertise?: string[];
  certifications?: string;
  languages_spoken?: string[];
  work_type_preference?: string;
  location_preference?: string;
  salary_expectation?: string;
  willing_to_relocate?: boolean;
  notice_period?: string;
  highest_qualification?: string;
  university_institution?: string;
  professional_summary?: string;
  key_achievements?: string;
  start_date_availability?: string;
  interview_availability?: string;
  visa_status?: string;
  security_clearance?: string;
  references_available?: boolean;
  portfolio_website?: string;
  linkedin_profile?: string;
  diversity_background?: string;
  accessibility_requirements?: string;
  professional_memberships?: string;
  created_at?: string;
  updated_at?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [professionalProfile, setProfessionalProfile] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const shouldHighlightMissing = searchParams.get('highlight') === 'missing';

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBusinessProfile();
      fetchProfessionalProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
    } else if (data) {
      setProfile(data);
    }
    
    setLoading(false);
  };

  const fetchBusinessProfile = async () => {
    if (!user) return;

    try {
      // Fetch company data and related information
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (companyError && companyError.code !== 'PGRST116') {
        console.error('Error fetching company:', companyError);
        return;
      }

      if (!company) {
        setBusinessProfile(null);
        return;
      }

      // Fetch all related business data
      const [marketData, tractionData, fundingData, teamData, strategicFitData, impactData] = await Promise.all([
        supabase.from('company_market').select('*').eq('company_id', company.id).maybeSingle(),
        supabase.from('company_traction').select('*').eq('company_id', company.id).maybeSingle(),
        supabase.from('company_funding').select('*').eq('company_id', company.id).maybeSingle(),
        supabase.from('company_team').select('*').eq('company_id', company.id).maybeSingle(),
        supabase.from('company_strategic_fit').select('*').eq('company_id', company.id).maybeSingle(),
        supabase.from('company_impact').select('*').eq('company_id', company.id).maybeSingle(),
      ]);

      setBusinessProfile({
        company,
        market: marketData.data,
        traction: tractionData.data,
        funding: fundingData.data,
        team: teamData.data,
        strategic_fit: strategicFitData.data,
        impact: impactData.data,
      });
    } catch (error) {
      console.error('Error fetching business profile:', error);
    }
  };

  const fetchProfessionalProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('professional_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching professional profile:', error);
        return;
      }

      setProfessionalProfile(data);
    } catch (error) {
      console.error('Error fetching professional profile:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error", 
        description: "Image must be less than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadingImage(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file, { 
          upsert: true,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(fileName);

      // Update profile with new image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          profile_image_url: publicUrl,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      // Update local state
      setProfile(prev => prev ? { ...prev, profile_image_url: publicUrl } : null);

      toast({
        title: "Success",
        description: "Profile image updated successfully!",
        variant: "default"
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeImage = async () => {
    if (!user || !profile?.profile_image_url) return;

    setUploadingImage(true);

    try {
      // Remove from storage
      const fileName = `${user.id}/profile.${profile.profile_image_url.split('.').pop()}`;
      await supabase.storage
        .from('profile-images')
        .remove([fileName]);

      // Update profile to remove image URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          profile_image_url: null,
          updated_at: new Date().toISOString()
        });

      if (updateError) throw updateError;

      // Update local state
      setProfile(prev => prev ? { ...prev, profile_image_url: undefined } : null);

      toast({
        title: "Success",
        description: "Profile image removed successfully!",
        variant: "default"
      });

    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  const completionPercentage = () => {
    if (!profile) return 0;
    const fields = [
      profile.full_name,
      profile.business_name, 
      profile.business_sector,
      profile.user_category,
      profile.location,
      profile.bio,
      profile.investment_stage
    ];
    const completedFields = fields.filter(field => field && field.toString().trim() !== '').length;
    return Math.round((completedFields / fields.length) * 100);
  };

  const getMissingFields = () => {
    if (!profile) return [];
    const fieldLabels = [
      { key: 'full_name', label: 'Full Name', value: profile.full_name },
      { key: 'business_name', label: 'Business Name', value: profile.business_name },
      { key: 'business_sector', label: 'Business Sector', value: profile.business_sector },
      { key: 'user_category', label: 'User Category', value: profile.user_category },
      { key: 'location', label: 'Location', value: profile.location },
      { key: 'bio', label: 'Bio', value: profile.bio },
      { key: 'investment_stage', label: 'Investment Stage', value: profile.investment_stage }
    ];
    return fieldLabels.filter(field => !field.value || field.value.toString().trim() === '');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {profile?.profile_image_url ? (
                    <img 
                      src={profile.profile_image_url} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {profile?.full_name?.[0] || user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer group">
                    <Camera 
                      className="w-6 h-6 text-white" 
                      onClick={() => fileInputRef.current?.click()}
                    />
                  </div>

                  {/* Remove button */}
                  {profile?.profile_image_url && (
                    <button
                      onClick={removeImage}
                      disabled={uploadingImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-white hover:bg-destructive/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />

                <div>
                  <h1 className="text-3xl font-bold">
                    {profile?.full_name || user?.user_metadata?.full_name || 'User Profile'}
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {profile?.user_category && (
                      <Badge variant="secondary">
                        {profile.user_category}
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      {uploadingImage ? 'Uploading...' : 'Change Photo'}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/dashboard">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Business Profile
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border z-50">
                    <DropdownMenuItem asChild>
                      <Link to="/business-onboarding" className="w-full cursor-pointer">
                        Complete Detailed Business Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/professionals" className="w-full cursor-pointer">
                        Complete Professional Profile
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <Card className={`mb-6 ${shouldHighlightMissing ? 'ring-2 ring-primary/50 ring-offset-2' : ''}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Profile Completion</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your profile to unlock more opportunities
                  </p>
                  {shouldHighlightMissing && completionPercentage() < 100 && (
                    <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm font-medium text-primary mb-2">Missing Information:</p>
                      <div className="space-y-1">
                        {getMissingFields().map((field) => (
                          <div key={field.key} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-destructive rounded-full"></div>
                            {field.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{completionPercentage()}%</div>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${completionPercentage()}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Main Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-sm">{profile?.full_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Username</label>
                      <p className="text-sm">{profile?.username || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-sm">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-sm flex items-center gap-1">
                        {profile?.location ? (
                          <>
                            <MapPin className="w-3 h-3" />
                            {profile.location}
                          </>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {profile?.website && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Website</label>
                      <p className="text-sm flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {profile.website}
                        </a>
                      </p>
                    </div>
                  )}

                  {profile?.bio && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Bio</label>
                      <p className="text-sm">{profile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Business Information */}
              {(profile?.business_name || profile?.business_sector || profile?.investment_stage) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Business Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profile.business_name && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                          <p className="text-sm">{profile.business_name}</p>
                        </div>
                      )}
                      {profile.business_sector && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Business Sector</label>
                          <p className="text-sm">{profile.business_sector}</p>
                        </div>
                      )}
                      {profile.investment_stage && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Investment Stage</label>
                          <p className="text-sm">{profile.investment_stage}</p>
                        </div>
                      )}
                      {profile.company_size && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Company Size</label>
                          <p className="text-sm">{profile.company_size}</p>
                        </div>
                      )}
                    </div>
                    
                    {profile.years_of_experience && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Years of Experience</label>
                        <p className="text-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {profile.years_of_experience} years
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                )}

              {/* Detailed Business Profile */}
              {businessProfile?.company && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Detailed Business Profile
                    </CardTitle>
                    <CardDescription>
                      Complete business information from questionnaire
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Company Profile */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        Company Profile
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                          <p className="text-sm">{businessProfile.company.name}</p>
                        </div>
                        {businessProfile.company.website && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Website</label>
                            <p className="text-sm">
                              <a href={businessProfile.company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {businessProfile.company.website}
                              </a>
                            </p>
                          </div>
                        )}
                        {businessProfile.company.location && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">HQ Location</label>
                            <p className="text-sm">{businessProfile.company.location}</p>
                          </div>
                        )}
                        {businessProfile.company.year_founded && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Year Founded</label>
                            <p className="text-sm">{businessProfile.company.year_founded}</p>
                          </div>
                        )}
                        {businessProfile.company.legal_structure && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Legal Structure</label>
                            <p className="text-sm">{businessProfile.company.legal_structure.replace(/_/g, ' ')}</p>
                          </div>
                        )}
                        {businessProfile.company.stage && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Stage</label>
                            <p className="text-sm">
                              <Badge variant="secondary">{businessProfile.company.stage.replace(/_/g, ' ')}</Badge>
                            </p>
                          </div>
                        )}
                        {businessProfile.company.sector && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Sector</label>
                            <p className="text-sm">{businessProfile.company.sector}</p>
                          </div>
                        )}
                        {businessProfile.company.business_model && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Business Model</label>
                            <p className="text-sm">{businessProfile.company.business_model}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Market & Offering */}
                    {businessProfile.market && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Market & Offering
                        </h4>
                        <div className="space-y-3 pl-6">
                          {businessProfile.market.problem_statement && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Problem Statement</label>
                              <p className="text-sm">{businessProfile.market.problem_statement}</p>
                            </div>
                          )}
                          {businessProfile.market.target_customers && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Target Customers</label>
                              <p className="text-sm">{businessProfile.market.target_customers}</p>
                            </div>
                          )}
                          {businessProfile.market.usp && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Key Differentiator</label>
                              <p className="text-sm">{businessProfile.market.usp}</p>
                            </div>
                          )}
                          {businessProfile.market.current_markets && businessProfile.market.current_markets.length > 0 && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Current Markets</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.market.current_markets.map((market: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">{market}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {businessProfile.market.desired_markets && businessProfile.market.desired_markets.length > 0 && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Expansion Markets</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.market.desired_markets.map((market: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{market}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Traction */}
                    {businessProfile.traction && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Traction
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                          {businessProfile.traction.revenue_model && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Revenue Model</label>
                              <p className="text-sm">{businessProfile.traction.revenue_model}</p>
                            </div>
                          )}
                          {businessProfile.traction.revenue_range && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Annual Revenue</label>
                              <p className="text-sm">
                                <Badge variant="outline">{businessProfile.traction.revenue_range}</Badge>
                              </p>
                            </div>
                          )}
                          {businessProfile.traction.customers !== null && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Customers</label>
                              <p className="text-sm">{businessProfile.traction.customers > 0 ? 'Yes' : 'No'}</p>
                            </div>
                          )}
                          {businessProfile.traction.awards && businessProfile.traction.awards.length > 0 && (
                            <div className="md:col-span-2">
                              <label className="text-sm font-medium text-muted-foreground">Awards & Recognition</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.traction.awards.map((award: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{award}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Funding */}
                    {businessProfile.funding && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Funding
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                          {businessProfile.funding.previous_funding && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Previous Funding</label>
                              <p className="text-sm">{businessProfile.funding.previous_funding}</p>
                            </div>
                          )}
                          {businessProfile.funding.current_funding_goal && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Current Goal</label>
                              <p className="text-sm">
                                <Badge variant="outline">{businessProfile.funding.current_funding_goal}</Badge>
                              </p>
                            </div>
                          )}
                          {businessProfile.funding.funding_type && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Funding Type</label>
                              <p className="text-sm">{businessProfile.funding.funding_type}</p>
                            </div>
                          )}
                          {businessProfile.funding.use_of_funds && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Use of Funds</label>
                              <p className="text-sm">{businessProfile.funding.use_of_funds}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Team */}
                    {businessProfile.team && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Team
                        </h4>
                        <div className="space-y-3 pl-6">
                          {businessProfile.team.founder_name && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Founders & Roles</label>
                              <p className="text-sm">{businessProfile.team.founder_name}</p>
                            </div>
                          )}
                          {businessProfile.team.team_size && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Team Size</label>
                              <p className="text-sm">{businessProfile.team.team_size} people</p>
                            </div>
                          )}
                          {businessProfile.team.advisors && businessProfile.team.advisors.length > 0 && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Advisory Board</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.team.advisors.map((advisor: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">{advisor}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Strategic Fit */}
                    {businessProfile.strategic_fit && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Handshake className="w-4 h-4" />
                          Strategic Fit
                        </h4>
                        <div className="space-y-3 pl-6">
                          {businessProfile.strategic_fit.investor_type && businessProfile.strategic_fit.investor_type.length > 0 && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Seeking Investors</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.strategic_fit.investor_type.map((type: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{type}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {businessProfile.strategic_fit.preferred_investor_location && businessProfile.strategic_fit.preferred_investor_location.length > 0 && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Preferred Geography</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.strategic_fit.preferred_investor_location.map((location: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">{location}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {businessProfile.strategic_fit.partnership_interest && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Partnership Interest</label>
                              <p className="text-sm">{businessProfile.strategic_fit.partnership_interest}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Impact & Values */}
                    {businessProfile.impact && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Impact & Values
                        </h4>
                        <div className="space-y-3 pl-6">
                          {businessProfile.impact.sdg_alignment && businessProfile.impact.sdg_alignment.length > 0 && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">ESG/SDG Alignment</label>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {businessProfile.impact.sdg_alignment.map((goal: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">{goal}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {businessProfile.impact.diversity_inclusion && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Diversity & Inclusion</label>
                              <p className="text-sm">{businessProfile.impact.diversity_inclusion}</p>
                            </div>
                          )}
                          {businessProfile.impact.mission_driven !== null && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Mission-Driven</label>
                              <p className="text-sm">
                                <Badge variant={businessProfile.impact.mission_driven ? "default" : "outline"}>
                                  {businessProfile.impact.mission_driven ? "Yes" : "No"}
                                </Badge>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </CardContent>
                </Card>
              )}

              {/* Professional Profile */}
              {professionalProfile && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Professional Profile
                    </CardTitle>
                    <CardDescription>
                      Detailed professional information and career preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Professional Identity */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Professional Identity
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                        {professionalProfile.professional_title && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Professional Title</label>
                            <p className="text-sm">{professionalProfile.professional_title}</p>
                          </div>
                        )}
                        {professionalProfile.years_experience && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Years of Experience</label>
                            <p className="text-sm">
                              <Badge variant="secondary">{professionalProfile.years_experience}</Badge>
                            </p>
                          </div>
                        )}
                        {professionalProfile.current_employment_status && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Employment Status</label>
                            <p className="text-sm">{professionalProfile.current_employment_status}</p>
                          </div>
                        )}
                        {professionalProfile.work_type_preference && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Work Preference</label>
                            <p className="text-sm">{professionalProfile.work_type_preference}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Skills & Expertise */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Skills & Expertise
                      </h4>
                      <div className="space-y-3 pl-6">
                        {professionalProfile.core_skills && professionalProfile.core_skills.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Core Skills</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {professionalProfile.core_skills.map((skill: string, index: number) => (
                                <Badge key={index} variant="default" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {professionalProfile.industry_expertise && professionalProfile.industry_expertise.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Industry Expertise</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {professionalProfile.industry_expertise.map((industry: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">{industry}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {professionalProfile.certifications && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Certifications</label>
                            <p className="text-sm">{professionalProfile.certifications}</p>
                          </div>
                        )}
                        {professionalProfile.languages_spoken && professionalProfile.languages_spoken.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Languages</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {professionalProfile.languages_spoken.map((language: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">{language}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Work Preferences */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Work Preferences
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                        {professionalProfile.location_preference && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Location Preference</label>
                            <p className="text-sm">{professionalProfile.location_preference}</p>
                          </div>
                        )}
                        {professionalProfile.salary_expectation && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Salary Expectation</label>
                            <p className="text-sm">
                              <Badge variant="outline">{professionalProfile.salary_expectation}</Badge>
                            </p>
                          </div>
                        )}
                        {professionalProfile.willing_to_relocate !== null && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Willing to Relocate</label>
                            <p className="text-sm">
                              <Badge variant={professionalProfile.willing_to_relocate ? "default" : "secondary"}>
                                {professionalProfile.willing_to_relocate ? "Yes" : "No"}
                              </Badge>
                            </p>
                          </div>
                        )}
                        {professionalProfile.notice_period && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Notice Period</label>
                            <p className="text-sm">{professionalProfile.notice_period}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Education & Background */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Education & Background
                      </h4>
                      <div className="space-y-3 pl-6">
                        {professionalProfile.highest_qualification && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Highest Qualification</label>
                            <p className="text-sm">{professionalProfile.highest_qualification}</p>
                          </div>
                        )}
                        {professionalProfile.university_institution && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">University/Institution</label>
                            <p className="text-sm">{professionalProfile.university_institution}</p>
                          </div>
                        )}
                        {professionalProfile.professional_summary && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Professional Summary</label>
                            <p className="text-sm">{professionalProfile.professional_summary}</p>
                          </div>
                        )}
                        {professionalProfile.key_achievements && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Key Achievements</label>
                            <p className="text-sm">{professionalProfile.key_achievements}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* References & Portfolio */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        References & Portfolio
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-6">
                        {professionalProfile.references_available !== null && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">References Available</label>
                            <p className="text-sm">
                              <Badge variant={professionalProfile.references_available ? "default" : "secondary"}>
                                {professionalProfile.references_available ? "Yes" : "No"}
                              </Badge>
                            </p>
                          </div>
                        )}
                        {professionalProfile.portfolio_website && (
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Portfolio Website</label>
                            <p className="text-sm">
                              <a href={professionalProfile.portfolio_website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {professionalProfile.portfolio_website}
                              </a>
                            </p>
                          </div>
                        )}
                        {professionalProfile.linkedin_profile && (
                          <div className="md:col-span-2">
                            <label className="text-sm font-medium text-muted-foreground">LinkedIn Profile</label>
                            <p className="text-sm">
                              <a href={professionalProfile.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                {professionalProfile.linkedin_profile}
                              </a>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Information */}
                    {(professionalProfile.diversity_background || professionalProfile.accessibility_requirements || professionalProfile.professional_memberships) && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Additional Information
                        </h4>
                        <div className="space-y-3 pl-6">
                          {professionalProfile.diversity_background && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Diversity Background</label>
                              <p className="text-sm">{professionalProfile.diversity_background}</p>
                            </div>
                          )}
                          {professionalProfile.accessibility_requirements && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Accessibility Requirements</label>
                              <p className="text-sm">{professionalProfile.accessibility_requirements}</p>
                            </div>
                          )}
                          {professionalProfile.professional_memberships && (
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Professional Memberships</label>
                              <p className="text-sm">{professionalProfile.professional_memberships}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </CardContent>
                </Card>
              )}

              {/* Interests */}
              {profile?.interests && profile.interests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Areas of Interest
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Quick Info & Actions */}
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Member since</span>
                    <span className="text-sm">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profile updated</span>
                    <span className="text-sm">
                      {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Completion</span>
                    <span className="text-sm font-medium">{completionPercentage()}%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/dashboard" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link to="/opportunities" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Briefcase className="w-4 h-4 mr-2" />
                      View Opportunities
                    </Button>
                  </Link>
                  <Link to="/community" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Join Community
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user?.email}</span>
                  </div>
                  {profile?.website && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Website
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;