import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

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
  created_at?: string;
  updated_at?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile?.full_name?.[0] || user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">
                    {profile?.full_name || user?.user_metadata?.full_name || 'User Profile'}
                  </h1>
                  <p className="text-muted-foreground">{user?.email}</p>
                  {profile?.user_category && (
                    <Badge variant="secondary" className="mt-2">
                      {profile.user_category}
                    </Badge>
                  )}
                </div>
              </div>
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile Completion */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Profile Completion</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your profile to unlock more opportunities
                  </p>
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