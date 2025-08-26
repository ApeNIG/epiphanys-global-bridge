import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden flow-wireframe-bg">
      {/* Geometric decorative elements */}
      <div className="flow-geometric-shape w-32 h-32 rotate-45 top-20 left-10 opacity-60" />
      <div className="flow-geometric-shape w-24 h-24 rotate-12 top-40 right-20 opacity-40" />
      <div className="flow-geometric-shape w-40 h-40 -rotate-12 bottom-32 left-20 opacity-30" />
      <div className="flow-geometric-shape w-28 h-28 rotate-45 bottom-20 right-32 opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
            <span className="block text-foreground mb-4">BUILD THE NEXT</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              KILLER APP
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
            Epiphiny Flow provides the tools and infrastructure to build 
            and scale apps faster and better than anywhere else.
          </p>
          
          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              asChild 
              variant="hero" 
              size="xl"
              className="text-lg px-12 py-6 rounded-xl font-bold shadow-glow"
            >
              <Link to="/auth">Start Building</Link>
            </Button>
          </div>
          
          {/* Partners/Companies */}
          <div className="pt-16">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-8 font-semibold">
              POWERING APPS FROM BRANDS AND COMPANIES ACROSS THE WORLD
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <div className="text-2xl font-bold text-muted-foreground">NBA</div>
              <div className="text-2xl font-bold text-muted-foreground">Disney</div>
              <div className="text-2xl font-bold text-muted-foreground">LaLiga</div>
              <div className="text-2xl font-bold text-muted-foreground">UFC</div>
              <div className="text-2xl font-bold text-muted-foreground">CryptoKitties</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;