import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, User, Building2, MapPin, Calendar, Globe, Mail, Phone, Heart, Target, Zap, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileCompletion from "@/components/ProfileCompletion";
import BusinessProfileForm from "@/components/BusinessProfileForm";
import { PrivacySettings } from "@/components/PrivacySettings";
import { useSearchParams } from "react-router-dom";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

const Profile = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [showMissingFields, setShowMissingFields] = useState(false);
  const { percentage, missingFields, profileData, loading } = useProfileCompletion();

  useEffect(() => {
    const highlight = searchParams.get('highlight');
    if (highlight === 'missing') {
      setShowMissingFields(true);
      // Scroll to the missing fields section
      setTimeout(() => {
        const element = document.getElementById('missing-fields');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchParams]);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Profile Completion Status */}
      <section className="pt-24 py-8 px-4">
        <div className="container mx-auto">
          {showMissingFields && (
            <Alert id="missing-fields" className="mb-6 border-accent bg-accent/5">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Complete your profile to unlock more opportunities!</strong>
                <br />
                Missing fields: {missingFields.map(field => field.label).join(', ')}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Completion Form */}
            <div className="lg:col-span-2">
              <ProfileCompletion />
            </div>

            {/* Profile Overview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Overview
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {loading ? 'Loading...' : `${percentage}% Complete`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {profileData.profile_image_url ? (
                        <img 
                          src={profileData.profile_image_url} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full object-cover border-2 border-border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                          {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {profileData.business_name || user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                      </h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {profileData.business_sector || 'Business sector to be added'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {profileData.location || 'Location to be added'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Member since {new Date(user?.created_at || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Missing Fields Alert */}
              {missingFields.length > 0 && (
                <Card className="border-accent/50 bg-accent/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent">
                      <AlertCircle className="w-5 h-5" />
                      Missing Profile Information
                    </CardTitle>
                    <CardDescription>
                      Complete these fields to improve your profile visibility
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {missingFields.map((field, index) => (
                        <div key={field.key} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span>{field.label}</span>
                          <span className="ml-auto text-xs text-muted-foreground">
                            +{field.weight}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Progress Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Profile Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completion Status</span>
                      <Badge variant={percentage >= 80 ? "default" : "secondary"}>
                        {percentage}%
                      </Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {percentage >= 80 
                        ? "Excellent! Your profile is well completed." 
                        : "Complete more fields to improve your visibility."
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Privacy Settings */}
              <PrivacySettings />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;