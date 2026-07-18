import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import BoardOfAdvisors from "@/components/v3/BoardOfAdvisors";

const AdvisoryBoard = () => (
  <div
    className="min-h-screen bg-white light [&_a]:no-underline"
    data-theme="light"
    style={{ colorScheme: "light" }}
  >
    <HeaderV3 />

    <main>
      {/* ── Hero ── */}
      <section className="bg-white pt-32 md:pt-44 pb-2 md:pb-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Advisory
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
            The people behind
            <br />
            every engagement
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[600px]">
            Meet the operators, regulators and specialists guiding our mission to
            connect diaspora communities with economic opportunity.
          </p>
        </div>
      </section>

      <BoardOfAdvisors />
    </main>

    <FooterV3 />
  </div>
);

export default AdvisoryBoard;
