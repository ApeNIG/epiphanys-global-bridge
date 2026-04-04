import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import communityCanary from "@/assets/v2/networking-canary-wharf.jpg";
import millenniumBridge from "@/assets/v2/millennium-bridge-man.jpg";
import lifestyleCafe from "@/assets/v2/lifestyle-cafe.jpg";
import westminsterPortrait from "@/assets/v2/coworking-woman.jpg";

const CommunityV2 = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const photoRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden">
      {/* Curved top edge — smooth transition from white */}
      <svg
        className="block w-full h-12 md:h-20 -mb-[1px]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0L0 0C0 0 240 80 720 80C1200 80 1440 0 1440 0L1440 80L0 80Z"
          fill="#15171A"
        />
      </svg>

      <div className="bg-[#15171A] pt-10 md:pt-20 pb-0">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
          {/* Editorial overline */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-500">
              Our Community
            </span>
          </div>

          {/* Two-column editorial layout */}
          <div
            ref={sectionRef}
            className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          >
            {/* Left column — editorial text, 7 cols */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-white leading-[1.3]">
                Built by the community,{" "}
                <em className="not-italic text-[#00E7C3]">for</em> the
                community — with authentic cultural understanding and a
                commitment to{" "}
                <em className="not-italic text-[#00E7C3]">inclusive growth</em>.
              </h2>

              {/* Testimonial — editorial blockquote */}
              <blockquote className="mt-4">
                <div className="text-[48px] leading-none text-[#00E7C3]/20 font-serif select-none">
                  "
                </div>
                <p className="text-gray-400 text-[17px] leading-[1.8] -mt-6 ml-1">
                  Epiphiny Flow has transformed how our community connects with
                  global opportunities. It's more than a platform — it's a
                  bridge to our future.
                </p>
                <div className="flex items-center gap-4 mt-6 ml-1">
                  <img
                    src={lifestyleCafe}
                    alt="Community leader"
                    className="w-12 h-12 rounded-full object-cover grayscale"
                  />
                  <div>
                    <div className="text-white text-sm font-semibold">
                      Sarah Okafor
                    </div>
                    <div className="text-gray-600 text-xs tracking-wide">
                      Entrepreneur &amp; Community Leader
                    </div>
                  </div>
                </div>
              </blockquote>

              <a
                href="/community"
                className="inline-flex items-center gap-3 bg-[#00E7C3] text-[#15171A] pl-8 pr-6 py-4 rounded-full text-sm font-semibold hover:bg-[#00d4b3] transition-colors w-fit mt-4 group"
              >
                Join the Community
                <span className="w-7 h-7 rounded-full bg-[#15171A]/10 flex items-center justify-center group-hover:bg-[#15171A]/20 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            {/* Right column — editorial photo stack, 5 cols */}
            <div ref={photoRef} className="reveal-right lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3 h-[500px] lg:h-[560px]">
                {/* Tall left image */}
                <div className="col-span-1 rounded-2xl overflow-hidden">
                  <img
                    src={communityCanary}
                    alt="Professionals at Canary Wharf"
                    className="w-full h-full object-cover object-[45%_center]"
                  />
                </div>
                {/* Two stacked right images */}
                <div className="col-span-1 flex flex-col gap-3">
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <img
                      src={millenniumBridge}
                      alt="Professional at Millennium Bridge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden relative">
                    <img
                      src={westminsterPortrait}
                      alt="Professional at Westminster Bridge"
                      className="w-full h-full object-cover"
                    />
                    {/* Editorial overlay stat */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                      <div>
                        <span className="text-[28px] font-bold text-white font-sans tracking-tight">
                          94%
                        </span>
                        <span className="text-[10px] text-white/60 uppercase tracking-wider ml-2">
                          Member retention
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient bleed into CTA — seamless transition */}
        <div className="h-20 md:h-28 bg-gradient-to-b from-[#15171A] to-[#1a0f2e]" />
      </div>
    </section>
  );
};

export default CommunityV2;
