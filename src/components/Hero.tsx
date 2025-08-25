import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(${heroBackground})`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Globe className="w-4 h-4" />
            Global Diaspora Platform
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Empowering 
            <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
              {" "}Diaspora{" "}
            </span>
            Communities
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">Unlocking networks, investment, and growth opportunities -  empowering underrepresented founders and professionals to access capital, mentorship, and global markets.</p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center gap-2 text-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold">50M+ Diaspora</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="font-semibold">£2.5T Economic Impact</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Globe className="w-5 h-5 text-purple-500" />
              <span className="font-semibold">Global Network</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              Join the Platform
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="glass" size="xl">
              Explore Opportunities
            </Button>
          </div>
          
          {/* Trust Indicator */}
          <p className="text-sm text-muted-foreground mt-8">
            Trusted by leading organizations across the UK and beyond
          </p>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </section>;
};
export default Hero;