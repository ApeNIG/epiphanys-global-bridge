import { ArrowRight, Rocket, TrendingUp, Building2, Briefcase, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV2 from "@/components/v2/HeaderV2";
import FooterV2 from "@/components/v2/FooterV2";

const advisoryCards = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Transform ideas into viable businesses",
    stat: "95% secure first-round funding",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    description: "Accelerate growth while maintaining cultural authenticity",
    stat: "340% revenue growth in 18 months",
  },
  {
    icon: Building2,
    title: "SMEs",
    description: "Strengthen market position through diaspora connections",
    stat: "78% increase in market reach",
  },
  {
    icon: Briefcase,
    title: "Enterprise",
    description: "Leverage diaspora intelligence for competitive advantage",
    stat: "\u00a350M+ new opportunities identified",
  },
  {
    icon: Landmark,
    title: "Government",
    description: "Harness diaspora potential for economic development",
    stat: "\u00a32.5B economic activity facilitated",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Assessment",
    timeline: "2\u20134 weeks",
    description:
      "We immerse ourselves in your organisation, understanding your goals, challenges, and the diaspora communities most relevant to your growth trajectory.",
  },
  {
    number: "02",
    title: "Strategy Development",
    timeline: "3\u20136 weeks",
    description:
      "Our team crafts a bespoke advisory strategy, mapping diaspora networks, identifying opportunities, and building a roadmap tailored to your sector.",
  },
  {
    number: "03",
    title: "Implementation Support",
    timeline: "Ongoing",
    description:
      "We work alongside your team to execute the strategy\u2014facilitating introductions, navigating cultural nuances, and ensuring measurable progress.",
  },
  {
    number: "04",
    title: "Performance Monitoring",
    timeline: "Monthly reviews",
    description:
      "Regular reviews track KPIs, surface new opportunities, and refine the approach based on real-world results and shifting market dynamics.",
  },
];

const AdvisoryV2 = () => {
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
                Advisory Services
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#15171A] leading-[1.1] tracking-[-0.01em] max-w-[800px]">
              Strategic Advisory for Global Growth
            </h1>

            <p className="text-gray-500 text-[17px] mt-6 leading-[1.7] max-w-[600px]">
              Unlock the power of diaspora communities with expert advisory
              services tailored for startups, scale-ups, SMEs, enterprises, and
              government organisations.
            </p>
          </div>
        </section>

        {/* Advisory Services */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Solutions
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[600px] mb-16">
              Advisory by Organisation Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advisoryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group rounded-[20px] border border-gray-200/80 p-8 hover:border-[#00E7C3]/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#00E7C3]/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[#00E7C3]" />
                    </div>
                    <h3 className="font-serif text-[22px] text-[#15171A] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[15px] text-gray-500 leading-[1.7] mb-6">
                      {card.description}
                    </p>
                    <div className="pt-5 border-t border-gray-200/60">
                      <span className="text-[14px] font-semibold text-[#8B5CF6]">
                        {card.stat}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Our Process
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[600px] mb-16">
              How We Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white rounded-[20px] p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-[40px] font-bold text-[#00E7C3]/20 leading-none font-sans shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-[20px] text-[#15171A] mb-1">
                        {step.title}
                      </h3>
                      <span className="text-[12px] font-semibold tracking-[2px] uppercase text-[#8B5CF6]">
                        {step.timeline}
                      </span>
                      <p className="text-[15px] text-gray-500 leading-[1.7] mt-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[600px] mb-6">
              Ready to transform your organisation?
            </h2>

            <p className="text-white/50 text-[17px] leading-[1.7] max-w-[500px] mb-10">
              Book a strategic consultation with our advisory team.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Book Consultation
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default AdvisoryV2;
