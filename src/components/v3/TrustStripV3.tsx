import { useScrollReveal } from "@/hooks/useScrollReveal";

import mccLogo from "@/assets/partners/mcc-logo.png";
import gmcaLogo from "@/assets/partners/gmca-logo.png";
import gmGrowthHubLogo from "@/assets/partners/gm-growth-hub-logo.png";
import ukBlackTechLogo from "@/assets/partners/uk-black-tech-logo.png";
import ourBusinessGmLogo from "@/assets/partners/our-business-gm-logo.png";
import universitySalfordLogo from "@/assets/partners/university-salford-logo.png";
import factoryInternationalLogo from "@/assets/partners/factory-international-logo.png";

const partners = [
  { name: "MC2", logo: mccLogo },
  { name: "GMCA", logo: gmcaLogo },
  { name: "Factory International", logo: factoryInternationalLogo },
  { name: "GM Growth Hub", logo: gmGrowthHubLogo },
  { name: "UK Black Tech", logo: ukBlackTechLogo },
  { name: "Our Business GM", logo: ourBusinessGmLogo },
  { name: "University of Salford", logo: universitySalfordLogo },
];

const TrustStripV3 = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative">
      <div className="bg-[#F5F0E8] pt-36 md:pt-44 pb-20 md:pb-24">
        <div
          ref={ref}
          className="reveal-up max-w-[1440px] mx-auto px-6 md:px-20"
        >
          {/* Editorial pull-quote style — big, confident, magazine-feel */}
          <div className="max-w-[1000px]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Our Mission
              </span>
            </div>

            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] text-[#15171A] leading-[1.35]">
              <span className="block">An inclusive digital ecosystem that{" "}
              <em className="not-italic text-[#8B5CF6]">unlocks opportunities</em>,</span>
              <span className="block">celebrates cultural identity, and drives{" "}
              <em className="not-italic text-[#00E7C3]">collaborative growth</em></span>
              <span className="block">across borders</span>
            </h2>
          </div>

          {/* Editorial video — B&W, below mission text */}
          <div className="rounded-2xl overflow-hidden h-[240px] md:h-[360px] mt-14 relative">
            <video
              className="w-full h-full object-cover object-[center_20%]"
              src="/videos/hero-video.mp4#t=5"
              autoPlay
              loop
              muted
              playsInline
              style={{ filter: "grayscale(100%) brightness(0.7)" }}
              onTimeUpdate={(e) => {
                const vid = e.currentTarget;
                if (vid.currentTime < 5 || vid.currentTime > 35.7) vid.currentTime = 5;
              }}
            />
          </div>

          {/* Partners — real logos, editorial grayscale */}
          <div className="mt-14 border-t border-[#D4CCBA] pt-8">
            <span className="text-[10px] font-semibold tracking-[3px] uppercase text-gray-400 block mb-6">
              Trusted Partners
            </span>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {partners.map((partner) => (
                <img
                  key={partner.name}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-10 md:h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom edge — organic transition to features */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-24"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0L1440 0L1440 32C1440 32 1200 96 720 96C240 96 0 32 0 32L0 0Z"
          fill="#F5F0E8"
        />
      </svg>
    </section>
  );
};

export default TrustStripV3;
