import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Calendar, Globe, Edit2, Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  profileData: any;
  percentage: number;
  onEditProfile: () => void;
  onProfileUpdate?: () => void;
}

const ProfileHeader = ({ profileData, percentage, onEditProfile, onProfileUpdate }: ProfileHeaderProps) => {
  const { user } = useAuth();
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const handleImageUpload = async (
    file: File,
    type: "profile" | "cover",
    setLoading: (loading: boolean) => void
  ) => {
    if (!user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${type}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, file, {
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("profile-images").getPublicUrl(fileName);

      // Add cache-busting query param
      const urlWithCacheBust = `${publicUrl}?t=${Date.now()}`;

      // Update profile in database
      const updateField = type === "profile" ? "profile_image_url" : "avatar_url";
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ [updateField]: urlWithCacheBust })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: `${type === "profile" ? "Profile" : "Cover"} image updated!`,
      });

      // Trigger refresh
      onProfileUpdate?.();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, "profile", setUploadingProfile);
    }
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, "cover", setUploadingCover);
    }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg border border-border">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={profileImageInputRef}
        onChange={handleProfileImageChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={coverImageInputRef}
        onChange={handleCoverImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 relative overflow-hidden">
        {profileData.avatar_url && profileData.avatar_url.trim() !== "" && (
          <img
            src={profileData.avatar_url}
            alt="Cover"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
          onClick={() => coverImageInputRef.current?.click()}
          disabled={uploadingCover}
        >
          {uploadingCover ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Camera className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-6">
          <div className="relative">
            {profileData.profile_image_url && profileData.profile_image_url.trim() !== "" ? (
              <img
                src={profileData.profile_image_url}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-card shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-card shadow-xl">
                {profileData.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-0 right-0 bg-background border border-border rounded-full shadow-md hover:bg-muted"
              onClick={() => profileImageInputRef.current?.click()}
              disabled={uploadingProfile}
            >
              {uploadingProfile ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Name and Actions */}
        <div className="pt-20 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {profileData.full_name || user?.user_metadata?.full_name || "Your Name"}
              </h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {percentage}% Complete
              </Badge>
            </div>
            
            {profileData.business_name && (
              <p className="text-lg text-muted-foreground mt-1">
                {profileData.business_name}
              </p>
            )}
            
            {profileData.bio && (
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                {profileData.bio}
              </p>
            )}

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              {profileData.business_sector && (
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  <span>{profileData.business_sector}</span>
                </div>
              )}
              {profileData.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {profileData.website && (
                <a 
                  href={profileData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-primary hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>Joined {new Date(user?.created_at || "").toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
              </div>
            </div>

            {/* Interests */}
            {profileData.interests && profileData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {profileData.interests.slice(0, 5).map((interest: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {interest}
                  </Badge>
                ))}
                {profileData.interests.length > 5 && (
                  <Badge variant="outline" className="bg-muted/50">
                    +{profileData.interests.length - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={onEditProfile} variant="outline" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
