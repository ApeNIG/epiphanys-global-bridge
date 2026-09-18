import { ArrowRight, Globe2, Network, Users } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import StatusBadge from "@/components/v3/StatusBadge";
import communityCanaryWharf from "@/assets/v2/networking-canary-wharf.jpg";

const CommunityV3 = () => (
  <div
    className="min-h-screen bg-white light [&_a]:no-underline"
    data-theme="light"
    style={{ colorScheme: "light" }}
  >
    <HeaderV3 />
    <main>
      <section className="bg-white v3-page-intro">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Community
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
            Built by the community,
            <br />
            for the community
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[660px] mb-8">
            We are developing a trusted network connecting diaspora founders,
            businesses and institutions with relationships, knowledge and
            opportunities that support inclusive growth.
          </p>
          <StatusBadge status="development" />
        </div>
      </section>

      <section className="bg-white v3-related-tail">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="relative rounded-[20px] overflow-hidden h-[480px] md:h-[500px]">
            <img
              src={communityCanaryWharf}
              alt="Diaspora professionals connecting at a Canary Wharf event"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 42%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#101316]/95 via-[#15191D]/80 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-[620px] p-7 md:p-16">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-[2px] bg-[#00E7C3]" />
                  <span className="text-[11px] font-semibold tracking-[3px] uppercase text-[#00E7C3]">
                    The network
                  </span>
                </div>
                <h2 className="font-serif text-[30px] md:text-[40px] text-white leading-[1.16] tracking-[-0.02em] mb-5">
                  Trusted relationships. Shared knowledge. Local to global.
                </h2>
                <p className="text-white/70 text-[15px] md:text-[16px] leading-[1.8]">
                  Meaningful introductions rather than cold outreach, practical
                  insight from across the network and connections across regions
                  and borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F0E8] v3-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Trusted relationships",
                text: "A community designed around meaningful introductions rather than cold outreach.",
              },
              {
                icon: Network,
                title: "Shared knowledge",
                text: "Practical insight from founders, specialists and institutions across the network.",
              },
              {
                icon: Globe2,
                title: "Local to global",
                text: "Connections that help diaspora-led organisations grow across regions and borders.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-[20px] bg-white p-7 md:p-8">
                <div className="w-11 h-11 rounded-full bg-[#00E7C3]/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-[#2A9D8F]" />
                </div>
                <h2 className="font-serif text-[22px] text-[#15171A] mb-3">{title}</h2>
                <p className="text-[14px] text-gray-500 leading-[1.75]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#15171A] v3-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] text-white leading-[1.12] max-w-[640px] mb-6">
            Interested in helping shape the community?
          </h2>
          <p className="text-white/55 text-[16px] leading-[1.75] max-w-[560px] mb-8">
            Tell us about your work and the connections you are looking to build.
          </p>
          <a
            href="mailto:info@epiphinyflow.com?subject=Epiphiny%20Flow%20Community%20interest"
            className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors"
          >
            Register your interest
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
    <FooterV3 />
  </div>
);

export default CommunityV3;
