import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestmentExplorer from "@/components/InvestmentExplorer";
import { 
  TrendingUp, 
  Building2, 
  Users, 
  Target, 
  Shield, 
  Globe, 
  DollarSign,
  BarChart3,
  Handshake,
  ArrowRight,
  CheckCircle,
  Rocket,
  Network,
  CreditCard,
  Banknote,
  PiggyBank,
  Landmark,
  Briefcase,
  FileText,
  TrendingDown
} from "lucide-react";

const InvestmentHub = () => {
  const investorTypes = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Public Sector Investors",
      description: "Government funds, development finance institutions, and public investment vehicles",
      features: ["ESG-focused opportunities", "Impact measurement", "Regulatory compliance", "Risk mitigation"],
      color: "from-emerald-400 to-teal-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Private Investors",
      description: "Angel investors, venture capital, private equity, and institutional funds",
      features: ["High-growth ventures", "Due diligence support", "Portfolio management", "Exit strategies"],
      color: "from-violet-400 to-purple-600"
    }
  ];

  const businessTypes = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Startups",
      description: "Early-stage companies seeking seed and Series A funding",
      benefits: ["Access to angel investors", "Mentorship programs", "Pitch deck optimization", "Market validation"]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Scale-ups",
      description: "Growing companies ready for Series B+ and expansion capital",
      benefits: ["Growth capital access", "Strategic partnerships", "International expansion", "Operational scaling"]
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "SMEs",
      description: "Established small and medium enterprises seeking development capital",
      benefits: ["Working capital solutions", "Equipment financing", "Market expansion", "Technology adoption"]
    }
  ];

  const hubFeatures = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered algorithm matches investors with suitable opportunities based on criteria, risk profile, and investment thesis."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Due Diligence Hub",
      description: "Comprehensive verification process, document management, and risk assessment tools for informed decision-making."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Real-time portfolio tracking, impact measurement, and detailed reporting for all stakeholders."
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Global Network",
      description: "Connect with diaspora entrepreneurs, local market experts, and international business networks."
    }
  ];

  const investmentOpportunities = [
    {
      category: "Venture Capital",
      icon: <TrendingDown className="w-6 h-6" />,
      description: "Professional investment firms for high-growth startups",
      examples: [
        "Index Ventures - Pre-seed to Series A (£1M-£15M)",
        "Balderton Capital - Series A/B focused (£5M-£25M)",
        "Accel Partners - Early to growth stage (£2M-£50M)",
        "Atomico - Series A to later stage (£10M-£100M+)",
        "Connect Ventures - Pre-seed specialist (£250K-£2M)",
        "Forward Partners - Seed stage ecommerce (£500K-£5M)"
      ],
      color: "from-indigo-400 to-purple-600"
    },
    {
      category: "Angel Investors",
      icon: <Users className="w-6 h-6" />,
      description: "Individual investors providing capital and mentorship",
      examples: [
        "UK Angel Investment Network - £10K-£500K seed funding",
        "Diaspora Angel Collective - Cultural expertise + capital",
        "Tech Angel Syndicate - Industry-specific knowledge",
        "Impact Angels - ESG-focused investments"
      ],
      color: "from-blue-400 to-indigo-600"
    },
    {
      category: "Innovation Loans",
      icon: <Rocket className="w-6 h-6" />,
      description: "Government-backed loans for innovation and R&D",
      examples: [
        "Innovate UK Loans - £100K-£2M for R&D projects",
        "Future Fund Breakthrough - High-growth potential",
        "SBRI Innovation Vouchers - Proof of concept funding",
        "Regional Innovation Grants - Location-specific support"
      ],
      color: "from-green-400 to-emerald-600"
    },
    {
      category: "Business Banking",
      icon: <Landmark className="w-6 h-6" />,
      description: "Traditional and alternative banking solutions",
      examples: [
        "HSBC Start-up Banking - Fee-free business accounts",
        "Starling Bank - Digital-first business banking",
        "Metro Bank - Community-focused lending",
        "Funding Circle - SME lending marketplace"
      ],
      color: "from-purple-400 to-violet-600"
    },
    {
      category: "Alternative Finance",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Modern financing solutions beyond traditional banks",
      examples: [
        "Crowdcube - Equity crowdfunding platform",
        "Seedrs - Investment in early-stage businesses",
        "Iwoca - Revenue-based business loans",
        "Tide - SME-focused financial services"
      ],
      color: "from-orange-400 to-red-600"
    },
    {
      category: "Government Grants",
      icon: <FileText className="w-6 h-6" />,
      description: "Public sector funding and support schemes",
      examples: [
        "Start Up Loans - £500-£25K government-backed loans",
        "Export Development Guarantee - International trade",
        "Green Business Grants - Sustainability initiatives",
        "Diversity & Inclusion Funds - Underrepresented groups"
      ],
      color: "from-teal-400 to-cyan-600"
    },
    {
      category: "Corporate Ventures",
      icon: <Briefcase className="w-6 h-6" />,
      description: "Strategic investments from established corporations",
      examples: [
        "Barclays Accelerator - Fintech partnerships",
        "Shell Ventures - Energy and mobility solutions",
        "Unilever Ventures - Consumer goods innovation",
        "BT Innovation Partners - Tech infrastructure"
      ],
      color: "from-rose-400 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-violet-50/30 to-orange-50/50 dark:from-emerald-950/20 dark:via-violet-950/20 dark:to-orange-950/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-violet-400/20 to-purple-600/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-emerald-100 to-violet-100 text-foreground border-0">
              <TrendingUp className="w-4 h-4 mr-2" />
              Investment Hub
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-violet-600 to-orange-600 bg-clip-text text-transparent leading-tight">
              Bridging Capital with Opportunity
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Our Investment Hub connects public and private investors with high-potential businesses across diaspora communities, 
              creating a transparent ecosystem for sustainable growth and global impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Start Investing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-violet-50">
                Explore Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Our Investment Hub Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed to facilitate meaningful connections between capital and opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hubFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-violet-50/50 dark:from-emerald-950/10 dark:to-violet-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-violet-100 dark:from-emerald-900 dark:to-violet-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-emerald-600 dark:text-emerald-400">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Investors */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-50/50 to-violet-50/50 dark:from-emerald-950/10 dark:to-violet-950/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Investors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access vetted opportunities across diverse markets and sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {investorTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <CardHeader className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                    {type.icon}
                  </div>
                  <CardTitle className="text-2xl">{type.title}</CardTitle>
                  <CardDescription className="text-base">{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Investment Opportunities */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-50/50 to-gray-50/50 dark:from-slate-950/10 dark:to-gray-950/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Investment Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover diverse funding sources from angel investors to government grants, innovation loans to corporate ventures. 
              Find the perfect financial solution for your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentOpportunities.map((opportunity, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${opportunity.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <CardHeader className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-r ${opportunity.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                    {opportunity.icon}
                  </div>
                  <CardTitle className="text-xl">{opportunity.category}</CardTitle>
                  <CardDescription className="text-base">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3">
                    {opportunity.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <DollarSign className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{example}</span>
                      </div>
                    ))}
                  </div>
                  <InvestmentExplorer 
                    category={opportunity.category}
                    description={opportunity.description}
                    examples={opportunity.examples}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Businesses */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Businesses</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a startup, scale-up, or established SME, find the right capital for your growth journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {businessTypes.map((business, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-violet-50/50 dark:from-orange-950/10 dark:to-violet-950/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-violet-100 dark:from-orange-900 dark:to-violet-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-orange-600 dark:text-orange-400">
                      {business.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{business.title}</CardTitle>
                  <CardDescription>{business.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-2">
                    {business.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-violet-400 rounded-full flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 via-violet-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Investment Journey?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of investors and businesses already connected through our platform. 
              Start building meaningful partnerships that drive sustainable growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-foreground hover:bg-white/90">
                <Users className="w-5 h-5 mr-2" />
                Join as Investor
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
                <Handshake className="w-5 h-5 mr-2" />
                List Your Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestmentHub;