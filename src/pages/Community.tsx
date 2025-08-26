import { useState } from "react";
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
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary via-purple-600 to-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white/30">
            🌍 Diaspora-First Community Platform
          </Badge>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Where Cultural Heritage
            <br />
            Meets Economic Opportunity
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Join the UK's largest diaspora-focused professional community. Connect with your roots while building your future through authentic relationships and shared experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="ghost" className="text-white border-white/30 hover:bg-white/10">
              Explore Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
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
                <h2 className="text-3xl font-bold text-center mb-4">Why Diaspora Communities Choose Us</h2>
                <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                  We understand that your cultural heritage is your strength, not a barrier. Our platform amplifies your unique perspective and global networks.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {communityFeatures.map((feature, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <feature.icon className="h-10 w-10 text-primary mb-4" />
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Core Values */}
              <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-8">Our Community Values</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Cultural Pride</h4>
                    <p className="text-muted-foreground">Celebrate and leverage your heritage as a competitive advantage in the global economy.</p>
                  </div>
                  <div className="text-center">
                    <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Authentic Connection</h4>
                    <p className="text-muted-foreground">Build meaningful relationships based on shared experiences and mutual understanding.</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Inclusive Growth</h4>
                    <p className="text-muted-foreground">Create opportunities that benefit both individual success and community advancement.</p>
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
                        <Button variant="outline" size="sm">
                          Join Community
                        </Button>
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
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-purple-600">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Connect with thousands of diaspora professionals, entrepreneurs, and leaders who share your vision for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
              Start Your Journey
            </Button>
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