import {
  ArrowRight,
  Rocket,
  TrendingUp,
  Building2,
  Briefcase,
  Landmark,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import founderConsultancy from "@/assets/v3/founder-consultancy.jpg";

const Overline = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-[2px] bg-[#00E7C3]" />
    <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
      {label}
    </span>
  </div>
);

const advisoryCards = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Transform ideas into viable businesses with expert guidance at every stage.",
    stat: "95% secure first-round funding",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    description: "Accelerate growth while maintaining cultural authenticity across borders.",
    stat: "340% revenue growth in 18 months",
  },
  {
    icon: Building2,
    title: "SMEs",
    description: "Strengthen market position through strategic diaspora connections.",
    stat: "78% increase in market reach",
  },
  {
    icon: Briefcase,
    title: "Enterprise",
    description: "Leverage diaspora intelligence for competitive advantage at scale.",
    stat: "£50M+ new opportunities identified",
  },
  {
    icon: Landmark,
    title: "Government",
    description: "Harness diaspora potential for measurable economic development.",
    stat: "£2.5B economic activity facilitated",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Assessment",
    timeline: "2–4 weeks",
    description:
      "We immerse ourselves in your organisation, understanding your goals, challenges, and the diaspora communities most relevant to your growth trajectory.",
  },
  {
    number: "02",
    title: "Strategy Development",
    timeline: "3–6 weeks",
    description:
      "Our team crafts a bespoke advisory strategy, mapping diaspora networks, identifying opportunities, and building a roadmap tailored to your sector.",
  },
  {
    number: "03",
    title: "Implementation Support",
    timeline: "Ongoing",
    description:
      "We work alongside your team to execute the strategy — facilitating introductions, navigating cultural nuances, and ensuring measurable progress.",
  },
  {
    number: "04",
    title: "Performance Monitoring",
    timeline: "Monthly reviews",
    description:
      "Regular reviews track KPIs, surface new opportunities, and refine the approach based on real-world results and shifting market dynamics.",
  },
];

const AdvisoryV3 = () => {
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
            <Overline label="Advisory Services" />
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
              Advice that helps you
              <br />
              grow and scale
            </h1>
            <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[620px]">
              Strategic advisory for founders, businesses and institutions,
              connecting you to the diaspora networks, capital and opportunities
              that drive real growth. From first idea to global scale.
            </p>
          </div>
        </section>

        {/* The picture does the same job as the copy: someone being advised,
            in the room where it happens. Not decoration. */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <div className="rounded-[20px] overflow-hidden h-[320px] md:h-[440px]">
                  <img
                    src={founderConsultancy}
                    alt="A founder mid-answer across a table from an advisor, a single sheet between them"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <h2 className="font-serif text-[26px] md:text-[32px] text-[#15171A] leading-[1.25] mb-5">
                  Most founders do not need a pitch deck. They need the right
                  introduction.
                </h2>
                <p className="text-gray-500 text-[16px] leading-[1.8]">
                  Our advisory board covers access to investment and funding,
                  investment readiness, marketing, intellectual property and
                  partnerships. You get the specialists your situation actually
                  calls for, not a generic package.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Advisory by Org Type ── */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Solutions" />
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px] mb-16">
              Advisory by Organisation Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advisoryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group rounded-[20px] border border-gray-200/80 p-8 hover:border-[#00E7C3]/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#00E7C3]/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[#00E7C3]" />
                    </div>
                    <h3 className="font-serif text-[20px] text-[#15171A] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-[1.75] mb-6">
                      {card.description}
                    </p>
                    <div className="pt-5 border-t border-gray-200/60">
                      <span className="text-[13px] font-semibold text-[#8B5CF6]">
                        {card.stat}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Process" />
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px] mb-16">
              How We Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white rounded-[20px] p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-[52px] font-bold text-[#00E7C3]/20 leading-none shrink-0 font-sans">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-[19px] text-[#15171A] mb-1">
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#8B5CF6]">
                        {step.timeline}
                      </span>
                      <p className="text-[14px] text-gray-500 leading-[1.75] mt-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — dark accent block ── */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[580px] mb-6">
              Ready to grow?
            </h2>
            <p className="text-white/50 text-[17px] leading-[1.75] max-w-[480px] mb-10">
              Email our advisory team and take the first step toward
              diaspora-powered growth. No obligation, just a conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="mailto:info@epiphinyflow.com?subject=Advisory%20enquiry"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Contact us
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <Link
                to="/advisory/board"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Meet the advisory board
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </div>
  );
};

export default AdvisoryV3;
