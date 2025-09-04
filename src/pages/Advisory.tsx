import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, TrendingUp, Globe, Shield, Lightbulb, Target, Zap, Crown, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const advisoryServices = [
  {
    category: "Startups",
    icon: Lightbulb,
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    description: "Transform your innovative ideas into viable businesses with expert guidance",
    services: [
      "Business Model Validation",
      "Market Entry Strategy", 
      "Funding & Investment Readiness",
      "Product-Market Fit Assessment",
      "Diaspora Market Access",
      "Cultural Intelligence Integration"
    ],
    outcomes: "95% of advised startups secure first-round funding",
    pricing: "From £2,500/month"
  },
  {
    category: "Scale-ups", 
    icon: TrendingUp,
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    description: "Accelerate growth while maintaining cultural authenticity and market relevance",
    services: [
      "Growth Strategy Development",
      "International Expansion Planning",
      "Operational Excellence",
      "Leadership Development", 
      "Cross-Cultural Team Building",
      "Global Network Activation"
    ],
    outcomes: "Average 340% revenue growth within 18 months",
    pricing: "From £7,500/month"
  },
  {
    category: "SMEs",
    icon: Building2,
    color: "bg-gradient-to-br from-purple-500 to-pink-600", 
    description: "Strengthen your market position through strategic diaspora community connections",
    services: [
      "Market Diversification Strategy",
      "Digital Transformation",
      "Supply Chain Optimization",
      "Partnership Development",
      "Community Engagement Strategy",
      "Cultural Market Insights"
    ],
    outcomes: "78% increase in market reach across diaspora networks",
    pricing: "From £5,000/month"
  },
  {
    category: "Enterprise",
    icon: Crown,
    color: "bg-gradient-to-br from-orange-500 to-red-600",
    description: "Leverage diaspora intelligence for strategic competitive advantage",
    services: [
      "Global Market Intelligence",
      "Cultural Due Diligence",
      "Diaspora Talent Acquisition",
      "Strategic Partnership Facilitation",
      "ESG & Diversity Integration",
      "Innovation Ecosystem Access"
    ],
    outcomes: "£50M+ in new market opportunities identified",
    pricing: "Custom enterprise packages"
  },
  {
    category: "Government",
    icon: Shield,
    color: "bg-gradient-to-br from-slate-600 to-gray-700",
    description: "Harness diaspora potential for economic development and policy implementation",
    services: [
      "Diaspora Economic Impact Assessment", 
      "Policy Development & Implementation",
      "Trade & Investment Facilitation",
      "Cultural Diplomacy Strategy",
      "Talent Attraction Programs",
      "Innovation Hub Development"
    ],
    outcomes: "£2.5B in diaspora-driven economic activity facilitated",
    pricing: "Bespoke government packages"
  }
];

const advisoryProcess = [
  {
    step: "01",
    title: "Discovery & Assessment",
    description: "Deep dive into your organization's needs, challenges, and diaspora connection opportunities",
    duration: "2-4 weeks"
  },
  {
    step: "02", 
    title: "Strategy Development",
    description: "Create a customized roadmap leveraging our global diaspora network and cultural intelligence",
    duration: "3-6 weeks"
  },
  {
    step: "03",
    title: "Implementation Support", 
    description: "Hands-on guidance with access to our platform ecosystem and expert network",
    duration: "Ongoing"
  },
  {
    step: "04",
    title: "Performance Monitoring",
    description: "Track progress with data-driven insights and continuous optimization", 
    duration: "Monthly reviews"
  }
];

const Advisory = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-teal-500/5" />
        <div className="flow-geometric-shape w-32 h-32 rotate-45 top-20 left-10 opacity-20" />
        <div className="flow-geometric-shape w-24 h-24 rotate-12 top-40 right-20 opacity-15" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm font-medium">
              Expert Advisory Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Strategic Advisory
              </span>
              <br />
              <span className="text-foreground">for Global Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Unlock the power of diaspora communities with expert advisory services tailored for 
              startups, scale-ups, SMEs, enterprises, and government organizations.
            </p>
            <Button asChild variant="hero" size="xl" className="text-lg px-12 py-6">
              <Link to="/auth">Book Strategic Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Advisory Services Grid */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advisory Solutions by Organization Type</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Specialized advisory services designed to leverage diaspora networks and cultural intelligence 
              for sustainable growth across different organizational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryServices.map((service, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-glow transition-all duration-300 hover:scale-105 group">
                <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${service.color}`} />
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-xl ${service.color} shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">{service.category}</CardTitle>
                      <Badge variant="outline" className="mt-1">{service.pricing}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Key Services:</h4>
                      <ul className="space-y-1">
                        {service.services.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="text-xs font-medium text-primary mb-1">Proven Results:</div>
                      <div className="text-sm text-muted-foreground">{service.outcomes}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Advisory Process</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that combines cultural intelligence with strategic expertise 
              to deliver measurable results for your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advisoryProcess.map((process, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="relative mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-glow">
                    <span className="text-white font-bold text-lg">{process.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{process.description}</p>
                  <Badge variant="secondary" className="text-xs">{process.duration}</Badge>
                </div>
                {index < advisoryProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Highlights */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Epiphiny Flow Advisory</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-elegant transition-all duration-300">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Global Diaspora Network</h3>
              <p className="text-muted-foreground">
                Access to 250M+ diaspora professionals across 190+ countries with deep cultural and market knowledge.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-elegant transition-all duration-300">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-muted-foreground">
                Over £2.5B in economic value created through strategic diaspora engagement and cultural intelligence.
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-elegant transition-all duration-300">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Accelerated Results</h3>
              <p className="text-muted-foreground">
                Average 340% faster market entry and 78% higher success rate in new market penetration.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-teal-500/10" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ organizations that have accelerated their growth through our strategic advisory services 
              and diaspora network connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl" className="text-lg px-8">
                <Link to="/auth">Schedule Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="text-lg px-8">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Advisory;