import { useState, useEffect } from "react";
import { X } from "lucide-react";
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
  bio: string;
  photo: string;
};

const advisors: Advisor[] = [
  {
    name: "Diana Chrouch",
    honours: "OBE",
    role: "Director, Chrouch Consulting · Special Advisor, APPG for Ethnic Minority Business",
    photo: dianaPhoto,
    bio: "Director of Chrouch Consulting and a marketing and customer-engagement specialist known for turning brands around, from multinational blue chips to SMEs and charities. Special Advisor to the All-Party Parliamentary Group for Ethnic Minority Business Owners and Chair of National Ethnic Minority Business Policy at the Federation of Small Businesses. A first-class graduate who trained in the UK, studied stakeholder engagement at Dartmouth College and new media at the BBC, she authored The Marketing Toolkit with the National Association of Women in Construction.",
  },
  {
    name: "Suzanne Oliver",
    role: "Dual-qualified UK/European patent attorney · Director, IP Strategy, Scintilla",
    photo: suzannePhoto,
    bio: "Dual-qualified UK and European patent attorney and Director of IP Strategy at Scintilla, with an engineering background. She has led IP strategy at robotics start-up GroundWOW, run Operations, Legal and IP at Arm spin-out SeeChange Technologies, and managed Arm's global patent and trademark teams. A former President of the UK IP Federation advising government on innovation and IP, she has been named an IAM World Leading IP Strategist and a Managing IP Corporate IP Star, and is a longstanding advocate for women in STEM.",
  },
  {
    name: "Eddie Cole",
    role: "Accountancy & taxation specialist · Fellow, Institute of Directors",
    photo: eddiePhoto,
    bio: "An accountancy, taxation and management specialist with nearly 25 years' experience, Eddie has held roles at blue-chip firms including Halifax Building Society, Airtours, Kellogg's and British Gas, and has led the operations of a Manchester-based B2B services group. A Fellow of the Institute of Directors and of several accounting bodies, he holds a Certificate in Company Direction from the University of Salford and has helped establish thousands of UK limited companies since 2001.",
  },
  {
    name: "Arnab Dutt",
    honours: "OBE",
    role: "CEO, Divine Ox · FSB Policy Champion, procurement & social value",
    photo: arnabPhoto,
    bio: "CEO of Divine Ox, Oxford University's expert venture hub. FSB Policy Champion for Procurement and Social Value, an advisor to the Cabinet Office on social value policy, and a Trustee of the Anti-Racist Alliance Trust.",
  },
  {
    name: "Mark Huxley",
    role: "Lloyd's insurance veteran · Chair, Financial Services Group of Livery Companies",
    photo: huxleyPhoto,
    bio: "Five decades in the Lloyd's and London insurance market, having founded 10 organisations. Master of the Worshipful Company of Entrepreneurs 2023/24, an advisor to the Lord Mayor's Office, and a Top 100 Influential People 2025 winner.",
  },
  {
    name: "Karl Murray",
    role: "Managing Director, FW Business · youth, education & community",
    photo: karlPhoto,
    bio: "Managing Director of FW Business Ltd since 2008, Karl leads promotion, advertising and consultancy work with a specialism in youth support, education, and voluntary and community development. His ventures include Link Up Caribbeans, focused on the Caribbean experience, and FW Vacation Homes.",
  },
  {
    name: "Mark Mann",
    role: "Social-impact strategist · Director, Divine Ox · President, SOPHIA Oxford",
    photo: mannPhoto,
    bio: "Founder of Divine Ox Ltd, developed in partnership with Oxford University, and a specialist in social impact measurement. Has worked with the BBC and European universities, and is President of SOPHIA Oxford UK Limited.",
  },
  {
    name: "Muna Yassin",
    honours: "MBE",
    role: "CEO, Rooted Finance · 20+ yrs financial inclusion",
    photo: munaPhoto,
    bio: "CEO of Rooted Finance, a London charity providing specialist debt advice to diverse ethnic communities, with over 20 years in financial inclusion. Awarded an MBE in the 2021 Queen's Birthday Honours for charitable financial services to disadvantaged people during Covid-19, she has served on the government's VCSE Advisory Panel, joined the Board of the Money Advice Liaison Group in 2025, and previously been a Trustee of Toynbee Hall and a board member of Women Advancing Microfinance UK.",
  },
];

const BoardOfAdvisors = () => {
  const [selected, setSelected] = useState<Advisor | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Board of Advisors
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px]">
              Specialist advice, expert guidance
            </h2>
            <p className="text-gray-500 text-[15px] leading-[1.7] max-w-[320px]">
              A board of proven operators, regulators and specialists, standing
              behind every engagement.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-[22px]">
            {advisors.map((a) => (
              <button
                key={a.name}
                type="button"
                onClick={() => setSelected(a)}
                aria-label={`Read ${a.name}'s full bio`}
                className="group text-left focus:outline-none"
              >
                <div className="relative aspect-[4/5] rounded-lg bg-[#0A1628] p-3 border border-[#00E7C3]/25 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#00E7C3]/50 group-focus-visible:border-[#00E7C3]/70">
                  <img
                    src={a.photo}
                    alt={a.name}
                    className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-cover object-top rounded-[5px] grayscale contrast-[1.07] brightness-[1.05] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-3 rounded-[5px] bg-gradient-to-b from-transparent from-[58%] to-[#0A1628]/50 pointer-events-none" />
                  {a.honours && (
                    <span className="absolute left-5 bottom-5 z-10 text-[9px] font-bold tracking-[0.14em] uppercase text-white/70 bg-[#0A1628]/50 backdrop-blur px-2 py-1 rounded-[3px]">
                      {a.honours}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 z-20 w-7 h-7 rounded-full bg-[#0A1628]/55 backdrop-blur text-white flex items-center justify-center text-xl font-light leading-none opacity-0 group-hover:opacity-100 transition-opacity">
                    +
                  </span>
                </div>
                <h3 className="font-serif text-[20px] text-[#15171A] mt-4 mb-[3px] leading-[1.15]">
                  {a.name}
                  {a.honours && (
                    <span className="text-[#2A9D8F]"> {a.honours}</span>
                  )}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-[1.5]">
                  {a.role}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#15171A]/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} biography`}
        >
          <div
            className="relative bg-white rounded-xl w-full max-w-[680px] grid md:grid-cols-[240px_1fr] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close bio"
              className="absolute top-3 right-3.5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#15171A] shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative bg-[#0A1628] min-h-[240px] md:min-h-[320px]">
              <img
                src={selected.photo}
                alt={selected.name}
                className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-[1.06]"
              />
              {selected.honours && (
                <span className="absolute left-3.5 bottom-3.5 z-10 text-[9px] font-bold tracking-[0.14em] uppercase text-white bg-[#0A1628]/50 backdrop-blur px-2 py-[5px] rounded-[3px]">
                  {selected.honours}
                </span>
              )}
            </div>
            <div className="p-9 md:p-10">
              <div className="w-11 h-[2px] bg-[#2A9D8F] mb-[18px]" />
              <h3 className="font-serif text-[28px] font-semibold text-[#15171A] leading-[1.12] mb-2">
                {selected.name}
                {selected.honours && (
                  <span className="text-[#2A9D8F]"> {selected.honours}</span>
                )}
              </h3>
              <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-400 leading-[1.6] mb-[22px]">
                {selected.role}
              </div>
              <p className="text-[15px] leading-[1.78] text-gray-500">
                {selected.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardOfAdvisors;
