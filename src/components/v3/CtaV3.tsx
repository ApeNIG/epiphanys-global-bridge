import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ctaBoardroom from "@/assets/v2/manchester-street-portrait.jpg";

const CtaV3 = () => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#1a0f2e]">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/[0.08] rounded-full blur-[150px]" />

      <div
        ref={ref}
        className="reveal-up max-w-[1440px] mx-auto px-6 md:px-20 py-24 md:py-36 relative z-10"
      >
        {/* Video card with text overlaid */}
        <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end">
          {/* Image layer — scaled up to crop out beige border */}
          <img
            src={ctaBoardroom}
            alt="Diverse professionals collaborating in London boardroom"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%] scale-110"
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Text content — overlaid on video */}
          <div className="relative z-10 p-8 md:p-14 w-full">
            <div className="max-w-[720px]">
              {/* Editorial overline */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-[#00E7C3]" />
                <span className="text-[11px] font-semibold tracking-[3px] uppercase text-white/50">
                  The Advantage
                </span>
              </div>

              <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white leading-[1.1] tracking-[-0.01em]">
                The UK&rsquo;s diversity
                <br />
                is our advantage.
              </h2>

              <p className="text-white/60 text-[17px] mt-6 leading-[1.7] max-w-[520px]">
                Ethnic-minority-led businesses add at least &pound;74bn a year to the
                UK economy and employ nearly 3 million people. That is the advantage
                we are built to unlock.
              </p>

              {/* One button, not two. The primary was "Book a call" -> the
                  consultation form and the secondary was already a mailto; now
                  that the site contacts by email, keeping both would have put
                  two email buttons side by side saying the same thing. */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-12">
                <a
                  href="mailto:info@epiphinyflow.com?subject=Epiphiny%20Flow%20enquiry"
                  className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-[15px] font-semibold hover:bg-[#00d4b3] transition-colors group"
                >
                  Contact us
                  <span className="w-8 h-8 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaV3;
