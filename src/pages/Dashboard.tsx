import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Globe, 
  ChevronRight,
  CheckCircle,
  Clock,
  Star,
  ArrowUpRight,
  Calendar,
  MessageCircle,
  BookOpen,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileCompletion from "@/components/ProfileCompletion";
import { OpportunityUploadForm } from "@/components/OpportunityUploadForm";
import { UserOpportunities } from "@/components/UserOpportunities";
import { NetworkConnector } from "@/components/NetworkConnector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProfileCompletion } from "@/hooks/useProfileCompletion";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const services = [
    {
      title: "Business Opportunities",
      description: "Discover vetted business partnerships, joint ventures, and growth opportunities.",
      icon: Building2,
      status: "Available",
      count: "2,500+ opportunities",
      progress: 75,
      color: "text-primary",
      link: "/opportunities"
    },
    {
      title: "Career Development",
      description: "Access exclusive job opportunities and professional development resources.",
      icon: Users,
      status: "Available", 
      count: "1,200+ positions",
      progress: 60,
      color: "text-accent",
      link: "/opportunities"
    },
    {
      title: "Investment Hub",
      description: "Connect with investors and explore funding opportunities for your ventures.",
      icon: TrendingUp,
      status: "Available",
      count: "£50M+ available",
      progress: 85,
      color: "text-secondary",
      link: "/investment-hub"
    },
    {
      title: "Global Network",
      description: "Join our worldwide diaspora community and expand your international reach.",
      icon: Globe,
      status: "Available",
      count: "50+ countries",
      progress: 90,
      color: "text-primary",
      link: "/global"
    }
  ];

  const recentActivities = [
    {
      title: "New investment opportunity in FinTech",
      description: "£2M Series A funding available",
      time: "2 hours ago",
      icon: TrendingUp,
      type: "Investment"
    },
    {
      title: "Business partnership in renewable energy",
      description: "Solar energy project in Ghana",
      time: "5 hours ago", 
      icon: Building2,
      type: "Business"
    },
    {
      title: "Career opportunity: Senior Developer",
      description: "Remote position with UK startup",
      time: "1 day ago",
      icon: Users,
      type: "Career"
    }
  ];

  const quickActions = [
    { title: "Schedule Advisory Call", icon: Calendar, link: "/advisory" },
    { title: "Join Community Discussion", icon: MessageCircle, link: "/community" },
    { title: "Browse Resources", icon: BookOpen, link: "/about" },
    { title: "Set Goals", icon: Target, link: "/goals" }
  ];

  const { percentage: profileCompletion } = useProfileCompletion();
  
  const userStats = {
    profileCompletion,
    connectionsCount: 24,
    opportunitiesViewed: 15,
    applicationsSubmitted: 3
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Welcome Header */}
      <section className="pt-24 pb-8 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-xl text-muted-foreground">
                Your journey to economic empowerment continues here
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Link to="/profile?highlight=missing">
                <Badge variant="secondary" className="text-sm px-3 py-1 cursor-pointer hover:bg-secondary/80 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Profile {userStats.profileCompletion}% Complete
                </Badge>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Connections</p>
                    <p className="text-2xl font-bold">{userStats.connectionsCount}</p>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Opportunities</p>
                    <p className="text-2xl font-bold">{userStats.opportunitiesViewed}</p>
                  </div>
                  <Target className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Applications</p>
                    <p className="text-2xl font-bold">{userStats.applicationsSubmitted}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>
            <Link to="/profile?highlight=missing">
              <Card className="cursor-pointer hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Profile</p>
                      <p className="text-2xl font-bold">{userStats.profileCompletion}%</p>
                    </div>
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <Progress value={userStats.profileCompletion} className="mt-2" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Your Services Overview</h2>
            <Link to="/opportunities">
              <Button variant="outline">
                View All
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <service.icon className={`w-8 h-8 ${service.color} flex-shrink-0`} />
                    <Badge variant="secondary">{service.status}</Badge>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      {service.count}
                    </span>
                    <span className="text-sm font-medium">{service.progress}% active</span>
                  </div>
                  <Progress value={service.progress} className="mb-4" />
                  <Link to={service.link}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explore {service.title}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity & Quick Actions */}
      <section className="py-12 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Recent Activity */}
            <div>
              <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start space-x-4">
                        <activity.icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{activity.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {activity.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {activity.description}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Network Connector */}
            <div>
              <h3 className="text-xl font-bold mb-6">Network & Connect</h3>
              <NetworkConnector />
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <Card className="hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <action.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h4 className="font-medium text-sm">{action.title}</h4>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Profile Completion Form */}
            <div className="mt-8">
              <ProfileCompletion />
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Management Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Manage Opportunities</h2>
            <p className="text-muted-foreground">Upload new opportunities and manage your existing listings.</p>
          </div>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="manage">Your Opportunities</TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-6">
              <OpportunityUploadForm onOpportunityCreated={() => {
                // Force refresh of public opportunities when a new one is created
                window.dispatchEvent(new CustomEvent('opportunitiesUpdated'));
              }} />
            </TabsContent>
            <TabsContent value="manage" className="mt-6">
              <UserOpportunities onOpportunityChange={() => {
                // Force refresh of public opportunities when status changes
                window.dispatchEvent(new CustomEvent('opportunitiesUpdated'));
              }} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;