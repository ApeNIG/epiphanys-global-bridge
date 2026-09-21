import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import { Calendar, Clock, MapPin, Mail, TrendingUp, Download } from "lucide-react";
/* Flyer draft 3, page 1 (Robert Croll, 2026-09-20), replacing the earlier
   save-the-date poster. The old artwork carried "Register your interest" and
   sat directly beside page copy saying the event is invite only, which was a
   contradiction no text edit could reach because it was inside the image. */
import gsbPoster from "@/assets/events/gsb-2026-flyer.jpg";
import gmcaLogo from "@/assets/partners/gmca-logo.png";
import mc2Logo from "@/assets/partners/mc2-logo.svg";
import gcAngelsLogo from "@/assets/partners/gc-angels-logo.png";
import manchesterCityCouncilLogo from "@/assets/partners/manchester-city-council-logo.png";
import ukBlackTechLogo from "@/assets/partners/uk-black-tech-logo.png";
import gmGrowthHubLogo from "@/assets/partners/gm-business-growth-hub-logo.svg";
import factoryInternationalLogo from "@/assets/partners/factory-international-logo.png";
import universitySalfordLogo from "@/assets/partners/university-salford-logo.png";
/* These five had no file in the repo: they existed only as pixels inside
   gsb-2025-attendees.jpg. Cut out of that image by measuring it (the panel was
   masked against its own background colour and the row/column bands derived
   from the mask, rather than crop boxes guessed by eye), then lifted onto
   white. The source panel is the resolution ceiling, so they are softer than
   the seven vector/PNG marks above and should be replaced with real files if
   the client can supply them. */
import britishBusinessBankLogo from "@/assets/partners/british-business-bank-logo.png";
import shoreCapitalLogo from "@/assets/partners/shore-capital-logo.png";
import pxnGroupLogo from "@/assets/partners/pxn-group-logo.png";
import pathwayFundLogo from "@/assets/partners/pathway-fund-logo.png";
import londonStockExchangeLogo from "@/assets/partners/london-stock-exchange-group-logo.png";

/* The 2025 attendees were a flat JPEG with the twelve logos baked in, which
   meant the only way to correct one was to paint over it: GMCA was already an
   absolutely positioned patch at a hard-coded percentage, because the supplied
   artwork had set the name in plain text. Robert Croll asked for MC2 to be
   added on 2026-09-21 and the grid had no free slot, so the panel is now real
   markup. Adding the next one is a line in this array.

   Order is the reading order of the original panel, unchanged, so nothing is
   silently reshuffled against what the client has already approved. MC2 is
   appended as the thirteenth.

   The UK Black Tech file is the REVERSE lockup: "UK" and "Tech" are white
   glyphs for use on a dark ground, so on a white tile the mark reads as just
   "> Black". TrustStripV3 already solved this by giving that one tile a dark
   background; the same treatment is carried here rather than recolouring
   somebody else's logo. */
const attendees: { name: string; logo: string; dark?: boolean }[] = [
  { name: "British Business Bank", logo: britishBusinessBankLogo },
  { name: "Greater Manchester Combined Authority", logo: gmcaLogo },
  { name: "Shore Capital", logo: shoreCapitalLogo },
  { name: "GC Angels", logo: gcAngelsLogo },
  { name: "Manchester City Council", logo: manchesterCityCouncilLogo },
  { name: "UK Black Tech", logo: ukBlackTechLogo, dark: true },
  { name: "PXN Group", logo: pxnGroupLogo },
  { name: "Business Growth Hub", logo: gmGrowthHubLogo },
  { name: "Factory International", logo: factoryInternationalLogo },
  { name: "Pathway Fund", logo: pathwayFundLogo },
  { name: "London Stock Exchange Group", logo: londonStockExchangeLogo },
  { name: "University of Salford", logo: universitySalfordLogo },
  { name: "MC2", logo: mc2Logo },
];

const details = [
  {
    icon: Calendar,
    label: "Date",
    value: "Tuesday 27 October 2026",
  },
  {
    icon: Clock,
    label: "Time",
    value: "12:00 – 17:30",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Factory International @ Aviva Studios, Water Street, Manchester M3 4JQ",
  },
  {
    icon: Mail,
    label: "Enquiries",
    value: "info@epiphinyflow.com",
    href: "mailto:info@epiphinyflow.com?subject=Grow%20Scale%20Boost%202026%20-%20Enquiry",
  },
];

/* Running order, transcribed from page 2 of flyer draft 3 (Robert Croll,
   2026-09-20). Rendered as markup rather than left inside the PDF so it is
   readable on a phone, selectable, and reachable by a screen reader. If the
   flyer changes, this array is the thing to update alongside the image. */
const runningOrder: { time: string; item: string }[] = [
  { time: "12:00", item: "Guest entries" },
  { time: "12:30", item: "Welcome" },
  { time: "12:40", item: "Epiphiny Flow Panel / Q&A" },
  { time: "13:10", item: "Quantinuum — Fireside Chat" },
  { time: "13:30", item: "Lunch" },
  { time: "14:15", item: "Investor Readiness Round Table / Q&A" },
  { time: "15:00", item: "Greater Manchester & NPH Panel / Q&A" },
  { time: "15:30", item: "Comfort break" },
  { time: "15:45", item: "Social Impact Investor Panel / Q&A" },
  { time: "16:30", item: "Thank yous" },
  { time: "16:40", item: "Networking drinks" },
  { time: "17:30", item: "Event close" },
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
      <section className="bg-white v3-page-intro">
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
      <section className="bg-white v3-related-tail">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,520px)_1fr] gap-12 lg:gap-20 items-start">
            {/* Poster. The image and its download link are ONE grid child:
                as siblings they became a third item and pushed the details
                column down into row two, leaving the top right of the section
                empty. */}
            <div>
            <a
              href={gsbPoster}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,22,40,0.45)] ring-1 ring-black/5 transition-transform duration-500 hover:-translate-y-1"
              aria-label="Open the Grow Scale Boost 2026 invitation full size"
            >
              <img
                src={gsbPoster}
                alt="Grow Scale Boost 2026 invitation: an invitation-only Northern Powerhouse conference at Factory International, Aviva Studios, on Tuesday 27 October 2026, 12:00 to 17:30"
                className="w-full h-auto block"
              />
            </a>

            {/* Both pages of the invitation, including the running order, for
                anyone who wants to keep or forward it. */}
            <a
              href="/docs/grow-scale-boost-2026-invitation.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[14px] font-medium text-[#2A9D8F] hover:text-[#15171A] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download the full invitation (PDF)
            </a>
            </div>

            {/* Details */}
            <div className="lg:pt-4">
              {/* Invite only, and the removal of the register CTA below it, are
                  Robert Croll's instruction of 2026-09-20. The event is not
                  open for registration, so nothing on this page may invite it. */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#2A9D8F] bg-[#00E7C3]/10 px-3 py-1.5 rounded-full">
                  Save the date
                </span>
                <span className="inline-block text-[11px] font-bold tracking-[2px] uppercase text-[#6D3FD4] bg-[#8B5CF6]/10 px-3 py-1.5 rounded-full">
                  Invite only
                </span>
              </div>

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
                This event is invite only. Places are extremely limited due to
                the nature of the event, and attendance is by invitation from
                the Epiphiny Flow team.
              </p>

              {/* RSVP block, from flyer draft 3. The deadline existed only
                  inside the PDF until now, which is the one detail on the whole
                  page that costs attendance if a guest never sees it. Robert's
                  address is the route the invitation itself specifies, so it is
                  used here rather than the general enquiries inbox. */}
              <div className="rounded-2xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/[0.04] p-6 md:p-7">
                <div className="text-[11px] font-bold tracking-[2px] uppercase text-[#6D3FD4] mb-3">
                  Confirming your place
                </div>
                <p className="text-[15px] text-gray-600 leading-[1.7] mb-4">
                  Invited guests should send a final R.S.V.P. to Robert by{" "}
                  <strong className="text-[#15171A] font-semibold">Friday 2 October</strong>,
                  including the names of guests attending, dietary requirements
                  and any access requirements.
                </p>
                <a
                  href="mailto:Robert@epiphinyflow.com?subject=Grow%20Scale%20Boost%202026%20-%20RSVP&body=Names%20of%20invited%20guests%20attending%3A%0A%0ADietary%20requirements%3A%0A%0AAccess%20requirements%3A%0A"
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#15171A] hover:text-[#2A9D8F] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#2A9D8F]" />
                  Robert@epiphinyflow.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Running order ── */}
      <section className="bg-white v3-section">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#8B5CF6]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              On the day
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[620px] mb-12">
            Running order
          </h2>
          {/* Two columns on desktop, one on a phone. A definition list rather
              than a table: it is a set of time/item pairs, and a table would
              force a horizontal scroll on a narrow screen.

              grid-flow-col with six explicit rows, NOT grid-cols-2. The default
              row-major fill put 12:00 and 12:30 side by side, so the running
              order read across the page and then back, which is the wrong way
              to read a timeline. Column-major puts noon-to-14:15 down the left
              and 15:00-to-close down the right, matching the flyer. */}
          <dl className="grid grid-cols-1 md:grid-rows-6 md:grid-flow-col gap-x-12 lg:gap-x-20 max-w-[1100px]">
            {runningOrder.map((r) => (
              <div
                key={r.time}
                /* No rule under the last row of EITHER column. Column-major
                   flow means that is item 6 and item 12, not the last two
                   children: an earlier nth-last-child(2) here targeted item 11
                   and left a stray rule under 14:15. The nth-child(6) rule is
                   gated at md because the single-column phone layout has only
                   one last row. */
                className="flex items-baseline gap-5 md:gap-7 py-3.5 border-b border-gray-100 last:border-b-0 md:[&:nth-child(6)]:border-b-0"
              >
                <dt className="text-[15px] font-semibold text-[#6D3FD4] tabular-nums shrink-0 w-[52px]">
                  {r.time}
                </dt>
                <dd className="text-[16px] text-[#15171A] leading-[1.5] m-0">{r.item}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 2025 attendees ── */}
      <section className="bg-[#F5F0E8] v3-section">
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
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 list-none p-0 m-0">
            {attendees.map((a) => (
              <li
                key={a.name}
                className={`rounded-xl ring-1 ring-black/5 shadow-sm h-[104px] md:h-[124px] flex items-center justify-center px-5 md:px-7 ${
                  a.dark ? "bg-[#15171A]" : "bg-white"
                }`}
              >
                <img
                  src={a.logo}
                  alt={a.name}
                  loading="lazy"
                  className="max-h-[52px] md:max-h-[60px] w-auto max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default Events;
