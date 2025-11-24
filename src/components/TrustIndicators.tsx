import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Lock, Users, Award } from "lucide-react";
import mccLogo from "@/assets/partners/mcc-logo.png";
import gmcaLogo from "@/assets/partners/gmca-logo.png";
import gmGrowthHubLogo from "@/assets/partners/gm-growth-hub-logo.png";
import ukBlackTechLogo from "@/assets/partners/uk-black-tech-logo.png";
import ourBusinessGmLogo from "@/assets/partners/our-business-gm-logo.png";
import universitySalfordLogo from "@/assets/partners/university-salford-logo.png";
import factoryInternationalLogo from "@/assets/partners/factory-international-logo.png";
import ParallaxSection from "./ParallaxSection";
import ScrollReveal from "./ScrollReveal";
import { businessImages } from "@/utils/placeholderImages";

const trustFeatures = [
  {
    icon: Shield,
    title: "KYC Verification",
    description: "All users verified through secure identity checks",
    status: "Active"
  },
  {
    icon: CheckCircle,
    title: "Community Credibility",
    description: "Peer reviews and reputation scoring system",
    status: "Live"
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "GDPR compliant with 256-bit encryption",
    status: "Certified"
  },
  {
    icon: Users,
    title: "Fraud Prevention",
    description: "AI-powered monitoring and community reporting",
    status: "24/7"
  }
];

const partnerships = [
  { name: "MC2", type: "PR Partner", logo: mccLogo },
  { name: "GMCA", type: "Regional Partner", logo: gmcaLogo },
  { name: "Factory International", type: "Cultural Partner", logo: factoryInternationalLogo },
  { name: "GM Growth Hub", type: "Growth Partner", logo: gmGrowthHubLogo },
  { name: "UK Black Tech", type: "Community Partner", logo: ukBlackTechLogo },
  { name: "Our Business GM", type: "Business Partner", logo: ourBusinessGmLogo },
  { name: "University Salford", type: "Academic Partner", logo: universitySalfordLogo }
];

const TrustIndicators = () => {
  return (
    <ParallaxSection 
      backgroundImage={businessImages.trust}
      speed={0.3}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Trusted Ecosystem
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}Trust & Security
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety and credibility are our top priorities. We've built comprehensive 
              systems to ensure a trusted environment for all community members.
            </p>
          </div>
        </ScrollReveal>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustFeatures.map((feature, index) => (
            <ScrollReveal key={index} animation="scale" delay={index * 75}>
              <Card className="text-center hover:shadow-elegant transition-all duration-300 group bg-card/90 backdrop-blur-md">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {feature.status}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Partnerships */}
        <ScrollReveal animation="slide-up" delay={300}>
          <div className="bg-muted/50 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Trusted Partners
              </h3>
              <p className="text-sm text-muted-foreground">
                Working alongside leading organisations to ensure credibility and impact
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partnerships.map((partner, index) => (
                <ScrollReveal key={index} animation="fade" delay={400 + index * 50}>
                  <div className="text-center">
                    <div className="bg-background rounded-lg p-4 border border-border hover:shadow-md transition-shadow group">
                      <div className="mb-3 flex justify-center">
                        <img 
                          src={partner.logo} 
                          alt={`${partner.name} logo`}
                          className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="font-medium text-foreground text-sm">{partner.name}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
};

export default TrustIndicators;
