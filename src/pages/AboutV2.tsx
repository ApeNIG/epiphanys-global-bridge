import HeaderV2 from "@/components/v2/HeaderV2";
import FooterV2 from "@/components/v2/FooterV2";
import {
  Target,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  Award,
  ArrowRight,
} from "lucide-react";

/* ─── Overline component ─── */
const Overline = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-[2px] bg-[#00E7C3]" />
    <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
      {label}
    </span>
  </div>
);

/* ─── Icon card used across sections ─── */
const IconCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="group rounded-[20px] bg-white p-7 md:p-8 hover:shadow-xl transition-all duration-500">
    <div className="w-12 h-12 rounded-2xl bg-[#00E7C3]/10 flex items-center justify-center mb-5 group-hover:bg-[#00E7C3]/20 transition-colors">
      <Icon className="w-5 h-5 text-[#00E7C3]" />
    </div>
    <h3 className="font-serif text-[20px] text-[#15171A] mb-2">{title}</h3>
    <p className="text-[14px] text-gray-500 leading-[1.7]">{description}</p>
  </div>
);

/* ─── Cream-bg variant of the card ─── */
const IconCardCream = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="group rounded-[20px] bg-[#F5F0E8] p-7 md:p-8 hover:shadow-xl transition-all duration-500">
    <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 flex items-center justify-center mb-5 group-hover:bg-[#8B5CF6]/20 transition-colors">
      <Icon className="w-5 h-5 text-[#8B5CF6]" />
    </div>
    <h3 className="font-serif text-[20px] text-[#15171A] mb-2">{title}</h3>
    <p className="text-[14px] text-gray-500 leading-[1.7]">{description}</p>
  </div>
);

/* ─── Page ─── */
const AboutV2 = () => {
  return (
    <div
      className="min-h-screen bg-white light [&_a]:no-underline"
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <HeaderV2 />

      <main>
        {/* ═══════════ Hero ═══════════ */}
        <section className="bg-white pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="About Us" />

            <h1 className="font-serif text-[clamp(2.25rem,5vw,3.75rem)] text-[#15171A] leading-[1.1] tracking-[-0.01em] max-w-[800px]">
              Empowering Diaspora
              <br />
              Communities
            </h1>

            <p className="text-gray-500 text-[17px] md:text-[19px] mt-6 leading-[1.7] max-w-[640px]">
              We're building a digital platform that connects businesses,
              organisations, and individuals with public and private sector
              opportunities, with a strong focus on serving diaspora communities
              in the UK.
            </p>
          </div>
        </section>

        {/* ═══════════ Mission ═══════════ */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Mission" />

            {/* Pull quote */}
            <blockquote className="max-w-[820px] mb-16">
              <p className="font-serif text-[clamp(1.5rem,3.5vw,2.5rem)] text-[#15171A] leading-[1.25] tracking-[-0.01em]">
                "To create an inclusive digital ecosystem that unlocks economic
                opportunities, celebrates cultural identity, and drives
                collaborative growth."
              </p>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IconCard
                icon={Target}
                title="Purpose-Driven"
                description="Every feature, partnership, and initiative is designed to create meaningful impact for diaspora communities worldwide."
              />
              <IconCard
                icon={Users}
                title="Community-Centric"
                description="Built with and for the community — ensuring voices are heard, needs are met, and growth is shared collectively."
              />
              <IconCard
                icon={Globe}
                title="Globally Connected"
                description="Bridging borders to create pathways between diaspora talent, local economies, and international opportunities."
              />
            </div>
          </div>
        </section>

        {/* ═══════════ Vision ═══════════ */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Vision" />

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[720px] mb-16">
              Building a future where every diaspora community member has access
              to opportunities that honor their heritage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Global Diaspora Connection",
                  description:
                    "Connecting diaspora communities across continents with a unified platform that transcends geographical boundaries.",
                },
                {
                  icon: TrendingUp,
                  title: "Economic Empowerment",
                  description:
                    "Opening doors to investment, trade, and enterprise opportunities that drive sustainable prosperity for communities.",
                },
                {
                  icon: Users,
                  title: "Community-Driven Growth",
                  description:
                    "Leveraging collective knowledge, networks, and cultural strengths to accelerate community development.",
                },
                {
                  icon: Shield,
                  title: "Trust & Transparency",
                  description:
                    "Building a foundation of trust through transparent processes, verified opportunities, and accountable partnerships.",
                },
              ].map((item) => (
                <IconCardCream key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Values ═══════════ */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Values" />

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[600px] mb-16">
              The principles that guide everything we do
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <IconCard
                icon={Heart}
                title="Inclusivity First"
                description="We design for everyone — ensuring no community is left behind in the digital economy."
              />
              <IconCard
                icon={Lightbulb}
                title="Innovation"
                description="We embrace new technologies and creative approaches to solve age-old challenges facing diaspora communities."
              />
              <IconCard
                icon={Award}
                title="Cultural Pride"
                description="We celebrate the rich cultural heritage that makes diaspora communities unique and vibrant."
              />
              <IconCard
                icon={Target}
                title="Impact-Driven"
                description="Every decision we make is measured against the real-world impact it creates for the communities we serve."
              />
            </div>
          </div>
        </section>

        {/* ═══════════ Why We Exist (dark) ═══════════ */}
        <section className="relative overflow-hidden bg-[#15171A]">
          {/* Subtle grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "120px 120px",
              }}
            />
          </div>

          {/* Decorative gradient orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/[0.06] rounded-full blur-[150px]" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-24 md:py-36 relative z-10">
            <div className="max-w-[760px]">
              <Overline label="Why We Exist" />

              <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] text-white leading-[1.15] tracking-[-0.01em] mb-8">
                Unlocking the untapped potential of diaspora communities
              </h2>

              <div className="space-y-6 mb-14">
                <p className="text-white/50 text-[17px] leading-[1.8]">
                  Diaspora communities represent one of the most powerful
                  economic forces on the planet — contributing over{" "}
                  <span className="text-[#00E7C3] font-medium">
                    £685 billion
                  </span>{" "}
                  annually to global economies through remittances, investments,
                  and entrepreneurship. Yet access to structured opportunities,
                  professional networks, and trusted platforms remains
                  fragmented.
                </p>
                <p className="text-white/50 text-[17px] leading-[1.8]">
                  Epiphiny Flow exists to change that. We are building the
                  digital infrastructure that connects diaspora talent with
                  meaningful opportunities — from public sector tenders and
                  private investment to business advisory and community-led
                  growth initiatives.
                </p>
                <p className="text-white/50 text-[17px] leading-[1.8]">
                  Our platform is designed to honour the cultural identity and
                  entrepreneurial spirit of diaspora communities while
                  providing the tools, transparency, and trust needed to compete
                  on a global stage.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="/community"
                  className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
                >
                  Join Our Community
                  <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
                <a
                  href="/opportunities"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
                >
                  Explore Opportunities
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV2 />
    </div>
  );
};

export default AboutV2;
