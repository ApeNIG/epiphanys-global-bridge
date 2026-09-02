import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

type QA = { q: string; a: React.ReactNode };
type Group = { label: string; items: QA[] };

const groups: Group[] = [
  {
    label: "About Epiphiny Flow",
    items: [
      {
        q: "What is Epiphiny Flow?",
        a: "Epiphiny Flow is developing an advisory, a tech platform and a fund to help diasporic communities, founders and businesses grow, scale and boost the UK economy. We connect founders, businesses and institutions with public and private stakeholders to develop opportunities for economic growth across the UK and globally.",
      },
      {
        q: "Who is Epiphiny Flow for?",
        a: "Diasporic communities, founders and businesses across the UK, from early-stage startups to established SMEs, as well as public and private backers who want to support inclusive economic growth.",
      },
      {
        q: "Why focus on diaspora businesses?",
        a: "Because it is a large and under-served engine of growth. Ethnic-minority-led businesses add at least £74bn a year to the UK economy, make up around 1 in 6 of all UK businesses and employ nearly 3 million people (source: Minority Businesses Matter, OPEN / MSDUK).",
      },
    ],
  },
  {
    label: "Advisory & the Fund",
    items: [
      {
        q: "What does the advisory offer?",
        a: "Our expert advisory board helps you gain guidance on access to investment and funding, investment readiness, marketing tools, intellectual property and partnerships, all tailored to your vision.",
      },
      {
        q: "Who sits on the advisory board?",
        a: (
          <>
            A board of specialist operators, regulators and advisors standing
            behind every engagement. You can meet them on the{" "}
            <Link to="/advisory/board" className="text-[#2A9D8F] font-medium hover:underline">
              Advisory Board
            </Link>{" "}
            page.
          </>
        ),
      },
      {
        q: "Is the fund live yet?",
        a: "Not yet. The fund is prospective and in development, being built in partnership with public and private stakeholders. It will invest in investment-ready diasporic community businesses to fuel growth across the UK.",
      },
      {
        q: "Is Epiphiny Flow FCA regulated?",
        a: "The fund is being designed to meet the relevant UK regulatory standards. It is not yet operating as a regulated fund; we will communicate its regulatory status clearly as it launches.",
      },
      {
        q: "How can I get involved with the fund?",
        a: (
          <>
            You can register your interest as a backer, or tell us about your
            business, from the{" "}
            <Link to="/fund" className="text-[#2A9D8F] font-medium hover:underline">
              Our Fund
            </Link>{" "}
            page. We will be in touch as the fund develops.
          </>
        ),
      },
    ],
  },
  {
    label: "Community & Events",
    items: [
      {
        q: "What is the platform?",
        a: "A digital platform connecting diaspora founders, businesses and institutions with public and private sector opportunities. It is in active development.",
      },
      {
        q: "What is Grow Scale Boost 2026?",
        a: (
          <>
            A Northern Powerhouse conference boosting the UK economy through local
            to global investment pathways, for diasporic founders and
            entrepreneurs. It takes place on Tuesday 27 October 2026 at Factory
            International @ Aviva Studios, Manchester. See the{" "}
            <Link to="/events" className="text-[#2A9D8F] font-medium hover:underline">
              Events
            </Link>{" "}
            page for details.
          </>
        ),
      },
      {
        q: "How do I attend the event?",
        a: "Places are extremely limited due to the nature of the event. Register your interest by email at info@epiphinyflow.com and we will be in touch.",
      },
      {
        q: "How do I get in touch?",
        a: "Email info@epiphinyflow.com, or use the contact options in the footer of any page.",
      },
    ],
  },
];

const FaqItem = ({ item }: { item: QA }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 text-left py-6 group"
        aria-expanded={open}
      >
        <span className="font-serif text-[19px] md:text-[21px] text-[#15171A] leading-[1.35]">
          {item.q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#2A9D8F] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-gray-500 text-[16px] leading-[1.75] pb-7 max-w-[680px]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => (
  <div
    className="min-h-screen bg-white light [&_a]:no-underline"
    data-theme="light"
    style={{ colorScheme: "light" }}
  >
    <HeaderV3 />

    <main>
      {/* ── Hero ── */}
      <section className="bg-white pt-32 md:pt-44 pb-10 md:pb-14">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              FAQ
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
            Questions, answered
          </h1>
          <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[600px]">
            What Epiphiny Flow is, how the advisory and fund work, and how to get
            involved.
          </p>
        </div>
      </section>

      {/* ── Q&A ── */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-[860px] mx-auto px-6 md:px-20">
          {groups.map((group) => (
            <div key={group.label} className="mb-14 last:mb-0">
              <h2 className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400 mb-2">
                {group.label}
              </h2>
              <div>
                {group.items.map((item) => (
                  <FaqItem key={item.q} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Still have questions ── */}
      <section className="bg-[#F5F0E8] py-16 md:py-20">
        <div className="max-w-[860px] mx-auto px-6 md:px-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-serif text-2xl md:text-[30px] text-[#15171A] leading-[1.2] mb-2">
              Still have a question?
            </h2>
            <p className="text-gray-500 text-[16px]">
              We are happy to help. Reach out and we will get back to you.
            </p>
          </div>
          <a
            href="mailto:info@epiphinyflow.com?subject=Question%20about%20Epiphiny%20Flow"
            className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit shrink-0"
          >
            Get in touch
            <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default FAQ;
