import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, Lock, Users, Globe, Award } from "lucide-react";
const trustFeatures = [{
  icon: Shield,
  title: "KYC Verification",
  description: "All users verified through secure identity checks",
  status: "Active"
}, {
  icon: CheckCircle,
  title: "Community Credibility",
  description: "Peer reviews and reputation scoring system",
  status: "Live"
}, {
  icon: Lock,
  title: "Data Protection",
  description: "GDPR compliant with 256-bit encryption",
  status: "Certified"
}, {
  icon: Users,
  title: "Fraud Prevention",
  description: "AI-powered monitoring and community reporting",
  status: "24/7"
}];
const partnerships = [{
  name: "MCC",
  type: "Strategic Partner"
}, {
  name: "GMCA",
  type: "Regional Partner"
}, {
  name: "GC Angels",
  type: "Investment Partner"
}, {
  name: "GM Growth Hub",
  type: "Growth Partner"
}, {
  name: "UK Black Tech",
  type: "Community Partner"
}, {
  name: "Our Business GM",
  type: "Business Partner"
}, {
  name: "University Salford",
  type: "Academic Partner"
}];
const TrustIndicators = () => {
  return <section className="py-16 bg-card/30">
      <div className="container mx-auto px-4">
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

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustFeatures.map((feature, index) => <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 group">
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
            </Card>)}
        </div>

        {/* Partnerships */}
        <div className="bg-muted/50 rounded-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Trusted Partners
            </h3>
            <p className="text-sm text-muted-foreground">
              Working alongside leading organizations to ensure credibility and impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partnerships.map((partner, index) => <div key={index} className="text-center">
                <div className="bg-background rounded-lg p-4 border border-border">
                  <div className="font-medium text-foreground">{partner.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{partner.type}</div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            
            
          </div>
          <div className="text-center">
            
            
          </div>
          <div className="text-center">
            
            
          </div>
        </div>
      </div>
    </section>;
};
export default TrustIndicators;