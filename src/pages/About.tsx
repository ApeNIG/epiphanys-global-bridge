import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
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
  Rocket,
  Sparkles
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
      description: "Building bridges between communities, organisations, and opportunities for collective advancement."
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
      description: "Prioritising underrepresented communities and ensuring equal access to opportunities."
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
      
      {/* Section 1: Empowering Diaspora Communities */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-royal-blue/10 via-background to-emerald-green/10">
        <div className="container mx-auto px-4 py-32 text-center">
          <ScrollReveal animation="fade">
            <Badge variant="secondary" className="mb-8 bg-primary/10 text-primary border-primary/20 shadow-elegant px-6 py-2 font-semibold">
              About Epiphiny Flow
            </Badge>
          </ScrollReveal>
          <ScrollReveal animation="slide-up" delay={200}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight">
              Empowering Diaspora
              <br />
              <span className="bg-gradient-to-r from-royal-blue to-emerald-green bg-clip-text text-transparent">Communities</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal animation="fade" delay={400}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              We're building a digital platform that connects businesses, organisations, 
              and individuals with public and private sector opportunities, with a strong focus on serving 
              <span className="text-emerald-green font-semibold"> diaspora communities</span> in the UK.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="scale" delay={600}>
            <div className="mt-12 flex justify-center">
              <Sparkles className="w-8 h-8 text-gold-amber animate-pulse" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: Our Mission */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-emerald-green/10 via-background to-sunset-orange/10">
        <div className="container mx-auto px-4 py-32">
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Our Mission</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                To create an inclusive digital ecosystem that unlocks economic opportunities, celebrates 
                cultural identity, and drives collaborative growth.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ScrollReveal animation="slide-up" delay={200}>
              <Card className="p-8 text-center bg-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105 group h-full">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">Purpose-Driven</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every feature serves our mission of diaspora empowerment and economic inclusion
                </p>
              </Card>
            </ScrollReveal>
            <ScrollReveal animation="slide-up" delay={400}>
              <Card className="p-8 text-center bg-card border-border hover:shadow-glow transition-all duration-300 hover:scale-105 group h-full">
                <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">Community-Centric</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built by the community, for the community, with authentic cultural understanding
                </p>
              </Card>
            </ScrollReveal>
            <ScrollReveal animation="slide-up" delay={600}>
              <Card className="p-8 text-center bg-card border-border hover:shadow-orange transition-all duration-300 hover:scale-105 group h-full">
                <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-orange">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-4">Globally Connected</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Linking local communities to worldwide opportunities and global networks
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3: Our Vision */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-sunset-orange/10 via-background to-magenta/10">
        <div className="container mx-auto px-4 py-32">
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Our Vision</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                Building a future where every diaspora community member has access to opportunities 
                that honor their heritage while driving economic growth and cultural innovation.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {visionPoints.map((point, index) => {
              const gradients = ['bg-gradient-primary', 'bg-gradient-success', 'bg-gradient-secondary', 'bg-gradient-premium'];
              return (
                <ScrollReveal key={index} animation="slide-up" delay={200 + index * 150}>
                  <Card className="p-8 bg-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-102 group text-center h-full">
                    <div className={`w-16 h-16 ${gradients[index]} rounded-xl flex items-center justify-center shadow-elegant mx-auto mb-6`}>
                      <point.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-3">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Our Values */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-magenta/10 via-background to-gold-amber/10">
        <div className="container mx-auto px-4 py-32">
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Our Values</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                These core principles guide every decision we make and every feature we build.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const gradients = ['bg-gradient-primary', 'bg-gradient-success', 'bg-gradient-secondary', 'bg-gradient-premium'];
              return (
                <ScrollReveal key={index} animation="scale" delay={200 + index * 150}>
                  <Card className="p-6 text-center bg-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-105 group h-full">
                    <div className={`w-16 h-16 ${gradients[index]} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-elegant`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Our Expertise */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-gold-amber/10 via-background to-royal-blue/10">
        <div className="container mx-auto px-4 py-32">
          <ScrollReveal animation="fade">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Our Expertise</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                Deep domain knowledge across key areas that matter most to diaspora communities.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {expertiseAreas.map((area, index) => {
              const gradients = ['bg-gradient-success', 'bg-gradient-community', 'bg-gradient-premium', 'bg-gradient-primary'];
              return (
                <ScrollReveal key={index} animation="slide-up" delay={200 + index * 150}>
                  <Card className="p-8 bg-card border-border hover:shadow-elegant transition-all duration-300 hover:scale-102 group text-center h-full">
                    <div className={`w-16 h-16 ${gradients[index]} rounded-xl flex items-center justify-center shadow-elegant mx-auto mb-6`}>
                      <area.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-3">
                      {area.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {area.description}
                    </p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 6: Why We Exist */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-royal-blue/10 via-background to-emerald-green/10">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal animation="fade">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-12">Why We Exist</h2>
            </ScrollReveal>
            
            <ScrollReveal animation="slide-up" delay={200}>
              <div className="space-y-6 text-muted-foreground mb-12">
                <p className="text-lg md:text-xl leading-relaxed font-medium">
                  Diaspora communities represent incredible untapped potential. With deep cultural knowledge, 
                  global networks, and unique perspectives, these communities are perfectly positioned to drive 
                  economic growth and innovation. Yet traditional platforms often overlook their specific needs 
                  and challenges.
                </p>
                <p className="text-lg md:text-xl leading-relaxed font-medium">
                  We founded Epiphiny Flow because we believe that by creating a platform specifically designed 
                  for diaspora communities, we can unlock opportunities that benefit not just individuals, but 
                  entire communities and economies.
                </p>
                <p className="text-lg md:text-xl leading-relaxed font-medium">
                  Our platform serves as a bridge - connecting heritage with opportunity, tradition with 
                  innovation, and local communities with global possibilities.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="scale" delay={400}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/community">
                  <Button variant="default" size="lg" className="bg-gradient-primary hover:shadow-elegant text-white transition-all duration-300 hover:scale-105 px-8 py-4 font-semibold">
                    <Users className="w-5 h-5 mr-2" />
                    Join Our Community
                  </Button>
                </Link>
                <Link to="/opportunities">
                  <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-glow transition-all duration-300 hover:scale-105 px-8 py-4 font-semibold">
                    <Globe className="w-5 h-5 mr-2" />
                    Explore Opportunities
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
