import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Building2, Award } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Heart,
    title: "Cultural Identity",
    description: "Preserve and celebrate your cultural heritage while building global connections"
  },
  {
    icon: MapPin,
    title: "Global Networks",
    description: "Access diaspora networks spanning continents and industries"
  },
  {
    icon: Building2,
    title: "Economic Empowerment",
    description: "Drive inclusive economic growth through strategic partnerships"
  },
  {
    icon: Award,
    title: "Trusted Platform",
    description: "Secure, transparent ecosystem built on credibility and trust"
  }
];

const stats = [
  { label: "UK Diaspora Communities", value: "15+" },
  { label: "Countries Connected", value: "50+" },
  { label: "Success Stories", value: "1,200+" },
  { label: "Economic Impact", value: "£2.5B+" }
];

const DiasporaFocus = () => {
  return (
    <section id="community" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div>
            <Badge variant="secondary" className="mb-4 text-primary border-primary/20">
              Diaspora-First Platform
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Built for 
              <span className="bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent">
                {" "}Diaspora{" "}
              </span>
              Communities
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand the unique challenges and opportunities that diaspora communities face. 
              Our platform is designed to bridge cultural identity with economic empowerment, 
              creating pathways for inclusive growth and global collaboration.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/auth">
              <Button variant="hero" size="lg">
                Join Our Community
              </Button>
            </Link>
          </div>
          
          {/* Stats Card */}
          <div>
            <Card className="p-8 bg-gradient-to-br from-card/80 to-secondary/20 backdrop-blur-sm border-border/50">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Our Global Impact
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-sm text-center text-muted-foreground">
                  "Epiphiny Flow has transformed how our community connects with global opportunities. 
                  It's more than a platform—it's a bridge to our future."
                </p>
                <p className="text-xs text-center text-primary mt-2 font-medium">
                  — Sarah Okafor, Entrepreneur & Community Leader
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiasporaFocus;