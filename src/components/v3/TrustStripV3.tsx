import { useScrollReveal } from "@/hooks/useScrollReveal";

import manchesterCityCouncilLogo from "@/assets/partners/manchester-city-council-logo.png";
import gmcaLogo from "@/assets/partners/gmca-logo.png";
import gmGrowthHubLogo from "@/assets/partners/gm-growth-hub-logo.png";
import ukBlackTechLogo from "@/assets/partners/uk-black-tech-logo.png";
import ourBusinessGmLogo from "@/assets/partners/our-business-gm-logo.png";
import universitySalfordLogo from "@/assets/partners/university-salford-logo.png";
import factoryInternationalLogo from "@/assets/partners/factory-international-logo.png";
import mc2Logo from "@/assets/partners/mc2-logo.svg";
import inclusiveNorthLogo from "@/assets/partners/inclusive-north-logo.png";
import betterSocietyCapitalLogo from "@/assets/partners/better-society-capital-logo.svg";
import goodFinanceLogo from "@/assets/partners/good-finance-logo.png";
import socialInvestmentBusinessLogo from "@/assets/partners/social-investment-business-logo.png";

/* Grouped exactly as the client's Drive folders are grouped, which is the
   client's own statement of who belongs where:
   Epiphiny Flow Website / Grow Scale Boost {Sponsors, Partners, Supporters}.

   Note on MC2 and MCC, because this cost two wrong turns. The repo file called
   mcc-logo.png actually CONTAINED the MC2 mark, so the original code labelling
   it "MC2" was correct and the FILE was misnamed. Manchester City Council's real
   logo was never in the repo at all; it came from the client's Drive. The file
   is now renamed mc2-logo-legacy.png and is unused, MC2 uses its own SVG, and
   MCC uses its own mark. */
const groups: { heading: string; logos: { name: string; logo: string }[] }[] = [
  {
    heading: "Sponsors",
    logos: [
      { name: "MC2", logo: mc2Logo },
      { name: "University of Salford", logo: universitySalfordLogo },
      { name: "Factory International", logo: factoryInternationalLogo },
      { name: "Our Business GM", logo: ourBusinessGmLogo },
      { name: "Inclusive North", logo: inclusiveNorthLogo },
    ],
  },
  {
    heading: "Partners",
    logos: [
      { name: "Better Society Capital", logo: betterSocietyCapitalLogo },
      { name: "Good Finance", logo: goodFinanceLogo },
      { name: "Social Investment Business", logo: socialInvestmentBusinessLogo },
      { name: "GM Business Growth Hub", logo: gmGrowthHubLogo },
    ],
  },
  {
    heading: "Supporters",
    logos: [
      { name: "Manchester City Council", logo: manchesterCityCouncilLogo },
      { name: "UK Black Tech", logo: ukBlackTechLogo },
      { name: "Greater Manchester Combined Authority", logo: gmcaLogo },
    ],
  },
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

            {/* No forced line breaks: the statement was three hard-wrapped
                blocks, which stopped being three lines the moment the type was
                enlarged and orphaned the word "powers". Letting it flow keeps
                the rag honest at any size. */}
            <h2 className="font-serif text-[clamp(2.1rem,4.8vw,3.4rem)] text-[#15171A] leading-[1.28] text-balance">
              To build a more connected and inclusive ecosystem that{" "}
              <em className="not-italic text-[#8B5CF6]">unlocks investment and funding</em>,
              celebrates the{" "}
              <em className="not-italic text-[#00E7C3]">UK&rsquo;s diversity</em>, and powers
              a collaborative approach to growth
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

          {/* ONE endless row, not three. The headings ride INSIDE the track
              with their own group, so Rob's "logos with specified headings" and
              a single continuous loop are both satisfied. The track holds the
              whole sequence twice, so translating -50% wraps seamlessly.
              Pauses on hover so a name can be read. */}
          <div className="mt-14 border-t border-[#D4CCBA] pt-10">
            <div className="logo-marquee overflow-hidden">
              <div className="logo-track flex items-center gap-x-10" style={{ animationDuration: "46s" }}>
                {[0, 1].map((pass) =>
                  groups.map((group) => (
                    <div key={`${group.heading}-${pass}`} className="flex items-center gap-x-10 shrink-0">
                      <span
                        aria-hidden={pass === 1}
                        className="text-[10px] font-semibold tracking-[3px] uppercase text-gray-400 shrink-0 border-l border-[#D4CCBA] pl-6"
                      >
                        {group.heading}
                      </span>
                      {group.logos.map((partner) => (
                        <div
                          key={`${partner.name}-${pass}`}
                          aria-hidden={pass === 1}
                          className="shrink-0 bg-white rounded-lg px-6 py-4 flex items-center justify-center h-[74px] md:h-[84px]"
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-[filter]"
                          />
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
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
