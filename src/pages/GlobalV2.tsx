import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV2 from "@/components/v2/HeaderV2";
import FooterV2 from "@/components/v2/FooterV2";

const heroStats = [
  { value: "195+", label: "Countries" },
  { value: "50M+", label: "Communities" },
  { value: "10K+", label: "Opportunities" },
  { value: "500+", label: "Partners" },
];

const regions = [
  {
    name: "Africa & Caribbean",
    opportunities: "2,500+",
    focus: "Tech innovation & renewable energy",
  },
  {
    name: "South Asia",
    opportunities: "3,200+",
    focus: "Fintech & healthcare solutions",
  },
  {
    name: "Middle East & North Africa",
    opportunities: "1,800+",
    focus: "Infrastructure & sustainable development",
  },
  {
    name: "Europe & Americas",
    opportunities: "2,100+",
    focus: "Advanced manufacturing & green tech",
  },
];

const initiatives = [
  {
    title: "Diaspora Investment Network",
    stat: "\u00a32.5B+",
    description:
      "Connecting diaspora capital with high-impact ventures across emerging markets. Our network facilitates cross-border investment with full regulatory compliance.",
  },
  {
    title: "Cross-Border Skills Exchange",
    stat: "15K+",
    statLabel: "connected",
    description:
      "Matching diaspora talent with opportunities in heritage countries and beyond. Bridging skills gaps through cultural understanding and professional expertise.",
  },
  {
    title: "Global Innovation Hubs",
    stat: "25",
    statLabel: "cities",
    description:
      "Physical and virtual spaces where diaspora innovators collaborate, prototype, and launch ventures that serve both home and host communities.",
  },
  {
    title: "Cultural Capital Programme",
    stat: "500+",
    statLabel: "ambassadors",
    description:
      "Training cultural ambassadors who bridge business practices, build trust across borders, and unlock opportunities through deep cultural intelligence.",
  },
];

const GlobalV2 = () => {
  return (
    <div
      className="min-h-screen bg-white light [&_a]:no-underline"
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <HeaderV2 />
      <main>
        {/* Hero */}
        <section className="bg-white pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Global Network
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#15171A] leading-[1.1] tracking-[-0.01em] max-w-[800px]">
              Connecting Diasporas Across Continents
            </h1>

            <p className="text-gray-500 text-[17px] mt-6 leading-[1.7] max-w-[600px]">
              From the UK to every corner of the world, we connect communities,
              capital, and opportunities that transcend borders.
            </p>

            {/* Stat bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-gray-200/60">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-[28px] md:text-[32px] font-bold text-[#15171A] tracking-tight font-sans">
                    {stat.value}
                  </span>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regions */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Our Reach
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[600px] mb-16">
              Diaspora Communities Worldwide
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regions.map((region) => (
                <div
                  key={region.name}
                  className="group rounded-[20px] border border-gray-200/80 p-8 hover:border-[#00E7C3]/40 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-serif text-[22px] text-[#15171A] mb-2">
                    {region.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-[26px] font-bold text-[#00E7C3] tracking-tight font-sans">
                      {region.opportunities}
                    </span>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider">
                      opportunities
                    </span>
                  </div>
                  <p className="text-[15px] text-gray-500 leading-[1.7]">
                    {region.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Initiatives */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Global Initiatives
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-[20px] p-7 flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-[28px] font-bold text-[#15171A] tracking-tight font-sans">
                      {item.stat}
                    </span>
                    {item.statLabel && (
                      <span className="text-[11px] text-gray-400 uppercase tracking-wider">
                        {item.statLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-[20px] text-[#15171A] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[600px] mb-10">
              Ready to go global?
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/opportunities"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Explore Opportunities
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Join Network
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default GlobalV2;
