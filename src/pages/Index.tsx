import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import PrinciplesBar from "@/components/PrinciplesBar";
import OpportunityCategories from "@/components/OpportunityCategories";
import OpportunityHub from "@/components/OpportunityHub";
import DiasporaLeadersCarousel from "@/components/DiasporaLeadersCarousel";
import ImpactDashboard from "@/components/ImpactDashboard";
import DiasporaFocus from "@/components/DiasporaFocus";
import TrustIndicators from "@/components/TrustIndicators";
import QuickOnboarding from "@/components/QuickOnboarding";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <VideoSection />
      <PrinciplesBar />
      <DiasporaLeadersCarousel />
      <OpportunityCategories />
      <OpportunityHub />
      <ImpactDashboard />
      <DiasporaFocus />
      <TrustIndicators />
      <QuickOnboarding />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
