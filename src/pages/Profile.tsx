import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, Briefcase } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileCompletion from "@/components/ProfileCompletion";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileSidebar from "@/components/ProfileSidebar";
import PostsFeed from "@/components/PostsFeed";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { percentage, missingFields, profileData, loading } = useProfileCompletion();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Profile Header */}
          <ProfileHeader
            profileData={profileData}
            percentage={percentage}
            onEditProfile={() => setShowEditProfile(!showEditProfile)}
          />

          {/* Main Content */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <ProfileSidebar
                profileData={profileData}
                percentage={percentage}
                missingFields={missingFields}
              />
            </div>

            {/* Main Feed Area */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full bg-card border border-border mb-4">
                  <TabsTrigger value="posts" className="flex-1 gap-2">
                    <FileText className="w-4 h-4" />
                    Posts
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex-1 gap-2">
                    <Briefcase className="w-4 h-4" />
                    Activity
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex-1 gap-2">
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="mt-0">
                  <PostsFeed userId={user?.id} showCreatePost={true} />
                </TabsContent>

                <TabsContent value="activity" className="mt-0">
                  <PostsFeed showCreatePost={false} />
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <ProfileCompletion />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
