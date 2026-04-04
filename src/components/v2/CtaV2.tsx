import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CtaV2 = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#1a0f2e]">
      {/* Subtle editorial grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Decorative gradient orb — restrained */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/[0.08] rounded-full blur-[150px]" />

      {/* Floating blocks — vertical stack, right side */}
      <style>{`
        @keyframes ctaFloat1 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes ctaFloat2 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-14px); }
        }
        @keyframes ctaFloat3 {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes ctaBlockIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="absolute right-[6%] md:right-[12%] top-1/2 -translate-y-1/2 hidden md:flex flex-row items-center gap-6 z-[1]">
        {[
          { label: "Grow", w: "w-[18px] md:w-[24px]", h: "min-h-[120px]", bg: "bg-[#00E7C3]/40", float: "ctaFloat1 4s ease-in-out 1s infinite", delay: "0.3s" },
          { label: "Scale", w: "w-[14px] md:w-[18px]", h: "min-h-[160px]", bg: "bg-[#8B5CF6]/30", float: "ctaFloat2 5s ease-in-out 1.2s infinite", delay: "0.5s" },
          { label: "Boost", w: "w-[20px] md:w-[28px]", h: "min-h-[90px]", bg: "bg-[#00E7C3]/25", float: "ctaFloat3 6s ease-in-out 1.4s infinite", delay: "0.7s" },
        ].map((bar) => (
          <span
            key={bar.label}
            className="opacity-0 group/bar relative"
            style={{ animation: `ctaBlockIn 0.7s cubic-bezier(0.16,1,0.3,1) ${bar.delay} forwards` }}
          >
            <span
              className={`block ${bar.w} ${bar.h} rounded-[6px] ${bar.bg} cursor-default`}
              style={{ animation: bar.float }}
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-[2px] uppercase text-white/0 hover:text-white/60 transition-colors duration-300 whitespace-nowrap cursor-default">
              {bar.label}
            </span>
          </span>
        ))}
      </div>

      <div
        ref={ref}
        className="reveal-up max-w-[1440px] mx-auto px-6 md:px-20 py-24 md:py-36 relative z-10"
      >
        <div className="max-w-[720px]">
          {/* Editorial overline */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-500">
              Get Started
            </span>
          </div>

          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em]">
            Your heritage is
            <br />
            your advantage.
          </h2>

          <p className="text-white/50 text-[17px] mt-6 leading-[1.7] max-w-[480px]">
            250M+ diaspora professionals are building across borders.
            Get the advisory, investment, and community to join them.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
            <a
              href="/auth"
              className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
            >
              Get Started Free
              <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            <a
              href="/consultation"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 px-8 py-4 rounded-full text-[15px] font-medium hover:border-white/40 hover:text-white transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaV2;
