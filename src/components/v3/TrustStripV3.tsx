import manchesterCityCouncilLogo from "@/assets/partners/manchester-city-council-logo.png";
import gmcaLogo from "@/assets/partners/gmca-logo.png";
import gmGrowthHubLogo from "@/assets/partners/gm-business-growth-hub-logo.svg";
import ukBlackTechLogo from "@/assets/partners/uk-black-tech-logo.png";
import ourBusinessGmLogo from "@/assets/partners/our-business-gm-logo.png";
import universitySalfordLogo from "@/assets/partners/university-salford-logo.png";
import factoryInternationalLogo from "@/assets/partners/factory-international-logo.png";
import mc2Logo from "@/assets/partners/mc2-logo.svg";
import inclusiveNorthLogo from "@/assets/partners/inclusive-north-logo.png";
import betterSocietyCapitalLogo from "@/assets/partners/better-society-capital-logo.svg";
import goodFinanceLogo from "@/assets/partners/good-finance-logo.png";
import socialInvestmentBusinessLogo from "@/assets/partners/social-investment-business-logo.png";
import bruntwoodSciTechLogo from "@/assets/partners/bruntwood-scitech-logo.png";
import bruntwoodRaceNetworkLogo from "@/assets/partners/bruntwood-race-network-logo.png";
import manchesterMetropolitanUniversityLogo from "@/assets/partners/manchester-metropolitan-university-logo.png";
import proManchesterLogo from "@/assets/partners/pro-manchester-logo-display.png";
import greaterManchesterChamberLogo from "@/assets/partners/greater-manchester-chamber-logo-display.png";

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
      { name: "Better Society Capital", logo: betterSocietyCapitalLogo },
      { name: "Good Finance", logo: goodFinanceLogo },
      { name: "Bruntwood SciTech", logo: bruntwoodSciTechLogo },
      { name: "Bruntwood Race Network", logo: bruntwoodRaceNetworkLogo },
    ],
  },
  {
    heading: "Partners",
    logos: [
      { name: "Social Investment Business", logo: socialInvestmentBusinessLogo },
      { name: "GM Business Growth Hub", logo: gmGrowthHubLogo },
      { name: "Manchester Metropolitan University", logo: manchesterMetropolitanUniversityLogo },
      { name: "pro-manchester", logo: proManchesterLogo },
      { name: "Greater Manchester Chamber of Commerce", logo: greaterManchesterChamberLogo },
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
  return (
    <section className="relative">
      <div className="relative z-10 bg-[#F5F0E8] pt-6 md:pt-8 pb-8 md:pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
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
                    <div
                      key={`${group.heading}-${pass}`}
                      data-marquee-copy={pass}
                      className="flex items-center gap-x-10 shrink-0"
                    >
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
                          className={`shrink-0 rounded-lg px-5 py-4 flex items-center justify-center h-[88px] md:h-[100px] ${
                            partner.name === "UK Black Tech" ? "bg-[#15171A]" : "bg-white"
                          }`}
                        >
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className={`w-auto object-contain ${
                              partner.name === "Our Business GM"
                                ? "h-7 md:h-8 max-w-[260px]"
                                : partner.name === "Bruntwood Race Network"
                                  ? "h-14 md:h-16 max-w-[100px]"
                                  : partner.name === "Manchester Metropolitan University"
                                    ? "h-12 md:h-14 max-w-[240px]"
                                    : "h-10 md:h-12 max-w-[220px] md:max-w-[270px]"
                            }`}
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
        className="absolute z-0 bottom-0 left-0 w-full h-16 md:h-24 pointer-events-none"
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
