import {
  Sparkles,
  Shield,
  BarChart3,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV2 from "@/components/v2/HeaderV2";
import FooterV2 from "@/components/v2/FooterV2";

const howItWorks = [
  {
    icon: Sparkles,
    title: "Smart Matching",
    description:
      "Our AI-powered engine matches investors with businesses based on sector alignment, risk profile, impact goals, and cultural fit across diaspora markets.",
  },
  {
    icon: Shield,
    title: "Due Diligence Hub",
    description:
      "Comprehensive vetting with FCA compliance, financial audits, market analysis, and risk assessment. Every opportunity is thoroughly validated before listing.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Real-time dashboards tracking portfolio performance, impact metrics, and market trends. Make data-driven decisions with full transparency.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Access investment opportunities across 47 countries through our trusted network of diaspora entrepreneurs, fund managers, and institutional partners.",
  },
];

const investorTypes = [
  {
    title: "Public Sector Investors",
    description:
      "Government bodies, development finance institutions, and impact-focused funds seeking measurable social and economic returns.",
    points: [
      "ESG-focused opportunities",
      "Impact measurement frameworks",
      "Regulatory compliance",
      "Risk mitigation strategies",
    ],
  },
  {
    title: "Private Investors",
    description:
      "Angel investors, family offices, and venture funds looking for high-growth opportunities with cultural intelligence.",
    points: [
      "High-growth ventures",
      "Due diligence support",
      "Portfolio management tools",
      "Exit strategies",
    ],
  },
];

const businessTypes = [
  {
    title: "Startups",
    stage: "Seed & Series A",
    description:
      "Early-stage ventures with diaspora market insight. Get matched with investors who understand cross-border potential and cultural market dynamics.",
  },
  {
    title: "Scale-ups",
    stage: "Series B+",
    description:
      "Growth-stage businesses expanding across borders. Access capital, strategic partners, and market intelligence for international scaling.",
  },
  {
    title: "SMEs",
    stage: "Development Capital",
    description:
      "Established small and medium enterprises seeking capital for expansion, modernisation, or entering new diaspora-connected markets.",
  },
];

const InvestmentHubV2 = () => {
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
                Investment Hub
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#15171A] leading-[1.1] tracking-[-0.01em] max-w-[800px]">
              Connecting Innovation & Investment
            </h1>

            <p className="text-gray-500 text-[17px] mt-6 leading-[1.7] max-w-[600px]">
              Our Investment Hub connects public and private investors with
              high-potential businesses across diaspora communities.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                How It Works
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-[20px] p-7 flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mb-6">
                    <item.icon className="w-5 h-5 text-[#8B5CF6]" />
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

        {/* For Investors */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                For Investors
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investorTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-[20px] border border-gray-200/80 p-8 hover:border-[#8B5CF6]/30 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-serif text-[24px] text-[#15171A] mb-3">
                    {type.title}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-[1.7] mb-6">
                    {type.description}
                  </p>
                  <ul className="space-y-3">
                    {type.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-[14px] text-[#15171A]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00E7C3] flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Businesses */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                For Businesses
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {businessTypes.map((biz) => (
                <div
                  key={biz.title}
                  className="bg-white rounded-[20px] p-7 flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#8B5CF6] mb-3">
                    {biz.stage}
                  </span>
                  <h3 className="font-serif text-[22px] text-[#15171A] mb-3">
                    {biz.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-[1.7]">
                    {biz.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[700px] mb-10">
              Transform your investment journey
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/investment-hub"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Start Investing
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                List Your Business
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default InvestmentHubV2;
