import {
  Rocket,
  TrendingUp,
  Building2,
  Landmark,
  Users,
  ChevronRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * The deal flow pipeline, drawn rather than listed.
 *
 * The challenger on this page: "You currently have the right concepts and the
 * wrong grammar." Four capability cards describe a sequence without showing it,
 * so a reader gets the promises and not the process. The four promises are
 * still here, but each one now hangs off the stage it actually belongs to
 * instead of sitting in its own grid.
 *
 * Composition from mockups/2026-09-03_deal-flow.png. Businesses enter on the
 * left, capital connects on the right, and the six stages run between them.
 *
 * Horizontal at lg and above, where there is room for six stages side by side.
 * Below that it stacks and reads top to bottom, which is the same argument in a
 * different orientation rather than a degraded version of it.
 */

const TEAL = "#00E7C3";
const PURPLE = "#8B5CF6";

const ENTRY = [
  { icon: Rocket, label: "Startups" },
  { icon: TrendingUp, label: "Scale-ups" },
  { icon: Building2, label: "SMEs" },
];

const DESTINATIONS = [
  { icon: Landmark, label: "Public backers" },
  { icon: Users, label: "Private backers" },
];

const STAGES = [
  { n: "01", title: "Apply", body: "A business puts itself forward and shares the basics." },
  { n: "02", title: "Assess", body: "Initial screening for relevance, traction and fit." },
  { n: "03", title: "Prepare", body: "Targeted support on strategy, governance and financials." },
  { n: "04", title: "Match", body: "Introduced to the backers whose remit actually fits." },
  { n: "05", title: "Partner", body: "Terms, partnerships and investment negotiated." },
  { n: "06", title: "Track", body: "Progress, milestones and impact reported openly." },
];

/* The four promises the page already made, each tied to the stages it describes
   rather than floating free of the process. */
const PROMISES = [
  {
    title: "Curated deal flow",
    body: "Surfacing investment-ready diaspora and minority-led businesses to the right backers.",
    covers: "Apply and Assess",
  },
  {
    title: "Investment readiness",
    body: "Helping founders prepare, package and present so they are ready to raise.",
    covers: "Prepare",
  },
  {
    title: "Built with partners",
    body: "Developed with public and private stakeholders across the UK ecosystem.",
    covers: "Match and Partner",
  },
  {
    title: "A transparent process",
    body: "Clear, honest information for both sides, built to the relevant UK standards.",
    covers: "Track",
  },
];

const FlankCard = ({
  overline,
  items,
}: {
  overline: string;
  items: { icon: typeof Rocket; label: string }[];
}) => (
  <div>
    <span className="block text-[10px] font-semibold tracking-[2px] uppercase text-gray-400 mb-4">
      {overline}
    </span>
    <div className="flex lg:flex-col gap-3 flex-wrap">
      {items.map((it) => (
        <div
          key={it.label}
          className="bg-white rounded-[14px] border border-gray-200/80 px-4 py-3 flex items-center gap-3"
        >
          <it.icon className="w-4 h-4 shrink-0" style={{ color: PURPLE }} />
          <span className="text-[12.5px] font-medium text-[#15171A] whitespace-nowrap">
            {it.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const DealPipelineV3 = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="reveal-up">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-7 items-start">
        <FlankCard overline="Businesses enter here" items={ENTRY} />

        <div className="lg:pt-7">
          {/* The spine. The rule sits behind the nodes at their vertical centre,
              so the line reads as one continuous flow rather than five gaps. */}
          <div className="relative">
            <span
              className="hidden lg:block absolute left-0 right-0 top-[19px] border-t-2"
              style={{ borderColor: TEAL }}
              aria-hidden
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-8 lg:gap-y-0">
              {STAGES.map((s) => (
                <div key={s.n} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 lg:text-center lg:px-2">
                  <span
                    className="relative z-10 w-[38px] h-[38px] shrink-0 rounded-full bg-white border-2 flex items-center justify-center text-[11px] font-semibold text-[#15171A]"
                    style={{ borderColor: TEAL }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h4 className="text-[13.5px] font-semibold text-[#15171A] lg:mt-4">
                      {s.title}
                    </h4>
                    <p className="text-[11.5px] text-gray-500 leading-[1.65] mt-1.5">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The promises, hung off their stages.

              Four equal columns rather than spans against the six-stage grid.
              A single stage column is about 120px of text width once padding is
              off, which turned two of these into tall thin ribbons and left the
              other two mostly empty. Four equal columns put each connector at
              12.5, 37.5, 62.5 and 87.5 percent, which lands on stages 1.5, 3,
              4.5 and 6: almost exactly the mapping the overlines name. So the
              positional argument survives and the text is readable. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 lg:mt-10">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <span
                  className="hidden lg:block w-px h-6 border-l border-dashed border-gray-300 mx-auto mb-3"
                  aria-hidden
                />
                <div className="bg-white rounded-[16px] border border-gray-200/80 p-5 h-full">
                  <span
                    className="block text-[9.5px] font-semibold tracking-[1.8px] uppercase mb-2.5"
                    style={{ color: PURPLE }}
                  >
                    {p.covers}
                  </span>
                  <h4 className="text-[14px] font-semibold text-[#15171A] mb-2">
                    {p.title}
                  </h4>
                  <p className="text-[12px] text-gray-500 leading-[1.7]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* The loop. Without it the pipeline reads as a one-way funnel, which
              is not what a platform that learns from its own outcomes is. */}
          <div className="mt-10 border-t border-dashed border-gray-300 pt-5 text-center">
            <p className="text-[11.5px] text-gray-400 leading-[1.7] max-w-[520px] mx-auto">
              What happens after a match is fed back into how the next one is
              made, so screening and preparation improve with each cycle.
            </p>
          </div>
        </div>

        <FlankCard overline="Capital connects here" items={DESTINATIONS} />
      </div>

      {/* Legend. Two line weights and a colour are carrying meaning here, so
          they are named rather than left to be inferred. */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12">
        <span className="flex items-center gap-2.5 text-[11px] text-gray-500">
          <span className="w-7 border-t-2" style={{ borderColor: TEAL }} />
          Opportunity flow
        </span>
        <span className="flex items-center gap-2.5 text-[11px] text-gray-500">
          <span className="w-7 border-t border-dashed border-gray-400" />
          Feedback into the next cycle
        </span>
        <span className="flex items-center gap-2.5 text-[11px] text-gray-500">
          <ChevronRight className="w-3.5 h-3.5" style={{ color: PURPLE }} />
          Stage the promise applies to
        </span>
      </div>
    </div>
  );
};

export default DealPipelineV3;
