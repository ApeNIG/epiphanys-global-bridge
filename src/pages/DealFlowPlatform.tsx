import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Shield,
  Search,
  BarChart3,
  FileText,
  Handshake,
  Target,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  Briefcase,
  PieChart,
  Network,
  Zap,
  Eye,
  Filter
} from "lucide-react";

const DealFlowPlatform = () => {
  const platformFeatures = [
    {
      icon: Search,
      title: "Smart Deal Discovery",
      description: "AI-powered matching system that connects you with relevant investment opportunities based on your criteria, industry focus, and investment thesis."
    },
    {
      icon: Shield,
      title: "Due Diligence Hub",
      description: "Comprehensive tools for evaluating deals including financial analysis, risk assessment, market validation, and compliance checks."
    },
    {
      icon: BarChart3,
      title: "Portfolio Analytics",
      description: "Real-time tracking and analytics for your investment portfolio with performance metrics, risk analysis, and market insights."
    },
    {
      icon: Network,
      title: "Investor Network",
      description: "Connect with fellow investors, share deal flow, participate in syndicated investments, and leverage collective expertise."
    }
  ];

  const dealStages = [
    {
      icon: Eye,
      title: "Deal Sourcing",
      description: "Access curated opportunities from diaspora entrepreneurs, startups, and growth-stage companies across 190+ countries.",
      features: ["Global deal sourcing", "Cultural insight advantage", "Local market expertise", "Community-driven referrals"]
    },
    {
      icon: Filter,
      title: "Initial Screening",
      description: "Advanced filtering and preliminary evaluation tools to quickly identify deals that match your investment criteria.",
      features: ["Automated screening", "Custom criteria filters", "Risk scoring", "Market opportunity assessment"]
    },
    {
      icon: FileText,
      title: "Due Diligence",
      description: "Comprehensive evaluation framework with financial analysis, market research, and risk assessment tools.",
      features: ["Financial modeling", "Market analysis", "Legal compliance", "Reference checks"]
    },
    {
      icon: Handshake,
      title: "Deal Execution",
      description: "Streamlined investment process with legal documentation, fund transfer, and portfolio integration.",
      features: ["Digital documentation", "Secure transactions", "Portfolio integration", "Ongoing monitoring"]
    }
  ];

  const userSupport = [
    {
      icon: Target,
      title: "Personalized Deal Flow",
      description: "Receive opportunities tailored to your investment focus, ticket size, and geographic preferences.",
      benefits: ["Reduced noise", "Higher quality matches", "Time efficiency", "Better ROI potential"]
    },
    {
      icon: Users,
      title: "Expert Network Access",
      description: "Connect with industry experts, advisors, and successful entrepreneurs within the diaspora community.",
      benefits: ["Expert insights", "Industry knowledge", "Mentorship opportunities", "Strategic partnerships"]
    },
    {
      icon: Clock,
      title: "Accelerated Process",
      description: "Streamlined workflows and automation reduce time-to-decision from months to weeks.",
      benefits: ["Faster decisions", "Reduced overhead", "Automated workflows", "Real-time updates"]
    },
    {
      icon: PieChart,
      title: "Portfolio Optimisation",
      description: "Advanced analytics and portfolio management tools to maximise returns and minimise risk.",
      benefits: ["Risk diversification", "Performance tracking", "Market insights", "Exit planning"]
    }
  ];

  const statistics = [
    { value: "£685B", label: "Total Deal Value", sublabel: "Processed through platform" },
    { value: "2,500+", label: "Active Deals", sublabel: "Available opportunities" },
    { value: "190+", label: "Countries", sublabel: "Global deal coverage" },
    { value: "85%", label: "Success Rate", sublabel: "Completed investments" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-royal-blue/30 to-emerald-green/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-r from-sunset-orange/20 to-gold-amber/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-magenta/25 to-royal-blue/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-cool-grey to-royal-blue/20 text-deep-navy border-0 shadow-elegant px-6 py-2 font-semibold">
            Deal Flow Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            Streamlined
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Investment Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            A comprehensive platform designed to revolutionize how diaspora investors discover, evaluate, 
            and execute investment opportunities across global markets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button asChild variant="hero" size="xl" className="text-lg px-8 py-4 rounded-xl font-bold shadow-glow group">
              <Link to="/auth" className="flex items-center gap-2">
                Start Investing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="glass" size="xl" className="text-lg px-8 py-4 rounded-xl font-semibold">
              <Link to="/consultation">
                Schedule Demo
              </Link>
            </Button>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground/60 mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-6">Platform Features</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools and features designed to support every aspect of your investment journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, index) => {
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
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-deep-navy transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deal Stages */}
      <section className="py-20 bg-gradient-to-br from-cool-grey/30 to-emerald-green/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-48 h-48 bg-gradient-to-r from-gold-amber/10 to-sunset-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-32 w-40 h-40 bg-gradient-to-r from-magenta/10 to-royal-blue/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-community bg-clip-text text-transparent mb-6">Deal Flow Process</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our streamlined four-stage process takes you from deal discovery to successful investment execution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dealStages.map((stage, index) => (
              <Card key={index} className="p-8 bg-white/90 dark:bg-charcoal-black/90 border-2 hover:border-primary/30 hover:shadow-elegant transition-all duration-300 hover:scale-102 group">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center shadow-elegant">
                      <stage.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-primary transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {stage.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {stage.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-green flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-6">How We Support You</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive support designed to maximise your investment success and minimise risk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {userSupport.map((support, index) => (
              <Card key={index} className="p-8 hover:shadow-glow transition-all duration-300 hover:scale-102 group">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center shadow-elegant">
                      <support.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-foreground mb-3 group-hover:text-emerald-green transition-colors">
                      {support.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {support.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {support.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-gold-amber flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-12">Ready to Transform Your Investment Journey?</h2>
            <div className="space-y-6 text-foreground mb-12">
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                Join thousands of diaspora investors who are already leveraging our platform to discover, 
                evaluate, and execute successful investments across global markets.
              </p>
              <p className="text-muted-foreground">
                Whether you're a seasoned investor or just starting your investment journey, our platform 
                provides the tools, network, and support you need to succeed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button asChild variant="hero" size="xl" className="text-lg px-8 py-4 rounded-xl font-bold shadow-glow group">
                <Link to="/auth" className="flex items-center gap-2">
                  Join Platform Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="glass" size="xl" className="text-lg px-8 py-4 rounded-xl font-semibold">
                <Link to="/consultation">
                  Book a Demo
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="xl" className="text-lg px-8 py-4 rounded-xl font-semibold">
                <Link to="/investment-hub">
                  Explore Opportunities
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DealFlowPlatform;