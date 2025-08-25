import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OpportunityCategories from "@/components/OpportunityCategories";
import OpportunityHub from "@/components/OpportunityHub";
import DiasporaFocus from "@/components/DiasporaFocus";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <OpportunityCategories />
      <OpportunityHub />
      <DiasporaFocus />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
