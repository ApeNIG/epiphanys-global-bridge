import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedStat from "@/components/AnimatedStat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Globe, 
  Heart, 
  Star, 
  MessageCircle, 
  Handshake, 
  TrendingUp, 
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import communityHeroImage from "@/assets/community-hero.jpg";

const Community = () => {
  const communityStats = [
    { label: "Active Members", value: "15,000+", icon: Users },
    { label: "Countries Represented", value: "47", icon: Globe },
    { label: "Success Stories", value: "2,500+", icon: Star },
    { label: "Monthly Connections", value: "8,000+", icon: Handshake },
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

  const coreValues = [
    {
      icon: Heart,
      title: "Cultural Pride",
      description: "Celebrate and leverage your heritage as a competitive advantage in the global economy."
    },
    {
      icon: Handshake,
      title: "Authentic Connection",
      description: "Build meaningful relationships based on shared experiences and mutual understanding."
    },
    {
      icon: TrendingUp,
      title: "Inclusive Growth",
      description: "Create opportunities that benefit both individual success and community advancement."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Section 1: Hero with Background Image */}
      <section 
        className="min-h-screen flex items-center relative"
        style={{
          backgroundImage: `url(${communityHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-deep-navy/60" />
        <div className="container mx-auto px-4 py-32 text-center relative z-10">
          <ScrollReveal animation="fade">
            <Badge className="mb-8 bg-white/10 backdrop-blur-sm text-white border-white/20 shadow-elegant px-6 py-2 font-semibold">
              <Users className="w-4 h-4 mr-2" />
              Create your local, national and global community
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white">
              Where Cultural Heritage
              <br />
              <span className="text-emerald-green">
                Meets Economic Opportunity
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
              Join the UK's largest diaspora-focused professional community. Connect with your roots while building your future through 
              <span className="text-emerald-green font-semibold"> authentic relationships</span> and 
              <span className="text-sunset-orange font-semibold"> shared experiences</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:shadow-elegant text-white transition-all duration-300 transform hover:scale-105 px-8 py-4 font-semibold">
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/success-stories">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-deep-navy transform hover:scale-105 transition-all duration-300 px-8 py-4 font-semibold">
                  <Star className="mr-2 h-5 w-5" />
                  Explore Success Stories
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/80">
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
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: Community Impact Stats */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-32">
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 font-semibold">
                Our Impact
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Community Impact
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join a thriving ecosystem of diaspora professionals making real impact across the globe.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {communityStats.map((stat, index) => (
                <AnimatedStat
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Community Features */}
      <section className="min-h-screen flex items-center bg-pastel-purple">
        <div className="container mx-auto px-4 py-32">
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 font-semibold">
                Why Choose Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Diaspora Communities Choose Us
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                We understand that your cultural heritage is your strength, not a barrier. Our platform amplifies your unique perspective and global networks.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {communityFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-elegant transition-all duration-300 transform hover:scale-105 bg-background/80 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center bg-gradient-primary shadow-elegant">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-muted-foreground leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Core Values */}
            <div className="mt-20 bg-background/60 backdrop-blur-sm rounded-3xl p-12">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                Our Community Values
              </h3>
              <div className="grid md:grid-cols-3 gap-10">
                {coreValues.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-elegant group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-bold mb-4 text-xl text-foreground">{value.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Call to Action */}
      <section className="min-h-screen flex items-center bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-navy/95 backdrop-blur-sm" />
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-r from-magenta/15 to-royal-blue/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="container mx-auto px-4 py-32 text-center relative z-10">
          <ScrollReveal animation="fade">
            <Badge className="mb-8 bg-white/10 backdrop-blur-sm text-white border-white/20 px-6 py-2 font-semibold">
              Get Started Today
            </Badge>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
              Ready to Join Our Community?
            </h2>
            
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90 leading-relaxed">
              Connect with thousands of diaspora professionals, entrepreneurs, and leaders who share your vision for 
              <span className="text-emerald-green font-semibold"> cultural pride</span> and 
              <span className="text-sunset-orange font-semibold"> economic success</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
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

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-green mb-2">15,000+</div>
                <div className="text-white/70">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-sunset-orange mb-2">47</div>
                <div className="text-white/70">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold-amber mb-2">2,500+</div>
                <div className="text-white/70">Success Stories</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Community;
