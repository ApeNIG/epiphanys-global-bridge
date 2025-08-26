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
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-rainbow relative overflow-hidden">
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-accent/20 text-accent-foreground border-accent/30">
            About Epiphiny Flow
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-rainbow bg-clip-text text-transparent mb-6">
            Empowering Diaspora Communities
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're building the world's leading digital platform that connects businesses, organizations, 
            and individuals with public and private sector opportunities, with a strong focus on serving 
            diaspora communities in the UK.
          </p>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-purple/20 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-teal/20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-orange/20 blur-xl"></div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To create an inclusive digital ecosystem that unlocks economic opportunities, celebrates 
              cultural identity, and drives collaborative growth. We believe that by connecting diaspora 
              communities with global opportunities, we can build bridges that transform lives and 
              strengthen economies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 text-center hover:shadow-purple transition-all duration-300 hover:scale-105 bg-gradient-purple/10 border-purple/20">
                <div className="w-12 h-12 bg-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Purpose-Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Every feature serves our mission of diaspora empowerment
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-teal transition-all duration-300 hover:scale-105 bg-gradient-teal/10 border-teal/20">
                <div className="w-12 h-12 bg-teal/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community-Centric</h3>
                <p className="text-sm text-muted-foreground">
                  Built by the community, for the community
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-orange transition-all duration-300 hover:scale-105 bg-gradient-orange/10 border-orange/20">
                <div className="w-12 h-12 bg-orange/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Globally Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Linking local communities to worldwide opportunities
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Points */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building a future where every diaspora community member has access to opportunities 
              that honor their heritage while driving economic growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visionPoints.map((point, index) => {
              const colors = ['purple', 'teal', 'orange', 'pink'];
              const currentColor = colors[index % colors.length];
              return (
                <Card key={index} className={`p-6 hover:shadow-${currentColor} transition-all duration-300 hover:scale-102 bg-gradient-${currentColor}/5 border-${currentColor}/20`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 bg-${currentColor}/20 rounded-lg flex items-center justify-center`}>
                        <point.icon className={`w-6 h-6 text-${currentColor}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {point.title}
                      </h3>
                      <p className="text-muted-foreground">
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

      {/* Our Values */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make and every feature we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const colors = ['purple', 'teal', 'orange', 'emerald'];
              const currentColor = colors[index % colors.length];
              return (
                <Card key={index} className={`p-6 text-center hover:shadow-${currentColor} transition-all duration-300 hover:scale-105 bg-gradient-${currentColor}/10 border-${currentColor}/30`}>
                  <div className={`w-12 h-12 bg-${currentColor}/20 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`w-6 h-6 text-${currentColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep domain knowledge across key areas that matter most to diaspora communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => {
              const colors = ['teal', 'purple', 'emerald', 'orange'];
              const currentColor = colors[index % colors.length];
              return (
                <Card key={index} className={`p-6 hover:shadow-${currentColor} transition-all duration-300 hover:scale-102 bg-gradient-${currentColor}/5 border-${currentColor}/20`}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 bg-${currentColor}/20 rounded-lg flex items-center justify-center`}>
                        <area.icon className={`w-6 h-6 text-${currentColor}`} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground">
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

      {/* Why We Exist */}
      <section className="py-16 bg-gradient-rainbow relative overflow-hidden">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold bg-gradient-rainbow bg-clip-text text-transparent mb-8">Why We Exist</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6">
                Diaspora communities represent incredible untapped potential. With deep cultural knowledge, 
                global networks, and unique perspectives, these communities are perfectly positioned to drive 
                economic growth and innovation. Yet traditional platforms often overlook their specific needs 
                and challenges.
              </p>
              <p className="mb-6">
                We founded Epiphiny Flow because we believe that by creating a platform specifically designed 
                for diaspora communities, we can unlock opportunities that benefit not just individuals, but 
                entire communities and economies.
              </p>
              <p className="mb-8">
                Our platform serves as a bridge - connecting heritage with opportunity, tradition with innovation, 
                and local communities with global possibilities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/community">
                <Button variant="default" size="lg" className="bg-gradient-purple hover:shadow-purple transition-all duration-300 hover:scale-105">
                  Join Our Community
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button variant="outline" size="lg" className="border-teal text-teal hover:bg-teal hover:text-background hover:shadow-teal transition-all duration-300 hover:scale-105">
                  Explore Opportunities
                </Button>
              </Link>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple/10 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-teal/10 blur-3xl"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;