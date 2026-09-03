import { Landmark, Users, Search, Network, BarChart3, Rocket, TrendingUp, Building2, ArrowDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * The capital-flow diagram, and the reason the Fund page carries no photograph.
 *
 * The challenger's top-ranked fix, in its words: "Placed beside 'Backing
 * businesses at every stage', an invented woman walking through an industrial
 * workspace reads as either an Epiphiny-backed founder, an Epiphiny portfolio
 * business, or a beneficiary of the fund. None of those claims exists." A
 * generated portrait beside a claim becomes evidence for that claim, so the
 * photograph is gone and the mechanism is drawn instead. "Draw the fucking
 * thing."
 *
 * Everything here is a description of how the fund is DESIGNED to work. It is
 * prospective, and the page says so in three places, because a diagram this
 * concrete is exactly the kind of thing a reader mistakes for something already
 * running.
 *
 * Composition is from the DDDT mockup (mockups/2026-09-03_fund.png), rebuilt in
 * markup so every word is real. Connectors are drawn at md+ only; below that the
 * rows stack and read top to bottom without them.
 */

const SOURCES = [
  {
    icon: Landmark,
    title: "Public backers",
    body: "Government bodies, development finance institutions and impact-focused funds.",
  },
  {
    icon: Users,
    title: "Private backers",
    body: "Angel investors, family offices and venture funds seeking growth with cultural intelligence.",
  },
];

const STAGES = [
  {
    n: "01",
    icon: Search,
    title: "Due diligence",
    body: "Vetting, financial review and risk assessment before any capital moves.",
  },
  {
    n: "02",
    icon: Network,
    title: "Matching",
    body: "Connecting the right capital to the right business by sector, stage and fit.",
  },
  {
    n: "03",
    icon: BarChart3,
    title: "Reporting",
    body: "Clear, honest reporting on how capital is put to work and what it creates.",
  },
];

const DESTINATIONS = [
  {
    icon: Rocket,
    title: "Startups",
    stage: "Early stage",
    body: "Investment-ready ventures with diaspora market insight, seeking capital and guidance.",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    stage: "Growth stage",
    body: "Businesses ready to expand across the UK and beyond, seeking capital and partners.",
  },
  {
    icon: Building2,
    title: "SMEs",
    stage: "Established",
    body: "Established businesses seeking capital for expansion, modernisation or new markets.",
  },
];

const TEAL = "#00E7C3";
const PURPLE = "#8B5CF6";

const CapitalFlowV3 = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal-up">
      {/* ── Row 1: where the capital comes from ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 max-w-[860px] mx-auto">
        {SOURCES.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-[18px] border border-gray-200/80 p-6 flex items-start gap-4"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${PURPLE}14` }}
            >
              <s.icon className="w-[18px] h-[18px]" style={{ color: PURPLE }} />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold tracking-[1.5px] uppercase text-[#15171A] mb-2">
                {s.title}
              </h3>
              <p className="text-[13px] text-gray-500 leading-[1.7]">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Connector: two sources joining into one flow. Drawn only where there are
          two columns to join; on mobile the rows simply follow each other. */}
      <div className="hidden md:block relative h-[76px] max-w-[860px] mx-auto" aria-hidden>
        <span className="absolute left-1/4 top-0 h-[30px] border-l border-dashed border-gray-300" />
        <span className="absolute left-3/4 top-0 h-[30px] border-l border-dashed border-gray-300" />
        <span className="absolute left-1/4 right-1/4 top-[30px] border-t border-dashed border-gray-300" />
        <span className="absolute left-1/2 top-[30px] h-[22px] border-l border-dashed border-gray-300" />
        <span
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: TEAL }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#15171A]" />
        </span>
      </div>
      <div className="md:hidden h-8" />

      {/* ── Row 2: what the fund does with it ── */}
      <div className="rounded-[22px] border-2 p-6 md:p-9" style={{ borderColor: `${TEAL}55` }}>
        <div className="text-center mb-8">
          <h3 className="font-serif text-[26px] md:text-[32px] text-[#15171A] leading-[1.2] mb-2">
            The Epiphiny Fund
          </h3>
          <p className="text-[13px] text-gray-500">
            Stewarding capital toward businesses that already have a trade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STAGES.map((st) => (
            <div key={st.n} className="bg-[#F5F0E8] rounded-[16px] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                  <st.icon className="w-4 h-4" style={{ color: PURPLE }} />
                </div>
                <span
                  className="text-[10px] font-semibold tracking-[2px]"
                  style={{ color: PURPLE }}
                >
                  {st.n}
                </span>
              </div>
              <h4 className="text-[15px] font-semibold text-[#15171A] mb-2">{st.title}</h4>
              <p className="text-[12.5px] text-gray-500 leading-[1.7]">{st.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Connector: one flow splitting three ways. */}
      <div className="hidden md:block relative h-[70px]" aria-hidden>
        <span className="absolute left-1/2 top-0 h-[26px] border-l" style={{ borderColor: TEAL }} />
        <span
          className="absolute top-[26px]"
          style={{ left: "16.666%", right: "16.666%", borderTop: `1px solid ${TEAL}` }}
        />
        {["16.666%", "50%", "83.333%"].map((left) => (
          <span key={left} className="absolute top-[26px] bottom-[10px]" style={{ left }}>
            <span className="block h-full border-l" style={{ borderColor: TEAL }} />
            <span
              className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 border-b border-r"
              style={{ borderColor: TEAL }}
            />
          </span>
        ))}
      </div>
      <div className="md:hidden h-8" />

      {/* ── Row 3: where it lands ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {DESTINATIONS.map((d) => (
          <div key={d.title} className="bg-white rounded-[18px] border border-gray-200/80 p-6">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: `${TEAL}1F` }}
            >
              <d.icon className="w-[18px] h-[18px]" style={{ color: "#0F8F79" }} />
            </div>
            <span
              className="block text-[10px] font-semibold tracking-[2.5px] uppercase mb-2"
              style={{ color: PURPLE }}
            >
              {d.stage}
            </span>
            <h3 className="font-serif text-[20px] text-[#15171A] mb-3">{d.title}</h3>
            <p className="text-[13px] text-gray-500 leading-[1.75]">{d.body}</p>
          </div>
        ))}
      </div>

      {/* Feedback loop. Reinvestment is the part that makes it a fund rather than
          a grant, so it gets drawn rather than described in a footnote. */}
      <div className="hidden md:block relative h-[64px]" aria-hidden>
        <span className="absolute left-[16.666%] top-0 h-[26px] border-l border-dashed border-gray-300" />
        <span className="absolute left-[83.333%] top-0 h-[26px] border-l border-dashed border-gray-300" />
        <span className="absolute top-[26px] border-t border-dashed border-gray-300" style={{ left: "16.666%", right: "16.666%" }} />
      </div>
      <p className="hidden md:block text-center text-[11px] tracking-[1.5px] uppercase text-gray-400 -mt-[26px] mb-10">
        <span className="bg-[#F5F0E8] px-4">Growth and returns cycle back into the fund</span>
      </p>

      {/* Legend. Two line weights and two colours are doing work in this diagram,
          so they are named rather than left to be inferred. */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2">
        <span className="flex items-center gap-2.5 text-[11px] text-gray-500">
          <span className="w-7 border-t-2" style={{ borderColor: TEAL }} />
          Capital flow
        </span>
        <span className="flex items-center gap-2.5 text-[11px] text-gray-500">
          <span className="w-7 border-t border-dashed border-gray-400" />
          Reinvestment
        </span>
        <span className="flex items-center gap-2.5 text-[11px] text-gray-500">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PURPLE }} />
          Process stage
        </span>
      </div>
    </div>
  );
};

export default CapitalFlowV3;
