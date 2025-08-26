import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Globe, 
  Heart, 
  Star, 
  MessageCircle, 
  Handshake, 
  TrendingUp, 
  Award,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const communityStats = [
    { label: "Active Members", value: "15,000+", icon: Users },
    { label: "Countries Represented", value: "47", icon: Globe },
    { label: "Success Stories", value: "2,500+", icon: Star },
    { label: "Monthly Connections", value: "8,000+", icon: Handshake },
  ];

  const diasporaRegions = [
    {
      name: "African Diaspora",
      members: "6,200+",
      growth: "+23%",
      featured: "Tech entrepreneurs from Nigeria, Kenya, Ghana",
      color: "bg-orange-500"
    },
    {
      name: "South Asian Diaspora", 
      members: "4,800+",
      growth: "+18%",
      featured: "Fintech innovators from India, Pakistan, Bangladesh",
      color: "bg-blue-500"
    },
    {
      name: "Caribbean Diaspora",
      members: "2,100+", 
      growth: "+31%",
      featured: "Creative industry leaders from Jamaica, Trinidad",
      color: "bg-green-500"
    },
    {
      name: "Middle Eastern Diaspora",
      members: "1,900+",
      growth: "+15%", 
      featured: "Healthcare professionals from Lebanon, Egypt",
      color: "bg-purple-500"
    }
  ];

  const successStories = [
    {
      name: "Amara Okafor",
      title: "Fintech Founder",
      origin: "Nigeria → London",
      story: "Connected with investors through our platform, raised £2M Series A for her mobile banking startup serving diaspora communities.",
      impact: "Now employs 45 people across Lagos and London"
    },
    {
      name: "Raj Patel", 
      title: "Social Enterprise Leader",
      origin: "India → Manchester",
      story: "Found government partnership opportunities, secured £500K grant for his education platform serving South Asian families.",
      impact: "Reaching 10,000+ students across the UK"
    },
    {
      name: "Sarah Al-Rashid",
      title: "Healthcare Innovation",
      origin: "Lebanon → Birmingham", 
      story: "Discovered collaboration opportunities with NHS trusts, launched telemedicine service for Arabic-speaking communities.",
      impact: "Serving 3,000+ patients monthly"
    }
  ];

  const communityFeatures = [
    {
      icon: MessageCircle,
      title: "Cultural Connect Groups",
      description: "Join region-specific communities to share experiences, opportunities, and cultural insights with fellow diaspora members."
    },
    {
      icon: Handshake,
      title: "Mentorship Networks", 
      description: "Connect with established professionals who understand your cultural background and can guide your UK journey."
    },
    {
      icon: TrendingUp,
      title: "Business Collaboration Hub",
      description: "Find partners who share your values and understand diaspora markets for authentic business growth."
    },
    {
      icon: Award,
      title: "Skills & Recognition",
      description: "Showcase international qualifications and get recognition for diverse experiences and cultural competencies."
    }
  ];

  const upcomingEvents = [
    {
      title: "Diaspora Business Summit 2024",
      date: "March 15, 2024",
      location: "London ExCeL",
      attendees: "1,200+ expected",
      focus: "Investment & Partnership Opportunities"
    },
    {
      title: "Cultural Heritage in Business",
      date: "March 22, 2024", 
      location: "Manchester Central",
      attendees: "500+ expected",
      focus: "Leveraging Cultural Capital"
    },
    {
      title: "Women in Diaspora Leadership",
      date: "April 5, 2024",
      location: "Birmingham ICC", 
      attendees: "800+ expected",
      focus: "Breaking Barriers Together"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coral-50/50 via-lavender-50/30 to-mint-50/50 dark:from-coral-950/20 dark:via-lavender-950/20 dark:to-mint-950/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-coral-400/20 to-sunset-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-lavender-400/20 to-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-mint-400/15 to-ocean-500/15 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto text-center z-10">
          <Badge className="mb-6 bg-gradient-to-r from-coral-100 to-lavender-100 text-foreground border-0 shadow-soft">
            <Users className="w-4 h-4 mr-2" />
            Diaspora-First Community Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-coral-600 via-lavender-600 to-mint-600 bg-clip-text text-transparent">
            Where Cultural Heritage
            <br />
            Meets Economic Opportunity
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the UK's largest diaspora-focused professional community. Connect with your roots while building your future through authentic relationships and shared experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-coral-500 to-sunset-600 hover:from-coral-600 hover:to-sunset-700 text-white shadow-sunset hover:shadow-xl transition-all duration-300">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-2 hover:bg-gradient-to-r hover:from-coral-50 hover:to-lavender-50">
              Explore Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  index === 0 ? 'from-coral-50/50 to-sunset-50/50 dark:from-coral-950/10 dark:to-sunset-950/10' :
                  index === 1 ? 'from-lavender-50/50 to-purple-50/50 dark:from-lavender-950/10 dark:to-purple-950/10' :
                  index === 2 ? 'from-mint-50/50 to-ocean-50/50 dark:from-mint-950/10 dark:to-ocean-950/10' :
                  'from-sunset-50/50 to-coral-50/50 dark:from-sunset-950/10 dark:to-coral-950/10'
                } opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardContent className="pt-6 relative">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-r from-coral-100 to-sunset-100 dark:from-coral-900 dark:to-sunset-900' :
                    index === 1 ? 'bg-gradient-to-r from-lavender-100 to-purple-100 dark:from-lavender-900 dark:to-purple-900' :
                    index === 2 ? 'bg-gradient-to-r from-mint-100 to-ocean-100 dark:from-mint-900 dark:to-ocean-900' :
                    'bg-gradient-to-r from-sunset-100 to-coral-100 dark:from-sunset-900 dark:to-coral-900'
                  }`}>
                    <stat.icon className={`h-6 w-6 ${
                      index === 0 ? 'text-coral-600 dark:text-coral-400' :
                      index === 1 ? 'text-lavender-600 dark:text-lavender-400' :
                      index === 2 ? 'text-mint-600 dark:text-mint-400' :
                      'text-sunset-600 dark:text-sunset-400'
                    }`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Community Overview</TabsTrigger>
              <TabsTrigger value="regions">Diaspora Regions</TabsTrigger>
              <TabsTrigger value="stories">Success Stories</TabsTrigger>
              <TabsTrigger value="events">Events & Networking</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-12">
              {/* Community Features */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-coral-600 via-lavender-600 to-mint-600 bg-clip-text text-transparent">
                  Why Diaspora Communities Choose Us
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                  We understand that your cultural heritage is your strength, not a barrier. Our platform amplifies your unique perspective and global networks.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {communityFeatures.map((feature, index) => (
                    <Card key={index} className="hover:shadow-elegant transition-all duration-300 group relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        index === 0 ? 'from-coral-50/50 to-sunset-50/50 dark:from-coral-950/10 dark:to-sunset-950/10' :
                        index === 1 ? 'from-lavender-50/50 to-purple-50/50 dark:from-lavender-950/10 dark:to-purple-950/10' :
                        index === 2 ? 'from-mint-50/50 to-ocean-50/50 dark:from-mint-950/10 dark:to-ocean-950/10' :
                        'from-sunset-50/50 to-coral-50/50 dark:from-sunset-950/10 dark:to-coral-950/10'
                      } opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <CardHeader className="relative">
                        <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center ${
                          index === 0 ? 'bg-gradient-to-r from-coral-100 to-sunset-100 dark:from-coral-900 dark:to-sunset-900' :
                          index === 1 ? 'bg-gradient-to-r from-lavender-100 to-purple-100 dark:from-lavender-900 dark:to-purple-900' :
                          index === 2 ? 'bg-gradient-to-r from-mint-100 to-ocean-100 dark:from-mint-900 dark:to-ocean-900' :
                          'bg-gradient-to-r from-sunset-100 to-coral-100 dark:from-sunset-900 dark:to-coral-900'
                        }`}>
                          <feature.icon className={`h-6 w-6 ${
                            index === 0 ? 'text-coral-600 dark:text-coral-400' :
                            index === 1 ? 'text-lavender-600 dark:text-lavender-400' :
                            index === 2 ? 'text-mint-600 dark:text-mint-400' :
                            'text-sunset-600 dark:text-sunset-400'
                          }`} />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-gradient-to-r from-coral-50/50 via-lavender-50/30 to-mint-50/50 dark:from-coral-950/10 dark:via-lavender-950/10 dark:to-mint-950/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-coral-600 via-lavender-600 to-mint-600 bg-clip-text text-transparent">
                    Our Community Values
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-coral-100 to-sunset-100 dark:from-coral-900 dark:to-sunset-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                        <Heart className="h-8 w-8 text-coral-600 dark:text-coral-400" />
                      </div>
                      <h4 className="font-semibold mb-2 text-lg">Cultural Pride</h4>
                      <p className="text-muted-foreground">Celebrate and leverage your heritage as a competitive advantage in the global economy.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-lavender-100 to-purple-100 dark:from-lavender-900 dark:to-purple-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                        <Handshake className="h-8 w-8 text-lavender-600 dark:text-lavender-400" />
                      </div>
                      <h4 className="font-semibold mb-2 text-lg">Authentic Connection</h4>
                      <p className="text-muted-foreground">Build meaningful relationships based on shared experiences and mutual understanding.</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-mint-100 to-ocean-100 dark:from-mint-900 dark:to-ocean-900 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                        <TrendingUp className="h-8 w-8 text-mint-600 dark:text-mint-400" />
                      </div>
                      <h4 className="font-semibold mb-2 text-lg">Inclusive Growth</h4>
                      <p className="text-muted-foreground">Create opportunities that benefit both individual success and community advancement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="regions" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Thriving Diaspora Communities</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Each region brings unique strengths, networks, and opportunities to our global community.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {diasporaRegions.map((region, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className={`h-2 ${region.color}`}></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{region.name}</CardTitle>
                          <CardDescription className="mt-2">{region.featured}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {region.growth} growth
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span className="font-semibold">{region.members} members</span>
                        </div>
                        <Link to="/auth">
                          <Button variant="outline" size="sm">
                            Join Community
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Success Stories That Inspire</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Real people, real journeys, real impact. See how our community members have transformed opportunities into success.
                </p>
              </div>
              <div className="space-y-6">
                {successStories.map((story, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <h3 className="font-bold text-lg">{story.name}</h3>
                          <p className="text-primary font-medium">{story.title}</p>
                          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{story.origin}</span>
                          </div>
                        </div>
                        <div className="md:w-2/3">
                          <p className="text-muted-foreground mb-4">{story.story}</p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="font-medium text-green-700">{story.impact}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Connect & Collaborate</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join our regular events designed to foster connections, share knowledge, and celebrate diaspora achievements.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <CardDescription>{event.focus}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{event.attendees}</span>
                        </div>
                        <Button className="w-full mt-4">
                          Register Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-coral-600 via-lavender-600 to-mint-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Community?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Connect with thousands of diaspora professionals, entrepreneurs, and leaders who share your vision for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90 shadow-lg">
                <Users className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Button size="lg" variant="ghost" className="text-white border-white/30 hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;