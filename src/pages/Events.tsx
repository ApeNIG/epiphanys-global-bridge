import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import { Calendar, MapPin, Mail, TrendingUp, ArrowRight } from "lucide-react";
import gsbPoster from "@/assets/events/gsb-2026-poster.jpg";
import gsbAttendees from "@/assets/events/gsb-2025-attendees.jpg";

const details = [
  {
    icon: Calendar,
    label: "Date",
    value: "Tuesday 27 October 2026",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Factory International @ Aviva Studios, Water Street, Manchester M3 4JQ",
  },
  {
    icon: Mail,
    label: "Register your interest",
    value: "Robert@epiphinyflow.com",
    href: "mailto:Robert@epiphinyflow.com?subject=Grow%20Scale%20Boost%202026%20-%20Register%20my%20interest",
  },
];

const Events = () => (
  <div
    className="min-h-screen bg-white light [&_a]:no-underline"
    data-theme="light"
    style={{ colorScheme: "light" }}
  >
    <HeaderV3 />

    <main>
      {/* ── Hero ── */}
      <section className="bg-white pt-32 md:pt-44 pb-6 md:pb-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Events
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[860px] mb-6">
            Grow, Scale, Boost 2026
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[640px]">
            A Northern Powerhouse conference: boosting the UK economy through
            local to global investment pathways, for diasporic founders and
            entrepreneurs.
          </p>
        </div>
      </section>

      {/* ── Poster + details ── */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr] gap-12 lg:gap-20 items-start">
            {/* Poster */}
            <a
              href={gsbPoster}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,22,40,0.45)] ring-1 ring-black/5 transition-transform duration-500 hover:-translate-y-1"
              aria-label="Open the Grow Scale Boost 2026 save the date poster full size"
            >
              <img
                src={gsbPoster}
                alt="Grow Scale Boost 2026 save the date poster"
                className="w-full h-auto block"
              />
            </a>

            {/* Details */}
            <div className="lg:pt-4">
              <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#2A9D8F] bg-[#00E7C3]/10 px-3 py-1.5 rounded-full mb-6">
                Save the date
              </span>

              <div className="space-y-6 mb-10">
                {details.map((d) => {
                  const Row = (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0A1628] flex items-center justify-center shrink-0">
                        <d.icon className="w-4 h-4 text-[#00E7C3]" />
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gray-400 mb-1">
                          {d.label}
                        </div>
                        <div className="text-[#15171A] text-[16px] leading-[1.5] font-medium">
                          {d.value}
                        </div>
                      </div>
                    </div>
                  );
                  return d.href ? (
                    <a key={d.label} href={d.href} className="block group hover:opacity-80 transition-opacity">
                      {Row}
                    </a>
                  ) : (
                    <div key={d.label}>{Row}</div>
                  );
                })}
              </div>

              {/* Funding stats — from the event, as stated on the poster */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-[26px] font-bold text-[#15171A] tracking-tight font-sans">£1.2B+</span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-[1.5]">
                    Funding and investment opportunities at the 2025 launch event
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-[#00E7C3]" />
                    <span className="text-[26px] font-bold text-[#15171A] tracking-tight font-sans">£2B+</span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-[1.5]">
                    Funding and investment opportunities targeted for 2026
                  </p>
                </div>
              </div>

              <p className="text-[15px] text-gray-500 leading-[1.7] mb-8">
                Places are extremely limited due to the nature of this event.
                Register your interest early to be considered.
              </p>

              <a
                href="mailto:Robert@epiphinyflow.com?subject=Grow%20Scale%20Boost%202026%20-%20Register%20my%20interest"
                className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit"
              >
                Register your interest
                <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2025 attendees ── */}
      <section className="bg-[#F5F0E8] py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              In the room
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[620px] mb-12">
            Who attended in 2025
          </h2>
          <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm">
            <img
              src={gsbAttendees}
              alt="2025 attendees: British Business Bank, GMCA, Shore Capital, GC Angels, Manchester City Council, UK Black Tech, PXN Group, Business Growth Hub, Factory International, Pathway Fund, London Stock Exchange Group, University of Salford"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default Events;
