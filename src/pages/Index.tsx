import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OpportunityCategories from "@/components/OpportunityCategories";
import DiasporaFocus from "@/components/DiasporaFocus";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <OpportunityCategories />
      <DiasporaFocus />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
