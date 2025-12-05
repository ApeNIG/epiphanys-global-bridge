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
      date: "March 15 2026",
      location: "London ExCeL",
      attendees: "1,200+ expected",
      focus: "Investment & Partnership Opportunities"
    },
    {
      title: "Cultural Heritage in Business",
      date: "March 22 2026", 
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
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Animated Background Layers with Epiphiny Colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-cool-grey/80 via-royal-blue/5 to-emerald-green/5 dark:from-deep-navy/90 dark:via-royal-blue/20 dark:to-emerald-green/10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-magenta/10 to-royal-blue/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          
          {/* Floating Elements with Brand Colors */}
          <div className="absolute top-32 right-1/4 w-3 h-3 bg-emerald-green rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-sunset-orange rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
          <div className="absolute top-1/3 left-1/6 w-4 h-4 bg-magenta/60 rounded-full animate-bounce" style={{animationDelay: '2.5s'}} />
        </div>
        
        <div className="relative container mx-auto text-center z-10">
          {/* Enhanced Badge with Icon Animation */}
          <Badge className="mb-8 bg-gradient-to-r from-cool-grey to-royal-blue/10 text-deep-navy border-0 shadow-elegant hover:shadow-glow transition-all duration-300 px-6 py-2 font-semibold">
            <Users className="w-4 h-4 mr-2 animate-pulse text-royal-blue" />
            Create your local, national and global community
          </Badge>
          
          {/* Enhanced Typography with Epiphiny Brand Gradients */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
            Where Cultural Heritage
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Meets Economic Opportunity
            </span>
          </h1>
          
          {/* Enhanced Description with Epiphiny Colors */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            Join the UK's largest diaspora-focused professional community. Connect with your roots while building your future through 
            <span className="text-emerald-green font-semibold"> authentic relationships</span> and 
            <span className="text-sunset-orange font-semibold"> shared experiences</span>.
          </p>
          
          {/* Enhanced CTA Buttons with Brand Colors */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:shadow-elegant text-white transition-all duration-300 transform hover:scale-105 px-8 py-4 font-semibold">
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/success-stories">
              <Button variant="outline" size="lg" className="border-2 border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white transform hover:scale-105 transition-all duration-300 px-8 py-4 font-semibold">
                <Star className="mr-2 h-5 w-5" />
                Explore Success Stories
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators with Brand Colors */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-green" />
              <span>Verified Community</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-royal-blue" />
              <span>47 Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gold-amber" />
              <span>Award Winning Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Community Stats with Epiphiny Colors */}
      <section className="py-24 px-4 bg-gradient-to-br from-cool-grey/30 to-royal-blue/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-emerald-green/10 to-royal-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-sunset-orange/10 to-gold-amber/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Community Impact
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join a thriving ecosystem of diaspora professionals making real impact across the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => {
              const brandStyles = [
                { gradient: 'bg-gradient-primary', shadow: 'shadow-elegant', icon: 'text-white' },
                { gradient: 'bg-gradient-success', shadow: 'shadow-glow', icon: 'text-white' },
                { gradient: 'bg-gradient-secondary', shadow: 'shadow-orange', icon: 'text-white' },
                { gradient: 'bg-gradient-community', shadow: 'shadow-community', icon: 'text-white' }
              ];
              const currentStyle = brandStyles[index % brandStyles.length];
              return (
                <Card key={index} className={`text-center hover:${currentStyle.shadow} transition-all duration-300 group relative overflow-hidden border-2 hover:border-gradient-subtle transform hover:scale-105`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <CardContent className="pt-8 pb-6 relative">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center ${currentStyle.gradient} ${currentStyle.shadow}`}>
                      <stat.icon className={`h-8 w-8 ${currentStyle.icon}`} />
                    </div>
                    <div className="text-4xl font-bold text-foreground mb-3">{stat.value}</div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
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
              {/* Enhanced Community Features with Epiphiny Colors */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-accent bg-clip-text text-transparent">
                  Why Diaspora Communities Choose Us
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto leading-relaxed">
                  We understand that your cultural heritage is your strength, not a barrier. Our platform amplifies your unique perspective and global networks.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {communityFeatures.map((feature, index) => {
                    const brandStyles = [
                      { gradient: 'bg-gradient-primary', shadow: 'shadow-elegant', hover: 'from-royal-blue/5 to-emerald-green/5', border: 'border-royal-blue/20' },
                      { gradient: 'bg-gradient-success', shadow: 'shadow-glow', hover: 'from-emerald-green/5 to-sunset-orange/5', border: 'border-emerald-green/20' },
                      { gradient: 'bg-gradient-secondary', shadow: 'shadow-orange', hover: 'from-sunset-orange/5 to-gold-amber/5', border: 'border-sunset-orange/20' },
                      { gradient: 'bg-gradient-community', shadow: 'shadow-community', hover: 'from-magenta/5 to-royal-blue/5', border: 'border-magenta/20' }
                    ];
                    const currentStyle = brandStyles[index % brandStyles.length];
                    return (
                      <Card key={index} className={`hover:${currentStyle.shadow} transition-all duration-300 group relative overflow-hidden border-2 ${currentStyle.border} hover:scale-105`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentStyle.hover} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <CardHeader className="relative pb-3">
                          <div className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center ${currentStyle.gradient} ${currentStyle.shadow}`}>
                            <feature.icon className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="text-xl font-bold text-deep-navy">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="relative pt-0">
                          <CardDescription className="text-muted-foreground leading-relaxed">{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Core Values Section */}
              <div className="bg-gradient-to-br from-cool-grey/20 to-royal-blue/5 dark:from-deep-navy/20 dark:to-royal-blue/10 rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute inset-0">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-emerald-green/10 to-royal-blue/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-sunset-orange/10 to-magenta/10 rounded-full blur-3xl" />
                </div>
                
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-premium bg-clip-text text-transparent">
                    Our Community Values
                  </h3>
                  <div className="grid md:grid-cols-3 gap-10">
                    <div className="text-center group">
                      <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant group-hover:scale-110 transition-transform duration-300">
                        <Heart className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="font-bold mb-4 text-xl text-deep-navy">Cultural Pride</h4>
                      <p className="text-muted-foreground leading-relaxed">Celebrate and leverage your heritage as a competitive advantage in the global economy.</p>
                    </div>
                    <div className="text-center group">
                      <div className="w-20 h-20 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                        <Handshake className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="font-bold mb-4 text-xl text-deep-navy">Authentic Connection</h4>
                      <p className="text-muted-foreground leading-relaxed">Build meaningful relationships based on shared experiences and mutual understanding.</p>
                    </div>
                    <div className="text-center group">
                      <div className="w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-orange group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="h-10 w-10 text-white" />
                      </div>
                      <h4 className="font-bold mb-4 text-xl text-deep-navy">Inclusive Growth</h4>
                      <p className="text-muted-foreground leading-relaxed">Create opportunities that benefit both individual success and community advancement.</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="regions" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-coral-600 via-lavender-600 to-mint-600 bg-clip-text text-transparent">
                  Thriving Diaspora Communities
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Each region brings unique strengths, networks, and opportunities to our global community. 
                  Discover the power of cultural connection and professional growth.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {diasporaRegions.map((region, index) => (
                  <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 border-2 border-transparent hover:border-gradient-subtle">
                    {/* Animated Top Border */}
                    <div className={`h-3 ${region.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    </div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`w-3 h-3 rounded-full ${region.color} animate-pulse`} />
                            <CardTitle className="text-xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent font-bold">
                              {region.name}
                            </CardTitle>
                          </div>
                          <CardDescription className="text-base leading-relaxed">{region.featured}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 font-semibold shadow-soft">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {region.growth} growth
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-muted to-accent rounded-full flex items-center justify-center shadow-soft">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <span className="font-bold text-lg text-foreground">{region.members}</span>
                            <p className="text-sm text-muted-foreground">active members</p>
                          </div>
                        </div>
                        <Link to="/auth">
                          <Button variant="outline" size="sm" className="hover:bg-gradient-to-r hover:from-coral-50 hover:to-lavender-50 transform hover:scale-105 transition-all duration-300 px-6">
                            Join Community
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-coral-600 via-lavender-600 to-mint-600 bg-clip-text text-transparent">
                  Success Stories That Inspire
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Real people, real journeys, real impact. See how our community members have transformed opportunities into success through authentic connections and cultural pride.
                </p>
              </div>
              <div className="space-y-8">
                {successStories.map((story, index) => (
                  <Card key={index} className="group hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-1 border-2 border-transparent hover:border-gradient-subtle overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-coral-500 via-lavender-500 to-mint-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    
                    <CardContent className="p-8 relative">
                      <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3 space-y-4">
                          {/* Profile Section */}
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-coral-100 to-lavender-100 dark:from-coral-900 dark:to-lavender-900 rounded-full flex items-center justify-center shadow-soft">
                              <Star className="h-8 w-8 text-coral-600 dark:text-coral-400" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-foreground">{story.name}</h3>
                              <p className="text-primary font-semibold text-lg">{story.title}</p>
                            </div>
                          </div>
                          
                          {/* Origin Badge */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-mint-100 to-ocean-100 dark:from-mint-900 dark:to-ocean-900 rounded-full flex items-center justify-center shadow-soft">
                              <MapPin className="h-5 w-5 text-mint-600 dark:text-mint-400" />
                            </div>
                            <div>
                              <Badge variant="outline" className="px-4 py-2 bg-gradient-to-r from-mint-50 to-ocean-50 border-mint-200 text-mint-700 font-medium">
                                {story.origin}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="lg:w-2/3 space-y-6">
                          {/* Story Content */}
                          <div className="bg-gradient-to-r from-muted/30 to-accent/20 dark:from-muted/10 dark:to-accent/10 rounded-xl p-6">
                            <p className="text-foreground leading-relaxed text-base font-medium italic">
                              "{story.story}"
                            </p>
                          </div>
                          
                          {/* Impact Section */}
                          <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200/50 dark:border-green-800/30">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-full flex items-center justify-center shadow-soft">
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">Impact Achievement</h4>
                              <span className="font-medium text-green-700 dark:text-green-300">{story.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-premium bg-clip-text text-transparent">Connect & Collaborate</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Join our regular events designed to foster connections, share knowledge, and celebrate diaspora achievements across the globe.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => {
                  const brandStyles = [
                    { gradient: 'bg-gradient-primary', shadow: 'shadow-elegant', accent: 'royal-blue' },
                    { gradient: 'bg-gradient-success', shadow: 'shadow-glow', accent: 'emerald-green' },
                    { gradient: 'bg-gradient-secondary', shadow: 'shadow-orange', accent: 'sunset-orange' }
                  ];
                  const currentStyle = brandStyles[index % brandStyles.length];
                  return (
                    <Card key={index} className={`hover:${currentStyle.shadow} transition-all duration-300 transform hover:scale-105 border-2 hover:border-${currentStyle.accent}/20 group relative overflow-hidden`}>
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-royal-blue to-emerald-green" />
                      
                      <CardHeader className="pt-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-12 h-12 ${currentStyle.gradient} rounded-xl flex items-center justify-center ${currentStyle.shadow}`}>
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <Badge className="bg-gradient-to-r from-cool-grey to-royal-blue/10 text-deep-navy px-3 py-1 font-semibold">
                            Upcoming
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-deep-navy">{event.title}</CardTitle>
                        <CardDescription className="text-base font-medium">{event.focus}</CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-sm">
                            <div className={`w-8 h-8 ${currentStyle.gradient} rounded-lg flex items-center justify-center`}>
                              <Calendar className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 bg-gradient-success rounded-lg flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-8 h-8 bg-gradient-community rounded-lg flex items-center justify-center">
                              <Users className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{event.attendees}</span>
                          </div>
                          <Button className={`w-full mt-6 ${currentStyle.gradient} hover:${currentStyle.shadow} text-white font-semibold transform hover:scale-105 transition-all duration-300`}>
                            Register Now
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Enhanced Call to Action with Epiphiny Colors */}
      <section className="py-24 px-4 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-navy/95 backdrop-blur-sm" />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-magenta/15 to-royal-blue/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="container mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-accent bg-clip-text text-transparent">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Connect with thousands of diaspora professionals, entrepreneurs, and leaders who share your vision for 
            <span className="text-emerald-green font-semibold"> cultural pride</span> and 
            <span className="text-sunset-orange font-semibold"> economic success</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:shadow-elegant text-white transform hover:scale-105 transition-all duration-300 px-8 py-4 font-semibold">
                <Users className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-white hover:shadow-glow transform hover:scale-105 transition-all duration-300 px-8 py-4 font-semibold">
              <Globe className="w-5 h-5 mr-2" />
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