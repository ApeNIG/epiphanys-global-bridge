import { ArrowRight, CheckCircle2 } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import CapitalFlowV3 from "@/components/v3/CapitalFlowV3";
import StatusBadge from "@/components/v3/StatusBadge";

const Overline = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-[2px] bg-[#00E7C3]" />
    <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
      {label}
    </span>
  </div>
);

/* howItWorks and businessTypes are gone, not moved. They were four cards and
   three cards restating what the capital-flow diagram now shows in one figure,
   and the challenger's second ranked fix was "cut at least half the card grids;
   where information expresses sequence or relationship, draw the relationship".
   Restating a diagram as cards underneath it is the exact habit it flagged.
   The one claim that lived only in those cards, UK regulatory standards, is
   preserved in the diagram's introduction below. */

const investorTypes = [
  {
    title: "Public Sector Backers",
    description:
      "Government bodies, development finance institutions and impact-focused funds seeking measurable social and economic returns.",
    points: [
      "Impact-focused opportunities",
      "Measurable social return",
      "UK economic growth",
      "Diaspora community reach",
    ],
  },
  {
    title: "Private Backers",
    description:
      "Angel investors, family offices and venture funds looking for high-growth opportunities with cultural intelligence.",
    points: [
      "High-growth ventures",
      "Diaspora market insight",
      "Long-term partnership",
      "Shared, inclusive growth",
    ],
  },
];

const InvestmentV3 = () => {
  return (
    <div
      className="min-h-screen bg-white light [&_a]:no-underline"
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <HeaderV3 />

      <main>
        {/* ── Hero ── */}
        <section className="bg-white pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Fund" />
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
              Backing investment-ready
              <br />
              diaspora businesses
            </h1>
            <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[620px] mb-8">
              Our prospective fund will invest in investment-ready diasporic
              community businesses to fuel growth across the UK. We are building it
              in partnership with public and private stakeholders.
            </p>
            {/* Stated at the top of the page, not buried at the bottom. A diagram
                this concrete is exactly the kind of thing a reader mistakes for
                something already running. */}
            <StatusBadge status="prospective" />
          </div>
        </section>

        {/* ── The capital flow ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          {/* Same container as every other section on the page. The diagram was
              briefly in a narrower one, which broke the left margin the whole
              page is aligned to. */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Capital Flow" />
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[620px] mb-5">
              How capital will move from backers to businesses
            </h2>
            <p className="text-gray-500 text-[16px] leading-[1.8] max-w-[620px] mb-16">
              This is the mechanism we are building, described end to end. Every
              business will go through vetting, financial review and risk
              assessment before any capital moves, and the fund is being designed
              to meet the relevant UK regulatory standards.
            </p>

            {/* Left-aligned to the heading rather than centred, so the figure
                reads as part of the argument instead of a floating illustration. */}
            <div className="max-w-[1080px]">
              <CapitalFlowV3 />
            </div>
          </div>
        </section>

        {/* ── For Investors ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="For Backers" />
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px] mb-16">
              Built for public and private backers
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {investorTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-[20px] border border-gray-200/80 p-8 hover:border-[#8B5CF6]/30 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-serif text-[22px] text-[#15171A] mb-3">
                    {type.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-[1.75] mb-7">
                    {type.description}
                  </p>
                  <ul className="space-y-3">
                    {type.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-[13px] text-[#15171A]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00E7C3] shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA, dark accent block ── */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[640px] mb-10">
              Register your interest in the fund
            </h2>
            {/* These two were the last links into the consultation form. The
                site now contacts by email throughout, so they do too; the two
                distinct intents are preserved in the subject line rather than
                in a form field. */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="mailto:info@epiphinyflow.com?subject=Our%20Fund%20-%20register%20as%20a%20backer"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Register as a backer
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <a
                href="mailto:info@epiphinyflow.com?subject=Our%20Fund%20-%20about%20my%20business"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Tell us about your business
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </div>
  );
};

export default InvestmentV3;
