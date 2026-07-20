import { TrendingUp, Target, Landmark, Users, ArrowRight } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

const topics = [
  {
    icon: TrendingUp,
    title: "The diaspora growth engine",
    description:
      "How diaspora and minority-led businesses contribute to the UK economy, and where the biggest opportunities for growth sit.",
    accent: "#00E7C3",
  },
  {
    icon: Target,
    title: "Access to investment & funding",
    description:
      "The real barriers diaspora founders face in reaching capital, and the pathways that are starting to close the gap.",
    accent: "#8B5CF6",
  },
  {
    icon: Landmark,
    title: "Policy & partnerships",
    description:
      "How public and private stakeholders can work together to unlock local-to-global investment pathways.",
    accent: "#00E7C3",
  },
  {
    icon: Users,
    title: "Investment readiness",
    description:
      "What backers look for, and how founders and businesses can prepare to be investment-ready.",
    accent: "#E89B3E",
  },
];

const AdvisoryReport = () => (
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
              Advisory Report
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
            The Advisory Report
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[640px]">
            In-depth research and insight on diaspora investment and economic
            opportunity across the UK. The first edition is in production.
            Register to receive it the moment it lands.
          </p>

          <a
            href="mailto:Robert@epiphinyflow.com?subject=Advisory%20Report%20-%20notify%20me"
            className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit mt-10"
          >
            Register to receive it
            <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>

      {/* ── What it will cover ── */}
      <section className="bg-[#F5F0E8] py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              In this edition
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[620px] mb-14">
            What the report will cover
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {topics.map((t) => (
              <div
                key={t.title}
                className="bg-white rounded-[20px] p-8 border border-transparent hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${t.accent}1a` }}
                >
                  <t.icon className="w-5 h-5" style={{ color: t.accent }} />
                </div>
                <h3 className="font-serif text-[22px] text-[#15171A] mb-3">
                  {t.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.75]">
                  {t.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[14px] text-gray-400 leading-[1.7] mt-10 max-w-[640px]">
            Topics are indicative and may evolve as the first edition is
            finalised.
          </p>
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default AdvisoryReport;
