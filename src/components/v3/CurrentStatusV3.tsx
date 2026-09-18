import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * What exists today, said once, in one place, in the design rather than the
 * small print.
 *
 * The challenger's diagnosis of the whole site: "The site gives facts,
 * ambitions, processes and nonexistent products the same visual treatment.
 * That makes everything look equally credible and therefore makes nothing
 * particularly credible." Its third ranked fix was a visible status language.
 * This is it, and it is one component placed on several pages rather than four
 * separately worded reassurances that will drift apart.
 *
 * Ordered by certainty, not by importance. What has already happened comes
 * first, what is being built second, what is only intended last. That order is
 * the argument: it lets a reader who trusts nothing else on the site find the
 * two things we can actually evidence.
 *
 * EVERY LINE HERE IS READ FROM THE SITE, NOT FROM THE MOCKUP. The DDDT mockup
 * this composition came from invented an attendance figure, a London venue, a
 * May date, and a live GBP25M fund. The real event is 27 October 2026 at
 * Factory International in Manchester, and the fund is prospective. If a claim
 * below changes, change it here once.
 */

type Item = {
  state: "live" | "development" | "prospective";
  name: string;
  body: string;
  action: string;
  href: string;
  internal: boolean;
};

const ITEMS: Item[] = [
  {
    state: "live",
    name: "Advisory",
    body: "The advisory offer is open. Businesses can approach us now about strategy, growth and reaching diaspora markets.",
    action: "Open to enquiries",
    href: "/advisory",
    internal: true,
  },
  {
    state: "live",
    name: "Events",
    body: "Grow Scale Boost ran in 2025 and returns to Factory International, Manchester, on 27 October 2026.",
    action: "Register your interest",
    href: "/events",
    internal: true,
  },
  {
    state: "development",
    name: "Deal Flow Platform",
    body: "Being built. Nothing on it is live yet, and the stages will change as we build it with the people who will use it.",
    action: "See the process",
    href: "/deal-flow-platform",
    internal: true,
  },
  {
    state: "prospective",
    name: "The fund",
    body: "Being designed with public and private stakeholders. It is not raising or deploying capital, and has no portfolio.",
    action: "See how it will work",
    href: "/fund",
    internal: true,
  },
];

const STATE_LABEL: Record<Item["state"], string> = {
  live: "Live",
  development: "In development",
  prospective: "Prospective",
};

const STATE_COLOUR: Record<Item["state"], string> = {
  live: "#00E7C3",
  development: "#A78BFA",
  prospective: "#A78BFA",
};

/**
 * `layout` exists because this block has to sit in two different column widths.
 * On a full-width page four across is right. Inside a reading column it is not:
 * four columns in 860px is 215px each, and more importantly it would put the
 * block at a different left edge from the content above and below it, which is
 * two alignment systems on one page. Two by two keeps it in the column.
 */
const CurrentStatusV3 = ({
  withHeading = true,
  layout = "row",
}: {
  withHeading?: boolean;
  layout?: "row" | "grid";
}) => {
  const ref = useScrollReveal<HTMLDivElement>();
  const cols = layout === "row" ? "lg:grid-cols-4" : "lg:grid-cols-2";

  return (
    <div ref={ref} className="reveal-up">
      {withHeading && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Current status
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[680px] mb-12">
            Honest about what exists today and what we are still building
          </h2>
        </>
      )}

      <div className="rounded-[22px] bg-[#15171A] p-7 md:p-10">
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-8 lg:gap-0`}>
          {ITEMS.map((item, i) => {
            const perRow = layout === "row" ? 4 : 2;
            const first = i % perRow === 0;
            const last = i % perRow === perRow - 1;
            return (
            <div
              key={item.name}
              className={`flex flex-col ${!first ? "lg:pl-8 lg:border-l lg:border-white/10" : ""} ${!last ? "lg:pr-8" : ""} ${layout === "grid" && i >= perRow ? "lg:pt-8 lg:mt-8 lg:border-t lg:border-white/10" : ""}`}
            >
              <span
                className="text-[10px] font-semibold tracking-[2.5px] uppercase mb-4"
                style={{ color: STATE_COLOUR[item.state] }}
              >
                {STATE_LABEL[item.state]}
              </span>
              <h3 className="text-[19px] font-semibold text-white mb-3 leading-[1.25]">
                {item.name}
              </h3>
              <p className="text-[13px] text-white/55 leading-[1.75] mb-6 flex-1">
                {item.body}
              </p>
              <span className="block border-t border-white/10 mb-4" />
              {item.internal ? (
                <Link
                  to={item.href}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[1.5px] uppercase group w-fit"
                  style={{ color: STATE_COLOUR[item.state] }}
                >
                  {item.action}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[1.5px] uppercase group w-fit"
                  style={{ color: STATE_COLOUR[item.state] }}
                >
                  {item.action}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
            );
          })}
        </div>
      </div>

      <p className="text-[13px] text-gray-400 leading-[1.7] mt-6 max-w-[620px]">
        We would rather tell you what is not built yet than let you find out
        later. This is updated as each milestone is actually reached, not when it
        is planned.
      </p>
    </div>
  );
};

export default CurrentStatusV3;
