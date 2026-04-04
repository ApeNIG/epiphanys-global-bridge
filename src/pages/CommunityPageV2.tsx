import { Users, GraduationCap, Handshake, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV2 from "@/components/v2/HeaderV2";
import FooterV2 from "@/components/v2/FooterV2";

const stats = [
  { value: "15,000+", label: "Active Members" },
  { value: "47", label: "Countries" },
  { value: "2,500+", label: "Success Stories" },
  { value: "8,000+", label: "Monthly Connections" },
];

const features = [
  {
    icon: Users,
    title: "Cultural Connect Groups",
    description:
      "Join vibrant groups organised by heritage, industry, and interest. Build meaningful relationships with professionals who share your cultural background and professional ambitions.",
  },
  {
    icon: GraduationCap,
    title: "Mentorship Networks",
    description:
      "Connect with experienced diaspora leaders who have navigated the same challenges. Get guidance on business strategy, career growth, and cross-border opportunities.",
  },
  {
    icon: Handshake,
    title: "Business Collaboration Hub",
    description:
      "Find co-founders, partners, and collaborators across borders. Our matching engine connects complementary skills, markets, and ambitions for high-impact ventures.",
  },
  {
    icon: Award,
    title: "Skills & Recognition",
    description:
      "Showcase your expertise, earn community endorsements, and gain visibility. Our recognition programme highlights outstanding contributions to the diaspora economy.",
  },
];

const values = [
  {
    title: "Cultural Pride",
    description:
      "We celebrate the richness of diverse heritages and believe cultural identity is a powerful asset in the global economy.",
  },
  {
    title: "Authentic Connection",
    description:
      "Real relationships over transactional networking. We foster trust-based connections that create lasting professional and personal bonds.",
  },
  {
    title: "Inclusive Growth",
    description:
      "Economic opportunity should be accessible to all diaspora communities. We build bridges that ensure no one is left behind.",
  },
];

const CommunityPageV2 = () => {
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
                Community
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[#15171A] leading-[1.1] tracking-[-0.01em] max-w-[800px]">
              Where Cultural Heritage Meets Economic Opportunity
            </h1>

            <p className="text-gray-500 text-[17px] mt-6 leading-[1.7] max-w-[560px]">
              Join the UK's largest diaspora-focused professional community.
            </p>

            {/* Stat bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-gray-200/60">
              {stats.map((stat) => (
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

        {/* Features */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                What We Offer
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[600px] mb-16">
              Built for diaspora professionals
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-white rounded-[20px] p-7 flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00E7C3]/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-5 h-5 text-[#00E7C3]" />
                  </div>
                  <h3 className="font-serif text-[20px] text-[#15171A] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 leading-[1.7]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-500">
                Our Values
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {values.map((value) => (
                <div key={value.title}>
                  <h3 className="font-serif text-[24px] text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-[15px] text-white/50 leading-[1.7]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/auth"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Join Our Community
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/success-stories"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Explore Success Stories
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
};

export default CommunityPageV2;
