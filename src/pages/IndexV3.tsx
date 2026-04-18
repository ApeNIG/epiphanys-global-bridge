import HeaderV3 from "@/components/v3/HeaderV3";
import HeroV3 from "@/components/v3/HeroV3";
import TrustStripV3 from "@/components/v3/TrustStripV3";
import FeaturesV3 from "@/components/v3/FeaturesV3";
import CommunityV3 from "@/components/v3/CommunityV3";
import CtaV3 from "@/components/v3/CtaV3";
import FooterV3 from "@/components/v3/FooterV3";

const IndexV3 = () => {
  return (
    <div className="min-h-screen bg-white light [&_a]:no-underline" data-theme="light" style={{ colorScheme: "light" }}>
      <HeaderV3 />
      <main>
        <HeroV3 />
        <TrustStripV3 />
        <FeaturesV3 />
        <CommunityV3 />
        <CtaV3 />
      </main>
      <FooterV3 />
    </div>
  );
};

export default IndexV3;
