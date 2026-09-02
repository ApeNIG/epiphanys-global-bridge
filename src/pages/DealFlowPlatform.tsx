import { Search, Target, ShieldCheck, Handshake, ArrowRight } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

const capabilities = [
  {
    icon: Search,
    title: "Curated deal flow",
    description:
      "Surfacing investment-ready diaspora and minority-led businesses to the right public and private backers.",
    accent: "#00E7C3",
  },
  {
    icon: Target,
    title: "Investment readiness",
    description:
      "Helping founders and businesses prepare, package and present so they are ready to raise.",
    accent: "#8B5CF6",
  },
  {
    icon: ShieldCheck,
    title: "A transparent process",
    description:
      "Clear, honest information for both sides, built to the relevant UK standards as the platform develops.",
    accent: "#00E7C3",
  },
  {
    icon: Handshake,
    title: "Built with partners",
    description:
      "Developed in partnership with public and private stakeholders across the UK ecosystem.",
    accent: "#E89B3E",
  },
];

const DealFlowPlatform = () => (
  <div
    className="min-h-screen bg-white light [&_a]:no-underline"
    data-theme="light"
    style={{ colorScheme: "light" }}
  >
    <HeaderV3 />

    <main>
      {/* ── Hero ── */}
      <section className="bg-white pt-32 md:pt-44 pb-16 md:pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Our Fund · Deal Flow Platform
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
            Connecting capital with
            <br />
            investment-ready businesses
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[640px]">
            The Deal Flow Platform is part of the technology we are building to
            connect public and private backers with investment-ready diaspora
            businesses across the UK. It is in development, and we would love to
            hear from you early.
          </p>

          <a
            href="mailto:info@epiphinyflow.com?subject=Deal%20Flow%20Platform%20-%20register%20my%20interest"
            className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit mt-10"
          >
            Register your interest
            <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>

      {/* ── What it will do ── */}
      <section className="bg-[#F5F0E8] py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              In development
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[620px] mb-14">
            What the platform will do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="bg-white rounded-[20px] p-8 border border-transparent hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${c.accent}1a` }}
                >
                  <c.icon className="w-5 h-5" style={{ color: c.accent }} />
                </div>
                <h3 className="font-serif text-[22px] text-[#15171A] mb-3">
                  {c.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.75]">
                  {c.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[14px] text-gray-400 leading-[1.7] mt-10 max-w-[640px]">
            Features are indicative and will evolve as the platform is built.
          </p>
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default DealFlowPlatform;
