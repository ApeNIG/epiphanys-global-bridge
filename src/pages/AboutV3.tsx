import { useState, useEffect } from "react";
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
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";
import otisThomas from "@/assets/team/otis-thomas.jpg";
import sajPurkayastha from "@/assets/team/saj-purkayastha.jpg";
import martinaWitter from "@/assets/team/martina-witter.jpg";
import abayomiAlemoru from "@/assets/team/abayomi-alemoru.jpg";
import nazZaman from "@/assets/team/naz-zaman.jpg";
import alabiIbagun from "@/assets/team/alabi-ibagun.jpg";
import kashifAshraf from "@/assets/team/kashif-ashraf.jpg";
import dianaChrouch from "@/assets/advisors/diana.jpg";
import robertCroll from "@/assets/team/robert-croll.jpg";
import nadiaShiraz from "@/assets/team/nadia-shiraz.jpg";
import steveConway from "@/assets/team/steve-conway.jpg";
import erinmaBell from "@/assets/team/erinma-bell.jpg";

/* The closed strip labels each member by first name. Taking name.split(" ")[0]
   raw made Prof Erinma Bell's label read "PROF" while every other label was a
   first name, so drop a leading honorific first. */
const firstNameOf = (name: string) =>
  name.replace(/^(Prof(essor)?|Dr|Sir|Dame|Rev)\.?\s+/i, "").split(" ")[0];

/* ─── Team accordion ─── */
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  fullBio?: string[];
  initials: string;
  bg: string;
  photo: string | null;
  photoPos: string;
  overlay: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Robert Croll",
    role: "Founder & Director",
    bio: "Founder and Director of Epiphiny Flow, driving the mission to connect diaspora communities, founders and businesses with economic opportunity.",
    fullBio: [
      "Robert Croll leads Epiphiny Flow, a social enterprise founded in the north whose aim is to deliver a pioneering strategy to boost the UK economy, by helping to deliver increased resources, investment and funding to diasporic communities, leaders, founders, businesses and entrepreneurs.",
    ],
    initials: "RC",
    bg: "#2a3a4a",
    photo: robertCroll,
    photoPos: "center 18%",
    overlay: "bg-black/45",
  },
  {
    name: "Abayomi Alemoru",
    role: "Non-Executive Director",
    bio: "Exited law firm owner and a solicitor of 30 years, specialising in employment.",
    fullBio: [
      "Abayomi Alemoru LL.B is a Solicitor and Director of Legal Practice & Investigation Services at Vista Employer Services, with over 35 years of practice in employment law. He heads up an external, independent investigation service to the NHS.",
      "His investigations have involved senior clinicians, managers and executives; allegations of discrimination and clinical malpractice; complaints from complainants with histories of multiple or retaliatory complaints; and collective, union-backed grievances following organisational change. Employment Tribunal Judges have gone on record commending his reports in cases where he was called to give evidence, and he has appeared before and sat on several panels of enquiry within the Service.",
    ],
    initials: "AA",
    bg: "#1e2a3a",
    photo: abayomiAlemoru,
    photoPos: "center 20%",
    overlay: "bg-black/45",
  },
  {
    name: "Otis Thomas",
    role: "Non-Executive Director",
    bio: "Social enterprise expert and business owner, and a member of the Greater Manchester Combined Authority social enterprise advisory group.",
    fullBio: [
      "Otis Thomas is a strategic leader, entrepreneur and ecosystem builder with over 20 years' experience spanning business development, investment readiness, community innovation and cross-sector partnerships. As Non-Executive Director at Epiphiny Flow, he provides strategic oversight, guidance and support in shaping the platform's vision to connect high-potential founders, organisations and communities with capital, expertise and scalable opportunities.",
      "Otis brings a unique ability to bridge grassroots insight with institutional and investor engagement. His work focuses on building inclusive economic ecosystems that enable underrepresented founders and communities to access funding, develop sustainable ventures and participate meaningfully in innovation economies. At Epiphiny Flow, he contributes to strategic direction, partnership development and the evolution of its deal flow and investment readiness approach.",
      "Alongside his role at Epiphiny Flow, Otis is Managing Director of T.A.P. Project C.I.C. (The African Pot), a community-led organisation operating across business, education, health and community development. Under his leadership it has secured significant public investment and delivered programmes ranging from youth leadership and mental wellbeing to cultural heritage and social innovation. He also serves as a committee member of the GMCA Social Enterprise Advisory Group, supporting the growth and sustainability of the social enterprise sector across Greater Manchester.",
      "With a Master's degree in Management Practice from The University of Manchester, Otis combines academic insight with practical delivery. He is recognised for translating vision into execution, building high-value partnerships and designing models that align commercial success with social impact, driven by a mission to unlock capital, opportunity and innovation for communities and founders historically excluded from traditional investment systems.",
    ],
    initials: "OT",
    bg: "#1e2e1e",
    photo: otisThomas,
    photoPos: "center 10%",
    overlay: "bg-black/45",
  },
  {
    name: "Saj Purkayastha",
    role: "Non-Executive Director",
    bio: "Marketing expert and entrepreneur who has driven over $100M in marketing sales for business income.",
    fullBio: [
      "Saj Purkayastha is one of the world's leading internet marketing experts, with over 20 years of experience in digital marketing and online business growth. Over the course of his career he has helped thousands of businesses scale using cutting-edge marketing strategies, generating hundreds of millions of dollars in revenue across multiple industries.",
      "A highly sought-after speaker, trainer and entrepreneur, Saj has educated and mentored more than 500,000 people worldwide through his training programmes, events and online platforms.",
      "“Excited about helping diasporic founders and businesses grow, scale, and thrive through cutting-edge online marketing strategies.”",
    ],
    initials: "SP",
    bg: "#1a1a1a",
    photo: sajPurkayastha,
    photoPos: "center 8%",
    overlay: "bg-black/50",
  },
  {
    name: "Martina Witter",
    role: "Non-Executive Director",
    bio: "Therapy and health and wellbeing expert, and CEO of TEDx Trafford.",
    fullBio: [
      "Martina Witter is Director of the award-winning Rapha Therapy & Training Services, a BABCP-accredited Cognitive Behaviour Therapist, keynote speaker, confidence coach, health and wellbeing consultant, author, podcast host (Rivers to Resilience) and resilience expert. She is Founder of Black Mental Wealth and co-founder of the Black Women in Business and Professionals Network, Vice Chair of the Greater Manchester Combined Authority Race Equality Panel, a CIPD Manchester Committee member leading on Diversity, Equity and Inclusion, Chair of the Pro-Manchester Wellbeing Champions Committee, and TEDxTrafford Curator and Lead Speaker Coach.",
      "With over 20 years' experience in the wellbeing and mental health field, Martina empowers diverse individuals and organisations to leverage resilience and develop sustainable, strong mindsets that turn bottlenecks into breakthroughs and increase performance and productivity. Her contributions have been featured in HuffPost, Thrive Global, Metro, The Voice, the Financial Times and on BBC Radio Manchester, and she has worked with global brands including AMEX, the JD Group and Oliver Wyman.",
      "Martina delivers transformational, dynamic and experiential training, coaching and psychological therapy in innovative and accessible ways, drawing on her own life experiences to connect with, empathise with and empower her audiences and clients. Her passion for business, inclusivity and collaboration is evident through Black Mental Wealth, a platform for Black and mixed-heritage individuals that challenges stigma and raises awareness of culturally appropriate solutions, and through the Black Women in Business and Professionals Network, which expands networks, creates access to Black female role models and builds community through quarterly events in Manchester.",
    ],
    initials: "MW",
    bg: "#2a1e2a",
    photo: martinaWitter,
    photoPos: "center 6%",
    overlay: "bg-black/45",
  },
  {
    name: "Kashif Ashraf",
    role: "Non-Executive Director",
    bio: "North-West Chair of the independent panel for the Bank of England, and President of Oldham Chamber of Commerce and the Asian Business Partnership, deeply connected across Asian entrepreneurship.",
    fullBio: [
      "Kashif Ashraf MBA is a distinguished leader bridging business, community and civic service to drive inclusive growth across Greater Manchester. He holds an MBA in Business and a BSc (Hons) in Management Sciences, with nearly 34 years of experience in strategic change and programme management dedicated to connecting business with community for sustainable growth.",
      "He serves as Oldham President of the Greater Manchester Chamber of Commerce and as an Economy Board Member at Oldham Council, shaping economic development strategy for the region. His civic leadership includes serving as Independent Chair of the Bank of England Citizens' Panel for the North West, membership of the Oldham Town Centre Board, and participation in the Council's Public Sector Reform and Cultural Partnership Boards.",
      "As Founder and Joint Chair of Asian Business Leaders, Kashif has built a pioneering platform empowering Asian entrepreneurs and business leaders across the North West, fostering diversity, inclusion and cross-community collaboration. He also holds board and charitable roles with the NPH Ethnic Minority Business Forum, the Focus-Trust education charity, and as a Poverty Truth Commissioner with Action Together, amplifying the voices of those with lived experience of poverty to inform policy and practice.",
    ],
    initials: "KA",
    bg: "#233140",
    photo: kashifAshraf,
    photoPos: "center 18%",
    overlay: "bg-black/45",
  },
  {
    name: "Diana Chrouch OBE",
    role: "Non-Executive Director",
    bio: "APPG Special Advisor on ethnic minority businesses and Chair of Ethnic Minority Business Policy.",
    fullBio: [
      "Diana Chrouch OBE is a marketing professional and customer-engagement consultant, specialising in proactive digital and traditional media marketing strategies that have taken brands from loss-making to prominence and profitability. A problem-solver known for business and project turnaround, she has worked across sectors from multinational blue chips to SMEs and professional firms, as well as renowned international charities.",
      "She holds a leading position on the UK Economic Blueprint for Women, creating corporate partnerships for a national strategy to support women-led start-ups and scale-ups, an initiative spearheaded by the Pink Shoe Club. A first-class graduate who trained in marketing in the UK, she studied stakeholder engagement at Dartmouth College in the US and new media at the BBC, with more recent training in big-data strategies and customer relationship management.",
      "She is the author and creator of The Marketing Toolkit, developed in partnership with the National Association of Women in Construction, and serves as Special Advisor to the All-Party Parliamentary Group for Ethnic Minority Business Owners and Chair of National Ethnic Minority Business Policy for the Federation of Small Businesses.",
    ],
    initials: "DC",
    bg: "#1e2a3a",
    photo: dianaChrouch,
    photoPos: "center 15%",
    overlay: "bg-black/45",
  },
  {
    name: "Nadia Shiraz",
    role: "Non-Executive Director",
    bio: "Operations Manager at Inclusive North, specialising in high-value programme delivery, governance and cross-sector partnerships.",
    fullBio: [
      "Nadia Shiraz is Operations Manager at Inclusive North, with extensive experience in leading high-value projects and managing complex programmes and contracts. She plays a key role in translating organisational strategy into effective delivery, ensuring strong governance, robust systems and consistently high standards across the organisation.",
      "She has a strong track record of developing and maintaining strategic partnerships across the public, private and voluntary sectors, and is experienced in managing complex stakeholder relationships, coordinating competing priorities and ensuring programmes deliver against agreed outcomes, contractual requirements and organisational objectives.",
      "With a strong focus on operational excellence, collaboration and continuous improvement, Nadia brings a practical and solutions-focused approach to her role.",
    ],
    initials: "NS",
    bg: "#1e2e2a",
    photo: nadiaShiraz,
    photoPos: "center 14%",
    overlay: "bg-black/45",
  },
  {
    name: "Naz Zaman",
    role: "Non-Executive Director",
    bio: "CEO of Inclusive North, leading fund deployment for the Phoenix Way and Pathway Fund for diaspora community-owned business, and a social impact and fundraising specialist.",
    fullBio: [
      "Naz Zaman brings over 20 years of experience in voluntary sector management and strategic leadership. She is Founder of the Independent Race & Equality Partnership for Lancashire and South Cumbria (IREP) and one of the founding members of The Phoenix Way, a national collaborative of Black, Asian and racially-minoritised leaders working to address the inequity in funding and investment in Black and racially minoritised communities.",
      "A member of the Chartered Management Institute, she is skilled in income generation, business development, and strategic and operational management. She holds a Postgraduate Certificate in Voluntary Sector Management and is qualified to ILM Level 7 in Leadership and Management, with a deep interest in and passion for equality, diversity and inclusion.",
    ],
    initials: "NZ",
    bg: "#2a2a1e",
    photo: nazZaman,
    photoPos: "center 10%",
    overlay: "bg-black/45",
  },
  {
    name: "Alabi Ibagun",
    role: "Non-Executive Director",
    bio: "Creative production specialist for filmed content, and an applied-AI practitioner.",
    fullBio: [
      "Alabi Ibagun is a creative production specialist who leads the design and delivery of Epiphiny Flow's filmed and visual content. From concept and storyboarding through to cinematic direction, motion graphics and final edit, he shapes how the platform and its community are seen and heard, turning strategy into visual stories that carry across web, social and campaign work. His background spans creative direction, video production and post-production, with a focus on giving a growing organisation a distinctive, broadcast-quality voice.",
      "He is also an applied-AI practitioner who builds intelligent tooling and automation into the creative pipeline, using AI for ideation, image and motion generation, and workflow systems that let a small team produce at the scale and pace of a much larger studio. At Epiphiny Flow he brings these disciplines together, and helps the wider network understand how emerging technology can amplify their own ventures.",
    ],
    initials: "AI",
    bg: "#1a2233",
    photo: alabiIbagun,
    photoPos: "center 22%",
    overlay: "bg-black/40",
  },
  {
    name: "Steve Conway",
    role: "Non-Executive Director",
    bio: "Business development advisor for social enterprises.",
    initials: "SC",
    bg: "#22331e",
    photo: steveConway,
    photoPos: "center 22%",
    overlay: "bg-black/45",
  },
  {
    // Added 2026-09-02. She has had a profile and a headshot in the client's
    // Drive NED Board folder since 30 August and was on no version of this page:
    // the folder holds twelve people and the site held eleven.
    name: "Prof Erinma Bell MBE DL",
    role: "Non-Executive Director",
    bio: "Peace activist, community leader and educator, and Chair of the Greater Manchester Police Force Independent Advisory Committee.",
    fullBio: [
      "Professor Erinma Bell MBE DL is a prominent peace activist, community leader and educator dedicated to fostering positive change in the Greater Manchester area. With a passion for social justice and community empowerment, Erinma has dedicated her life to bridging divides and promoting unity among diverse communities.",
      "As Chair of the Greater Manchester Police Force Independent Advisory Committee, she has been instrumental in building trust and collaboration between law enforcement and the communities they serve, work that has led to significant advances in community policing and in dialogue and understanding.",
      "Alongside that work she is Chair of the Fabric Advisory Committee of Manchester Cathedral and a Trustee of Emerge 3Rs, Chair of the Ethics Committee of Trinity High School and Chair of the Nostalgia Trust, and a founding member and Trustee of Bishopthorpe Charitable Partner's Trust, further demonstrating her commitment to education and community development.",
      "Her dedication to peace and social justice has earned her numerous accolades, including Member of the Order of the British Empire (MBE) and the title of Deputy Lieutenant (DL). Her leadership, compassion and vision continue to inspire positive change across Greater Manchester and beyond.",
    ],
    initials: "EB",
    bg: "#2e2436",
    photo: erinmaBell,
    photoPos: "center 16%",
    overlay: "bg-black/45",
  },
];

const TeamAccordion = () => {
  const [active, setActive] = useState(0);
  const [openBio, setOpenBio] = useState<TeamMember | null>(null);

  const prev = () => setActive((i) => (i - 1 + teamMembers.length) % teamMembers.length);
  const next = () => setActive((i) => (i + 1) % teamMembers.length);

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
    <section className="bg-white py-14 md:py-20">
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
        <div className="flex gap-2 md:gap-3 h-[420px] md:h-[480px] overflow-hidden">
          {teamMembers.map((person, i) => {
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
                  <div className="absolute bottom-0 left-0 right-0 p-7 z-10 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                    <p className="text-white/70 text-[13px] leading-[1.7]">
                      {person.bio}
                    </p>
                    {person.fullBio && (
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
                    )}
                  </div>
                )}

                {/* Inactive vertical label */}
                {!isActive && (
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                    <span
                      className="text-white/40 text-[10px] font-semibold tracking-[2px] uppercase whitespace-nowrap"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {firstNameOf(person.name)}
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
          <div
            className="relative min-h-[220px] md:min-h-full"
            style={{ backgroundColor: openBio.bg }}
          >
            {openBio.photo ? (
              <img
                src={openBio.photo}
                alt={openBio.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: openBio.photoPos }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white/20 text-[5rem] select-none">
                  {openBio.initials}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10 pointer-events-none" />
          </div>
          {/* Bio panel */}
          <div className="p-8 md:p-10 overflow-y-auto max-h-[88vh]">
            <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-[#00E7C3] block mb-2">
              {openBio.role}
            </span>
            <h3 className="font-serif text-[26px] md:text-[30px] font-semibold text-[#15171A] leading-[1.12] mb-5">
              {openBio.name}
            </h3>
            <div className="w-11 h-[2px] bg-[#00E7C3] mb-6" />
            <div className="space-y-4">
              {openBio.fullBio?.map((para, idx) => (
                <p
                  key={idx}
                  className="text-[14.5px] leading-[1.8] text-gray-600"
                >
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
        <section className="bg-[#F5F0E8] py-14 md:py-20">
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
        <section className="bg-white py-14 md:py-20">
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
        <section className="bg-[#F5F0E8] py-14 md:py-20">
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

          <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-16 md:py-24 relative z-10">
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
                <a
                  href="mailto:info@epiphinyflow.com?subject=Epiphiny%20Flow%20enquiry"
                  className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
                >
                  Contact us
                  <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
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
