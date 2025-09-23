import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe, TrendingUp, Users, Sparkles } from "lucide-react";
const Hero = () => {
  const {
    t
  } = useTranslation();
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="flow-geometric-shape w-32 h-32 rotate-45 top-20 left-10 opacity-30 animate-pulse"></div>
      <div className="flow-geometric-shape w-24 h-24 rotate-12 top-40 right-20 opacity-20 animate-bounce"></div>
      <div className="flow-geometric-shape w-40 h-40 -rotate-12 bottom-32 left-20 opacity-15 animate-pulse"></div>
      <div className="flow-geometric-shape w-28 h-28 rotate-45 bottom-20 right-32 opacity-25 animate-bounce"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-ping delay-500"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Diaspora-First Opportunity Platform</span>
          </div>
          
          {/* Main Heading with Enhanced Messaging */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              <span className="block text-foreground mb-2">Epiphiny Flow</span>
              <span className="block bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Advisory &amp; Investment </span>
              <span className="block text-foreground/80 text-3xl md:text-4xl lg:text-5xl mt-4 font-bold">
                GROW • SCALE • BOOST
              </span>
            </h1>
            
            {/* Enhanced Company Description */}
            <div className="max-w-4xl mx-auto space-y-4">
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">Building a future where every diaspora community member has access to knowledge, funding and investment</p>
            </div>
          </div>
          
          {/* Value Propositions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
            <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Global Network</div>
                <div className="text-sm text-muted-foreground">190+ countries connected</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">£685B Impact</div>
                <div className="text-sm text-muted-foreground">Economic value unlocked</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">250M+ Community</div>
                <div className="text-sm text-muted-foreground">Diaspora professionals</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced CTA Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="hero" size="xl" className="text-lg px-8 py-4 rounded-xl font-bold shadow-glow group">
                <Link to="/auth" className="flex items-center gap-2">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="glass" size="xl" className="text-lg px-8 py-4 rounded-xl font-semibold">
                <Link to="/consultation">
                  Book a Demo
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Join 250M+ diaspora professionals already transforming their futures
            </p>
          </div>
          
          {/* Enhanced Stats */}
          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:text-primary/80 transition-colors">
                250M+
              </div>
              <div className="text-muted-foreground font-medium">Global Diaspora Population</div>
              <div className="text-xs text-muted-foreground/60 mt-1">Professionals & Entrepreneurs</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-black text-accent mb-2 group-hover:text-accent/80 transition-colors">
                £685B
              </div>
              <div className="text-muted-foreground font-medium">Annual Economic Impact</div>
              <div className="text-xs text-muted-foreground/60 mt-1">Diaspora Contribution to Global Economy</div>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2 group-hover:text-primary/80 transition-colors">
                190+
              </div>
              <div className="text-muted-foreground font-medium">Countries Connected</div>
              <div className="text-xs text-muted-foreground/60 mt-1">Growing Global Network</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;