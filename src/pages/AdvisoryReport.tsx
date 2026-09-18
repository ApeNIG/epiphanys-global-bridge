import { TrendingUp, Target, Landmark, Users, ArrowRight } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import reportWorkspace from "@/assets/v3/advisory-report-coworking.jpg";

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
      <section className="bg-white v3-page-intro">
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
            href="mailto:info@epiphinyflow.com?subject=Advisory%20Report%20-%20notify%20me"
            className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit mt-10"
          >
            Register to receive it
            <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>

      {/* Documentary workspace scene with the report's central argument embedded
          in the image treatment. */}
      <section className="bg-white v3-related-tail">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="relative rounded-[20px] overflow-hidden h-[560px] md:h-[540px] lg:h-[620px] bg-[#070B11]">
            <img
              src={reportWorkspace}
              alt="People working together in a bright coworking space"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="advisory-report-image-gradient absolute inset-0" />

            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="w-full md:w-[48%] md:ml-auto p-7 sm:p-9 md:p-12 lg:p-16">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-[2px] bg-[#00E7C3]" />
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-[#00E7C3]">
                    Inside the Advisory Report
                  </span>
                </div>
                <h2 className="font-serif text-[clamp(2.25rem,4.2vw,3.5rem)] text-white leading-[1.08] tracking-[-0.02em] mb-6">
                  What it really takes to unlock investment.
                </h2>
                <p className="text-white/70 text-[15px] md:text-[17px] leading-[1.75] max-w-[500px]">
                  The barriers diaspora founders face, what genuinely shifts them,
                  and where the gaps remain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What it will cover ── */}
      <section className="bg-[#F5F0E8] v3-section">
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
