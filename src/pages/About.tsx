import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Target, 
  Heart, 
  Users, 
  Globe, 
  TrendingUp, 
  Shield,
  Lightbulb,
  HandHeart,
  Building,
  Briefcase,
  GraduationCap,
  Rocket
} from "lucide-react";

const About = () => {
  const visionPoints = [
    {
      icon: Globe,
      title: "Global Diaspora Connection",
      description: "Connecting UK diaspora communities with worldwide opportunities and their cultural heritage."
    },
    {
      icon: TrendingUp,
      title: "Economic Empowerment",
      description: "Unlocking economic potential through inclusive access to business, career, and investment opportunities."
    },
    {
      icon: Users,
      title: "Community-Driven Growth",
      description: "Building bridges between communities, organizations, and opportunities for collective advancement."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Creating a secure, verified ecosystem where credibility and authenticity drive every connection."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Inclusivity First",
      description: "Prioritizing underrepresented communities and ensuring equal access to opportunities."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Leveraging technology to create meaningful connections and drive positive change."
    },
    {
      icon: HandHeart,
      title: "Cultural Pride",
      description: "Celebrating diaspora heritage while fostering integration and global collaboration."
    },
    {
      icon: Target,
      title: "Impact-Driven",
      description: "Measuring success through real outcomes and transformative community impact."
    }
  ];

  const expertiseAreas = [
    {
      icon: Building,
      title: "Business Development",
      description: "Connecting entrepreneurs with funding, partnerships, and market opportunities."
    },
    {
      icon: Briefcase,
      title: "Career Advancement",
      description: "Linking talent with career opportunities across sectors and skill levels."
    },
    {
      icon: GraduationCap,
      title: "Skills & Education",
      description: "Facilitating access to training, mentorship, and professional development."
    },
    {
      icon: Rocket,
      title: "Innovation & Tech",
      description: "Supporting tech entrepreneurship and digital transformation initiatives."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Enhanced Hero Section with Epiphiny Flow Colors */}
      <section className="pt-24 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-navy/95 backdrop-blur-sm"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-royal-blue/30 to-emerald-green/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-sunset-orange/20 to-gold-amber/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-magenta/25 to-royal-blue/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          
          {/* Floating Particles */}
          <div className="absolute top-20 right-1/3 w-3 h-3 bg-emerald-green rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-gold-amber rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
          <div className="absolute top-1/3 right-1/6 w-4 h-4 bg-sunset-orange/80 rounded-full animate-bounce" style={{animationDelay: '2.5s'}} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-cool-grey to-royal-blue/20 text-deep-navy border-0 shadow-elegant px-6 py-2 font-semibold">
            About Epiphiny Flow
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8 leading-tight">
            Empowering Diaspora
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Communities</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
            We're building the world's leading digital platform that connects businesses, organizations, 
            and individuals with public and private sector opportunities, with a strong focus on serving 
            <span className="text-emerald-green font-semibold"> diaspora communities</span> in the UK.
          </p>
        </div>
      </section>

      {/* Enhanced Mission Statement with Brand Colors */}
      <section className="py-20 bg-gradient-to-br from-cool-grey/50 to-royal-blue/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-green/10 to-royal-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-r from-sunset-orange/10 to-magenta/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-8">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 font-medium">
              To create an inclusive digital ecosystem that unlocks economic opportunities, celebrates 
              cultural identity, and drives collaborative growth. We believe that by connecting diaspora 
              communities with global opportunities, we can build bridges that transform lives and 
              strengthen economies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="p-8 text-center hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-to-br from-royal-blue/5 to-emerald-green/5 border-2 border-royal-blue/20 group">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4 group-hover:scale-105 transition-all duration-300">Purpose-Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every feature serves our mission of diaspora empowerment and economic inclusion
                </p>
              </Card>
              <Card className="p-8 text-center hover:shadow-glow transition-all duration-300 hover:scale-105 bg-gradient-to-br from-emerald-green/5 to-sunset-orange/5 border-2 border-emerald-green/20 group">
                <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4 group-hover:scale-105 transition-all duration-300">Community-Centric</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built by the community, for the community, with authentic cultural understanding
                </p>
              </Card>
              <Card className="p-8 text-center hover:shadow-orange transition-all duration-300 hover:scale-105 bg-gradient-to-br from-sunset-orange/5 to-gold-amber/5 border-2 border-sunset-orange/20 group">
                <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-orange">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4 group-hover:scale-105 transition-all duration-300">Globally Connected</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Linking local communities to worldwide opportunities and global networks
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Vision Points with Brand Colors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-6">Our Vision</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building a future where every diaspora community member has access to opportunities 
              that honor their heritage while driving economic growth and cultural innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visionPoints.map((point, index) => {
              const brandColors = [
                { bg: 'from-royal-blue/5 to-emerald-green/5', border: 'border-royal-blue/20', icon: 'bg-gradient-primary', shadow: 'shadow-elegant' },
                { bg: 'from-emerald-green/5 to-sunset-orange/5', border: 'border-emerald-green/20', icon: 'bg-gradient-success', shadow: 'shadow-glow' },
                { bg: 'from-sunset-orange/5 to-magenta/5', border: 'border-sunset-orange/20', icon: 'bg-gradient-accent', shadow: 'shadow-orange' },
                { bg: 'from-magenta/5 to-royal-blue/5', border: 'border-magenta/20', icon: 'bg-gradient-community', shadow: 'shadow-community' }
              ];
              const currentStyle = brandColors[index % brandColors.length];
              return (
                <Card key={index} className={`p-8 hover:${currentStyle.shadow} transition-all duration-300 hover:scale-102 bg-gradient-to-br ${currentStyle.bg} border-2 ${currentStyle.border} group`}>
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 ${currentStyle.icon} rounded-xl flex items-center justify-center shadow-elegant`}>
                        <point.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-deep-navy transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Values Section */}
      <section className="py-20 bg-gradient-to-br from-cool-grey/30 to-emerald-green/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-48 h-48 bg-gradient-to-r from-gold-amber/10 to-sunset-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-32 w-40 h-40 bg-gradient-to-r from-magenta/10 to-royal-blue/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-community bg-clip-text text-transparent mb-6">Our Values</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              These core principles guide every decision we make and every feature we build, ensuring our platform truly serves diaspora communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const brandStyles = [
                { gradient: 'bg-gradient-primary', color: 'text-royal-blue', shadow: 'shadow-elegant' },
                { gradient: 'bg-gradient-success', color: 'text-emerald-green', shadow: 'shadow-glow' },
                { gradient: 'bg-gradient-secondary', color: 'text-sunset-orange', shadow: 'shadow-orange' },
                { gradient: 'bg-gradient-premium', color: 'text-gold-amber', shadow: 'shadow-premium' }
              ];
              const currentStyle = brandStyles[index % brandStyles.length];
              return (
                <Card key={index} className={`p-6 text-center hover:${currentStyle.shadow} transition-all duration-300 hover:scale-105 bg-white/90 dark:bg-charcoal-black/90 border-2 hover:border-${currentStyle.color.split('-')[1]}/30 group`}>
                  <div className={`w-16 h-16 bg-charcoal-black dark:${currentStyle.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-elegant`}>
                    <value.icon className={`w-8 h-8 text-white`} />
                  </div>
                  <h3 className="text-xl font-black text-foreground mb-4 group-hover:scale-105 transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Expertise Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-6">Our Expertise</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Deep domain knowledge across key areas that matter most to diaspora communities, backed by years of experience and cultural understanding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => {
              const brandStyles = [
                { bg: 'from-emerald-green/5 to-royal-blue/5', border: 'border-emerald-green/20', icon: 'bg-gradient-success', shadow: 'shadow-glow' },
                { bg: 'from-magenta/5 to-sunset-orange/5', border: 'border-magenta/20', icon: 'bg-gradient-community', shadow: 'shadow-community' },
                { bg: 'from-gold-amber/5 to-emerald-green/5', border: 'border-gold-amber/20', icon: 'bg-gradient-premium', shadow: 'shadow-premium' },
                { bg: 'from-royal-blue/5 to-sunset-orange/5', border: 'border-royal-blue/20', icon: 'bg-gradient-primary', shadow: 'shadow-elegant' }
              ];
              const currentStyle = brandStyles[index % brandStyles.length];
              return (
                <Card key={index} className={`p-8 hover:${currentStyle.shadow} transition-all duration-300 hover:scale-102 bg-gradient-to-br ${currentStyle.bg} border-2 ${currentStyle.border} group`}>
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 ${currentStyle.icon} rounded-xl flex items-center justify-center shadow-elegant`}>
                        <area.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-deep-navy transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Final Section with Epiphiny Flow Colors */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-deep-navy/95 backdrop-blur-sm"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-magenta/15 to-royal-blue/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-12">Why We Exist</h2>
            <div className="space-y-6 text-white/90">
              <p className="text-lg md:text-xl leading-relaxed">
                Diaspora communities represent incredible untapped potential. With deep cultural knowledge, 
                global networks, and unique perspectives, these communities are perfectly positioned to drive 
                economic growth and innovation. Yet traditional platforms often overlook their specific needs 
                and challenges.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                We founded <span className="text-emerald-green font-semibold">Epiphiny Flow</span> because we believe that by creating a platform specifically designed 
                for diaspora communities, we can unlock opportunities that benefit not just individuals, but 
                entire communities and economies.
              </p>
              <p className="text-lg md:text-xl leading-relaxed mb-12">
                Our platform serves as a bridge - connecting <span className="text-sunset-orange font-semibold">heritage with opportunity</span>, tradition with innovation, 
                and local communities with global possibilities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/community">
                <Button variant="default" size="lg" className="bg-gradient-primary hover:shadow-elegant text-white transition-all duration-300 hover:scale-105 px-8 py-4 font-semibold">
                  <Users className="w-5 h-5 mr-2" />
                  Join Our Community
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button variant="outline" size="lg" className="border-2 border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-white hover:shadow-glow transition-all duration-300 hover:scale-105 px-8 py-4 font-semibold">
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;