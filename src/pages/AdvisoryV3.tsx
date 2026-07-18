import { useState, useEffect } from "react";
import {
  ArrowRight,
  Rocket,
  TrendingUp,
  Building2,
  Briefcase,
  Landmark,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import dianaPhoto from "@/assets/advisors/diana.jpg";
import suzannePhoto from "@/assets/advisors/suzanne.jpg";
import eddiePhoto from "@/assets/advisors/eddie.jpg";
import arnabPhoto from "@/assets/advisors/arnab.jpg";
import huxleyPhoto from "@/assets/advisors/huxley.jpg";
import karlPhoto from "@/assets/advisors/karl.jpg";
import mannPhoto from "@/assets/advisors/mann.jpg";
import munaPhoto from "@/assets/advisors/muna.jpg";

const Overline = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-[2px] bg-[#00E7C3]" />
    <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
      {label}
    </span>
  </div>
);

const advisoryCards = [
  {
    icon: Rocket,
    title: "Startups",
    description: "Transform ideas into viable businesses with expert guidance at every stage.",
    stat: "95% secure first-round funding",
  },
  {
    icon: TrendingUp,
    title: "Scale-ups",
    description: "Accelerate growth while maintaining cultural authenticity across borders.",
    stat: "340% revenue growth in 18 months",
  },
  {
    icon: Building2,
    title: "SMEs",
    description: "Strengthen market position through strategic diaspora connections.",
    stat: "78% increase in market reach",
  },
  {
    icon: Briefcase,
    title: "Enterprise",
    description: "Leverage diaspora intelligence for competitive advantage at scale.",
    stat: "£50M+ new opportunities identified",
  },
  {
    icon: Landmark,
    title: "Government",
    description: "Harness diaspora potential for measurable economic development.",
    stat: "£2.5B economic activity facilitated",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery & Assessment",
    timeline: "2–4 weeks",
    description:
      "We immerse ourselves in your organisation, understanding your goals, challenges, and the diaspora communities most relevant to your growth trajectory.",
  },
  {
    number: "02",
    title: "Strategy Development",
    timeline: "3–6 weeks",
    description:
      "Our team crafts a bespoke advisory strategy, mapping diaspora networks, identifying opportunities, and building a roadmap tailored to your sector.",
  },
  {
    number: "03",
    title: "Implementation Support",
    timeline: "Ongoing",
    description:
      "We work alongside your team to execute the strategy — facilitating introductions, navigating cultural nuances, and ensuring measurable progress.",
  },
  {
    number: "04",
    title: "Performance Monitoring",
    timeline: "Monthly reviews",
    description:
      "Regular reviews track KPIs, surface new opportunities, and refine the approach based on real-world results and shifting market dynamics.",
  },
];

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

const AdvisoryV3 = () => {
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
    <div
      className="min-h-screen bg-white light [&_a]:no-underline"
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <HeaderV3 />

      <main>
        {/* ── Hero ── */}
        <section className="bg-white pt-32 md:pt-44 pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Advisory Services" />
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
              Strategic Advisory for
              <br />
              Global Growth
            </h1>
            <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[600px]">
              Unlock the power of diaspora communities with expert advisory
              services tailored for startups, scale-ups, SMEs, enterprises, and
              government organisations.
            </p>
          </div>
        </section>

        {/* ── Advisory by Org Type ── */}
        <section className="bg-white pb-20 md:pb-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Solutions" />
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px] mb-16">
              Advisory by Organisation Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {advisoryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group rounded-[20px] border border-gray-200/80 p-8 hover:border-[#00E7C3]/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-[#00E7C3]/10 flex items-center justify-center mb-6">
                      <Icon className="w-5 h-5 text-[#00E7C3]" />
                    </div>
                    <h3 className="font-serif text-[20px] text-[#15171A] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-[1.75] mb-6">
                      {card.description}
                    </p>
                    <div className="pt-5 border-t border-gray-200/60">
                      <span className="text-[13px] font-semibold text-[#8B5CF6]">
                        {card.stat}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Process" />
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px] mb-16">
              How We Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white rounded-[20px] p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-[52px] font-bold text-[#00E7C3]/20 leading-none shrink-0 font-sans">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-[19px] text-[#15171A] mb-1">
                        {step.title}
                      </h3>
                      <span className="text-[11px] font-semibold tracking-[2px] uppercase text-[#8B5CF6]">
                        {step.timeline}
                      </span>
                      <p className="text-[14px] text-gray-500 leading-[1.75] mt-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Board of Advisors ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Board of Advisors" />
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

        {/* ── CTA — dark accent block ── */}
        <section className="bg-[#15171A] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em] max-w-[580px] mb-6">
              Ready to transform your organisation?
            </h2>
            <p className="text-white/50 text-[17px] leading-[1.75] max-w-[480px] mb-10">
              Book a strategic consultation with our advisory team and take the
              first step toward diaspora-powered growth.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/consultation"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
              >
                Book Consultation
                <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/v3/about"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Advisor bio modal ── */}
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

      <FooterV3 />
    </div>
  );
};

export default AdvisoryV3;
