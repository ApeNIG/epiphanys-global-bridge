import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Target, Users, Briefcase, TrendingUp } from "lucide-react";
import { PrivacySettings } from "@/components/PrivacySettings";

interface ProfileSidebarProps {
  profileData: any;
  percentage: number;
  missingFields: { key: string; label: string; weight: number }[];
}

const ProfileSidebar = ({ profileData, percentage, missingFields }: ProfileSidebarProps) => {
  return (
    <div className="space-y-4">
      {/* Profile Strength */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="w-4 h-4 text-primary" />
            Profile Strength
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion</span>
              <span className="font-semibold text-primary">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {percentage >= 80
                ? "Your profile is well optimized!"
                : "Complete your profile to increase visibility"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Missing Fields */}
      {missingFields.length > 0 && (
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base text-accent">
              <AlertCircle className="w-4 h-4" />
              Boost Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {missingFields.slice(0, 4).map((field) => (
                <div key={field.key} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{field.label}</span>
                  <Badge variant="outline" className="text-xs">
                    +{field.weight}%
                  </Badge>
                </div>
              ))}
              {missingFields.length > 4 && (
                <p className="text-xs text-muted-foreground pt-1">
                  +{missingFields.length - 4} more fields to complete
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-4 h-4 text-primary" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Connections</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Briefcase className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="text-xl font-bold">0</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      {(profileData.company_size || profileData.years_of_experience || profileData.investment_stage) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Briefcase className="w-4 h-4 text-primary" />
              Business Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profileData.company_size && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Company Size</span>
                <span className="font-medium">{profileData.company_size}</span>
              </div>
            )}
            {profileData.years_of_experience && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">{profileData.years_of_experience} years</span>
              </div>
            )}
            {profileData.investment_stage && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Investment Stage</span>
                <span className="font-medium">{profileData.investment_stage}</span>
              </div>
            )}
            {profileData.funding_raised && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Funding Raised</span>
                <span className="font-medium">{profileData.funding_raised}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Privacy Settings */}
      <PrivacySettings />
    </div>
  );
};

export default ProfileSidebar;
