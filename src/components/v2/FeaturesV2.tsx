import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import metaphorDiscover from "@/assets/v2/metaphor-discover.jpg";
import metaphorStaircase from "@/assets/v2/metaphor-staircase.jpg";
import metaphorHandshake from "@/assets/v2/metaphor-handshake.jpg";

const features = [
  {
    num: "01",
    title: "Advisory",
    description:
      "Expert guidance for diaspora entrepreneurs scaling across borders. Business strategy, market entry, and partnerships — tailored to your ambition.",
    stat: "50+",
    statLabel: "Countries reached",
    image: metaphorDiscover,
    imageAlt: "Figure looking through telescope at constellation of opportunities",
  },
  {
    num: "02",
    title: "Investment",
    description:
      "Access vetted opportunities across Africa, Caribbean, and emerging markets. Full due diligence, FCA compliance, and transparent reporting.",
    stat: "£685B",
    statLabel: "Diaspora economic impact",
    image: metaphorStaircase,
    imageAlt: "Figure ascending geometric staircase toward golden doorway",
  },
  {
    num: "03",
    title: "Community",
    description:
      "Join a trusted network of diaspora professionals, investors, and founders. Real relationships that open doors — not cold pitches.",
    stat: "1,200+",
    statLabel: "Success stories",
    image: metaphorHandshake,
    imageAlt: "Two hands meeting with golden coin symbolising trust and capital",
  },
];

const FeaturesV2 = () => {
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
          color: #00E7C3;
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
              className="feature-card reveal-up group relative rounded-[20px] overflow-hidden bg-[#FAFAF5] border border-transparent hover:border-[#00E7C3]/20 hover:shadow-[0_8px_40px_-12px_rgba(0,231,195,0.15)] hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col cursor-pointer"
            >
              {/* Visual metaphor image — the graphic illustration base */}
              <div className="relative h-[220px] md:h-[260px] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="card-image w-full h-full object-cover object-center"
                />
                {/* Typography composite overlay — number as design element */}
                <div className="absolute top-4 left-5">
                  <span className="text-[56px] md:text-[64px] font-bold leading-none tracking-tighter font-sans text-[#15171A]/[0.08]">
                    {feature.num}
                  </span>
                </div>
                {/* Hover arrow — slides in from left */}
                <div className="absolute top-4 right-4 card-arrow">
                  <div className="w-10 h-10 rounded-full bg-[#00E7C3] flex items-center justify-center shadow-lg">
                    <ArrowUpRight className="w-4 h-4 text-[#15171A]" />
                  </div>
                </div>
              </div>

              {/* Text content — composited below the visual */}
              <div className="p-6 md:p-7 flex flex-col flex-1">
                {/* Teal accent line — grows on hover */}
                <div className="accent-line h-[2px] bg-[#00E7C3] mb-4" />
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

export default FeaturesV2;
