import HeaderV2 from "@/components/v2/HeaderV2";
import HeroV2 from "@/components/v2/HeroV2";
import TrustStripV2 from "@/components/v2/TrustStripV2";
import FeaturesV2 from "@/components/v2/FeaturesV2";
import CommunityV2 from "@/components/v2/CommunityV2";
import CtaV2 from "@/components/v2/CtaV2";
import FooterV2 from "@/components/v2/FooterV2";

const IndexV2 = () => {
  return (
    <div className="min-h-screen bg-white light [&_a]:no-underline" data-theme="light" style={{ colorScheme: "light" }}>
      <HeaderV2 />
      <main>
        <HeroV2 />
        <TrustStripV2 />
        <FeaturesV2 />
        <CommunityV2 />
        <CtaV2 />
      </main>
      <FooterV2 />
    </div>
  );
};

export default IndexV2;
