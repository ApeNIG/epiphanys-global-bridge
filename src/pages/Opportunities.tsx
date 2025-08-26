import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpportunityHub from "@/components/OpportunityHub";

const Opportunities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Enhanced Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-royal-blue/20 to-emerald-green/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-sunset-orange/15 to-gold-amber/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-magenta/15 to-royal-blue/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
          
          {/* Floating Elements */}
          <div className="absolute top-32 right-1/4 w-3 h-3 bg-emerald-green rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-gold-amber rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
          <div className="absolute top-1/3 right-1/6 w-4 h-4 bg-sunset-orange/80 rounded-full animate-bounce" style={{animationDelay: '2.5s'}} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            Discover Global
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Opportunities</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mb-8">
            Explore curated business, career, investment, and collaboration opportunities 
            from both <span className="text-emerald-green font-semibold">public and private sectors</span>, with a strong focus on serving 
            <span className="text-sunset-orange font-semibold"> diaspora communities</span>.
          </p>
        </div>
      </section>
      
      <main className="container mx-auto px-4 py-12">
        <OpportunityHub />
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;