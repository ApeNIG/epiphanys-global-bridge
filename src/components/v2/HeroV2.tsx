import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { parseStatValue } from "@/hooks/useCountUp";
import heroPortrait from "@/assets/v2/spiral-staircase-man.jpg";

import heroManchester from "@/assets/v2/manchester-street-portrait.jpg";

/* ── Animated counter for a single stat ── */
const AnimatedStat = ({
  num,
  label,
  delay,
}: {
  num: string;
  label: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(num); // fallback = static value
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const { number, prefix, suffix } = parseStatValue(num);
          const duration = 1800;
          const start = performance.now();

          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
            const val = Math.floor(number * ease);
            setDisplay(`${prefix}${val.toLocaleString()}${suffix}`);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-2 opacity-0 translate-y-4"
      style={{
        animation: `heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards`,
      }}
    >
      <span className="text-[34px] md:text-[44px] font-bold text-[#15171A] font-sans tracking-tight tabular-nums">
        {display}
      </span>
      <span className="text-[10px] md:text-[11px] text-gray-400 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

/* ── Parallax hook ── */
const useParallax = (speed = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
};

/* ── Hero ── */
const HeroV2 = () => {
  const parallax1 = useParallax(0.08);
  const parallax2 = useParallax(-0.05);
  const parallax3 = useParallax(0.12);

  return (
    <section className="bg-white relative overflow-hidden">
      {/* Keyframes — injected once */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroHighlight {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes heroPhotoReveal {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes dashCardSlide {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sparkDraw {
          from { stroke-dashoffset: 200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,231,195,0.3); }
          50% { box-shadow: 0 0 20px 4px rgba(0,231,195,0.15); }
        }
        /* Flying blocks — spawn from boost, travel right */
        @keyframes blockFly1 {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.4); }
          15%  { opacity: 1; transform: translate(80px, -10px) scale(1); }
          100% { opacity: 0.85; transform: translate(min(55vw, 700px), -60px) scale(1); }
        }
        @keyframes blockFly2 {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.3); }
          15%  { opacity: 1; transform: translate(60px, 5px) scale(1); }
          100% { opacity: 0.65; transform: translate(min(45vw, 580px), 30px) scale(1); }
        }
        @keyframes blockFly3 {
          0%   { opacity: 0; transform: translate(0, 0) scale(0.3); }
          15%  { opacity: 0.9; transform: translate(100px, -5px) scale(1); }
          100% { opacity: 0.5; transform: translate(min(65vw, 850px), -20px) scale(1); }
        }
        @keyframes blockFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>

      {/* Editorial grid background — subtle */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #15171A 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 pt-16 md:pt-24 pb-0 relative">
        {/* Network graphic — right side, hidden on mobile */}
        <div
          className="absolute right-6 md:right-20 top-16 md:top-24 w-[45%] h-[400px] hidden lg:block pointer-events-none opacity-0"
          style={{
            animation: "heroFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 600ms forwards",
          }}
        >
          <svg viewBox="0 0 500 400" className="w-full h-full" fill="none">
            {/* Connection lines */}
            <line x1="250" y1="120" x2="380" y2="80" stroke="#00E7C3" strokeWidth="1" opacity="0.2" />
            <line x1="250" y1="120" x2="150" y2="200" stroke="#00E7C3" strokeWidth="1" opacity="0.15" />
            <line x1="250" y1="120" x2="400" y2="200" stroke="#8B5CF6" strokeWidth="1" opacity="0.15" />
            <line x1="380" y1="80" x2="450" y2="160" stroke="#00E7C3" strokeWidth="1" opacity="0.12" />
            <line x1="150" y1="200" x2="100" y2="300" stroke="#00E7C3" strokeWidth="1" opacity="0.1" />
            <line x1="150" y1="200" x2="280" y2="280" stroke="#8B5CF6" strokeWidth="1" opacity="0.12" />
            <line x1="400" y1="200" x2="350" y2="320" stroke="#00E7C3" strokeWidth="1" opacity="0.1" />
            <line x1="400" y1="200" x2="280" y2="280" stroke="#00E7C3" strokeWidth="1" opacity="0.12" />
            <line x1="280" y1="280" x2="350" y2="320" stroke="#8B5CF6" strokeWidth="1" opacity="0.1" />
            <line x1="100" y1="300" x2="200" y2="360" stroke="#00E7C3" strokeWidth="1" opacity="0.08" />
            <line x1="350" y1="320" x2="200" y2="360" stroke="#00E7C3" strokeWidth="1" opacity="0.08" />
            {/* Nodes — varying sizes = hierarchy */}
            <circle cx="250" cy="120" r="8" fill="#00E7C3" opacity="0.5">
              <animate attributeName="r" values="8;10;8" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="380" cy="80" r="5" fill="#00E7C3" opacity="0.35" />
            <circle cx="150" cy="200" r="6" fill="#8B5CF6" opacity="0.3" />
            <circle cx="400" cy="200" r="5" fill="#00E7C3" opacity="0.25" />
            <circle cx="450" cy="160" r="3" fill="#00E7C3" opacity="0.2" />
            <circle cx="100" cy="300" r="4" fill="#00E7C3" opacity="0.2" />
            <circle cx="280" cy="280" r="6" fill="#8B5CF6" opacity="0.25">
              <animate attributeName="r" values="6;8;6" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="320" r="4" fill="#00E7C3" opacity="0.2" />
            <circle cx="200" cy="360" r="3" fill="#00E7C3" opacity="0.15" />
            {/* Outer ring pulses */}
            <circle cx="250" cy="120" r="16" stroke="#00E7C3" strokeWidth="1" fill="none" opacity="0.15">
              <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.15;0.05;0.15" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="280" cy="280" r="12" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.1">
              <animate attributeName="r" values="12;20;12" dur="4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.1;0.03;0.1" dur="4s" repeatCount="indefinite" />
            </circle>
            {/* City labels */}
            <text x="250" y="100" textAnchor="middle" fill="#15171A" opacity="0.2" fontSize="9" fontFamily="Manrope" fontWeight="600" letterSpacing="1.5">LONDON</text>
            <text x="150" y="225" textAnchor="middle" fill="#15171A" opacity="0.15" fontSize="8" fontFamily="Manrope" fontWeight="600" letterSpacing="1.5">LAGOS</text>
            <text x="400" y="225" textAnchor="middle" fill="#15171A" opacity="0.15" fontSize="8" fontFamily="Manrope" fontWeight="600" letterSpacing="1.5">NAIROBI</text>
            <text x="280" y="305" textAnchor="middle" fill="#15171A" opacity="0.12" fontSize="8" fontFamily="Manrope" fontWeight="600" letterSpacing="1.5">ACCRA</text>
            <text x="380" y="65" textAnchor="middle" fill="#15171A" opacity="0.12" fontSize="8" fontFamily="Manrope" fontWeight="600" letterSpacing="1.5">MANCHESTER</text>
          </svg>
        </div>

        {/* Overline — entrance 1 */}
        <div
          className="flex items-center gap-4 mb-8 opacity-0"
          style={{
            animation:
              "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 100ms forwards",
          }}
        >
          <div className="w-12 h-[2px] bg-[#00E7C3]" />
          <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
            Advisory · Investment · Community
          </span>
        </div>

        {/* Headline — entrance 2 (line by line) */}
        <h1 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-normal text-[#15171A] leading-[0.95] max-w-[950px] tracking-[-0.02em]">
          <span
            className="block opacity-0"
            style={{
              animation:
                "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 250ms forwards",
            }}
          >
            Grow, scale &amp;
          </span>
          <span
            className="block opacity-0"
            style={{
              animation:
                "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 400ms forwards",
            }}
          >
            <span className="relative inline-block">
              <span className="relative z-10 text-[#15171A]">boost</span>
              {/* Static highlight */}
              <span
                className="absolute bottom-[0.1em] left-0 h-[0.35em] bg-[#00E7C3]/20 -z-0"
                style={{
                  animation:
                    "heroHighlight 0.6s cubic-bezier(0.16,1,0.3,1) 800ms forwards",
                  width: 0,
                }}
              />
              {/* Flying blocks — outer = fly position, inner = float bob */}
              <span
                className="absolute bottom-[0.1em] left-0 z-[1] hidden md:block pointer-events-none"
                style={{
                  animation: "blockFly1 1.4s cubic-bezier(0.22,1,0.36,1) 900ms forwards",
                  opacity: 0,
                }}
              >
                <span
                  className="block h-[14px] w-[40px] rounded-[4px] bg-[#00E7C3]/60"
                  style={{ animation: "blockFloat 4s ease-in-out 2.3s infinite" }}
                />
              </span>
              <span
                className="absolute bottom-[0.1em] left-0 z-[1] hidden md:block pointer-events-none"
                style={{
                  animation: "blockFly2 1.6s cubic-bezier(0.22,1,0.36,1) 1050ms forwards",
                  opacity: 0,
                }}
              >
                <span
                  className="block h-[10px] w-[28px] rounded-[3px] bg-[#8B5CF6]/50"
                  style={{ animation: "blockFloat 5s ease-in-out 2.65s infinite" }}
                />
              </span>
              <span
                className="absolute bottom-[0.1em] left-0 z-[1] hidden md:block pointer-events-none"
                style={{
                  animation: "blockFly3 1.8s cubic-bezier(0.22,1,0.36,1) 1150ms forwards",
                  opacity: 0,
                }}
              >
                <span
                  className="block h-[8px] w-[52px] rounded-[3px] bg-[#00E7C3]/40"
                  style={{ animation: "blockFloat 6s ease-in-out 2.95s infinite" }}
                />
              </span>
            </span>{" "}
            diaspora
          </span>
          <span
            className="block opacity-0"
            style={{
              animation:
                "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 550ms forwards",
            }}
          >
            businesses
          </span>
        </h1>

        {/* Sub-copy + CTA — entrance 3 */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between mt-12 gap-8 lg:gap-16 opacity-0"
          style={{
            animation:
              "heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 700ms forwards",
          }}
        >
          <p className="text-[17px] text-gray-500 max-w-[420px] leading-[1.7]">
            Advisory, investment and community — connecting diaspora
            professionals with the knowledge, funding and networks to build
            across borders.
          </p>

          <a
            href="/auth"
            className="inline-flex items-center gap-3 bg-[#15171A] text-[#00E7C3] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#2a2d32] transition-colors group w-fit"
          >
            Get Started
            <span className="w-8 h-8 rounded-full bg-[#00E7C3]/10 flex items-center justify-center group-hover:bg-[#00E7C3]/20 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Stat bar — staggered entrance + counter animation */}
        <div className="mt-14 flex flex-wrap items-baseline gap-x-12 gap-y-4 border-t border-gray-200 pt-8">
          {[
            { num: "250M+", label: "Diaspora Professionals" },
            { num: "£685B", label: "Economic Impact" },
            { num: "190+", label: "Countries Connected" },
            { num: "1,200+", label: "Success Stories" },
          ].map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              num={stat.num}
              label={stat.label}
              delay={900 + i * 120}
            />
          ))}
        </div>
      </div>

      {/* Photo Strip — staggered reveal */}
      <div className="relative z-10 -mb-28 md:-mb-36 mt-14">
        <div className="grid grid-cols-12 gap-3 px-3 md:px-6">
          <div
            className="col-span-12 md:col-span-7 rounded-2xl overflow-hidden h-[300px] md:h-[480px] group opacity-0 relative"
            style={{
              animation:
                "heroPhotoReveal 1s cubic-bezier(0.16,1,0.3,1) 1100ms forwards",
            }}
          >
            <div ref={parallax1} className="w-full h-full">
              <img
                src={heroPortrait}
                alt="Diaspora investor overlooking the City of London"
                className="w-full h-[120%] object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {/* Editorial text overlay — top-left for visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8">
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-[#00E7C3] font-sans mb-2">
                Grow
              </div>
              <div className="w-10 h-[2px] bg-[#00E7C3] mb-3" />
              <p className="font-serif text-[18px] md:text-[24px] text-white leading-[1.3] max-w-[360px]">
                Where ambition meets{" "}
                <em className="not-italic text-[#00E7C3]">opportunity</em>
              </p>
            </div>

            {/* ── Signature visual: Floating dashboard card ── */}
            <div
              className="absolute bottom-6 right-6 md:bottom-10 md:right-10 hidden md:block opacity-0"
              style={{
                animation: "dashCardSlide 0.8s cubic-bezier(0.16,1,0.3,1) 1800ms forwards",
              }}
            >
              <div
                className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-[220px]"
                style={{ animation: "pulseGlow 4s ease-in-out 2.6s infinite" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-semibold tracking-[2px] uppercase text-gray-400">Portfolio</span>
                  <span className="w-2 h-2 rounded-full bg-[#00E7C3] animate-pulse" />
                </div>
                <div className="text-[28px] font-bold text-[#15171A] tracking-tight font-sans leading-none">
                  £48,200
                </div>
                <div className="flex items-center gap-1.5 mt-1 mb-4">
                  <span className="text-[12px] font-semibold text-[#00E7C3]">+12.4%</span>
                  <span className="text-[10px] text-gray-400">this quarter</span>
                </div>
                {/* Sparkline */}
                <svg viewBox="0 0 180 40" className="w-full h-[32px]" fill="none">
                  <path
                    d="M0 35 Q20 30, 30 28 T60 22 T90 18 T120 10 T150 12 T180 5"
                    stroke="#00E7C3"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      strokeDasharray: 200,
                      animation: "sparkDraw 1.5s cubic-bezier(0.16,1,0.3,1) 2.2s forwards",
                      strokeDashoffset: 200,
                    }}
                  />
                  <path
                    d="M0 35 Q20 30, 30 28 T60 22 T90 18 T120 10 T150 12 T180 5 L180 40 L0 40Z"
                    fill="url(#sparkGrad)"
                    opacity="0.15"
                  />
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E7C3" />
                      <stop offset="100%" stopColor="#00E7C3" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-[11px] font-bold text-[#15171A]">3</div>
                    <div className="text-[8px] text-gray-400 uppercase tracking-wider">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-bold text-[#15171A]">7</div>
                    <div className="text-[8px] text-gray-400 uppercase tracking-wider">Markets</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-bold text-[#00E7C3]">↑ 24%</div>
                    <div className="text-[8px] text-gray-400 uppercase tracking-wider">ROI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-span-6 md:col-span-3 rounded-2xl overflow-hidden h-[200px] md:h-[480px] opacity-0 relative bg-[#F5F0E8] flex flex-col items-center justify-start"
            style={{
              animation:
                "heroPhotoReveal 1s cubic-bezier(0.16,1,0.3,1) 1300ms forwards",
            }}
          >
            {/* Ascending Path — teal path narrowing upward */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 300 480"
              preserveAspectRatio="xMidYMax slice"
            >
              <polygon points="90,480 210,480 165,30 135,30" fill="#2A9D8F" opacity="0.35" />
              <polygon points="110,480 190,480 160,50 140,50" fill="#2A9D8F" opacity="0.55" />
            </svg>
            {/* Glow at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#2A9D8F]/30 rounded-full blur-[24px]" />
            {/* Editorial quote + text — top-aligned so visible above fold */}
            <div className="relative z-10 pt-5 pl-5 pr-5 md:pt-8 md:pl-8 flex flex-col items-start">
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-[#2A9D8F] font-sans mb-2">
                Scale
              </div>
              <div className="w-10 h-[2px] bg-[#2A9D8F] mb-3" />
              <p className="font-serif text-[18px] md:text-[24px] text-[#15171A] leading-[1.3] max-w-[220px]">
                Your capital,{" "}
                <em className="not-italic text-[#2A9D8F]">deployed</em> with
                purpose.
              </p>
            </div>
          </div>
          <div
            className="col-span-6 md:col-span-2 rounded-2xl overflow-hidden h-[200px] md:h-[480px] group relative opacity-0"
            style={{
              animation:
                "heroPhotoReveal 1s cubic-bezier(0.16,1,0.3,1) 1500ms forwards",
            }}
          >
            <div ref={parallax3} className="w-full h-full">
              <img
                src={heroManchester}
                alt="Entrepreneur in Manchester"
                className="w-full h-[120%] object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {/* Editorial text overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
            <div className="absolute top-5 left-5 right-5 md:top-8 md:left-8">
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-[#00E7C3] font-sans mb-2">
                Boost
              </div>
              <div className="w-10 h-[2px] bg-[#00E7C3] mb-3" />
              <p className="font-serif text-[18px] md:text-[24px] text-white leading-[1.3]">
                Build across{" "}
                <em className="not-italic text-[#00E7C3]">borders</em>
              </p>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[9px] font-semibold tracking-[2px] uppercase text-white/60 drop-shadow-lg">
                Manchester · London · Lagos
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;
