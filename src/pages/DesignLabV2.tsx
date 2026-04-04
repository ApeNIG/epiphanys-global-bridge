import HeaderV2 from "@/components/v2/HeaderV2";
import FooterV2 from "@/components/v2/FooterV2";

/* ── Concept 1: The Ascending Path ── */
const AscendingPath = () => (
  <div className="relative w-full h-full bg-[#F5F0E8] rounded-[20px] overflow-hidden flex flex-col items-center justify-end p-8">
    {/* Teal path narrowing upward */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 360 480"
      preserveAspectRatio="none"
    >
      <polygon points="120,480 240,480 195,40 165,40" fill="#00E7C3" opacity="0.35" />
      <polygon points="140,480 220,480 190,60 170,60" fill="#00E7C3" opacity="0.5" />
    </svg>
    {/* Glow at top */}
    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 bg-[#00E7C3]/30 rounded-full blur-[30px]" />
    {/* Figure silhouette */}
    <svg className="absolute top-14 left-1/2 -translate-x-1/2" width="24" height="36" viewBox="0 0 24 36">
      <circle cx="12" cy="4" r="4" fill="#15171A" />
      <line x1="12" y1="8" x2="12" y2="22" stroke="#15171A" strokeWidth="2.5" />
      <line x1="12" y1="22" x2="5" y2="35" stroke="#15171A" strokeWidth="2.5" />
      <line x1="12" y1="22" x2="19" y2="35" stroke="#15171A" strokeWidth="2.5" />
      <line x1="12" y1="14" x2="4" y2="20" stroke="#15171A" strokeWidth="2.5" />
      <line x1="12" y1="14" x2="20" y2="20" stroke="#15171A" strokeWidth="2.5" />
    </svg>
    {/* Text */}
    <div className="relative z-10 text-center">
      <div className="text-[32px] font-extrabold tracking-[6px] text-[#15171A] font-sans">
        SCALE
      </div>
      <div className="text-[11px] font-semibold tracking-[3px] uppercase text-[#15171A]/50 mt-1">
        Investment
      </div>
    </div>
  </div>
);

/* ── Concept 2: Bar Chart Architecture ── */
const BarChartArchitecture = () => (
  <div className="relative w-full h-full bg-[#15171A] rounded-[20px] overflow-hidden p-8 flex flex-col justify-between">
    {/* Ghost arrow */}
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.06]"
      viewBox="0 0 360 480"
      preserveAspectRatio="none"
    >
      <polygon points="100,440 260,440 195,40 165,40" fill="white" />
    </svg>
    {/* Stat */}
    <div className="relative z-10">
      <div className="text-[28px] font-bold text-[#00E7C3] font-sans tracking-tight">
        £685B
      </div>
      <div className="text-[9px] font-semibold tracking-[2px] uppercase text-white/30 mt-1">
        Diaspora Economic Impact
      </div>
    </div>
    {/* Bars */}
    <div className="relative z-10 flex items-end gap-3 h-[280px] mt-auto mb-8">
      <div className="w-10 rounded-t-md bg-[#00E7C3]/50" style={{ height: "30%" }} />
      <div className="w-10 rounded-t-md bg-[#00E7C3]/70" style={{ height: "50%" }} />
      <div className="w-10 rounded-t-md bg-[#8B5CF6]/60" style={{ height: "65%" }} />
      <div className="w-10 rounded-t-md bg-[#00E7C3]/85" style={{ height: "80%" }} />
      <div className="w-10 rounded-t-md bg-[#00E7C3]" style={{ height: "95%" }} />
    </div>
    {/* Baseline + label */}
    <div className="relative z-10">
      <div className="w-full h-px bg-white/10 mb-3" />
      <div className="text-[11px] font-bold tracking-[4px] uppercase text-white/40 font-sans">
        Investment
      </div>
    </div>
  </div>
);

/* ── Concept 3: Typography Structure ── */
const TypographyStructure = () => (
  <div className="relative w-full h-full bg-white rounded-[20px] overflow-hidden p-8 flex flex-col justify-between">
    {/* Watermark letters cascading diagonally */}
    <div className="absolute inset-0 select-none pointer-events-none">
      {["S", "C", "A", "L", "E"].map((letter, i) => (
        <span
          key={letter}
          className="absolute font-serif font-black text-[180px] leading-none text-[#15171A]"
          style={{
            left: `${8 + i * 16}%`,
            top: `${15 + i * 12}%`,
            opacity: 0.08 - i * 0.012,
          }}
        >
          {letter}
        </span>
      ))}
    </div>
    {/* Overline */}
    <div className="relative z-10">
      <div className="text-[14px] font-bold tracking-[2px] text-[#00E7C3] font-sans">
        02
      </div>
    </div>
    {/* Teal accent bar */}
    <div className="absolute left-8 top-16 w-1 h-[180px] bg-[#00E7C3]" />
    {/* Bottom text */}
    <div className="relative z-10 mt-auto">
      <div className="w-16 h-0.5 bg-[#00E7C3] mb-3" />
      <div className="font-serif text-[48px] text-[#15171A] leading-none">
        Scale
      </div>
      <p className="text-[13px] text-[#15171A]/50 leading-[1.6] mt-3 max-w-[260px]">
        Access vetted opportunities across Africa, Caribbean, and emerging
        markets.
      </p>
    </div>
  </div>
);

/* ── Concept 4: Converging Arrows ── */
const ConvergingArrows = () => (
  <div className="relative w-full h-full bg-[#15171A] rounded-[20px] overflow-hidden p-8 flex flex-col justify-end">
    {/* Three converging paths */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 360 480"
      preserveAspectRatio="none"
    >
      {/* Grow — left arrow */}
      <polygon
        points="30,430 70,430 170,50 145,30"
        fill="#00E7C3"
        opacity="0.55"
      />
      {/* Scale — center arrow */}
      <polygon
        points="155,440 205,440 190,30 170,30"
        fill="#8B5CF6"
        opacity="0.45"
      />
      {/* Boost — right arrow */}
      <polygon
        points="290,430 330,430 210,50 190,30"
        fill="#00E7C3"
        opacity="0.35"
      />
    </svg>
    {/* Convergence glow */}
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#00E7C3]/60 rounded-full blur-[12px]" />
    {/* Labels */}
    <div className="relative z-10 flex justify-between items-end">
      <span className="text-[10px] font-bold tracking-[3px] text-[#00E7C3]/70 font-sans">
        GROW
      </span>
      <span className="text-[10px] font-bold tracking-[3px] text-[#8B5CF6]/70 font-sans">
        SCALE
      </span>
      <span className="text-[10px] font-bold tracking-[3px] text-[#00E7C3]/50 font-sans">
        BOOST
      </span>
    </div>
    <div className="relative z-10 text-center mt-3">
      <div className="text-[11px] font-bold tracking-[4px] uppercase text-white/40 font-sans">
        Investment
      </div>
    </div>
  </div>
);

/* ── Lab Page ── */
const DesignLabV2 = () => {
  return (
    <div
      className="min-h-screen bg-white light [&_a]:no-underline"
      data-theme="light"
      style={{ colorScheme: "light" }}
    >
      <HeaderV2 />
      <main>
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 py-16">
          {/* Lab header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Design Lab
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[#15171A] leading-[1.1] mb-4">
            Investment Card — "Scale" Concepts
          </h1>
          <p className="text-[17px] text-gray-500 max-w-[600px] leading-[1.7] mb-16">
            Four graphic design directions for the feature card illustration.
            Bold composition, brand colours, no stock photography.
          </p>

          {/* 4 concepts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4]">
                <AscendingPath />
              </div>
              <div>
                <div className="font-serif text-lg text-[#15171A]">
                  1. The Ascending Path
                </div>
                <p className="text-[13px] text-gray-400 mt-1">
                  Minimal, aspirational. Figure rising toward a vanishing point.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4]">
                <BarChartArchitecture />
              </div>
              <div>
                <div className="font-serif text-lg text-[#15171A]">
                  2. Bar Chart Architecture
                </div>
                <p className="text-[13px] text-gray-400 mt-1">
                  Data as design. Ascending bars, ghost arrow, stat overlay.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4]">
                <TypographyStructure />
              </div>
              <div>
                <div className="font-serif text-lg text-[#15171A]">
                  3. Typography Structure
                </div>
                <p className="text-[13px] text-gray-400 mt-1">
                  Letterforms as architecture. Editorial magazine feel.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="aspect-[3/4]">
                <ConvergingArrows />
              </div>
              <div>
                <div className="font-serif text-lg text-[#15171A]">
                  4. Converging Arrows
                </div>
                <p className="text-[13px] text-gray-400 mt-1">
                  Three pillars (Grow, Scale, Boost) converging upward.
                </p>
              </div>
            </div>
          </div>
          {/* ── Font Exploration ── */}
          <div className="mt-32">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[2px] bg-[#8B5CF6]" />
              <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
                Font Exploration
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[#15171A] leading-[1.1] mb-4">
              Logo Typography — "Epiphiny Flow"
            </h2>
            <p className="text-[17px] text-gray-500 max-w-[600px] leading-[1.7] mb-16">
              Finding the right typeface for the wordmark. Each sample shown
              with the spiral logo at brand scale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "Playfair Display", family: "'Playfair Display', serif", weight: "400", note: "Current — classic editorial serif. Elegant, high contrast." },
                { name: "Cormorant Garamond", family: "'Cormorant Garamond', serif", weight: "500", note: "Refined, tall x-height. Luxury fintech feel." },
                { name: "DM Serif Display", family: "'DM Serif Display', serif", weight: "400", note: "Modern serif with warmth. Google's take on editorial." },
                { name: "Libre Baskerville", family: "'Libre Baskerville', serif", weight: "400", note: "Traditional authority. Trust-heavy, banking feel." },
                { name: "Lora", family: "'Lora', serif", weight: "500", note: "Calligraphic warmth. Approachable yet professional." },
                { name: "Space Grotesk", family: "'Space Grotesk', sans-serif", weight: "500", note: "Geometric sans. Modern tech/fintech. Clean." },
                { name: "Outfit", family: "'Outfit', sans-serif", weight: "500", note: "Geometric with personality. Friendly premium." },
                { name: "Plus Jakarta Sans", family: "'Plus Jakarta Sans', sans-serif", weight: "600", note: "Contemporary sans. Stripe/Linear energy." },
                { name: "Sora", family: "'Sora', sans-serif", weight: "500", note: "Geometric, minimal. Japanese-inspired clarity." },
                { name: "Manrope", family: "'Manrope', sans-serif", weight: "600", note: "Current body font as logo. Cohesive, modern." },
              ].map((font) => (
                <div
                  key={font.name}
                  className="rounded-[20px] border border-gray-200 hover:border-[#00E7C3]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Dark preview bar */}
                  <div className="bg-[#15171A] px-8 py-8 flex items-center gap-3">
                    <img
                      src="/og-image.png"
                      alt="Logo"
                      className="w-9 h-9 object-contain"
                    />
                    <span
                      className="text-[22px] text-white tracking-wide"
                      style={{ fontFamily: font.family, fontWeight: font.weight }}
                    >
                      Epiphiny Flow
                    </span>
                  </div>
                  {/* Light preview bar */}
                  <div className="bg-white px-8 py-6 flex items-center gap-3">
                    <img
                      src="/og-image.png"
                      alt="Logo"
                      className="w-9 h-9 object-contain"
                    />
                    <span
                      className="text-[22px] text-[#15171A] tracking-wide"
                      style={{ fontFamily: font.family, fontWeight: font.weight }}
                    >
                      Epiphiny Flow
                    </span>
                  </div>
                  {/* Info */}
                  <div className="px-8 py-5 bg-[#FAFAF5] border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#15171A]">
                        {font.name}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[2px] uppercase text-[#00E7C3]">
                        {font.family.includes("serif") && !font.family.includes("sans") ? "Serif" : "Sans-serif"}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-400 mt-1">{font.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <FooterV2 />
    </div>
  );
};

export default DesignLabV2;
