import { useState, useEffect } from "react";
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import dianaPhoto from "@/assets/advisors/diana.jpg";
import suzannePhoto from "@/assets/advisors/suzanne.jpg";
import eddiePhoto from "@/assets/advisors/eddie.jpg";
import arnabPhoto from "@/assets/advisors/arnab.jpg";
import huxleyPhoto from "@/assets/advisors/huxley.jpg";
import karlPhoto from "@/assets/advisors/karl.jpg";
import mannPhoto from "@/assets/advisors/mann.jpg";
import munaPhoto from "@/assets/advisors/muna.jpg";

type Advisor = {
  name: string;
  honours?: string;
  role: string;
  summary: string;
  fullBio: string[];
  photo: string;
  initials: string;
  bg: string;
  photoPos: string;
};

const advisors: Advisor[] = [
  {
    name: "Diana Chrouch",
    honours: "OBE",
    role: "Director, Chrouch Consulting · Special Advisor, APPG for Ethnic Minority Business",
    summary:
      "Marketing and customer-engagement specialist, and Special Advisor on ethnic minority business.",
    photo: dianaPhoto,
    initials: "DC",
    bg: "#0A1628",
    photoPos: "center 18%",
    fullBio: [
      "Director of Chrouch Consulting and a marketing and customer-engagement specialist known for turning brands around, from multinational blue chips to SMEs and charities. Special Advisor to the All-Party Parliamentary Group for Ethnic Minority Business Owners and Chair of National Ethnic Minority Business Policy at the Federation of Small Businesses.",
      "A first-class graduate who trained in the UK, studied stakeholder engagement at Dartmouth College and new media at the BBC, she authored The Marketing Toolkit with the National Association of Women in Construction.",
    ],
  },
  {
    name: "Suzanne Oliver",
    role: "Director, IP Strategy, Scintilla · Dual-qualified UK/European patent attorney",
    summary:
      "Dual-qualified UK and European patent attorney and IP strategist with an engineering background.",
    photo: suzannePhoto,
    initials: "SO",
    bg: "#10223a",
    photoPos: "center 15%",
    fullBio: [
      "Dual-qualified UK and European patent attorney and Director of IP Strategy at Scintilla, with an engineering background. She has led IP strategy at robotics start-up GroundWOW, run Operations, Legal and IP at Arm spin-out SeeChange Technologies, and managed Arm's global patent and trademark teams.",
      "A former President of the UK IP Federation advising government on innovation and IP, she has been named an IAM World Leading IP Strategist and a Managing IP Corporate IP Star, and is a longstanding advocate for women in STEM.",
    ],
  },
  {
    name: "Eddie Cole",
    role: "Accountancy & taxation specialist · Fellow, Institute of Directors",
    summary:
      "Accountancy, taxation and management specialist with nearly 25 years' experience.",
    photo: eddiePhoto,
    initials: "EC",
    bg: "#0d1d33",
    photoPos: "center 15%",
    fullBio: [
      "An accountancy, taxation and management specialist with nearly 25 years' experience, Eddie has held roles at blue-chip firms including Halifax Building Society, Airtours, Kellogg's and British Gas, and has led the operations of a Manchester-based B2B services group.",
      "A Fellow of the Institute of Directors and of several accounting bodies, he holds a Certificate in Company Direction from the University of Salford and has helped establish thousands of UK limited companies since 2001.",
    ],
  },
  {
    name: "Arnab Dutt",
    honours: "OBE",
    role: "CEO, Divine Ox · FSB Policy Champion, procurement & social value",
    summary:
      "CEO of Divine Ox and FSB Policy Champion for procurement and social value.",
    photo: arnabPhoto,
    initials: "AD",
    bg: "#14243d",
    photoPos: "center 15%",
    fullBio: [
      "CEO of Divine Ox, Oxford University's expert venture hub. FSB Policy Champion for Procurement and Social Value, an advisor to the Cabinet Office on social value policy, and a Trustee of the Anti-Racist Alliance Trust.",
    ],
  },
  {
    name: "Mark Huxley",
    role: "Lloyd's insurance veteran · Chair, Financial Services Group of Livery Companies",
    summary:
      "Five decades in the Lloyd's and London insurance market; founder of ten organisations.",
    photo: huxleyPhoto,
    initials: "MH",
    bg: "#0A1628",
    photoPos: "center 15%",
    fullBio: [
      "Five decades in the Lloyd's and London insurance market, having founded 10 organisations. Master of the Worshipful Company of Entrepreneurs 2023/24, an advisor to the Lord Mayor's Office, and a Top 100 Influential People 2025 winner.",
    ],
  },
  {
    name: "Karl Murray",
    role: "Managing Director, FW Business · youth, education & community",
    summary:
      "Managing Director of FW Business; specialist in youth, education and community development.",
    photo: karlPhoto,
    initials: "KM",
    bg: "#10223a",
    photoPos: "center 15%",
    fullBio: [
      "Managing Director of FW Business Ltd since 2008, Karl leads promotion, advertising and consultancy work with a specialism in youth support, education, and voluntary and community development. His ventures include Link Up Caribbeans, focused on the Caribbean experience, and FW Vacation Homes.",
    ],
  },
  {
    name: "Mark Mann",
    role: "Social-impact strategist · Director, Divine Ox · President, SOPHIA Oxford",
    summary:
      "Social-impact strategist, Director of Divine Ox and President of SOPHIA Oxford.",
    photo: mannPhoto,
    initials: "MM",
    bg: "#0d1d33",
    photoPos: "center 15%",
    fullBio: [
      "Founder of Divine Ox Ltd, developed in partnership with Oxford University, and a specialist in social impact measurement. Has worked with the BBC and European universities, and is President of SOPHIA Oxford UK Limited.",
    ],
  },
  {
    name: "Muna Yassin",
    honours: "MBE",
    role: "CEO, Rooted Finance · 20+ yrs financial inclusion",
    summary:
      "CEO of Rooted Finance with over 20 years in financial inclusion; awarded an MBE.",
    photo: munaPhoto,
    initials: "MY",
    bg: "#14243d",
    photoPos: "center 15%",
    fullBio: [
      "CEO of Rooted Finance, a London charity providing specialist debt advice to diverse ethnic communities, with over 20 years in financial inclusion. Awarded an MBE in the 2021 Queen's Birthday Honours for charitable financial services to disadvantaged people during Covid-19.",
      "She has served on the government's VCSE Advisory Panel, joined the Board of the Money Advice Liaison Group in 2025, and previously been a Trustee of Toynbee Hall and a board member of Women Advancing Microfinance UK.",
    ],
  },
];

const BoardOfAdvisors = () => {
  const [active, setActive] = useState(0);
  const [openBio, setOpenBio] = useState<Advisor | null>(null);

  const prev = () => setActive((i) => (i - 1 + advisors.length) % advisors.length);
  const next = () => setActive((i) => (i + 1) % advisors.length);

  useEffect(() => {
    if (!openBio) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenBio(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openBio]);

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          {/* Header row */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-[2px] bg-[#00E7C3]" />
                <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                  Board of Advisors
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[520px]">
                Specialist advice,
                <br />
                expert guidance
              </h2>
            </div>
            {/* Nav arrows */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#00E7C3] hover:text-[#00E7C3] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-[#15171A] text-white flex items-center justify-center hover:bg-[#00E7C3] hover:text-[#15171A] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Accordion strip */}
          <div className="flex gap-2 md:gap-3 h-[420px] md:h-[480px] overflow-hidden">
            {advisors.map((person, i) => {
              const isActive = active === i;
              return (
                <div
                  key={person.name}
                  onClick={() => setActive(i)}
                  className="relative rounded-[20px] overflow-hidden cursor-pointer shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: isActive ? "min(420px, 42%)" : "56px", flexShrink: 0 }}
                >
                  {/* Portrait */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: person.bg }}
                  >
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: person.photoPos }}
                    />
                    {/* Legibility overlays — keep the photo in its true colours,
                        darken only the zones where text sits. */}
                    {isActive ? (
                      <div className="absolute top-0 inset-x-0 h-2/5 bg-gradient-to-b from-black/60 to-transparent" />
                    ) : (
                      <div className="absolute inset-0 bg-black/25" />
                    )}
                  </div>

                  {/* Active info overlay */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 p-7 z-10">
                      <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#00E7C3] block mb-2">
                        Advisor
                      </span>
                      <h3 className="font-serif text-[28px] md:text-[32px] text-white leading-[1.1]">
                        {person.name}
                        {person.honours && (
                          <span className="text-[#00E7C3]"> {person.honours}</span>
                        )}
                      </h3>
                    </div>
                  )}

                  {/* Active summary + read full bio */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-7 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                      <p className="text-white/70 text-[13px] leading-[1.7]">
                        {person.summary}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenBio(person);
                        }}
                        className="mt-3 inline-flex items-center gap-1.5 text-[#00E7C3] text-[12px] font-semibold tracking-[0.5px] uppercase hover:gap-2.5 transition-all"
                      >
                        Read full bio
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Inactive vertical label */}
                  {!isActive && (
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                      <span
                        className="text-white/50 text-[10px] font-semibold tracking-[2px] uppercase whitespace-nowrap"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {person.name.split(" ")[0]}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile nav */}
          <div className="flex items-center justify-center gap-3 mt-6 md:hidden">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-400">
              {active + 1} / {advisors.length}
            </span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-[#15171A] text-white flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Full-bio modal */}
      {openBio && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#15171A]/60 backdrop-blur-sm"
          onClick={() => setOpenBio(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${openBio.name} biography`}
        >
          <div
            className="relative bg-white rounded-xl w-full max-w-[720px] max-h-[88vh] grid md:grid-cols-[260px_1fr] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpenBio(null)}
              aria-label="Close bio"
              className="absolute top-3 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#15171A] shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {/* Portrait panel */}
            <div className="relative min-h-[220px] md:min-h-full" style={{ backgroundColor: openBio.bg }}>
              <img
                src={openBio.photo}
                alt={openBio.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: openBio.photoPos }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10 pointer-events-none" />
              {openBio.honours && (
                <span className="absolute left-3.5 bottom-3.5 z-10 text-[9px] font-bold tracking-[0.14em] uppercase text-white bg-[#0A1628]/50 backdrop-blur px-2 py-[5px] rounded-[3px]">
                  {openBio.honours}
                </span>
              )}
            </div>
            {/* Bio panel */}
            <div className="p-8 md:p-10 overflow-y-auto max-h-[88vh]">
              <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#00E7C3] block mb-2">
                Board of Advisors
              </span>
              <h3 className="font-serif text-[26px] md:text-[30px] font-semibold text-[#15171A] leading-[1.12] mb-1">
                {openBio.name}
                {openBio.honours && (
                  <span className="text-[#2A9D8F]"> {openBio.honours}</span>
                )}
              </h3>
              <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-gray-400 leading-[1.6] mb-5">
                {openBio.role}
              </div>
              <div className="w-11 h-[2px] bg-[#00E7C3] mb-6" />
              <div className="space-y-4">
                {openBio.fullBio.map((para, idx) => (
                  <p key={idx} className="text-[14.5px] leading-[1.8] text-gray-600">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardOfAdvisors;
