import { useState } from "react";
import {
  Target,
  Users,
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  Award,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import otisThomas from "@/assets/team/otis-thomas.jpg";
import markHuxley from "@/assets/team/mark-huxley.jpg";
import sajPurkayastha from "@/assets/team/saj-purkayastha.jpg";
import markMann from "@/assets/team/mark-mann.jpg";
import arnabDutt from "@/assets/team/arnab-dutt.jpg";

/* ─── Team accordion ─── */
const teamMembers = [
  {
    name: "Robert Croll",
    role: "Founder & Director",
    bio: "Founder and Director of Epiphiny Flow Ltd. Driving the mission to connect diaspora communities with economic opportunity through digital infrastructure, investment, and advisory services.",
    initials: "RC",
    bg: "#2a3a4a",
    photo: null,
    photoPos: "center 10%",
    overlay: "bg-black/40",
  },
  {
    name: "Saj Purkayastha",
    role: "Non-Executive Director",
    bio: "Internet marketing expert with over 20 years' experience. Has mentored more than 500,000 people through online coaching and education programmes globally.",
    initials: "SP",
    bg: "#1a1a1a",
    photo: sajPurkayastha,
    photoPos: "center 8%",
    overlay: "bg-black/55",
  },
  {
    name: "Otis Thomas",
    role: "Non-Executive Director",
    bio: "Strategic leader with over 20 years in business development and investment readiness. Managing Director of T.A.P. Project C.I.C. (The African Pot). Master's from the University of Manchester.",
    initials: "OT",
    bg: "#1e2e1e",
    photo: otisThomas,
    photoPos: "center 10%",
    overlay: "bg-black/40",
  },
  {
    name: "Arnab Dutt OBE",
    role: "Non-Executive Director",
    bio: "CEO of Divine Ox (Oxford University expert venture hub). FSB Policy Champion for Procurement and Social Value. Advisor to the Cabinet Office on social value policy. Trustee of the Anti-Racist Alliance Trust.",
    initials: "AD",
    bg: "#2a1e2a",
    photo: arnabDutt,
    photoPos: "center 30%",
    overlay: "bg-black/45",
  },
  {
    name: "Mark Mann",
    role: "Advisory Board",
    bio: "Founder of Divine Ox Ltd, developed in partnership with Oxford University. Specialist in social impact measurement. Has worked with the BBC and European universities. President of SOPHIA Oxford UK Limited.",
    initials: "MM",
    bg: "#1e2a3a",
    photo: markMann,
    photoPos: "center 12%",
    overlay: "bg-black/40",
  },
  {
    name: "Mark Huxley",
    role: "Advisory Board",
    bio: "Five decades in the Lloyd's and London insurance market. Founded 10 organisations. Master of the Worshipful Company of Entrepreneurs 2023/24. Advises the Lord Mayor's Office. Top 100 Influential People 2025 Winner.",
    initials: "MH",
    bg: "#2a2a1e",
    photo: markHuxley,
    photoPos: "center 10%",
    overlay: "bg-black/40",
  },
];

const TeamAccordion = () => {
  const [active, setActive] = useState(2);

  const prev = () => setActive((i) => (i - 1 + teamMembers.length) % teamMembers.length);
  const next = () => setActive((i) => (i + 1) % teamMembers.length);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-20">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-[2px] bg-[#00E7C3]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                The Team
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[480px]">
              The people building
              <br />
              Epiphiny Flow
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
        <div className="flex gap-3 h-[420px] md:h-[480px] overflow-hidden">
          {teamMembers.map((person, i) => {
            const isActive = active === i;
            return (
              <div
                key={person.name}
                onClick={() => setActive(i)}
                className="relative rounded-[20px] overflow-hidden cursor-pointer shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: isActive ? "min(420px, 45%)" : "72px", flexShrink: 0 }}
              >
                {/* Portrait */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: person.bg }}
                >
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: person.photoPos }}
                    />
                  ) : null}
                  {/* Overlay */}
                  <div className={`absolute inset-0 ${person.photo ? person.overlay : "bg-black/20"}`} />
                  {/* Initials fallback (shown when no photo) */}
                  {!person.photo && (
                    <span
                      className="relative z-10 text-white/20 font-serif select-none"
                      style={{ fontSize: isActive ? "7rem" : "1.5rem" }}
                    >
                      {person.initials}
                    </span>
                  )}
                  {/* Teal tint on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#00E7C3]/[0.04]" />
                  )}
                </div>

                {/* Active info overlay */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 p-7 z-10">
                    <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#00E7C3] block mb-2">
                      {person.role}
                    </span>
                    <h3 className="font-serif text-[28px] md:text-[32px] text-white leading-[1.1]">
                      {person.name}
                    </h3>
                  </div>
                )}

                {/* Active bio at bottom */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 p-7 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <p className="text-white/70 text-[13px] leading-[1.7]">
                      {person.bio}
                    </p>
                  </div>
                )}

                {/* Inactive vertical label */}
                {!isActive && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                    <span
                      className="text-white/40 text-[10px] font-semibold tracking-[2px] uppercase whitespace-nowrap"
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
            {active + 1} / {teamMembers.length}
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
  );
};

const Overline = ({ label }: { label: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-[2px] bg-[#00E7C3]" />
    <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
      {label}
    </span>
  </div>
);

const Card = ({
  icon: Icon,
  title,
  description,
  accent = "#00E7C3",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  accent?: string;
}) => (
  <div className="rounded-[20px] bg-[#FAFAF5] border border-gray-100 p-7 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div
      className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
      style={{ backgroundColor: `${accent}18` }}
    >
      <Icon className="w-5 h-5" style={{ color: accent }} />
    </div>
    <h3 className="font-serif text-[18px] text-[#15171A] mb-2">{title}</h3>
    <p className="text-[14px] text-gray-500 leading-[1.75]">{description}</p>
  </div>
);

const AboutV3 = () => {
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
            <Overline label="About Us" />
            <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] text-[#15171A] leading-[1.08] tracking-[-0.02em] max-w-[820px] mb-6">
              Growing UK
              <br />
              diaspora business
            </h1>
            <p className="text-gray-500 text-[17px] md:text-[19px] leading-[1.75] max-w-[640px]">
              We are developing an advisory, a tech platform and a fund to
              contribute to the growing national ecosystem, connecting founders,
              businesses and institutions with public and private stakeholders to
              develop opportunities for economic growth across the UK and globally.
            </p>
          </div>
        </section>

        <TeamAccordion />

        {/* ── Mission ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Mission" />

            <blockquote className="max-w-[840px] mb-16">
              <p className="font-serif text-[clamp(1.4rem,3vw,2.25rem)] text-[#15171A] leading-[1.3] tracking-[-0.01em]">
                "To build a more connected and inclusive ecosystem that unlocks
                investment and funding opportunities, celebrates the UK&rsquo;s
                diversity, and powers a collaborative approach to growth."
              </p>
            </blockquote>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card
                icon={Target}
                title="Purpose-Driven"
                description="Every feature, partnership, and initiative is designed to create meaningful impact for diaspora communities worldwide."
              />
              <Card
                icon={Users}
                title="Community-Centric"
                description="Built with and for the community — ensuring voices are heard, needs are met, and growth is shared collectively."
              />
              <Card
                icon={Globe}
                title="Globally Connected"
                description="Bridging borders to create pathways between diaspora talent, local economies, and international opportunities."
              />
            </div>
          </div>
        </section>

        {/* ── Vision ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Vision" />

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[760px] mb-16">
              A UK economy where diversity of thought and heritage is celebrated,
              harnessed, and fuels economic growth, equitably and fairly, with
              long-lasting generational impact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: Globe,
                  title: "Global Diaspora Connection",
                  description:
                    "Connecting diaspora communities across continents with a unified platform that transcends geographical boundaries.",
                  accent: "#00E7C3",
                },
                {
                  icon: TrendingUp,
                  title: "Economic Empowerment",
                  description:
                    "Opening doors to investment, trade, and enterprise opportunities that drive sustainable prosperity for communities.",
                  accent: "#8B5CF6",
                },
                {
                  icon: Users,
                  title: "Community-Driven Growth",
                  description:
                    "Leveraging collective knowledge, networks, and cultural strengths to accelerate community development.",
                  accent: "#00E7C3",
                },
                {
                  icon: Shield,
                  title: "Trust & Transparency",
                  description:
                    "Building a foundation of trust through transparent processes, verified opportunities, and accountable partnerships.",
                  accent: "#8B5CF6",
                },
              ].map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="bg-[#F5F0E8] py-20 md:py-28">
          <div className="max-w-[1440px] mx-auto px-6 md:px-20">
            <Overline label="Our Values" />

            <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[560px] mb-16">
              The principles that guide everything we do
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: Heart,
                  title: "Inclusivity First",
                  description:
                    "We design for everyone — ensuring no community is left behind in the digital economy.",
                  accent: "#00E7C3",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description:
                    "We embrace new technologies and creative approaches to solve age-old challenges facing diaspora communities.",
                  accent: "#8B5CF6",
                },
                {
                  icon: Award,
                  title: "Cultural Pride",
                  description:
                    "We celebrate the rich cultural heritage that makes diaspora communities unique and vibrant.",
                  accent: "#00E7C3",
                },
                {
                  icon: Target,
                  title: "Impact-Driven",
                  description:
                    "Every decision we make is measured against the real-world impact it creates for the communities we serve.",
                  accent: "#8B5CF6",
                },
              ].map((item) => (
                <Card key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Why We Exist — dark accent block ── */}
        <section className="relative overflow-hidden bg-[#15171A]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-[#8B5CF6]/[0.06] rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-24 md:py-36 relative z-10">
            <div className="max-w-[760px]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-[#00E7C3]" />
                <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-500">
                  Why We Exist
                </span>
              </div>

              <h2 className="font-serif text-[clamp(2rem,5vw,3.25rem)] text-white leading-[1.15] tracking-[-0.01em] mb-8">
                Unlocking the untapped potential of diaspora communities
              </h2>

              <div className="space-y-6 mb-14">
                <p className="text-white/50 text-[17px] leading-[1.85]">
                  Diaspora communities represent one of the most powerful
                  economic forces on the planet — contributing over{" "}
                  <span className="text-[#00E7C3] font-medium">
                    £685 billion
                  </span>{" "}
                  annually to global economies through remittances, investments,
                  and entrepreneurship. Yet access to structured opportunities,
                  professional networks, and trusted platforms remains
                  fragmented.
                </p>
                <p className="text-white/50 text-[17px] leading-[1.85]">
                  Epiphiny Flow exists to change that. We are building the
                  digital infrastructure that connects diaspora talent with
                  meaningful opportunities — from public sector tenders and
                  private investment to business advisory and community-led
                  growth initiatives.
                </p>
                <p className="text-white/50 text-[17px] leading-[1.85]">
                  Our platform is designed to honour the cultural identity and
                  entrepreneurial spirit of diaspora communities while providing
                  the tools, transparency, and trust needed to compete on a
                  global stage.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
                >
                  Get Started
                  <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <Link
                  to="/advisory"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
                >
                  Explore Advisory
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterV3 />
    </div>
  );
};

export default AboutV3;
