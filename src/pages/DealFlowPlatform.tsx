import { ArrowRight } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import DealPipelineV3 from "@/components/v3/DealPipelineV3";
import StatusBadge from "@/components/v3/StatusBadge";

/* The four capability cards are gone. They still exist as claims, but they now
   live inside DealPipelineV3 attached to the stage each one describes, which is
   the challenger's point: "you currently have the right concepts and the wrong
   grammar." A grid of four cards states four promises; the pipeline shows the
   process those promises are about. One of the four also carried an orange
   #E89B3E that appears nowhere else in the palette, and it went with it. */

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

          <div className="mt-8">
            <StatusBadge status="development" />
          </div>

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
          <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[620px] mb-5">
            From opportunity to investment
          </h2>
          <p className="text-gray-500 text-[16px] leading-[1.8] max-w-[620px] mb-16">
            This is the process the platform is being built to run. Nothing here
            is live yet, and the stages will change as we build with the founders
            and backers who will actually use it.
          </p>

          <DealPipelineV3 />

          <p className="text-[14px] text-gray-400 leading-[1.7] mt-14 max-w-[640px]">
            Stages and features are indicative and will evolve as the platform is
            built.
          </p>
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default DealFlowPlatform;
