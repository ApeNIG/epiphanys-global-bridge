import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, TrendingUp, MapPin, ArrowRight, Building2, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Global = () => {
  const globalStats = [
    { label: "Countries Connected", value: "195+", icon: Globe },
    { label: "Diaspora Communities", value: "50M+", icon: Users },
    { label: "Cross-Border Opportunities", value: "10K+", icon: TrendingUp },
    { label: "Global Partners", value: "500+", icon: Building2 },
  ];

  const diasporaRegions = [
    {
      region: "Africa & Caribbean",
      communities: ["Nigerian", "Ghanaian", "Jamaican", "Barbadian", "Trinidadian", "Nigeria"],
      opportunities: "2,500+",
      highlight: "Tech innovation & renewable energy",
    },
    {
      region: "South Asia",
      communities: ["Indian", "Pakistani", "Bangladeshi", "Sri Lankan", "Basian"],
      opportunities: "3,200+",
      highlight: "Fintech & healthcare solutions",
    },
    {
      region: "Middle East & North Africa",
      communities: ["Egyptian", "Moroccan", "Lebanese", "Jordanian"],
      opportunities: "1,800+",
      highlight: "Infrastructure & sustainable development",
    },
    {
      region: "Europe & Americas",
      communities: ["Polish", "Italian", "Mexican", "Brazilian"],
      opportunities: "2,100+",
      highlight: "Advanced manufacturing & green tech",
    },
  ];

  const globalInitiatives = [
    {
      title: "Diaspora Investment Network",
      description: "Connecting diaspora capital with high-impact opportunities in home countries and beyond.",
      impact: "£2.5B+ mobilized",
      icon: TrendingUp,
    },
    {
      title: "Cross-Border Skills Exchange",
      description: "Facilitating knowledge transfer and talent mobility across international markets.",
      impact: "15K+ professionals connected",
      icon: Users,
    },
    {
      title: "Global Innovation Hubs",
      description: "Establishing collaborative spaces in key cities to drive international partnerships.",
      impact: "25 cities worldwide",
      icon: Zap,
    },
    {
      title: "Cultural Capital Programme",
      description: "Leveraging cultural understanding for better business outcomes across borders.",
      impact: "500+ cultural ambassadors",
      icon: Heart,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Global Reach, Local Impact
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
            Connecting Diasporas
            <br />
            <span className="text-foreground">Across Continents</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of global diaspora networks. From the UK to every corner of the world, 
            we connect communities, capital, and opportunities that transcend borders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group">
                Explore Global Opportunities
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" size="lg">
                Join Diaspora Network
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Impact Stats */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Impact at Scale</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Measurable outcomes across continents, connecting diaspora excellence worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora Regions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Diaspora Communities Worldwide</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Representing diverse cultures and expertise, our network spans every major diaspora community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {diasporaRegions.map((region, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-2" />
                      {region.region}
                    </CardTitle>
                    <Badge variant="secondary">{region.opportunities} opportunities</Badge>
                  </div>
                  <CardDescription className="text-base">{region.highlight}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {region.communities.map((community, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {community}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Initiatives */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Global Initiatives</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Strategic programmes designed to maximise diaspora potential and cross-border collaboration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {globalInitiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <initiative.icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <Badge className="ml-4">{initiative.impact}</Badge>
                  </div>
                  <CardTitle className="text-xl">{initiative.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {initiative.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Go Global?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of diaspora leaders, investors, and innovators shaping the future of 
            global collaboration and economic empowerment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button variant="hero" size="lg" className="group">
                Join Global Network
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/investment-hub">
              <Button variant="outline" size="lg">
                Explore Global Investments
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Global;