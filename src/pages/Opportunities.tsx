import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpportunityHub from "@/components/OpportunityHub";

const Opportunities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
            Discover Global Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover curated business, career, investment, and collaboration opportunities 
            from both public and private sectors, with a focus on serving diaspora communities.
          </p>
        </div>
        <OpportunityHub />
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;