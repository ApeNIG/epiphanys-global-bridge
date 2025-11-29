import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe, TrendingUp, Users, Sparkles } from "lucide-react";
import ParallaxLayer from "./ParallaxLayer";
import ScrollReveal from "./ScrollReveal";
const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-10">
          <ScrollReveal animation="fade" delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Diaspora-First Opportunity Platform</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={200}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                <span className="block text-foreground mb-2">Epiphiny Flow</span>
                <span className="block bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                  Advisory & Investment
                </span>
                <span className="block text-foreground/80 text-3xl md:text-4xl lg:text-5xl mt-4 font-bold">
                  GROW - SCALE - BOOST
                </span>
              </h1>
              
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto">
                  Building a future where every diaspora community member has access to knowledge, funding and investment
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="scale" delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:scale-105 transition-transform">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">Global Network</div>
                  <div className="text-sm text-muted-foreground">190+ countries connected</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:scale-105 transition-transform">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">£685B Impact</div>
                  <div className="text-sm text-muted-foreground">Economic value unlocked</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:scale-105 transition-transform">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground">250M+ Community</div>
                  <div className="text-sm text-muted-foreground">Diaspora professionals</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade" delay={400}>
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
          </ScrollReveal>
          
          <ScrollReveal animation="slide-up" delay={500}>
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
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Hero;
