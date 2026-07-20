import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import metaphorDiscover from "@/assets/v3/metaphor-advisory-woman.jpg";
import metaphorStaircase from "@/assets/v2/metaphor-staircase.jpg";
import metaphorHandshake from "@/assets/v3/metaphor-community-group.jpg";

const features = [
  {
    num: "01",
    title: "Advisory",
    description:
      "Our expert advisory board helps you gain guidance on access to investment and funding, investment readiness, marketing tools, intellectual property and partnerships, all tailored to your vision.",
    stat: "8",
    statLabel: "Specialist advisors",
    image: metaphorDiscover,
    imageAlt: "Woman looking through a telescope at a constellation of opportunities",
    accent: "#00E7C3",
    accentHover: "rgba(0,231,195,0.15)",
  },
  {
    num: "02",
    title: "Our Fund",
    description:
      "Our prospective fund will invest in investment-ready diasporic community businesses to fuel growth across the UK.",
    stat: "Soon",
    statLabel: "Fund in development",
    image: metaphorStaircase,
    imageAlt: "Figure ascending geometric staircase toward golden doorway",
    accent: "#8B5CF6",
    accentHover: "rgba(139,92,246,0.15)",
  },
  {
    num: "03",
    title: "Community",
    description:
      "Join a trusted network of diaspora founders, businesses and institutions. Real relationships that open doors, not cold pitches.",
    stat: "7",
    statLabel: "Founding partners",
    image: metaphorHandshake,
    imageAlt: "A diverse group of men and women standing together as a community",
    accent: "#E89B3E",
    accentHover: "rgba(232,155,62,0.15)",
  },
];

const FeaturesV3 = () => {
  const gridRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="bg-white pt-16 md:pt-20 pb-16 md:pb-20 relative overflow-hidden">
      <style>{`
        .feature-card .accent-line {
          width: 0;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .feature-card:hover .accent-line {
          width: 40px;
        }
        .feature-card .card-arrow {
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .feature-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .feature-card .card-image {
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease;
        }
        .feature-card:hover .card-image {
          transform: scale(1.05);
          filter: brightness(1.05);
        }
        .feature-card .card-stat {
          transition: color 0.4s ease;
        }
        .feature-card:hover .card-stat {
          color: var(--card-accent, #00E7C3);
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative">
        {/* Section label — editorial */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[2px] bg-[#00E7C3]" />
          <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
            How It Works
          </span>
        </div>

        <h2 className="font-serif text-3xl md:text-[42px] text-[#15171A] leading-[1.2] max-w-[600px] mb-16">
          Everything you need to grow globally
        </h2>

        {/* Feature cards with visual metaphor compositing */}
        <div
          ref={gridRef}
          className="stagger-children grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card reveal-up group relative rounded-[20px] overflow-hidden bg-[#FAFAF5] border border-transparent hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col cursor-pointer"
              style={{
                ["--card-accent" as any]: feature.accent,
                ["--card-hover-shadow" as any]: feature.accentHover,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${feature.accent}33`;
                e.currentTarget.style.boxShadow = `0 8px 40px -12px ${feature.accentHover}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Visual metaphor image */}
              <div className="relative h-[220px] md:h-[260px] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="card-image w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-5">
                  <span className="text-[56px] md:text-[64px] font-bold leading-none tracking-tighter font-sans text-[#15171A]/[0.08]">
                    {feature.num}
                  </span>
                </div>
                <div className="absolute top-4 right-4 card-arrow">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: feature.accent }}>
                    <ArrowUpRight className="w-4 h-4 text-[#15171A]" />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="accent-line h-[2px] mb-4" style={{ backgroundColor: feature.accent }} />
                <h3 className="font-serif text-[24px] text-[#15171A] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-gray-500 leading-[1.7] mb-6 flex-1">
                  {feature.description}
                </p>

                {/* Stat — editorial inline, pinned to bottom */}
                <div className="flex items-baseline gap-2 pt-5 border-t border-gray-200/60 mt-auto">
                  <span className="card-stat text-[26px] font-bold text-[#15171A] tracking-tight font-sans">
                    {feature.stat}
                  </span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    {feature.statLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curved bottom edge — organic transition to community */}
      <svg
        className="absolute bottom-0 left-0 w-full h-12 md:h-20"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0L1440 0L1440 20C1440 20 1200 80 720 80C240 80 0 20 0 20Z"
          fill="white"
        />
      </svg>
    </section>
  );
};

export default FeaturesV3;
